# `@richicoder/cdk-ecs-s3volume`

An ECS Task Extension that mounts a volume to ECS container(s) and copies S3 files from a bucket into that volume. Useful as a replacement for `ConfigMap` in EKS since there is (currently) no native ECS equivalent.

## Usage

Install:

```bash
npm i @richicoder/cdk-ecs-s3volume
```

To copy whole bucket:

```typescript
/* .... */
import { S3VolumeExtension } from '@richicoder/cdk-ecs-s3volume';

  /* ... */
  const configBucket = Bucket.fromBucketName(this, 'ConfigBucket', 'my-config-bucket');
  myTaskDefinition.addExtension(S3Volume.fromBucket(configBucket/*, options */));
  /* or */
  myTaskDefinition.addExtension(new S3Volume('ConfigVolume', {
    bucket: 'my-config-bucket',
  }));
  /* ... */
```

Assuming a bucket with name `my-config-bucket` and objects `config.yml` and `config-prod.yml`, this will result in a `readOnly` volume at `/etc/s3/my-config-bucket/` containing the files `config.yml` and `config-prod.yml`.

To use a specific asset:

```typescript
/* .... */
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { S3Volume } from '@richicoder/cdk-ecs-s3volume';

  /* ... */
  const configFile = new Asset(this, 'Config', { path: 'config-prod.yml' });
  myTaskDefinition.addExtension(S3Volume.fromAsset('/etc/config/', configFile));
  /* ... */
```

Results in a `readOnly` volume at `/etc/config/` with file `config-prod.yml`.

[Documentation](./packages/ecs-s3volume/README.md)

[API](./packages/ecs-s3volume/API.md)
