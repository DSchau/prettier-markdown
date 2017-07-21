# prettier-markdown

A simple utility and CLI to run [prettier][prettier] on code blocks within Markdown, leaving any non-code blocks untouched.

Currently works on _both_ TypeScript and JavaScript snippets

## Install

```bash
yarn global add @dschau/prettier-markdown
```

## Usage

### CLI

Command line usage is simple. All options (besides `--dry`, which will not write files to disk) are passed directly through to prettier. 

```bash
prettier-markdown --single-quote --trailing-comma es5 "docs/**/*.md" "other-docs/**/*.md" "README.md"
```

### Programatically

#### `prettierMarkdown(files, prettierOpts = {}, programOpts = {})`

Usage is fa
```javascript
const path = require('path');
const { prettierMarkdown } = require('@dschau/prettier-markdown');

prettierMarkdown([
  'README.md',
  'blog/posts/2017-01-01-hello-world/index.md'
].map(file => path.join(process.cwd(), file)));
  .then(files => {
    // array of files that were written
  });

```

Note that line highlights (e.g. like the below) are kept intact _and_ the block is still prettified!

```javascript{1-2}
const a =   'b';
 const b =   'c';

  alert('hello world');
```

[prettier]: https://github.com/prettier/prettier
