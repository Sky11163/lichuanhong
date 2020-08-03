import React from 'react';
import { storiesOf } from '@storybook/react';
import Menu from './menu';
import SubMenu from './subMenu'
import MenuItem from './menuItem'

const defaultMenu = () => (
    <Menu
        defaultIndex="0"
        mode="horizontal"
        defaultOpenSubMenus={[]}
        onSelect={function noRefCheck(){}}
    >
        <MenuItem> cool link 1 </MenuItem>
        <MenuItem> cool link 2 </MenuItem>
        <MenuItem disabled>
            disabled
        </MenuItem>
        <SubMenu title="下拉选项">
            <MenuItem>
                下拉选项一
            </MenuItem>
            <MenuItem>
                下拉选项二
            </MenuItem>
        </SubMenu>
    </Menu>
)

const menuWithVertical = () => (
    <Menu
        defaultIndex="0"
        mode="vertical"
        defaultOpenSubMenus={[]}
        onSelect={function noRefCheck(){}}
    >
        <MenuItem> cool link 1 </MenuItem>
        <MenuItem> cool link 2 </MenuItem>
        <MenuItem disabled>
            disabled
        </MenuItem>
        <SubMenu title="下拉选项">
            <MenuItem>
                下拉选项一
            </MenuItem>
            <MenuItem>
                下拉选项二
            </MenuItem>
        </SubMenu>
    </Menu>
)

const menuWithVerticalOpened = () => (
    <Menu
        defaultIndex="0"
        mode="vertical"
        defaultOpenSubMenus={['3']}
        onSelect={function noRefCheck(){}}
    >
        <MenuItem> cool link 1 </MenuItem>
        <MenuItem> cool link 2 </MenuItem>
        <MenuItem disabled>
            disabled
        </MenuItem>
        <SubMenu title="下拉选项">
            <MenuItem>
                下拉选项一
            </MenuItem>
            <MenuItem>
                下拉选项二
            </MenuItem>
        </SubMenu>
    </Menu>
)

storiesOf('Menu Component', module)
    .add('Menu', defaultMenu)
    .add('纵向的 Menu', menuWithVertical)
    .add('默认展开的纵向 Menu', menuWithVerticalOpened)