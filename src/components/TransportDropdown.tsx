import React, { useState, ChangeEvent } from "react";
import { Button, Menu, MenuItem, Typography, Dialog, Container, Grid, InputBase } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import PlusIcon from "@material-ui/icons/Add";
import DropdownArrowIcon from "@material-ui/icons/ArrowDropDown";
import { ITransport } from "../hooks/useTransport";

interface IProps {
  transports: ITransport[];
  selectedTransport: ITransport;
  onChange: (changedTransport: ITransport) => void;
  onAddTransport: (addedTransport: ITransport) => void;
  style?: CSSProperties;
}

const TransportDropdown: React.FC<IProps> = ({ selectedTransport, transports, onChange, style, onAddTransport }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (transport: ITransport) => {
    setAnchorEl(null);
    // this forces language change for react + i18n react
    onChange(transport);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [selectedCustomTransport, setSelectedCustomTransport] = useState<ITransport | undefined>();
  const [customTransportName, setCustomTransportName] = useState<string | undefined>();
  const [customTransportUri, setCustomTransportUri] = useState<string | undefined>();

  const [dialogMenuAnchorEl, setDialogMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleDialogAnchorClose = () => {
    setDialogMenuAnchorEl(null);
  };
  const handleDialogCustomTransportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDialogMenuAnchorEl(event.currentTarget);
  };

  const handleCustomTransportDialogMenuItemClick = (transport: ITransport) => {
    setDialogMenuAnchorEl(null);
    setSelectedCustomTransport(transport);
  };

  const handleSubmitCustomTransport = () => {
    setDialogMenuAnchorEl(null);
    if (selectedCustomTransport && customTransportName && customTransportUri) {
      const t: ITransport = {
        type: "plugin",
        transport: selectedCustomTransport,
        name: customTransportName,
        uri: customTransportUri,
      };
      onAddTransport(t);
      setDialogOpen(false);
    }
  };
  return (
    <div style={style}>
      <Dialog onClose={() => setDialogOpen(false)} aria-labelledby="simple-dialog-title" open={dialogOpen}>
        <Container maxWidth="sm">
          <Grid
            container
            justify="space-between"
            alignItems="center"
            style={{ padding: "30px", paddingTop: "10px", paddingBottom: "10px", marginTop: "10px" }}>
            <Typography variant="h6">Custom Transport Plugin</Typography>
            <Typography variant="caption" gutterBottom>
              Transport plugins are created by implementing the "connect",
              "sendData", and "close" methods over JSON-RPC.
             </Typography>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <InputBase placeholder="Plugin Name"
                  onChange={
                    (event: ChangeEvent<HTMLInputElement>) => {
                      setCustomTransportName(event.target.value);
                    }
                  }
                  style={{
                    display: "block",
                    background: "rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                    padding: "0px 10px",
                    marginRight: "5px",
                  }}
                />
              </Grid>
              <Grid item>
                <InputBase placeholder="Plugin URI"
                  onChange={
                    (event: ChangeEvent<HTMLInputElement>) => {
                      setCustomTransportUri(event.target.value);
                    }
                  }
                  style={{
                    display: "block",
                    background: "rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                    padding: "0px 10px",
                    marginRight: "5px",
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={handleDialogCustomTransportClick}>
                  {selectedCustomTransport ? selectedCustomTransport.name : "Select A Transport"}
                </Button>
              </Grid>
            </Grid>
            <Menu
              id="transport-menu"
              anchorEl={dialogMenuAnchorEl}
              keepMounted
              open={Boolean(dialogMenuAnchorEl)}
              onClose={handleDialogAnchorClose}
            >
              {transports.filter((value) => value.type !== "plugin").map((transport, i) => (
                <MenuItem
                  onClick={() => handleCustomTransportDialogMenuItemClick(transport)}
                >{transport.name}</MenuItem>
              ))}
            </Menu>
            <Button
              style={{ marginTop: "10px", marginBottom: "10px" }}
              onClick={handleSubmitCustomTransport}
              disabled={!customTransportName || !customTransportUri || !selectedCustomTransport}
              variant="contained">
              Add Transport
            </Button>
          </Grid>
        </Container>
      </Dialog>
      <Button
        style={{
          marginRight: "10px",
          marginLeft: "5px",
        }}
        variant="outlined"
        onClick={handleClick} endIcon={<DropdownArrowIcon />}
      >{selectedTransport && selectedTransport.name}</Button>
      <Menu
        id="transport-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {transports.map((transport, i) => (
          <MenuItem onClick={() => handleMenuItemClick(transport)}>{transport.name}</MenuItem>
        ))}
        <MenuItem onClick={() => setDialogOpen(true)}>
          <PlusIcon style={{ marginRight: "5px" }} /><Typography variant="caption">Add Transport</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TransportDropdown;
