# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### S3VolumeAssetProps <a name="S3VolumeAssetProps" id="@richicoder/cdk-ecs-s3volume.S3VolumeAssetProps"></a>

S3 Volume Asset Properties.

#### Initializer <a name="Initializer" id="@richicoder/cdk-ecs-s3volume.S3VolumeAssetProps.Initializer"></a>

```typescript
import { S3VolumeAssetProps } from '@richicoder/cdk-ecs-s3volume'

const s3VolumeAssetProps: S3VolumeAssetProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3VolumeAssetProps.property.dependentContainers">dependentContainers</a></code> | <code>string[]</code> | Container for which to mount volume. |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3VolumeAssetProps.property.extraOptions">extraOptions</a></code> | <code>string[]</code> | Extra options to add to s3 sync command. |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3VolumeAssetProps.property.readOnly">readOnly</a></code> | <code>boolean</code> | Wether or not to mount the volume to the target container as readonly. |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3VolumeAssetProps.property.syncContainerOptions">syncContainerOptions</a></code> | <code>aws-cdk-lib.aws_ecs.ContainerDefinitionOptions</code> | Options to set for the S3 sync container that copies files to the target volume. |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3VolumeAssetProps.property.volume">volume</a></code> | <code>string</code> | Name of the volume to mount. |

---

##### `dependentContainers`<sup>Optional</sup> <a name="dependentContainers" id="@richicoder/cdk-ecs-s3volume.S3VolumeAssetProps.property.dependentContainers"></a>

```typescript
public readonly dependentContainers: string[];
```

- *Type:* string[]
- *Default:* Default TaskDefinition container

Container for which to mount volume.

---

##### `extraOptions`<sup>Optional</sup> <a name="extraOptions" id="@richicoder/cdk-ecs-s3volume.S3VolumeAssetProps.property.extraOptions"></a>

```typescript
public readonly extraOptions: string[];
```

- *Type:* string[]
- *Default:* Empty

Extra options to add to s3 sync command.

See <https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html> for full details.

---

*Example*

```typescript
new S3VolumeExtension({
  // ...
  extraOptions: [`--exclude="*"`, `--include="*.config"`]
  // ...
});
```


##### `readOnly`<sup>Optional</sup> <a name="readOnly" id="@richicoder/cdk-ecs-s3volume.S3VolumeAssetProps.property.readOnly"></a>

```typescript
public readonly readOnly: boolean;
```

- *Type:* boolean
- *Default:* true

Wether or not to mount the volume to the target container as readonly.

---

##### `syncContainerOptions`<sup>Optional</sup> <a name="syncContainerOptions" id="@richicoder/cdk-ecs-s3volume.S3VolumeAssetProps.property.syncContainerOptions"></a>

```typescript
public readonly syncContainerOptions: ContainerDefinitionOptions;
```

- *Type:* aws-cdk-lib.aws_ecs.ContainerDefinitionOptions
- *Default:* Latest aws/aws-cli image and essential: false.

Options to set for the S3 sync container that copies files to the target volume.

Warning: All options *except* command may be overwritten.

---

##### `volume`<sup>Optional</sup> <a name="volume" id="@richicoder/cdk-ecs-s3volume.S3VolumeAssetProps.property.volume"></a>

```typescript
public readonly volume: string;
```

- *Type:* string
- *Default:* Unique id

Name of the volume to mount.

---

### S3VolumeProps <a name="S3VolumeProps" id="@richicoder/cdk-ecs-s3volume.S3VolumeProps"></a>

S3 Volume Properties.

#### Initializer <a name="Initializer" id="@richicoder/cdk-ecs-s3volume.S3VolumeProps.Initializer"></a>

```typescript
import { S3VolumeProps } from '@richicoder/cdk-ecs-s3volume'

const s3VolumeProps: S3VolumeProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.bucket">bucket</a></code> | <code>string \| aws-cdk-lib.aws_s3.IBucket</code> | The bucket to sync to the volume. |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.bucketKey">bucketKey</a></code> | <code>string</code> | The key of the item to sync. |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.containerPath">containerPath</a></code> | <code>string</code> | Path to mount S3 volume. |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.dependentContainers">dependentContainers</a></code> | <code>string[]</code> | Container for which to mount volume. |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.extraOptions">extraOptions</a></code> | <code>string[]</code> | Extra options to add to s3 sync command. |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.path">path</a></code> | <code>string</code> | The asset to sync to the volume. |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.readOnly">readOnly</a></code> | <code>boolean</code> | Wether or not to mount the volume to the target container as readonly. |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.syncContainerOptions">syncContainerOptions</a></code> | <code>aws-cdk-lib.aws_ecs.ContainerDefinitionOptions</code> | Options to set for the S3 sync container that copies files to the target volume. |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.volume">volume</a></code> | <code>string</code> | Name of the volume to mount. |

---

##### `bucket`<sup>Optional</sup> <a name="bucket" id="@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.bucket"></a>

```typescript
public readonly bucket: string | IBucket;
```

- *Type:* string | aws-cdk-lib.aws_s3.IBucket

The bucket to sync to the volume.

One of bucket or asset must be specified.

---

##### `bucketKey`<sup>Optional</sup> <a name="bucketKey" id="@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.bucketKey"></a>

```typescript
public readonly bucketKey: string;
```

- *Type:* string
- *Default:* '' Defaults to whole bucket

The key of the item to sync.

Only applicable if bucket specified.

---

##### `containerPath`<sup>Optional</sup> <a name="containerPath" id="@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.containerPath"></a>

```typescript
public readonly containerPath: string;
```

