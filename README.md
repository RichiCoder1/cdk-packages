# @richicoder/cdk

A set of CDK helper packages for accomplishing common tasks.

## Packages

### `@richicoder/cdk-ecs-s3volume`

An ECS Task Extension that mounts a volume to ECS container(s) and copies S3 files from a bucket into that volume. Useful as a replacement for `ConfigMap` in EKS since there is (currently) no native ECS equivalent.

[Documentation](./packages/ecs-s3volume/README.md)

[API](./packages/ecs-s3volume/API.md)