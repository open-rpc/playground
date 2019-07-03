class Selection {
  //
};

const monaco = {
  addAction() {

  },
  getModels() {
    return []
  },
  Uri: {
    parse(f) {
      return f;
    }
  },
  KeyCode: {},
  KeyMod: {
    chord() {

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
