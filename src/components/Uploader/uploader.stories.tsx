import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Uploader, { UploaderFile } from './uploader';
import Icon from '../Icon/icon';

// 创建默认上传文件列表
const defaultFileList: UploaderFile[] = [
    {uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 45},
    {uid: '124', size: 1234, name: 'xyz.md', status: 'success', percent: 100},
    {uid: '125', size: 1234, name: 'easy.md', status: 'error', percent: 0}
]

const checkFileSize = (file: File) => {
    const fileSize = Math.round(file.size / 1024);
    if(fileSize > 50) {
        alert("size should be smaller than 50KB");
        return false;
    } else {
        return true;
    }
}

const filePromise = (file: File) => {
    const newFile = new File([file], '测试2号', {type: file.type});
    return Promise.resolve(newFile);
}

const simpleUploader = () => {
    return (
        <Uploader 
            // action="https://jsonplaceholder.typicode.com/posts/"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            // beforeUploader={filePromise}
            onChange={action('changed')}
            // defaultFileList={defaultFileList}
            onRemove={action('removed')}
            data={{key: 'value'}}
            name="fileName"
            accept=".jpg"
            multiple
            drag
        >
            <Icon icon="upload" size="5x" theme="secondary" />
        </Uploader>
    )
}

storiesOf('Uploader Component', module)
    .add('Uploader', simpleUploader)

