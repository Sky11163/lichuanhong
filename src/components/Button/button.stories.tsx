import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './button';


const defaultButton = () => (
    <Button onClick={action('click')}> Default Button </Button>
)

const buttonWithSize = () => (
    <div>
        <Button size="lg" onClick={action('click')}> large button </Button>
        <Button size="sm" onClick={action('click')}> small button </Button>
    </div>
)

const buttonWithType = () => (
    <div >
        <Button btnType="primary" onClick={action('click')}> primary button </Button>
        <Button btnType="danger" onClick={action('click')}> danger button </Button>
        <Button btnType="link" href="https://www.baidu.com" onClick={action('click')}> link button </Button>
    </div >
)


storiesOf('Button Component', module)
    .add('Button', defaultButton)
    .add('不同尺寸的 Button', buttonWithSize)
    .add('不同类型的 Button', buttonWithType)