import React from "react";
import { Button } from "./button"

interface IIconButtonProperties {
    onClick: () => void;
    icon: string;
    variant?: "primary"|"danger";
}

export const IconButton: React.FC<IIconButtonProperties> = ({onClick, icon, variant}) => {
    let classes = "text-primary";
    if (variant === "danger") {
        classes = "text-danger";
    }

    return (<Button className={"btn btn-link " + classes} onClick={() => onClick()} ><i className={"bi bi-" + icon}></i></Button>)
}