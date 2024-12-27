import React from "react";
import { Button } from "./button"

interface IIconButtonProperties {
    onClick: () => void;
    icon: string;
}

export const IconButton: React.FC<IIconButtonProperties> = ({onClick, icon}) => {

    return (<Button className="btn btn-link text-danger" onClick={() => onClick()} ><i className={"bi bi-" + icon}></i></Button>)
}