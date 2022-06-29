import {
  ContainerDependencyCondition,
  ContainerImage,
  ITaskDefinitionExtension,
  TaskDefinition,
  ContainerDefinitionOptions,
  LogDriver
} from "aws-cdk-lib/aws-ecs";

import { Names } from "aws-cdk-lib";
import { IBucket, Bucket } from "aws-cdk-lib/aws-s3";
import { Asset } from "aws-cdk-lib/aws-s3-assets";
import { parse, dirname } from "node:path";
import { RetentionDays } from "aws-cdk-lib/aws-logs";

/** S3 Volume Properties */
export interface S3VolumeProps {
  /** The bucket to sync to the volume. One of bucket or asset must be specified. */
  readonly bucket?: string | IBucket;

  /** 
   * The key of the item to sync. Only applicable if bucket specified. 
   * 
   * @default '' Defaults to whole bucket
   */
  readonly bucketKey?: string;

  /** The asset to sync to the volume. One of bucket or asset must be specified. */
  readonly path?: string;
  /**
   * Extra options to add to s3 sync command. See <https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html> for full details.
   * @example
   * new S3VolumeExtension({
   *   // ...
   *   extraOptions: [`--exclude="*"`, `--include="*.config"`]
   *   // ...
   * });
   * @default - Empty
   */
  readonly extraOptions?: string[];
  /**
   * Name of the volume to mount.
   * @default - Unique id
   */
  readonly volume?: string;
  /**
   * Path to mount S3 volume.
   * @default - /etc/s3/${props.bucket}/
   */
  readonly containerPath?: string;
  /**
   * Container for which to mount volume.
   * @default - Default TaskDefinition container
   */
  readonly dependentContainers?: string[];

  /**
   * Options to set for the S3 sync container that copies files to the target volume.
   * Warning: All options *except* command may be overwritten.
   * 
   * @default - Latest aws/aws-cli image and essential: false.
   */
  readonly syncContainerOptions?: ContainerDefinitionOptions;

  /**
   * Wether or not to mount the volume to the target container as readonly.
   * 
   * @default true
   */
  readonly readOnly: boolean;
}

/** S3 Volume Asset Properties */
export interface S3VolumeAssetProps {
  /**
   * Extra options to add to s3 sync command. See <https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html> for full details.
   * @example
   * new S3VolumeExtension({
   *   // ...
   *   extraOptions: [`--exclude="*"`, `--include="*.config"`]
   *   // ...
   * });
   * @default - Empty
   */
  readonly extraOptions?: string[];
  /**
   * Name of the volume to mount.
   * @default - Unique id
   */
  readonly volume?: string;
  /**
   * Container for which to mount volume.
   * @default - Default TaskDefinition container
   */
  readonly dependentContainers?: string[];

  /**
   * Options to set for the S3 sync container that copies files to the target volume.
   * Warning: All options *except* command may be overwritten.
   * 
   * @default - Latest aws/aws-cli image and essential: false.
   */
  readonly syncContainerOptions?: ContainerDefinitionOptions;

  /**
   * Wether or not to mount the volume to the target container as readonly.
   * 
   * @default true
   */
  readonly readOnly: boolean;
}

export class S3Volume implements ITaskDefinitionExtension {
  constructor(private props: S3VolumeProps) {}

  public static fromAsset(path: string, containerPath: string, options?: S3VolumeAssetProps) {
    return new S3Volume({
      ...options,
      path,
      containerPath,
    });
  } 

  public static fromBucket(targetBucket: IBucket, options?: S3VolumeProps) {
    return new S3Volume({
      ...options,
      bucket: targetBucket,
    });
  } 

