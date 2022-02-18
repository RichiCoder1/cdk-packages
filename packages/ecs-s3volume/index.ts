import {
  ContainerDependencyCondition,
  ContainerImage,
  ITaskDefinitionExtension,
  TaskDefinition,
  ContainerDefinitionOptions
} from "aws-cdk-lib/aws-ecs";

import { Names } from "aws-cdk-lib";
import { IBucket, Bucket } from "aws-cdk-lib/aws-s3";
import { Asset } from "aws-cdk-lib/aws-s3-assets";
import { parse } from "node:path";

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
  readonly asset?: Asset;
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
}

export class S3Volume implements ITaskDefinitionExtension {
  constructor(private id: string, private props: S3VolumeProps) {}

  public static fromAsset(assetPath: string, asset: Asset) {
    if (asset.isFile) {
      if (assetPath.endsWith('/')) {
        throw new Error('You must specify a full file path for assetPath when asset is a single file.')
      }
      const { ext } = parse(assetPath);
      if (!ext) {
        console.log(`The path ${assetPath} doesn't have an extension. The assetPath should be the full path of the asset to be copied too.`);
      }
    } else {
      throw new Error('S3Volume does not yet support zip assets.');
    }
    return new S3Volume(Names.uniqueId(asset), {
      asset,
      containerPath: assetPath,
    });
  } 

  public static fromBucket(targetBucket: IBucket, options?: S3VolumeProps) {
    return new S3Volume(Names.uniqueId(targetBucket), {
      ...options,
      bucket: targetBucket,
    });
  } 

  public extend(taskDefinition: TaskDefinition): void {
    if ((!this.props.bucket && !this.props.asset) || (!!this.props.bucket && !!this.props.asset)) {
      throw new Error("You must specify one of bucket or asset.");
    }

    let bucket: IBucket;
    if (this.props.asset) {
      bucket = this.props.asset.bucket;
    } else if (typeof this.props.bucket === "string") {
      bucket = Bucket.fromBucketName(taskDefinition, `${this.id}-${this.props.bucket}`, this.props.bucket);
    } else {
      bucket = this.props.bucket!;
    }

    if (this.props.asset) {
      this.props.asset.grantRead(taskDefinition.obtainExecutionRole());
    } else {
      bucket.grantRead(taskDefinition.obtainExecutionRole());
    }

    const volumeName = `s3-${this.props.volume ??
      Names.uniqueId(taskDefinition)}`;
    taskDefinition.addVolume({
      name: volumeName
    });

    const containerPath =
      this.props.containerPath ?? `/etc/s3/${bucket.bucketName}/`;

    const syncContainerId = `s3-sync-${Names.uniqueId(taskDefinition)}`;
    let s3Command: string[];
    if (this.props.asset) {
      const { asset } = this.props;
      s3Command = [
        "s3",
        "cp",
        asset.s3ObjectUrl,
        containerPath,
        "--only-show-errors",
        ...(this.props.extraOptions ?? [])
      ];
    } else {
      s3Command = [
        "s3",
        "sync",
        bucket.s3UrlForObject(this.props.bucketKey),
        containerPath,
        "--only-show-errors",
        ...(this.props.extraOptions ?? [])
      ];
    }

    const syncContainer = taskDefinition.addContainer(syncContainerId, {
      // TODO: Add dependabot/renovate to keep this up to date.
      image: ContainerImage.fromRegistry(`amazon/aws-cli:2.4.11`),
      essential: false,
      ...(this.props.syncContainerOptions ?? {}),
      command: s3Command,
    });

    syncContainer.addMountPoints({
      containerPath,
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
          containerPath,
          sourceVolume: volumeName,
          readOnly: true
        });
      }
    } else {
      taskDefinition.defaultContainer!.addContainerDependencies({
        container: syncContainer,
        condition: ContainerDependencyCondition.SUCCESS
      });
      taskDefinition.defaultContainer!.addMountPoints({
        containerPath,
        sourceVolume: volumeName,
        readOnly: true
      });
    }
  }
}
