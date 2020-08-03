import React, { FC, useState, useRef, ChangeEvent } from 'react';
import axios from 'axios';

import UploadList from './uploadList';
import Dragger from './dragger';

export type UploaderFileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface UploaderFile {
    uid: string;
    size: number;
    name: string;
    status?: UploaderFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}

export interface UploaderProps {
    /** 必选参数 上传的地址 */
    action: string; // 接口
    /** 上传的文件列表 */
    defaultFileList?: UploaderFile[];
    /** 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 */
    beforeUploader?: (file: File) => boolean | Promise<File>;
    /** 文件上传时的钩子 */
    onProgress?: (percentage: number, file: UploaderFile) => void;
    /** 文件上传成功时的钩子 */
    onSuccess?: (data: any, file: UploaderFile) => void;
    /** 文件上传失败时的钩子 */
    onError?: (err: any, file: UploaderFile) => void;
    /** 文件状态改变时的钩子，上传成功或者失败时都会被调用 */
    onChange?: (file: UploaderFile) => void;
    /** 文件列表移除文件时的钩子  */
    onRemove?: (file: UploaderFile) => void;
    /** 设置上传的请求头部 */
    header?: {[key: string]: any};
    /** 上传的文件字段名 */
    name?: string;
    /** 上传时附带的额外参数 */
    data?: {[key: string]: any};
    /** 支持发送 cookie 凭证信息 */
    withCredentials?: boolean;
    /** 可选参数, 接受上传的文件类型  */
    accept?: string;
    /** 是否支持多选文件 */
    multiple?: boolean;
    /** 是否支持拖拽上传 */
    drag?: boolean;
} 

/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 * 
 * ~~~js
 * import { Upload } from 'lichuanhong'
 * ~~~
 */

export const  Uploader: FC<UploaderProps> = (props) => {
    const {
        action,
        defaultFileList,
        beforeUploader,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        header,
        name,
        data,
        withCredentials,
        accept,
        multiple,
        children,
        drag
    } = props;

    const fileInput  = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<UploaderFile[]>(defaultFileList || []);
    const updateFileList = (updateFile: UploaderFile, updateObj: Partial<UploaderFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if(file.uid === updateFile.uid) {
                    return { ...file, ...updateObj };
                } else {
                    return file;
                }
            })
        })
    }

    const handleClick = () => {
        if(fileInput.current) {
            fileInput.current.click();
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(!files) {
            return;
        }
        uploaderFiles(files);
        if(fileInput.current) {
            fileInput.current.value = '';
        }
    }

    const handleRemove = (file: UploaderFile) => {
        setFileList(prevList => {
            return prevList.filter(item => item.uid !== file.uid);
        })
        if(onRemove) {
            onRemove(file);
        }
    }

    const uploaderFiles = (files: FileList) => {
        let postFiles = Array.from(files);
        postFiles.forEach(file => {
            if(!beforeUploader) {
                post(file);
            } else {
                const result = beforeUploader(file);
                if(result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile);
                    })
                } else if(result !== false) {
                    post(file);
                }
            }
        })
    }

    const post = (file: File) => {
        let _file: UploaderFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            raw: file,
            percent: 0,
        }
        
        setFileList(prevList => {
            return [_file, ...prevList];
        })
        const formData = new FormData();
        formData.append(name || 'file', file);
        if(data) {
            Object.keys(data).map(key => {
                formData.append(key, data[key]);
            })
        }
        axios.post(action, formData, {
            headers: {
                ...header,
                'Content-Type': 'multipart/form-data', // O552kCSEGQzskr6BQmkU1co6Ztra8lAt
            },
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if(percentage < 100) {
                    updateFileList(_file, {percent: percentage, status: 'uploading'});
                    if(onProgress) {
                        onProgress(percentage, _file); 
                    }
                }
            }
        }).then(res => {
            updateFileList(_file, {status: 'success', response: res.data});
            _file.status = 'success';
            _file.response = res.data;
            if(onSuccess) {
                onSuccess(res.data, _file)
            }
            if(onChange) {
                onChange(_file);
            }
        }).catch(err => {
            updateFileList(_file, {status: 'error', error: err});
            _file.status = 'error';
            _file.response = err.data;
            if(onError) {
                onError(err, _file)
            }
            if(onChange) {
                onChange(_file);
            }
        })
    }

    return (
        <div className="uploader-component">
            <div 
                className="upload-input"
                style={{display: 'inline-block'}}
                onClick={handleClick}
            >
                { drag ? 
                    <Dragger onFile={uploaderFiles}>
                        {children}
                    </Dragger> : 
                    children 
                }
                <input
                    type="file"
                    className="file-input"
                    style={{display: "none"}}
                    ref={fileInput}
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                />
            </div>
            
            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    )
}

Uploader.defaultProps = {
    name: 'file'
}

export default Uploader;
