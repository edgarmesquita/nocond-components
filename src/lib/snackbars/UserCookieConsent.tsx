import React from "react";
import {
    withStyles,
    createStyles,
    Theme,
    WithStyles,
    StyleRules
} from "@material-ui/core/styles";
import CookieConsent from "react-cookie-consent";
import clsx from 'clsx';
import { SnackbarContent } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles: (theme: Theme) => StyleRules<string> = theme =>
    createStyles({
        cookieConsent: {
            position: 'fixed',
            left: '50%',
            right: 'auto',
            bottom: '5px !important',
            transform: 'translateX(-50%)',
            zIndex: 1301,
            flexWrap: 'nowrap'
        },
        cookieConsentButton: {
            marginLeft: "10px"
        },
        link:{
            color: theme.palette.primary.light
        }
    });

type UserCookieConsentProps = { 
    children?: JSX.Element | string 
} & WithStyles<typeof styles>;

const UserCookieConsent = ({ classes, children }: UserCookieConsentProps) => {
    return (
        <CookieConsent
            disableStyles={true}
            buttonText="Aceitar"
            location="bottom"
            buttonClasses={clsx(classes.cookieConsentButton, "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary")}
            containerClasses={clsx("MuiPaper-root MuiSnackbarContent-root MuiPaper-elevation6", classes.cookieConsent)}
            contentClasses="MuiSnackbarContent-message">
            {children ? children : <React.Fragment>
                Este site utiliza cookies, ao navegar concordas com a sua utilização.{" "}
                <Link to="/about-cookies" className={classes.link}>Saiba mais</Link>.
            </React.Fragment>}
            <SnackbarContent style={{display:'none'}} />
        </CookieConsent>
    );
}

export default withStyles(styles)(UserCookieConsent);