export interface IUISchema {
  appBar: {
    ["ui:title"]: string,
    ["ui:logoUrl"]: string,
    ["ui:input"]: boolean,
    ["ui:inputPlaceholder"]: string,
    ["ui:splitView"]: boolean,
    ["ui:darkMode"]: boolean,
  };
  methods: {
    ["ui:defaultExpanded"]: boolean,
  };
  params: {
    ["ui:defaultExpanded"]: boolean,
  };
}
