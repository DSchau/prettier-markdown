jest.mock('../index', () => {
  return {
    _spy: jest.fn(),
    prettierMarkdown(...args) {
      this._spy(...args);
      return Promise.resolve([]);
    }
  }
});
import * as path from 'path';
import * as yargs from 'yargs'; // mocked
import * as globby from 'globby';

import { _spy, prettierMarkdown } from '../index';

const runCli = () => {
  require('../cli');
};

beforeEach(() => {
  (yargs as any).argv = {
    _: ['__fixtures__/*.md']
  };
});

afterEach(() => {
  _spy.mockClear();
  (yargs as any).reset();
});

const files = (globby as any).sync(path.resolve(`__fixtures__/*.md`));

test('it runs the CLI', () => {
  runCli();

  expect(_spy).toHaveBeenCalledWith(
    files,
    expect.any(Object),
    expect.any(Object)
  );
});
