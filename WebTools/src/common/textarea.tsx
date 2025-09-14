import React from "react";

interface ITextAreaProperties {
    placeholder?: string;
    onChange: (value: string) => void;
    value: string;
}

export const TextArea: React.FC<ITextAreaProperties> = ({value, placeholder, onChange }) => {

    return (<textarea className="w-100"
            placeholder={placeholder}
            rows={8}
            onChange={(ev) => onChange(ev.target.value) }
            value={value} />)

}