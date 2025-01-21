import React from "react";

interface IIconButtonProperties {
    onClick: () => void;
    icon: string;
    variant?: "primary"|"danger";
    className?: string
}

export const IconButton: React.FC<IIconButtonProperties> = ({onClick, icon, variant, className}) => {
    let classes = "text-primary" + (className ? " " + className : "");
    if (variant === "danger") {
        classes = "text-danger";
    }

    return (<button className={"btn btn-link " + classes} onClick={() => onClick()} ><i className={"bi bi-" + icon}></i></button>)
}