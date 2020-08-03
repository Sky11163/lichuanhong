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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setloading = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    useClickOutside(componentRef, function () {
        setSuggestions([]);
    });
    var debouncedValue = useDebounce(inputValue, 500);
    useEffect(function () {
        setloading(false);
        if (debouncedValue && triggerSearch.current) {
            var results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                setloading(true);
                results.then(function (data) {
                    setloading(false);
                    return setSuggestions(data);
                });
            }
            else {
                setSuggestions(results);
            }
        }
        else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [debouncedValue]);
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length)
            index = suggestions.length - 1;
        setHighlightIndex(index);
    };
    // 键盘选择事件
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13: // enter
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38: // ↑
                highlight(highlightIndex - 1);
                break;
            case 40: // ↓
                highlight(highlightIndex + 1);
                break;
            case 27: // esc
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    var handleChange = function (e) {
        var val = e.target.value.trim();
        setInputValue(val);
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement("ul", { className: "suggestion-list" }, suggestions.map(function (item, index) {
            var cnames = classNames('suggestion-item', {
                'is-active': index === highlightIndex
            });
            return (React.createElement("li", { className: cnames, onClick: function () { handleSelect(item); }, key: index }, renderTemplate(item)));
        })));
    };
    return (React.createElement("div", { className: "auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        loading && React.createElement("div", null,
            React.createElement(Icon, { icon: "spinner", spin: true })),
        suggestions.length > 0 && generateDropdown()));
};
export default AutoComplete;
