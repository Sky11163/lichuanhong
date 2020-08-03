import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    className?: string;
    /** 设置Button的禁用 */
    disabled?: boolean;
    /** 设置Button的尺寸 */
    size?: ButtonSize;
    /** 设置Button的类型 */
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonPorps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonPorps>;
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 * ~~~js
 * import { Button } from 'lichuanhong'
 * ~~~
 */
export declare const Button: FC<ButtonProps>;
export default Button;
