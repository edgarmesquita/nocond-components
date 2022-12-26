import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import MenuBar, { MenuBarProps } from './MenuBar';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';

import {
    Title,
    Subtitle,
    Description,
    Primary,
    ArgsTable,
    Stories,
    PRIMARY_STORY,
} from '@storybook/addon-docs/blocks';

export default {
    title: 'Structure/MenuBar',
    component: MenuBar,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle>Principal Menu of the Application</Subtitle>
                    <Description />
                    <Primary />
                    <ArgsTable story={PRIMARY_STORY} />
                    <Stories />
                </>
            ),
        },
    },
} as Meta;

const Template: Story<MenuBarProps> = (args) => <MenuBar {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Default',
    open: false,
    onDrawerOpen: () => { },
    rightItems: [
        { description: 'show 4 new mails', label: 'Messages', icon: <MailIcon />, badgeCount: 4 },
        { description: 'show 17 new notifications', label: 'Notifications', icon: <NotificationsIcon />, badgeCount: 17 },
        {
            description: 'account of current user', label: 'Profile', icon: <AccountCircle />, children: [
                { label: 'Profile' },
                { label: 'My Account' }
            ]
        }
    ]
};