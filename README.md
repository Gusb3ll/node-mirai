# node-mirai

Package for [m1r.ai](https://up.m1r.ai)

## Installation

```bash
pnpm add node-mirai
```

## Example

```typescript
import { upload, readFile } from 'node-mirai'

const file = readFile(
  './path/to/test.png', // './path/to/test.mp4'
)

const { url } = await upload(
  file, 
  { 
    headers: { Referrer: 'test-image', CustomHeader: 'test' } 
  }
)

console.log(url)
```

## Config

### upload

#### file

Accept type `File`, so you have to create a file object first

#### options

Optional, alias from node `fetch()` options

### readFile

#### path

equired, path to file
