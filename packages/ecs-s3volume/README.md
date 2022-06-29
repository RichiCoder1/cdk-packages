# `@richicoder/cdk-ecs-s3volume`

An ECS Task Extension that mounts a volume to ECS container(s) and either copies a local file or files from a bucket into that volume.

Useful as a replacement for `ConfigMap` in EKS since there is (currently) no native ECS equivalent.

## Usage

Install:

```bash
npm i @richicoder/cdk-ecs-s3volume
```

### Adding a file

```typescript
taskDefinition.addExtension(S3Volume.fromAsset('stacks/config-prod.yml', '/etc/config/config-prod.yaml'/*, options */));
```

This will result in `stacks/config-prod.yml` being available read-only in the container at `/etc/config/config-prod.yaml`.

_Important: `fromAsset` only supports a single file. To copy multiple files, use your own bucket with [s3-deployment](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3_deployment-readme.html) and the steps below._

### Adding a bucket's contents

```typescript
const bucket: Bucket
taskDefinition.addExtension(S3Volume.fromBucket(bucket/*, options */));
/* or */
taskDefinition.addExtension(new S3Volume('ConfigVolume', {
  bucket: 'my-config-bucket',
}));
```

Assuming a bucket with name `my-config-bucket` and objects `config.yml` and `config-prod.yml`, this will result in a `readOnly` volume at `/etc/s3/my-config-bucket/` containing the files `config.yml` and `config-prod.yml`.

Results in a `readOnly` volume at `/etc/config/` with file `config-prod.yml`.

#### Overriding container path

The path in the container defaults to `/etc/s3/${bucketName}/*` but can be overidden by passing `containerPath` to options.

```typescript
taskDefinition.addExtension(new S3Volume('ConfigVolume', {
  bucket: 'my-data-bucket',
  containerPath: `/data/my-data/`
}));
```

#### Copying multiple local files

Sometimes you might want to copy multiple files from local source into a container. To do this, you can combine bucket volumes with CDK's Bucket Deployment construct.

```typescript
const configBucket = new s3.Bucket(this, 'ConfigBucket');

new s3deploy.BucketDeployment(this, 'Configs', {
  sources: [s3deploy.Source.asset('./configs')],
  destinationBucket: configBucket,
});

taskDefinition.addExtension(S3Volume.fromBucket(configBucket));
```

or when using a shared bucket, you might want to use a specific key path:

```typescript
const configBucket: Bucket;

new s3deploy.BucketDeployment(this, 'Configs', {
  sources: [s3deploy.Source.asset('./configs')],
  destinationBucket: configBucket,
  destinationKeyPrefix: 'my/service',
});

taskDefinition.addExtension(S3Volume.fromBucket(configBucket, {
  // See https://docs.aws.amazon.com/cli/latest/reference/s3/index.html#use-of-exclude-and-include-filters for more details
  extraOptions: [`--exclude="*"`, `--include="my/service/*"`]
}));
```

## API

[API](./packages/ecs-s3volume/API.md)
