class Selection {
  //
};

const monaco = {
  Uri: {
    parse(f) {
      return f;
    }
  },
  get editor() {
    return this;
  },
  languages: {
    json: {
      jsonDefaults: {
        setDiagnosticsOptions() {
        }
      }
    }
  },
  setSelection() {

  },
  focus() {

  },
  Selection,
  onDidChangeModelContent() {

  },
  setModel() {

  },
  createModel() {
    return {
      updateOptions() {

      }
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

module.exports = monaco;
