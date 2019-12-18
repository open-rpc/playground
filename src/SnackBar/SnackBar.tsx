import {
  Snackbar,
  SnackbarContent,
  WithStyles,
  withStyles,
  Theme,
} from "@material-ui/core";
import React, { Component } from "react";
import classNames from "classnames";
import { IUISchema } from "../UISchema";
import {isEmpty} from "lodash";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
  debug: InfoIcon,
};

const styleSnackBar = (theme: Theme) => ({
  title: {
    marginLeft: theme.spacing(2),
  },
  close: {
    padding: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(2),
  },
});

const styleSnackBarContent = (theme: Theme) => ({
  success: {
    color: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    color: theme.palette.primary.dark,
  },
  debug: {
    color: theme.palette.secondary.dark,
  },
  warning: {
    color: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(2),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  close: {
    padding: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(2),
  },

});

export enum NotificationType {
  error = "error",
  warn = "warning",
  info = "info",
  success= "success",
  debug = "debug",
}

interface IProps extends WithStyles<typeof styleSnackBar> {
  uiSchema?: IUISchema;
  notification: ISnackBarNotification;
  close: any;
}

interface ISnackBarContentProps extends WithStyles<typeof styleSnackBarContent> {
 uiSchema?: IUISchema;
 onClose: any;
 variant: NotificationType;
 className: string;
 message: JSX.Element;
}

export interface ISnackBarNotification {
  type: NotificationType;
  message: string;
}

class SnackBarCntWrapper extends React.Component<ISnackBarContentProps> {
  public render() {
    const { classes, className, message, onClose, variant, ...other } = this.props;
    const Icon = variantIcon[variant];
    return (
      <SnackbarContent
        className={classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
  }
}
const SnackBarContentWrapper = withStyles(styleSnackBarContent)(SnackBarCntWrapper);

class SnackBarWrapper extends Component<IProps> {

  public render() {
    const { classes, notification, close } = this.props;
    if (isEmpty(notification)) { return null; }
    return (
      <Snackbar
      open
      autoHideDuration={10000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}>
      <SnackBarContentWrapper
      onClose={close}
      variant={notification.type}
      message={<span>{notification.message}</span>}
      className={classes.margin}
      />
      </Snackbar>
    );
  }
}
export const SnackBar = withStyles(styleSnackBar)(SnackBarWrapper);
