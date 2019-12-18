import React from "react";
import {
  InputBase,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import { IUISchema } from "../UISchema";

const styles = (theme: Theme) => ({
  title: {
    marginLeft: theme.spacing(2),
  },
  appBar: {
  },
});

interface IProps extends WithStyles<typeof styles> {
  uiSchema?: IUISchema;
  searchBarUrl: string | undefined;
  onChangeUrl?: any;
  onDarkModeChange?: any;
  onSplitViewChange?: any;
}

const SearchBar: React.FC<IProps> = (props) => {
  const { uiSchema, searchBarUrl, onChangeUrl } = props;
  const handleChange = (event: any) => {
    onChangeUrl(event.target.value);
  };
  return (
    <InputBase value={searchBarUrl} placeholder={uiSchema && uiSchema.appBar["ui:inputPlaceholder"]} style={{ width: "100%" }}  onChange={handleChange}/>
  );
};

export default withStyles(styles)(SearchBar);
