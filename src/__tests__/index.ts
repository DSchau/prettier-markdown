import * as path from 'path';
import * as fs from 'fs-extra';

import { prettierMarkdown, prettierMarkdownString } from '../';

const getFiles = files => {
  return [].concat(files).map(file => path.resolve(file));
};

const format = async files => {
  return await prettierMarkdown(
    getFiles(files),
    {},
    { dry: true }
  );
};

const confirmSnapshot = async files => {
  const prettified = await format(files);

  prettified.forEach(([file, content]) => {
    expect(content).toMatchSnapshot();
  });
};

test('it makes a simple JavaScript snippet prettier', async () => {
  await confirmSnapshot('__fixtures__/javascript.md');
});

test('it prettifies each instance (even the same content)', async () => {
  await confirmSnapshot('__fixtures__/javascript-multiple-same.md');
});

test('it makes multiple JavaScript snippets prettier', async () => {
  await confirmSnapshot('__fixtures__/javascript-multiple.md');
});

test('it can handle front matter', async () => {
  await confirmSnapshot('__fixtures__/front-matter.md');
});

test('it makes a simple JSX snippet prettier', async () => {
  await confirmSnapshot('__fixtures__/react.md');
});

test('it makes a simple TypeScript snippet prettier', async () => {
  await confirmSnapshot('__fixtures__/typescript.md');
});

test('it can handle line highlighting', async () => {
  await confirmSnapshot('__fixtures__/typescript-with-highlighting.md');
});

test('it leaves file as-is on additional run(s)', async () => {
  const file = await fs.readFile(path.resolve('__fixtures__/javascript.md'), 'utf8');

  const prettified = prettierMarkdownString(file);

  expect(prettierMarkdownString(prettified)).toEqual(prettified);
});

test('it leaves end of line characters as is', async () => {
  const file = await fs.readFile(path.resolve('__fixtures__/javascript-lines.md'), 'utf8');

  const prettified = prettierMarkdownString(file);

  expect(prettified.match(/\n/g).length).toBe(file.match(/\n/g).length);
});

[
  'JSON',
  'CSS',
  'SCSS',
  'LESS',
  'GraphQL'
]
  .forEach(lang => {
    test(`it makes ${lang} prettier`, async () => {
      await confirmSnapshot(`__fixtures__/${lang.toLowerCase()}.md`);
    });
  })

test('it handles a complex file', async () => {
  await confirmSnapshot('__fixtures__/kitchen-sink.md');
});

test('it handles a file with malformed syntax', async () => {
  expect(async () => await format('__fixtures__/file-with-errors.md')).not.toThrow();
});

