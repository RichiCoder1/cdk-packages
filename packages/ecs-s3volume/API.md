# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="structs"></a>

### S3VolumeProps <a name="@richicoder/cdk-ecs-s3volume.S3VolumeProps" id="richicodercdkecss3volumes3volumeprops"></a>

S3 Volume Properties.

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { S3VolumeProps } from '@richicoder/cdk-ecs-s3volume'

const s3VolumeProps: S3VolumeProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`asset`](#richicodercdkecss3volumes3volumepropspropertyasset) | [`aws-cdk-lib.aws_s3_assets.Asset`](#aws-cdk-lib.aws_s3_assets.Asset) | The asset to sync to the volume. |
| [`bucket`](#richicodercdkecss3volumes3volumepropspropertybucket) | `string` \| [`aws-cdk-lib.aws_s3.IBucket`](#aws-cdk-lib.aws_s3.IBucket) | The bucket to sync to the volume. |
| [`bucketKey`](#richicodercdkecss3volumes3volumepropspropertybucketkey) | `string` | The key of the item to sync. |
| [`containerPath`](#richicodercdkecss3volumes3volumepropspropertycontainerpath) | `string` | Path to mount S3 volume. |
| [`dependentContainers`](#richicodercdkecss3volumes3volumepropspropertydependentcontainers) | `string`[] | Container for which to mount volume. |
| [`extraOptions`](#richicodercdkecss3volumes3volumepropspropertyextraoptions) | `string`[] | Extra options to add to s3 sync command. |
| [`syncContainerOptions`](#richicodercdkecss3volumes3volumepropspropertysynccontaineroptions) | [`aws-cdk-lib.aws_ecs.ContainerDefinitionOptions`](#aws-cdk-lib.aws_ecs.ContainerDefinitionOptions) | Options to set for the S3 sync container that copies files to the target volume. |
| [`volume`](#richicodercdkecss3volumes3volumepropspropertyvolume) | `string` | Name of the volume to mount. |

---

##### `asset`<sup>Optional</sup> <a name="@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.asset" id="richicodercdkecss3volumes3volumepropspropertyasset"></a>

```typescript
public readonly asset: Asset;
```

- *Type:* [`aws-cdk-lib.aws_s3_assets.Asset`](#aws-cdk-lib.aws_s3_assets.Asset)

The asset to sync to the volume.

One of bucket or asset must be specified.

---

##### `bucket`<sup>Optional</sup> <a name="@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.bucket" id="richicodercdkecss3volumes3volumepropspropertybucket"></a>

```typescript
public readonly bucket: string | IBucket;
```

- *Type:* `string` | [`aws-cdk-lib.aws_s3.IBucket`](#aws-cdk-lib.aws_s3.IBucket)

The bucket to sync to the volume.

One of bucket or asset must be specified.

---

##### `bucketKey`<sup>Optional</sup> <a name="@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.bucketKey" id="richicodercdkecss3volumes3volumepropspropertybucketkey"></a>

```typescript
public readonly bucketKey: string;
```

- *Type:* `string`
- *Default:* '' Defaults to whole bucket

The key of the item to sync.

Only applicable if bucket specified.

---

##### `containerPath`<sup>Optional</sup> <a name="@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.containerPath" id="richicodercdkecss3volumes3volumepropspropertycontainerpath"></a>

```typescript
public readonly containerPath: string;
```

- *Type:* `string`
- *Default:* /etc/s3/${props.bucket}/

Path to mount S3 volume.

---

##### `dependentContainers`<sup>Optional</sup> <a name="@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.dependentContainers" id="richicodercdkecss3volumes3volumepropspropertydependentcontainers"></a>

```typescript
public readonly dependentContainers: string[];
```

- *Type:* `string`[]
- *Default:* Default TaskDefinition container

Container for which to mount volume.

---

##### `extraOptions`<sup>Optional</sup> <a name="@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.extraOptions" id="richicodercdkecss3volumes3volumepropspropertyextraoptions"></a>

```typescript
public readonly extraOptions: string[];
```

- *Type:* `string`[]
- *Default:* Empty

Extra options to add to s3 sync command.

See <https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html> for full details.

---

##### `syncContainerOptions`<sup>Optional</sup> <a name="@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.syncContainerOptions" id="richicodercdkecss3volumes3volumepropspropertysynccontaineroptions"></a>

```typescript
public readonly syncContainerOptions: ContainerDefinitionOptions;
```

- *Type:* [`aws-cdk-lib.aws_ecs.ContainerDefinitionOptions`](#aws-cdk-lib.aws_ecs.ContainerDefinitionOptions)
- *Default:* Latest aws/aws-cli image and essential: false.

Options to set for the S3 sync container that copies files to the target volume.

Warning: All options *except* command may be overwritten.

---

##### `volume`<sup>Optional</sup> <a name="@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.volume" id="richicodercdkecss3volumes3volumepropspropertyvolume"></a>

```typescript
public readonly volume: string;
```

- *Type:* `string`
- *Default:* Unique id

Name of the volume to mount.

---

## Classes <a name="Classes" id="classes"></a>

### S3Volume <a name="@richicoder/cdk-ecs-s3volume.S3Volume" id="richicodercdkecss3volumes3volume"></a>

- *Implements:* [`aws-cdk-lib.aws_ecs.ITaskDefinitionExtension`](#aws-cdk-lib.aws_ecs.ITaskDefinitionExtension)

#### Initializers <a name="@richicoder/cdk-ecs-s3volume.S3Volume.Initializer" id="richicodercdkecss3volumes3volumeinitializer"></a>

```typescript
import { S3Volume } from '@richicoder/cdk-ecs-s3volume'

new S3Volume(id: string, props: S3VolumeProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`id`](#richicodercdkecss3volumes3volumeparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#richicodercdkecss3volumes3volumeparameterprops)<span title="Required">*</span> | [`@richicoder/cdk-ecs-s3volume.S3VolumeProps`](#@richicoder/cdk-ecs-s3volume.S3VolumeProps) | *No description.* |

---

##### `id`<sup>Required</sup> <a name="@richicoder/cdk-ecs-s3volume.S3Volume.parameter.id" id="richicodercdkecss3volumes3volumeparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@richicoder/cdk-ecs-s3volume.S3Volume.parameter.props" id="richicodercdkecss3volumes3volumeparameterprops"></a>

- *Type:* [`@richicoder/cdk-ecs-s3volume.S3VolumeProps`](#@richicoder/cdk-ecs-s3volume.S3VolumeProps)

---

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`extend`](#richicodercdkecss3volumes3volumeextend) | Apply the extension to the given TaskDefinition. |

---

##### `extend` <a name="@richicoder/cdk-ecs-s3volume.S3Volume.extend" id="richicodercdkecss3volumes3volumeextend"></a>

```typescript
public extend(taskDefinition: TaskDefinition)
```

###### `taskDefinition`<sup>Required</sup> <a name="@richicoder/cdk-ecs-s3volume.S3Volume.parameter.taskDefinition" id="richicodercdkecss3volumes3volumeparametertaskdefinition"></a>

- *Type:* [`aws-cdk-lib.aws_ecs.TaskDefinition`](#aws-cdk-lib.aws_ecs.TaskDefinition)

---

#### Static Functions <a name="Static Functions" id="static-functions"></a>

| **Name** | **Description** |
| --- | --- |
| [`fromAsset`](#richicodercdkecss3volumes3volumefromasset) | *No description.* |
| [`fromBucket`](#richicodercdkecss3volumes3volumefrombucket) | *No description.* |

---

##### `fromAsset` <a name="@richicoder/cdk-ecs-s3volume.S3Volume.fromAsset" id="richicodercdkecss3volumes3volumefromasset"></a>

```typescript
import { S3Volume } from '@richicoder/cdk-ecs-s3volume'

S3Volume.fromAsset(assetPath: string, asset: Asset)
```

###### `assetPath`<sup>Required</sup> <a name="@richicoder/cdk-ecs-s3volume.S3Volume.parameter.assetPath" id="richicodercdkecss3volumes3volumeparameterassetpath"></a>

- *Type:* `string`

---

###### `asset`<sup>Required</sup> <a name="@richicoder/cdk-ecs-s3volume.S3Volume.parameter.asset" id="richicodercdkecss3volumes3volumeparameterasset"></a>

- *Type:* [`aws-cdk-lib.aws_s3_assets.Asset`](#aws-cdk-lib.aws_s3_assets.Asset)

---

##### `fromBucket` <a name="@richicoder/cdk-ecs-s3volume.S3Volume.fromBucket" id="richicodercdkecss3volumes3volumefrombucket"></a>

```typescript
import { S3Volume } from '@richicoder/cdk-ecs-s3volume'

S3Volume.fromBucket(targetBucket: IBucket, options?: S3VolumeProps)
```

###### `targetBucket`<sup>Required</sup> <a name="@richicoder/cdk-ecs-s3volume.S3Volume.parameter.targetBucket" id="richicodercdkecss3volumes3volumeparametertargetbucket"></a>

- *Type:* [`aws-cdk-lib.aws_s3.IBucket`](#aws-cdk-lib.aws_s3.IBucket)

---

###### `options`<sup>Optional</sup> <a name="@richicoder/cdk-ecs-s3volume.S3Volume.parameter.options" id="richicodercdkecss3volumes3volumeparameteroptions"></a>

- *Type:* [`@richicoder/cdk-ecs-s3volume.S3VolumeProps`](#@richicoder/cdk-ecs-s3volume.S3VolumeProps)

---




