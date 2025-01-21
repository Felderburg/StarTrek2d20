import React from "react";

interface IIconButtonProperties {
    onClick: () => void;
    icon: string;
    variant?: "primary"|"danger";
    className?: string;
    title?: string;
}

export const IconButton: React.FC<IIconButtonProperties> = ({onClick, icon, variant, className, title}) => {
    let classes = "text-primary" + (className ? " " + className : "");
    if (variant === "danger") {
        classes = "text-danger";
    }

    return (<button className={"btn btn-link " + classes} onClick={() => onClick()} title={title}><i className={"bi bi-" + icon}></i></button>)
}