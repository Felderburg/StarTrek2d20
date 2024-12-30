import { Button } from "react-bootstrap";

export const LoadingButton = ({loading, onClick, children, className = "mt-4", enabled = true}) => {

    const spinner = loading ? (<div className="spinner-border text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>) : null;
    return (<Button onClick={() => onClick()} className={className ?? ""} disabled={!enabled}><>{spinner} {children}</></Button>);
}
