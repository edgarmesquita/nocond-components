import React, { ReactNode } from "react";
import {
    withStyles,
    createStyles,
    Theme,
    WithStyles,
    StyleRules
} from "@material-ui/core/styles";

const styles: (theme: Theme) => StyleRules<string> = theme =>
    createStyles({
        root: {
            display: 'flex',
        }
    });

type AppLayoutProps = { children?: ReactNode } & WithStyles<typeof styles>;

const AppLayout = ({ classes, children }: AppLayoutProps) => {
    return (
        <div className={classes.root}>
            
        </div>
    );
}

export default withStyles(styles)(AppLayout);