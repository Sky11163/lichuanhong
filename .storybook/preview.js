import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import '../src/styles/index.scss';
// add-info table style not working for now, I don't know the reason, so we have to manaul import it
import "./fix_info_style.scss";

const wrapperStyle = {
    padding: "20px 40px",
    width: '500px'
}

const WrapperDecorator = (stroyFn) => (
    <div style={wrapperStyle}>
        <h3>组件演示</h3>
        {stroyFn()}
    </div>
)

addDecorator(WrapperDecorator);
addDecorator(withInfo);
addParameters({info: { inline: true, header: false}});


const loaderFn = () => {
    return [
        require('../src/welcome.stories.tsx'),
        require('../src/components/Button/button.stories.tsx'),
        // require('../src/components/Alert/alert.stories.tsx'),
        require('../src/components/Menu/menu.stories.tsx'),
        // require('../src/components/Tabs/tabs.stories.tsx'),
        require('../src/components/Icon/icon.stories.tsx'),
        require('../src/components/Input/input.stories.tsx'),
        require('../src/components/AutoComplete/autoComplete.stories.tsx'),
        // require('../src/components/Select/select.stories.tsx'),
        require('../src/components/Uploader/uploader.stories.tsx'),
    ]
}
// automatically import all files ending in *.stories.js
configure(loaderFn, module);

// configure(require.context('../src', true, /\.stories\.tsx$/), module);