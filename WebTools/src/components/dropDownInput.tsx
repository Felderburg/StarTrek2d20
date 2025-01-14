﻿import React from 'react';

interface IDropDownInputProperties {
    items: string[]|DropDownElement[];
    defaultValue: any;
    onChange: (index: number) => void;
    id?: string;
}

interface IDropDownSelectProperties {
    items: DropDownElement[];
    defaultValue: any;
    onChange: (index: string|number) => void;
    id?: string;
}

export class DropDownElement {

    readonly name: string;
    readonly value: number|string;

    constructor(value: number|string, name: string) {
        this.value = value;
        this.name = name;
    }
}

export class DropDownInput extends React.Component<IDropDownInputProperties, {}> {
    render() {
        const {items, defaultValue, onChange} = this.props;

        const options = items.map((item, i) => {
            if (item instanceof DropDownElement) {
                let element = item as DropDownElement;
                return <option key={i} value={element.value}>{element.name}</option>
            } else {
                return <option key={i} value={item}>{item}</option>
            }
        });

        return (
            <select value={defaultValue} onChange={e => onChange((e.target as HTMLSelectElement).selectedIndex) } id={this.props.id}>
                {options}
            </select>
        );
    }
}

export class DropDownSelect extends React.Component<IDropDownSelectProperties, {}> {
    render() {
        const {items, defaultValue, onChange} = this.props;

        const options = items.map((item, i) => {
            return <option key={i} value={item.value}>{item.name}</option>
        });

        return (
            <select value={defaultValue} onChange={e => onChange(items[(e.target as HTMLSelectElement).selectedIndex].value)} id={this.props.id}>
                {options}
            </select>
        );
    }
}