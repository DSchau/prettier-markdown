```javascript
const path = require('path');
const { prettierMarkdown } = require('@dschau/prettier-markdown');

prettierMarkdown(
  ['README.md', 'blog/posts/2017-01-01-hello-world/index.md'].map(file =>
    path.join(process.cwd(), file)
  )
).then(files => {
  // array of files that were written
});

```

```javascript{1-2}
const a =   'b';
 const b =   'c';

  alert('hello world');
```