  public extend(taskDefinition: TaskDefinition): void {
    if ((!this.props.bucket && !this.props.path) || (!!this.props.bucket && !!this.props.path)) {
      throw new Error("You must specify one of bucket or path.");
    }

    let bucket: IBucket;
    let asset: Asset | null = null;
    if (this.props.path) {
      if (this.props.containerPath == null) {
        throw new Error('You must specify containerPath when using path.')
      }
      asset = new Asset(taskDefinition, `${Names.uniqueId(taskDefinition)}-asset`, {
        path: this.props.path
      });
      if (asset.isFile) {
        if (this.props.containerPath.endsWith('/')) {
          throw new Error('You must specify a full file path for containerPath when asset is a single file.')
        }
        const { ext } = parse(this.props.path);
        if (!ext) {
          console.log(`The path ${this.props.path} doesn't have an extension. The path should be the full path of the asset to be copied too.`);
        }
      } else {
        throw new Error('S3Volume does not support folders or zips as source assets. Use bucket deployments if you need to copy multiple files.');
      }
      bucket = asset.bucket;
    } else if (typeof this.props.bucket === "string") {
      bucket = Bucket.fromBucketName(taskDefinition, `${Names.uniqueId(taskDefinition)}-bucket`, this.props.bucket);
    } else {
      bucket = this.props.bucket!;
    }

    if (asset) {
      asset.grantRead(taskDefinition.taskRole);
    } else {
      bucket.grantRead(taskDefinition.taskRole);
    }

    const volumeName = `s3-${this.props.volume ??
      Names.uniqueId(taskDefinition)}`;
    taskDefinition.addVolume({
      name: volumeName
    });

    const containerDirPath =
      dirname(this.props.containerPath ?? `/etc/s3/${bucket.bucketName}/`);

    const syncContainerId = `s3-sync-${Names.uniqueId(taskDefinition)}`;
    let s3Command: string[];
    if (asset) {
      s3Command = [
        "s3",
        "cp",
        asset.s3ObjectUrl,
        containerDirPath,
        "--only-show-errors",
        ...(this.props.extraOptions ?? [])
      ];
    } else {
      s3Command = [
        "s3",
        "sync",
        bucket.s3UrlForObject(this.props.bucketKey),
        containerDirPath,
        "--only-show-errors",
        ...(this.props.extraOptions ?? [])
      ];
    }

    const syncContainer = taskDefinition.addContainer(syncContainerId, {
      // TODO: Add dependabot/renovate to keep this up to date.
      image: ContainerImage.fromRegistry(`amazon/aws-cli:2.7.11`),
      essential: false,
      ...(this.props.syncContainerOptions ?? {}),
      memoryReservationMiB: 256 ?? this.props.syncContainerOptions?.memoryReservationMiB,
      command: s3Command,
      logging: LogDriver.awsLogs({ 
        streamPrefix: 'ecs-s3volume',
        logRetention: RetentionDays.TWO_WEEKS,
      })
    });

    syncContainer.addMountPoints({
      containerPath: containerDirPath,
      sourceVolume: volumeName,
      readOnly: false
    });

    if (!taskDefinition.defaultContainer && !this.props.dependentContainers) {
      throw new Error(
        "Either the taskDefinition must have a default container or you must specify dependentContainers."
      );
    }

    if (this.props.dependentContainers) {
      for (const containerKey in this.props.dependentContainers) {
        const targetContainer = taskDefinition.findContainer(containerKey);
        if (!targetContainer) {
          throw new Error(
            `Failed to find dependent container with name ${containerKey}.`
          );
        }

        targetContainer.addContainerDependencies({
          container: syncContainer,
          condition: ContainerDependencyCondition.SUCCESS
        });
        targetContainer.addMountPoints({
          containerPath: containerDirPath,
          sourceVolume: volumeName,
          readOnly: this.props.readOnly ?? true,
        });
      }
    } else {
      taskDefinition.defaultContainer!.addContainerDependencies({
        container: syncContainer,
        condition: ContainerDependencyCondition.SUCCESS
      });
      taskDefinition.defaultContainer!.addMountPoints({
        containerPath: containerDirPath,
        sourceVolume: volumeName,
        readOnly: this.props.readOnly ?? true,
      });
    }
  }
}
