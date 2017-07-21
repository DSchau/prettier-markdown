import * as path from 'path';

import { prettierMarkdown } from '../';

const getFiles = files => {
  return [].concat(files).map(file => path.resolve(file));
};

test('it makes a simple JavaScript snippet prettier', async () => {
  const prettierFiles = await prettierMarkdown(
    getFiles('__fixtures__/javascript.md'),
    {},
    { dry: true }
  );

  prettierFiles.forEach(([file, content]) => {
    expect(content).toMatchSnapshot();
  });
});

test('it makes multiple JavaScript snippets prettier', async () => {
  const prettierFiles = await prettierMarkdown(
    getFiles('__fixtures__/javascript-multiple.md'),
    {},
    { dry: true }
  );

  prettierFiles.forEach(([file, content]) => {
    expect(content).toMatchSnapshot();
  });
});

test('it can handle front matter', async () => {
  const prettierFiles = await prettierMarkdown(
    getFiles('__fixtures__/front-matter.md'),
    {},
    { dry: true }
  );

  prettierFiles.forEach(([file, content]) => {
    expect(content).toMatchSnapshot();
  });
});

test('it makes a simple JSX snippet prettier', async () => {
  const prettierFiles = await prettierMarkdown(
    getFiles('__fixtures__/react.md'),
    {},
    { dry: true }
  );

  prettierFiles.forEach(([file, content]) => {
    expect(content).toMatchSnapshot();
  });
});

test('it makes a simple TypeScript snippet prettier', async () => {
  const prettierFiles = await prettierMarkdown(
    getFiles('__fixtures__/typescript.md'),
    {},
    { dry: true }
  );

  prettierFiles.forEach(([file, content]) => {
    expect(content).toMatchSnapshot();
  });
});

test('it can handle line highlighting', async () => {
  const prettierFiles = await prettierMarkdown(
    getFiles('__fixtures__/typescript-with-highlighting.md'),
    {},
    { dry: true }
  );

  prettierFiles.forEach(([file, content]) => {
    expect(content).toMatchSnapshot();
  });
});

test('it handles a complex file', async () => {
  const prettierFiles = await prettierMarkdown(
    getFiles('__fixtures__/kitchen-sink.md'),
    {},
    { dry: true }
  );

  prettierFiles.forEach(([file, content]) => {
    expect(content).toMatchSnapshot();
  });
});
