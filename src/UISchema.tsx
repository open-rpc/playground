export interface IUISchema {
  appBar: {
    ["ui:title"]: string,
    ["ui:logoUrl"]: string,
    ["ui:input"]: boolean,
    ["ui:inputPlaceholder"]: string,
    ["ui:splitView"]: boolean,
    ["ui:darkMode"]: boolean,
    ["ui:examplesDropdown"]: boolean,
  };
  methods: {
    ["ui:defaultExpanded"]: boolean,
    ["ui:methodPlugins"]: boolean,
  };
  params: {
    ["ui:defaultExpanded"]: boolean,
  };
}

export const mergeUISchema = (a: IUISchema, b: IUISchema) => {
  if (a && b) {
    return {
      appBar: {
        ...a.appBar,
        ...b.appBar || {},
      },
      methods: {
        ...a.methods,
        ...b.methods || {},
      },
      params: {
        ...a.params,
        ...b.params || {},
      },
    };
  } else {
    return a || b;
  }
};
