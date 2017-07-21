export = {
  _argv: {
    $0: 'prettier-markdown',
    _: []
  },
  get argv() {
    return this._argv;
  },
  set argv(args) {
    this._argv = {
      ...this._argv,
      ...args
    };
  },
  reset() {
    this._argv = {
      $0: 'prettier-markdown',
      _: []
    };
  }
}
