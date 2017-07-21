import * as prettier from 'prettier';

/*
 * https://github.com/rposborne/prettier-markdown-codeblocks/blob/6e04228a4d6b476b0349861b706c36cbd02555b3/lib/prettier-markdown-codeblocks.js#L118-L147
 */
export const prettifyCode = (code, language, options = {}) => {
  if (!code.trim().length) {
    return code;
  }
  switch (language) {
    case 'javascript':
    case 'js':
      return prettier.format(code, options);
    case 'graphql':
      return prettier.format(code, {
        parser: 'graphql',
        ...options
      });
    case 'typescript':
    case 'ts':
      return prettier.format(code, {
        parser: 'typescript',
        ...options
      });
    case 'json':
      return prettier.format(code, {
        parser: 'json',
        ...options
      });
    case 'css':
    case 'scss':
    case 'less':
      return prettier.format(code, {
        parser: 'postcss',
        ...options
      });
    default:
      return code;
  }
};
