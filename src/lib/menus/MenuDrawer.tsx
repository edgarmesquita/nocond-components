import React, { ReactNode } from "react";
import clsx from 'clsx';
import {
    withStyles,
    createStyles,
    Theme,
    WithStyles,
    StyleRules
} from "@material-ui/core/styles";
import { Collapse, Divider, Drawer, Icon, IconButton, List, ListItem, ListItemText, Tooltip, Typography, useTheme } from "@material-ui/core";

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const drawerWidth = 240;
const styles: (theme: Theme) => StyleRules<string> = theme =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',

        },
        drawerPaper: {
            backgroundColor: '#333',
            color: '#FFF'
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),

        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },

        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        listItemIcon: {
            color: '#FFF'
        },
        listItemIconRight: {
            minWidth: theme.spacing(1)
        },
        listItemDivider: {
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
        },
        sublist: {
            '& .MuiListItem-root.Mui-selected': {
                backgroundColor: theme.palette.primary.main
            }
        },
        nested: {
            paddingLeft: theme.spacing(9),
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
        },
        subitem: {
            fontSize: '.9rem'
        },
        buttonDrawer: {
            color: theme.palette.primary.contrastText
        }
    });

export interface IMenuDrawerItem {
    title: string;
    path?: string;
    icon?: string;
    open?: boolean;
    onClick?: () => void;
    children?: IMenuDrawerItem[];
}
export type MenuDrawerProps = {
    items: IMenuDrawerItem[],
    open: boolean,
    onDrawerClose: () => void,
    onDrawerOpen: () => void,
    children?: ReactNode
} & WithStyles<typeof styles>;


const MenuDrawer = ({ classes, open, items, onDrawerClose, onDrawerOpen, children }: MenuDrawerProps) => {
    const [menu, setMenu] = React.useState<IMenuDrawerItem[]>(items);
    const theme = useTheme();

    const handleOpenSubMenu = (index: number) => () => {
        let mn = [...menu];
        if (mn[index].children) {
            mn[index].open = open ? !mn[index].open : true;
            setMenu(mn);

            onDrawerOpen();
        }
        else {
            handleItemClick(mn[index])();
        }
    }

    const handleItemClick = (item: IMenuDrawerItem) => () => {
        if (item.onClick) item.onClick();
    }

    const MenuDrawerItem = (index: number, item: IMenuDrawerItem) => {
        return <ListItem button onClick={handleOpenSubMenu(index)}>
            <ListItemIcon className={classes.listItemIcon}>
                <Icon>{item.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={item.title} />
            {item.children && (
                <ListItemIcon className={clsx(classes.listItemIcon, classes.listItemIconRight)}>
                    {item.open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemIcon>
            )}
        </ListItem>
    }
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx(classes.drawerPaper, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}>
            <div className={classes.toolbar}>
                <IconButton onClick={onDrawerClose} className={classes.buttonDrawer}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider className={classes.listItemDivider} />
            {children}
            <List>
                {menu.map((item: IMenuDrawerItem, index: number) => (
                    <React.Fragment key={index}>
                        {open ? MenuDrawerItem(index, item) : (
                            <Tooltip title={item.title} placement="right">
                                {MenuDrawerItem(index, item)}
                            </Tooltip>
                        )}
                        {item.children && open && (
                            <React.Fragment>
                                <Collapse in={item.open} timeout="auto" unmountOnExit>
                                    {item.children.map((subitem: IMenuDrawerItem, subindex: number) => (
                                        <List component="div" disablePadding key={`${index}_${subindex}`} className={classes.sublist}>
                                            <ListItem button className={classes.nested} onClick={handleItemClick(subitem)} selected={subitem.open}>
                                                <ListItemText
                                                    primary={<Typography component="span" className={classes.subitem}>{subitem.title}</Typography>} />
                                            </ListItem>
                                        </List>
                                    ))}
                                </Collapse>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    );
}

export default withStyles(styles)(MenuDrawer);

