import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import {
    Title,
    Subtitle,
    Description,
    Primary,
    ArgsTable,
    Stories,
    PRIMARY_STORY,
} from '@storybook/addon-docs/blocks';
import MenuDrawer, { MenuDrawerProps } from './MenuDrawer';

export default {
    title: 'Structure/MenuDrawer',
    component: MenuDrawer,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle>Principal Drawer Menu of the Application</Subtitle>
                    <Description />
                    <Primary />
                    <ArgsTable story={PRIMARY_STORY} />
                    <Stories />
                </>
            ),
        },
    },
} as Meta;

const Template: Story<MenuDrawerProps> = (args) => <MenuDrawer {...args} />;

export const Default = Template.bind({});
Default.args = {
    open: true,
    onDrawerOpen: () => { },
    onDrawerClose: () => { },
    items: [
        { title: "Portal", icon: "home" },
        { title: "Dashboard", icon: "dashboard" },
        { title: "Comunicados", icon: "chat" },
        {
            title: "Documentos", icon: "description", children: [
                { title: "Editais" },
                { title: "Atas" }
            ]
        },
        { title: "Agendamentos", icon: "event" },
        { title: "Assembléias", icon: "local_library" },
        { title: "Configurações", icon: "settings" }
    ]
};