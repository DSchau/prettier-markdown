#!/usr/bin/env node
import * as path from 'path';
import * as yargs from 'yargs';
import * as globby from 'globby';
import * as figures from 'figures';

import { prettierMarkdown } from './';

const { $0, _: files, dry, dryRun, ...opts } = yargs.argv;

const prettierOpts = Object.keys(opts)
  .reduce((camelCaseOpts, name) => {
    if (name.indexOf('-') === -1) {
      camelCaseOpts[name] = opts[name];
    }
    return camelCaseOpts;
  }, {});

prettierMarkdown(
  [].concat.apply(
    [],
    files.map(file => {
      const filePath = path.join(process.cwd(), file);
      if (file.indexOf('*') > -1) {
        return globby.sync(filePath);
      }
      return filePath;
    })
  ),
  prettierOpts,
  {
    dry: typeof dry === 'boolean' ? dry : dryRun
  }
)
  .then(mdFiles => {
    const len = mdFiles.length;
    if (len > 0) {
      console.log(`Prettified ${len} file${len === 1 ? '' : 's'}`.trim());
    }
    mdFiles.forEach(([file]) => {
      console.log(figures(`✔︎ Updated ${file}`));
    });
  })
  .catch(err => {
    console.warn(figures(`✖ ${err}`));
  });
