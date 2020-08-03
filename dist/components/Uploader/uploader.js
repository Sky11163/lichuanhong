var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useState, useRef } from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import Dragger from './dragger';
/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'lichuanhong'
 * ~~~
 */
export var Uploader = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUploader = props.beforeUploader, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, header = props.header, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploaderFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    var uploaderFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUploader) {
                post(file);
            }
            else {
                var result = beforeUploader(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            raw: file,
            percent: 0,
        };
        setFileList(function (prevList) {
            return __spreadArrays([_file], prevList);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).map(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, header), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    if (onProgress) {
                        onProgress(percentage, _file);
                    }
                }
            }
        }).then(function (res) {
            updateFileList(_file, { status: 'success', response: res.data });
            _file.status = 'success';
            _file.response = res.data;
            if (onSuccess) {
                onSuccess(res.data, _file);
            }
            if (onChange) {
                onChange(_file);
            }
        }).catch(function (err) {
            updateFileList(_file, { status: 'error', error: err });
            _file.status = 'error';
            _file.response = err.data;
            if (onError) {
                onError(err, _file);
            }
            if (onChange) {
                onChange(_file);
            }
        });
    };
    return (React.createElement("div", { className: "uploader-component" },
        React.createElement("div", { className: "upload-input", style: { display: 'inline-block' }, onClick: handleClick },
            drag ?
                React.createElement(Dragger, { onFile: uploaderFiles }, children) :
                children,
            React.createElement("input", { type: "file", className: "file-input", style: { display: "none" }, ref: fileInput, onChange: handleFileChange, accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Uploader.defaultProps = {
    name: 'file'
};
export default Uploader;
