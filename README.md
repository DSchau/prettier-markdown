# prettier-markdown

[![Build Status](https://travis-ci.org/DSchau/prettier-markdown.svg?branch=master)](https://travis-ci.org/DSchau/prettier-markdown)

A simple utility and CLI to run [prettier][prettier] on code blocks within Markdown, leaving any non-code blocks untouched.

Currently works on the following languages (basically everything prettier supports!):

- JavaScript
- TypeScript
- JSON
- CSS
- SASS
- LESS
- GraphQL

## Install

```bash
yarn global add @dschau/prettier-markdown
```

## Example

For instance, given the following markdown snippet

<pre lang="markdown">
Look at this (bad) code block

```javascript
import React from "react";

export default function List( {
  items,
className  = '',
    children
} ) {
  return (
  &lt;ul className={className}&gt;
    {
      items
    .map(item =&gt; {
      return (
      &lt;li key={item.id}&gt;{item.content}&lt;/li&gt;
      )
    })
    }
&lt;/ul&gt;
);
}
```
</pre>

this utility will parse the code blocks, and apply prettier on the content!

<pre lang="markdown">
Look at this (good) code block

```javascript
import React from "react";

export default function List({ items, className = "", children }) {
  return (
    &lt;ul className={className}&gt;
      {items.map(item =&gt; {
          return &lt;li key={item.id}&gt;{item.content}&lt;/li&gt;;
        })}
    &lt;/ul&gt;
  );
}
```
</pre>

## Usage

### CLI

Command line usage is simple. All options (besides `--dry`, which will not write files to disk) are passed directly through to prettier. 

```bash
prettier-markdown src/**/*.md README.md --single-quote --trailing-comma es5
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

### Advanced Functionality

#### Line highlights

Note that line highlights (e.g. like the below) are kept intact _and_ the block is still prettified!

<pre lang="markdown">
```javascript {1-2}
const a =   'b';
const b =   'c';

  alert('hello world');
```
</pre>

#### Frontmatter

Frontmatter, i.e. in a [Gastby][gatsby] blog post, is preserved as authored.

<pre lang="markdown">
---
title: Hello World
tags:
  - Some Tag
  - Another Tag
---

```javascript
// this will be prettified
var a =    'a';

```
</pre>

[prettier]: https://github.com/prettier/prettier
[gatsby]: https://gatsbyjs.org