- *Type:* string
- *Default:* /etc/s3/${props.bucket}/

Path to mount S3 volume.

---

##### `dependentContainers`<sup>Optional</sup> <a name="dependentContainers" id="@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.dependentContainers"></a>

```typescript
public readonly dependentContainers: string[];
```

- *Type:* string[]
- *Default:* Default TaskDefinition container

Container for which to mount volume.

---

##### `extraOptions`<sup>Optional</sup> <a name="extraOptions" id="@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.extraOptions"></a>

```typescript
public readonly extraOptions: string[];
```

- *Type:* string[]
- *Default:* Empty

Extra options to add to s3 sync command.

See <https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html> for full details.

---

*Example*

```typescript
new S3VolumeExtension({
  // ...
  extraOptions: [`--exclude="*"`, `--include="*.config"`]
  // ...
});
```


##### `path`<sup>Optional</sup> <a name="path" id="@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

The asset to sync to the volume.

One of bucket or asset must be specified.

---

##### `readOnly`<sup>Optional</sup> <a name="readOnly" id="@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.readOnly"></a>

```typescript
public readonly readOnly: boolean;
```

- *Type:* boolean
- *Default:* true

Wether or not to mount the volume to the target container as readonly.

---

##### `syncContainerOptions`<sup>Optional</sup> <a name="syncContainerOptions" id="@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.syncContainerOptions"></a>

```typescript
public readonly syncContainerOptions: ContainerDefinitionOptions;
```

- *Type:* aws-cdk-lib.aws_ecs.ContainerDefinitionOptions
- *Default:* Latest aws/aws-cli image and essential: false.

Options to set for the S3 sync container that copies files to the target volume.

Warning: All options *except* command may be overwritten.

---

##### `volume`<sup>Optional</sup> <a name="volume" id="@richicoder/cdk-ecs-s3volume.S3VolumeProps.property.volume"></a>

```typescript
public readonly volume: string;
```

- *Type:* string
- *Default:* Unique id

Name of the volume to mount.

---

## Classes <a name="Classes" id="Classes"></a>

### S3Volume <a name="S3Volume" id="@richicoder/cdk-ecs-s3volume.S3Volume"></a>

- *Implements:* aws-cdk-lib.aws_ecs.ITaskDefinitionExtension

#### Initializers <a name="Initializers" id="@richicoder/cdk-ecs-s3volume.S3Volume.Initializer"></a>

```typescript
import { S3Volume } from '@richicoder/cdk-ecs-s3volume'

new S3Volume(props: S3VolumeProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3Volume.Initializer.parameter.props">props</a></code> | <code><a href="#@richicoder/cdk-ecs-s3volume.S3VolumeProps">S3VolumeProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@richicoder/cdk-ecs-s3volume.S3Volume.Initializer.parameter.props"></a>

- *Type:* <a href="#@richicoder/cdk-ecs-s3volume.S3VolumeProps">S3VolumeProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3Volume.extend">extend</a></code> | Apply the extension to the given TaskDefinition. |

---

##### `extend` <a name="extend" id="@richicoder/cdk-ecs-s3volume.S3Volume.extend"></a>

```typescript
public extend(taskDefinition: TaskDefinition): void
```

Apply the extension to the given TaskDefinition.

###### `taskDefinition`<sup>Required</sup> <a name="taskDefinition" id="@richicoder/cdk-ecs-s3volume.S3Volume.extend.parameter.taskDefinition"></a>

- *Type:* aws-cdk-lib.aws_ecs.TaskDefinition

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3Volume.fromAsset">fromAsset</a></code> | *No description.* |
| <code><a href="#@richicoder/cdk-ecs-s3volume.S3Volume.fromBucket">fromBucket</a></code> | *No description.* |

---

##### `fromAsset` <a name="fromAsset" id="@richicoder/cdk-ecs-s3volume.S3Volume.fromAsset"></a>

```typescript
import { S3Volume } from '@richicoder/cdk-ecs-s3volume'

S3Volume.fromAsset(path: string, containerPath: string, options?: S3VolumeAssetProps)
```

###### `path`<sup>Required</sup> <a name="path" id="@richicoder/cdk-ecs-s3volume.S3Volume.fromAsset.parameter.path"></a>

- *Type:* string

---

###### `containerPath`<sup>Required</sup> <a name="containerPath" id="@richicoder/cdk-ecs-s3volume.S3Volume.fromAsset.parameter.containerPath"></a>

- *Type:* string

---

###### `options`<sup>Optional</sup> <a name="options" id="@richicoder/cdk-ecs-s3volume.S3Volume.fromAsset.parameter.options"></a>

- *Type:* <a href="#@richicoder/cdk-ecs-s3volume.S3VolumeAssetProps">S3VolumeAssetProps</a>

---

##### `fromBucket` <a name="fromBucket" id="@richicoder/cdk-ecs-s3volume.S3Volume.fromBucket"></a>

```typescript
import { S3Volume } from '@richicoder/cdk-ecs-s3volume'

S3Volume.fromBucket(targetBucket: IBucket, options?: S3VolumeProps)
```

###### `targetBucket`<sup>Required</sup> <a name="targetBucket" id="@richicoder/cdk-ecs-s3volume.S3Volume.fromBucket.parameter.targetBucket"></a>

- *Type:* aws-cdk-lib.aws_s3.IBucket

---

###### `options`<sup>Optional</sup> <a name="options" id="@richicoder/cdk-ecs-s3volume.S3Volume.fromBucket.parameter.options"></a>

- *Type:* <a href="#@richicoder/cdk-ecs-s3volume.S3VolumeProps">S3VolumeProps</a>

---




