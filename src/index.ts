import * as fs from 'fs-extra';
import * as visit from 'unist-util-visit';

import { IProgramOptions } from './interfaces/program-opts';
import { prettifyCode } from './prettify-code';
import { remark } from './remark';

export const prettierMarkdownAST = options => {
  return nodes => {
    return (nodes as [string, string, any][]).map(([file, content, ast]) => {
      let updated = false;
      visit(ast, 'code', node => {
        const lang = (node.lang || '').split('{').shift().trim();
        const prettified = prettifyCode(node.value, lang, options).trim();
        if (prettified !== node.value) {
          updated = true;
          content = content.split(node.value).join(prettified);
        }
      });

      return [file, content, updated];
    }, []);
  };
};

export async function prettierMarkdown(
  files,
  options,
  programOptions: IProgramOptions = {}
) {
  const markdownFiles = await Promise.all(
    files.map(file => {
      return fs
        .readFile(file, 'utf8')
        .then(content => [file, content, remark.parse(content)]);
    })
  ).then(prettierMarkdownAST(options));

  if (!programOptions.dry) {
    await Promise.all(
      markdownFiles.map(([file, content]) => {
        return fs.writeFile(file, content, 'utf8');
      })
    );
  }

  return markdownFiles;
}

export function prettierMarkdownString(
  md,
  options?
) {
  const prettified = [].concat(md)
    .map(content => [content, remark.parse(content)])
    .map(([content, ast]) => {
      return prettierMarkdownAST(options)([['', content, ast]])
        .map(([, updatedContent]) => updatedContent);
    })
    .map(content => content.pop());
  
  if (md instanceof Array) {
    return prettified;
  }

  return prettified.pop();
}
