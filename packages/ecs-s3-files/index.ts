import {
  ContainerDependencyCondition,
  ContainerImage,
  ITaskDefinitionExtension,
  TaskDefinition
} from "aws-cdk-lib/aws-ecs";

import { Names } from "aws-cdk-lib/core";

/** S3 Volume Properties */
export interface S3VolumeProps {
  /** The bucket to sync to the volume. */
  readonly bucket: string;
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
}

export class S3VolumeExtension implements ITaskDefinitionExtension {
  constructor(private props: S3VolumeProps) {}

  extend(taskDefinition: TaskDefinition): void {
    const volumeName = `s3-${this.props.volume ??
      Names.uniqueId(taskDefinition)}`;
    taskDefinition.addVolume({
      name: volumeName
    });

    const containerPath =
      this.props.containerPath ?? `/etc/s3/${this.props.bucket}/`;

    const copyContainerId = `s3-copy-${Names.uniqueId(taskDefinition)}`;
    const copyCommand = [
      "s3",
      "sync",
      this.props.bucket,
      containerPath,
      "--only-show-errors",
      ...(this.props.extraOptions ?? [])
    ];

    const copyContainer = taskDefinition.addContainer(copyContainerId, {
      image: ContainerImage.fromRegistry(`amazon/aws-cli:latest`),
      command: copyCommand,
      essential: false
    });

    copyContainer.addMountPoints({
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
          container: copyContainer,
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
        container: copyContainer,
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
