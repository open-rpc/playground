const MonacoEditorMock = {
  Uri: {
    parse(f) {
      return f;
    }
  },
  create() {
    return this;
  },
  dispose() {},
  getModelMarkers() {
    return []
  }
};

export default MonacoEditorMock;