# node-mirai

Package for [m1r.ai](https://up.m1r.ai)

## Installation

```bash
pnpm add node-mirai
```

## Example

```typescript
import { upload } from 'node-mirai'

const { url } = await upload(
  './path/to/file.png', 
  { 
    headers: { 
      Random: 'test-image', 
      CustomHeader: 'test' 
    } 
  }
)

console.log(url)
```

## Config

### upload

#### file

Accept type `File` `Blob` `string`, can be stream of file or path to the file

#### options

Optional, mostly alias from node `fetch()` options with additional upload options
