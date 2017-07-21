import * as Remark from 'remark';
import * as fs from 'mz/fs';
import * as visit from 'unist-util-visit';
import * as prettier from 'prettier';
import * as matter from 'gray-matter';

import { IProgramOptions } from './interfaces/program-opts';

const supported = ['javascript', 'typescript'];

const prettifyCode = ({
  remark,
  options
}) => {
  return nodes => {
    return (nodes as [string, any][]).reduce((filtered, [file, data]) => {
      let touched = false;
      visit(data.content, 'code', node => {
        const lang = (node.lang || '').split('{').shift();
        if (supported.includes(lang)) {
          touched = true;
          node.value = prettier.format(node.value, options);
        }
      });

      if (touched) {
        data.content = remark.stringify(data.content);
        filtered.push([file, data]);
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
        .then(content => {
          const data = matter(content);
          data.content = remark.parse(data.content);
          return [file, data];
        });
    })
  ).then(prettifyCode({
    remark,
    options
  }));

  if (!programOptions.dry) {
    await Promise.all(
      markdownFiles.map(([file, data]) => {
        return fs.writeFile(file, data.stringify());
      })
    );
  }

  return markdownFiles
    .map(([file, data]) => [file, data.stringify()])
}
