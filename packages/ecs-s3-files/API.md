# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="structs"></a>

### S3VolumeProps <a name="@richicoder/cdk-ecs-s3-files.S3VolumeProps" id="richicodercdkecss3filess3volumeprops"></a>

S3 Volume Properties.

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { S3VolumeProps } from '@richicoder/cdk-ecs-s3-files'

const s3VolumeProps: S3VolumeProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`bucket`](#richicodercdkecss3filess3volumepropspropertybucket)<span title="Required">*</span> | `string` | The bucket to sync to the volume. |
| [`containerPath`](#richicodercdkecss3filess3volumepropspropertycontainerpath) | `string` | Path to mount S3 volume. |
| [`dependentContainers`](#richicodercdkecss3filess3volumepropspropertydependentcontainers) | `string`[] | Container for which to mount volume. |
| [`extraOptions`](#richicodercdkecss3filess3volumepropspropertyextraoptions) | `string`[] | Extra options to add to s3 sync command. |
| [`volume`](#richicodercdkecss3filess3volumepropspropertyvolume) | `string` | Name of the volume to mount. |

---

##### `bucket`<sup>Required</sup> <a name="@richicoder/cdk-ecs-s3-files.S3VolumeProps.property.bucket" id="richicodercdkecss3filess3volumepropspropertybucket"></a>

```typescript
public readonly bucket: string;
```

- *Type:* `string`

The bucket to sync to the volume.

---

##### `containerPath`<sup>Optional</sup> <a name="@richicoder/cdk-ecs-s3-files.S3VolumeProps.property.containerPath" id="richicodercdkecss3filess3volumepropspropertycontainerpath"></a>

```typescript
public readonly containerPath: string;
```

- *Type:* `string`
- *Default:* /etc/s3/${props.bucket}/

Path to mount S3 volume.

---

##### `dependentContainers`<sup>Optional</sup> <a name="@richicoder/cdk-ecs-s3-files.S3VolumeProps.property.dependentContainers" id="richicodercdkecss3filess3volumepropspropertydependentcontainers"></a>

```typescript
public readonly dependentContainers: string[];
```

- *Type:* `string`[]
- *Default:* Default TaskDefinition container

Container for which to mount volume.

---

##### `extraOptions`<sup>Optional</sup> <a name="@richicoder/cdk-ecs-s3-files.S3VolumeProps.property.extraOptions" id="richicodercdkecss3filess3volumepropspropertyextraoptions"></a>

```typescript
public readonly extraOptions: string[];
```

- *Type:* `string`[]
- *Default:* Empty

Extra options to add to s3 sync command.

See <https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html> for full details.

---

##### `volume`<sup>Optional</sup> <a name="@richicoder/cdk-ecs-s3-files.S3VolumeProps.property.volume" id="richicodercdkecss3filess3volumepropspropertyvolume"></a>

```typescript
public readonly volume: string;
```

- *Type:* `string`
- *Default:* Unique id

Name of the volume to mount.

---

## Classes <a name="Classes" id="classes"></a>

### S3VolumeExtension <a name="@richicoder/cdk-ecs-s3-files.S3VolumeExtension" id="richicodercdkecss3filess3volumeextension"></a>

- *Implements:* [`aws-cdk-lib.aws_ecs.ITaskDefinitionExtension`](#aws-cdk-lib.aws_ecs.ITaskDefinitionExtension)

#### Initializers <a name="@richicoder/cdk-ecs-s3-files.S3VolumeExtension.Initializer" id="richicodercdkecss3filess3volumeextensioninitializer"></a>

```typescript
import { S3VolumeExtension } from '@richicoder/cdk-ecs-s3-files'

new S3VolumeExtension(props: S3VolumeProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`props`](#richicodercdkecss3filess3volumeextensionparameterprops)<span title="Required">*</span> | [`@richicoder/cdk-ecs-s3-files.S3VolumeProps`](#@richicoder/cdk-ecs-s3-files.S3VolumeProps) | *No description.* |

---

##### `props`<sup>Required</sup> <a name="@richicoder/cdk-ecs-s3-files.S3VolumeExtension.parameter.props" id="richicodercdkecss3filess3volumeextensionparameterprops"></a>

- *Type:* [`@richicoder/cdk-ecs-s3-files.S3VolumeProps`](#@richicoder/cdk-ecs-s3-files.S3VolumeProps)

---

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`extend`](#richicodercdkecss3filess3volumeextensionextend) | Apply the extension to the given TaskDefinition. |

---

##### `extend` <a name="@richicoder/cdk-ecs-s3-files.S3VolumeExtension.extend" id="richicodercdkecss3filess3volumeextensionextend"></a>

```typescript
public extend(taskDefinition: TaskDefinition)
```

###### `taskDefinition`<sup>Required</sup> <a name="@richicoder/cdk-ecs-s3-files.S3VolumeExtension.parameter.taskDefinition" id="richicodercdkecss3filess3volumeextensionparametertaskdefinition"></a>

- *Type:* [`aws-cdk-lib.aws_ecs.TaskDefinition`](#aws-cdk-lib.aws_ecs.TaskDefinition)

---





