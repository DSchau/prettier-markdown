import * as Remark from 'remark';
import * as fs from 'fs-extra';
import * as visit from 'unist-util-visit';

import { IProgramOptions } from './interfaces/program-opts';
import { prettifyCode } from './prettify-code';

const prettifyNodes = ({
  remark,
  options
}) => {
  return nodes => {
    return (nodes as [string, string, any][]).reduce((filtered, [file, content, ast]) => {
      let updated = false;
      visit(ast, 'code', node => {
        const lang = (node.lang || '').split('{').shift().trim();
        const prettified = prettifyCode(node.value, lang, options);
        if (prettified !== node.value) {
          updated = true;
          content = content.split(node.value).join(prettified);
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
  options,
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
  ).then(prettifyNodes({
    remark,
    options
  }));

  if (!programOptions.dry) {
    await Promise.all(
      markdownFiles.map(([file, content]) => {
        return fs.writeFile(file, content, 'utf8');
      })
    );
  }

  return markdownFiles;
}
