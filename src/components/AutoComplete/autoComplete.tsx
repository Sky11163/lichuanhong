import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';

interface DataSourceObject {
    value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>,
    onSelect?: (item: DataSourceType) => void,
    renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        ...restProps
    } = props;

    const [inputValue, setInputValue] = useState(value);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
    const [loading, setloading] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const triggerSearch = useRef(false);
    const componentRef = useRef<HTMLDivElement>(null);
    useClickOutside(componentRef, () => {
        setSuggestions([])
    })

    const debouncedValue = useDebounce(inputValue, 500);    
    useEffect(() => {
        setloading(false);
        if(debouncedValue && triggerSearch.current) {
            const results = fetchSuggestions(debouncedValue);
            if(results instanceof Promise) {
                setloading(true);
                results.then(data => {
                    setloading(false);
                    return setSuggestions(data);
                });
            } else {
                setSuggestions(results);
            }
        } else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [fetchSuggestions, debouncedValue])

    const highlight = (index: number) => {
        if(index < 0) index = 0;
        if(index >= suggestions.length) index = suggestions.length - 1;
        setHighlightIndex(index);
    }

    // 键盘选择事件
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch(e.keyCode) {
            case 13: // enter
                if(suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
                break;
            case 38: // ↑
                highlight(highlightIndex - 1);
                break;
            case 40: // ↓
                highlight(highlightIndex + 1);
                break;
            case 27: // esc
                setSuggestions([])
                break;
            default:
                break; 
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.trim();
        setInputValue(val);
        triggerSearch.current = true;
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value);
        setSuggestions([]);
        if(onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value;
    }

    const generateDropdown = () => {
        return (
            <ul className="suggestion-list">
                {suggestions.map((item, index) => {
                    const cnames = classNames('suggestion-item', {
                        'is-active': index === highlightIndex
                    })
                    return (
                        <li className={cnames} onClick={() => {handleSelect(item)}} key={index}>
                            {renderTemplate(item)}
                        </li>
                    )
                })}
            </ul>
        )
    }

    return(
        <div className="auto-complete" ref={componentRef}>
            <Input
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            { loading && <div><Icon icon="spinner" spin /></div> }
            { suggestions.length > 0 && generateDropdown() }
        </div>
    )
}

export default AutoComplete;