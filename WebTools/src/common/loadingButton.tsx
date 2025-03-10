import Button from "react-bootstrap/Button";

interface ILoadingButtonProperties {
    loading: boolean;
    onClick: () => void;
    className?: string;
    enabled?: boolean;
    size?: "sm"|"lg"
    children: React.ReactNode;
}

export const LoadingButton: React.FC<ILoadingButtonProperties> = ({loading, onClick, children, className = "mt-4", enabled = true, size}) => {

    const spinner = loading
        ? (<div className={"spinner-border text-dark" + (size === "sm" ? " spinner-border-sm" : "")} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>)
        : null;
    return (<Button size={size} onClick={() => onClick()} className={className ?? ""} disabled={!enabled}><>{spinner} {children}</></Button>);
}
