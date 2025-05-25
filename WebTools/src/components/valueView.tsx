interface IValueProperties {
    index: number;
    value: number;
    isSelected: boolean;
    onSelect: (index: number) => void;
}

export const ValueView: React.FC<IValueProperties> = ({index, value, isSelected, onSelect}) => {

    const toggleSelection = () => {
        onSelect(isSelected ? -1 : index);
    }

    const className = isSelected ? "die die-selected" : "die";

    return (
        <div className={className} onClick={() => toggleSelection() }>
            <div className="die-value">
                {value}
            </div>
        </div>
    );
}