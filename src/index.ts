import * as Remark from 'remark';
import * as fs from 'mz/fs';
import * as visit from 'unist-util-visit';
import * as prettier from 'prettier';

import { IProgramOptions } from './interfaces/program-opts';

prettier.format(``);

export async function prettierMarkdown(
  files,
  prettierOptions = {},
  programOptions: IProgramOptions = {}
) {
  const remark = new Remark().data('settings', {
    commonmark: true,
    footnotes: true,
    pedantic: true
  });

  const supported = ['javascript', 'typescript'];

  const markdownFiles = await Promise.all(
    files.map(file => {
      return fs
        .readFile(file, 'utf8')
        .then(content => [file, remark.parse(content)]);
    })
  ).then(nodes => {
    return (nodes as [string, any][]).reduce((filtered, [file, ast]) => {
      let touched = false;
      visit(ast, 'code', node => {
        const lang = (node.lang || '').split('{').shift();
        if (supported.includes(lang)) {
          touched = true;
          node.value = prettier.format(node.value, prettierOptions);
        }
      });

      if (touched) {
        filtered.push([file, remark.stringify(ast)]);
      }

      return filtered;
    }, []);
  });

  if (!programOptions.dry) {
    await Promise.all(
      markdownFiles.map(([file, content]) => {
        return fs.writeFile(file, content);
      })
    );
  }

  return markdownFiles;
}
