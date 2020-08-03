import { FC } from 'react';
import { UploaderFile } from "./uploader";
interface UploadListProps {
    fileList: UploaderFile[];
    onRemove: (file: UploaderFile) => void;
}
export declare const UploadList: FC<UploadListProps>;
export default UploadList;
