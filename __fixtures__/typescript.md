```typescript
import * as React from 'react'

const name: string = "Hello World  "    ;

interface  IProps  {
  name:    string;
}

export   default  function TypeScriptComponent({
  otherName: string = name
}) {
  return (
    <h1>{otherName}
    </h1>
  )
}
```
