import * as Remark from 'remark';
import * as fs from 'mz/fs';
import * as visit from 'unist-util-visit';
import * as prettier from 'prettier';

import { IProgramOptions } from './interfaces/program-opts';

const supported = ['javascript', 'typescript'];

const prettifyCode = ({
  remark,
  options
}) => {
  return nodes => {
    return (nodes as [string, string, any][]).reduce((filtered, [file, content, ast]) => {
      let updated = false;
      visit(ast, 'code', node => {
        const lang = (node.lang || '').split('{').shift();
        if (supported.includes(lang)) {
          updated = true;
          content = content.split(node.value).join(prettier.format(node.value, options));
        }
      });

      if (updated) {
        filtered.push([file, content]);
      }

      return filtered;
    }, []);
  };
};

export async function prettierMarkdown(
  files,
  options = {},
  programOptions: IProgramOptions = {}
) {
  const remark = new Remark().data('settings', {
    commonmark: true,
    footnotes: true,
    pedantic: true
  });

  const markdownFiles = await Promise.all(
    files.map(file => {
      return fs
        .readFile(file, 'utf8')
        .then(content => [file, content, remark.parse(content)]);
    })
  ).then(prettifyCode({
    remark,
    options
  }));

  if (!programOptions.dry) {
    await Promise.all(
      markdownFiles.map(([file, content]) => fs.writeFile(content))
    );
  }

  return markdownFiles
    .map(([file, content]) => [file, content])
}
