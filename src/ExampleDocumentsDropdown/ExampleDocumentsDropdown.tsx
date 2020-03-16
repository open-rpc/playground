import * as React from "react";
import { Menu, MenuItem, Tooltip, Button, Grid, Typography } from "@material-ui/core";
import DropdownIcon from "@material-ui/icons/ArrowDropDown";

export interface IExample {
  name: "string";
  url: "string";
}

interface IProps {
  onChange?: (example: IExample) => any;
  examples?: IExample[];
}

const ExampleDocumentsDropdown: React.FC<IProps> = ({ examples, onChange }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (example: IExample) => {
    setAnchorEl(null);
    if (onChange) {
      onChange(example);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!examples) {
    return null;
  }

  return (
    <>
      <Tooltip title={"Example OpenRPC Documents"}>
        <Button
          onClick={handleClick}
          variant="outlined"
          endIcon={<DropdownIcon />}
          style={{ height: "38px", fontSize: "11px", marginLeft: "10px" }}
        >examples</Button>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div style={{ maxWidth: "525px" }}>
          {examples.map((example: any) => (
            <MenuItem onClick={(event) => handleMenuItemClick(example)}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">{example.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" style={{ fontSize: "9px" }}>{example.url}</Typography>
                </Grid>
              </Grid>
            </MenuItem>
          ))}
        </div>

      </Menu>
    </>
  );
};

export default ExampleDocumentsDropdown;
