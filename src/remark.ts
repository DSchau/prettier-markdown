import * as Remark from 'remark';

export const remark = new Remark().data('settings', {
  commonmark: true,
  footnotes: true,
  pedantic: true
});
