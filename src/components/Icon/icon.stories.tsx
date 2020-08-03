import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon from './icon';
import Button from '../Button/button';

const defaultIcon = () => (
    <div>
        <Icon icon="check" size="3x" />
        <Icon icon="times" size="3x" />
        <Icon icon="anchor" size="3x" />
        <Button
            btnType="primary"
            disabled={false}
            size="lg"
        >
            <Icon icon="check" />
            check 
        </Button>
    </div>
)

const iconWithTheme = () => (
    <div>
        <Icon icon="check" theme="success" size="3x" />
        <Icon icon="times" theme="danger" size="3x" />
        <Icon icon="anchor" theme="primary" size="3x" />
        <Icon icon="exclamation-circle" theme="warning" size="3x" />
    </div>
)

const iconWithMoreAction = () => (
    <div>
        <Icon icon="spinner" theme="success" size="3x" pulse />
        <Icon icon="spinner" theme="danger" size="3x" spin />
    </div>
)


storiesOf('Icon Component', module)
    .add('Icon', defaultIcon)
    .add('不同主题的 Icon', iconWithTheme)
    .add('更多行为的 Icon', iconWithMoreAction)
