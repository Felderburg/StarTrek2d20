import React, { CSSProperties } from "react";

interface IInputFieldState {
    hasFocus: boolean;
    value: string|number;
}

interface IInputFieldProperties {
    id?: string,
    type?: string,
    value: string|number,
    min?: number,
    max?: number,
    className?: string,
    disabled?: boolean,
    placeholder?: string,
    maxLength?: number,
    onChange: (value: string) => void,
    error?: boolean,
    style?: CSSProperties
}

export class InputField extends React.Component<IInputFieldProperties, IInputFieldState> {

    constructor(props) {
        super(props);
        this.state = {
            hasFocus: false,
            value: this.props.value ?? ''
        }
    }

    componentDidUpdate(previousProps: IInputFieldProperties, previousState, snapshot) {
        if (this.props.value !== previousProps.value) {
            this.setState((state) => ({...state, value: this.props.value}));
        }
    }

    render() {
        let additionalProps = {};
        if (this.props.type === 'number' && this.props.max != null) {
            additionalProps["max"] = this.props.max;
        }
        if (this.props.type === 'number' && this.props.min != null) {
            additionalProps["min"] = this.props.min;
        }

        return (<input
            className={(this.props.className ?? "") + (this.props.error ? " is-invalid" : "")}
            id={this.props.id}
            type={this.props.type ? this.props.type : "text"}
            placeholder={this.props.placeholder}
            onChange={(ev) => {
                if (!this.state.hasFocus) {
                    this.props.onChange(ev.target.value);
                } else {
                    this.setState((state) => ({...state, value: ev.target.value}))
                }
            }}
            onFocus={() => {this.setState((state) => ({...state, hasFocus: true}))}}
            onBlur={(ev) => {
                this.setState((state) => ({...state, hasFocus: false}));
                this.props.onChange(ev.target.value);
            }}
            disabled={this.props.disabled === true}
            maxLength={this.props.maxLength}
            style={this.props.style}
            {...additionalProps}
            value={this.state.value} />);
    }
}