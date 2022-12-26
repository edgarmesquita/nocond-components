import React, { MouseEvent, ReactNode } from "react";
import clsx from 'clsx';
import {
    withStyles,
    createStyles,
    Theme,
    WithStyles,
    StyleRules
} from "@material-ui/core/styles";
import { AppBar, Badge, IconButton, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

import defaultLogo from '../assets/images/logo-white.png';


const drawerWidth = 240;
const styles: (theme: Theme) => StyleRules<string> = theme =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        logo: {
            maxHeight: "40px",
            marginRight: "20px"
        },
        grow: {
            flexGrow: 1,
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    });

export interface IMenuBarItem {
    icon: React.ElementType;
    description?: string;
    label?: string;
    badgeCount: number;
    children?: IMenuBarItem[];
    onClick?: () => {}
}

export type MenuBarProps = {
    logo?: string;
    title: string,
    open: boolean,
    rightItems?: IMenuBarItem[],
    onDrawerOpen: (event: React.MouseEvent) => void,
    children?: ReactNode
} & WithStyles<typeof styles>;

const MenuBar = ({ classes, title, open, rightItems, onDrawerOpen, logo }: MenuBarProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleItemMenuOpen = (item: IMenuBarItem, index: number) => (event: React.MouseEvent<HTMLElement>) => {
        if (rightItems && rightItems[index].children)
            setAnchorEl(event.currentTarget);
        else if (item.onClick) item.onClick();
    };

    const renderItems = (items: IMenuBarItem[], mobile: boolean) => {
        return items.map((item, idx) => renderIcon(item, idx, items.length, mobile));
    }
    const renderIcon = (item: IMenuBarItem, idx: number, total: number, mobile: boolean) => {

        return <IconButton
            key={`${mobile ? 'mobile-' : ''}item${idx}`}
            edge={idx === total - 1 ? 'end' : undefined}
            aria-label={item.description}
            aria-controls={`item${idx}`}
            aria-haspopup={item.children ? "true" : undefined}
            onClick={mobile ? undefined : handleItemMenuOpen(item, idx)}
            color="inherit">
            <Badge badgeContent={item.badgeCount} color="secondary">
                {item.icon}
            </Badge>
        </IconButton>
    }
    return (
        <React.Fragment>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}>
                <Toolbar>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={onDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}>
                        <MenuIcon />
                    </IconButton>

                    <img src={logo || defaultLogo} alt="" className={classes.logo} />

                    <Typography variant="h6" noWrap>
                        {title}
                    </Typography>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {rightItems && renderItems(rightItems, false)}
                    </div>
                    {rightItems && (
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>

            {rightItems && rightItems.map((item, idx) => (
                item.children ? (
                    <Menu
                        key={`item${idx}`}
                        id={`item${idx}`}
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={isMenuOpen}
                        onClose={handleMenuClose}>
                        {item.children.map((child, i) => (
                            <MenuItem key={`child${i}`} onClick={handleMenuClose}>{child.label}</MenuItem>
                        ))}
                    </Menu>
                ) : ''
            ))}

            {rightItems && (
                <Menu
                    anchorEl={mobileMoreAnchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    id={mobileMenuId}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={isMobileMenuOpen}
                    onClose={handleMobileMenuClose}>
                    {rightItems.map((item, idx) => (
                        <MenuItem key={`mobile-item${idx}`} onClick={item.children ? handleProfileMenuOpen : undefined}>
                            {renderIcon(item, idx, rightItems.length, true)}
                            <p>{item.label}</p>
                        </MenuItem>
                    ))}
                </Menu>
            )}

        </React.Fragment>
    );
}

export default withStyles(styles)(MenuBar);