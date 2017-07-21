import * as path from 'path';

import { prettierMarkdown } from '../';

const getFiles = files => {
  return [].concat(files).map(file => path.resolve(file));
};

const confirmSnapshot = async files => {
  const prettierFiles = await prettierMarkdown(
    getFiles(files),
    {},
    { dry: true }
  );

  prettierFiles.forEach(([file, content]) => {
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
