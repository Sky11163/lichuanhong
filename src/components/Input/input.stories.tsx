import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input  from './input';

const ControlledInput = () => {
    const [ value, setValue ] = useState();
    return <Input value={value} defaultValue={value} onChange={(e) => {setValue(e.target.value)}} />
}

const defaultInput = () => (
    <div>
        <Input
            placeholder="在这填入你想说的"
            onChange={action('change')}
        />
        {ControlledInput()}
    </div>
)

const disabledInput = () => (
    <Input
        disabled
        placeholder="disabled input"
    />
)

const inputWithIcon = () => (
    <Input
        icon="search"
        placeholder="input with icon"
    />
)

const inputWithSize = () => (
    <div>
        <Input
            size="lg"
            placeholder="input with large size"
        />
        <Input
            size="sm"
            placeholder="input with small size"
        />
    </div>
)

const inputWithFixed = () => (
    <div>
        <Input
            prepend="https://"
            // placeholder="prepand text"
            defaultValue="prepend text"
        />
        <Input
            append=".com"
            placeholder="append text"
        />
    </div>
)


storiesOf('Input Component', module)
    .add('Input', defaultInput)
    .add('被禁用的 Input', disabledInput)
    .add('带图标的 Input', inputWithIcon)
    .add('大小不同的 Input', inputWithSize)
    .add('带前后缀的 Input', inputWithFixed)