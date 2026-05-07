import React from 'react';


interface IDropDownSelectProperties {
    items: DropDownElement[];
    defaultValue: any;
    onChange: (index: string|number) => void;
    id?: string;
    className?: string
}

export class DropDownElement {

    readonly name: string;
    readonly value: number|string;

    constructor(value: number|string, name: string) {
        this.value = value;
        this.name = name;
    }

    static compare(d1: DropDownElement, d2: DropDownElement) {
        return d1.name.localeCompare(d2.name);
    }
}

export class DropDownSelect extends React.Component<IDropDownSelectProperties, {}> {
    render() {
        const {items, defaultValue, onChange, className} = this.props;

        const options = items.map((item, i) => {
            return <option key={i} value={item.value}>{item.name}</option>
        });

        return (
            <select value={defaultValue} className={className} onChange={e => onChange(items[(e.target as HTMLSelectElement).selectedIndex].value)} id={this.props.id}>
                {options}
            </select>
        );
    }
}