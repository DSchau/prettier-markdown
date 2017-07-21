# prettier-markdown

A simple utility and CLI to run [prettier][prettier] on code blocks within Markdown, leaving any non-code blocks untouched.

Currently works on _both_ TypeScript and JavaScript snippets

For instance, given the following markdown snippet

```markdown
Look at this (bad) code block

``````javascript
import React from "react";

export default function List( {
  items,
className  = '',
    children
} ) {
  return (
  <ul className={className}>
    {
      items
    .map(item => {
      return (
      <li key={item.id}>{item.content}</li>
      )
    })
    }
</ul>
);
}
``````
```

```markdown
Look at this (code) code block

``````javascript
import React from "react";

export default function List({ items, className = "", children }) {
  return (
    <ul className={className}>
      {items.map(item => {
          return <li key={item.id}>{item.content}</li>;
        })}
    </ul>
  );
}
``````
```

## Install

```bash
yarn global add @dschau/prettier-markdown
```

## Usage

### CLI

Command line usage is simple. All options (besides `--dry`, which will not write files to disk) are passed directly through to prettier. 

```bash
prettier-markdown "src/**/*.md" "README.md" --single-quote --trailing-comma es5
```

### Programatically

#### `prettierMarkdown(files, prettierOpts = {}, programOpts = {})`

Usage is fairly simple. An array of markdown files are passed, as well as any prettier options, and prettier is run on the specified files.

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

Note that line highlights (e.g. like the below) are kept intact _and_ the block is still prettified!

```markdown

``````javascript{1-2}
const a =   'b';
 const b =   'c';

  alert('hello world');
``````
```

[prettier]: https://github.com/prettier/prettier
