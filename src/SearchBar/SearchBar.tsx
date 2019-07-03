import React, { Component, ChangeEvent } from "react";
import Downshift from "downshift";
import {
  InputBase,
  Theme,
  WithStyles,
  withStyles,
  Paper,
  Menu,
  MenuItem,
  Card,
  CardHeader,
  Typography,
  CardContent,
  Grid,
} from "@material-ui/core";
import { IUISchema } from "../UISchema";
import suggestions from "../examplesList";

const styles = (theme: Theme) => ({
  title: {
    marginLeft: theme.spacing.unit,
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

function getSuggestion(query: string | null) {
  if (!query) {
    return suggestions;
  }
  return suggestions.filter((value) => {
    return value.name.includes(query) || value.url.includes(query);
  });
}

class SearchBar extends Component<IProps> {
  public render() {
    const { uiSchema, classes, onSplitViewChange, onDarkModeChange, searchBarUrl } = this.props;
    return (
      <Downshift initialInputValue={searchBarUrl} onInputValueChange={this.props.onChangeUrl} id="downshift">
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
          openMenu,
          clearSelection,
        }) => (
            <div>
              <InputBase
                {...getInputProps({
                  onChange: (e) => {
                    if (e.target.value === "") {
                      clearSelection();
                    }
                  },
                })}
                onFocus={(event: any) => openMenu()}
                placeholder={uiSchema && uiSchema.appBar["ui:inputPlaceholder"]}
                style={{ width: "100%" }}
              />
              <div {...getMenuProps()} style={{ position: "absolute", zIndex: 1 }}>
                {isOpen ? (
                  <Paper style={{ maxWidth: "640px" }}>
                    {getSuggestion(inputValue).map((suggestion: any, index: number) => {
                      const isSelected = highlightedIndex === index;
                      return (
                        <MenuItem
                          {...getItemProps({ item: suggestion.url })}
                          key={suggestion.url}
                          selected={isSelected}
                          component="div"
                          style={{
                            fontWeight: isSelected ? 500 : 400,
                          }}
                        >
                          <Grid container spacing={0}>
                            <Grid item xs={12}>
                              <Typography variant="subheading">{suggestion.name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="caption">{suggestion.url}</Typography>
                            </Grid>
                          </Grid>
                        </MenuItem>
                      );
                    })}
                  </Paper>
                ) : null}
              </div>
            </div>
          )}
      </Downshift>
    );
  }
}
export default withStyles(styles)(SearchBar);
