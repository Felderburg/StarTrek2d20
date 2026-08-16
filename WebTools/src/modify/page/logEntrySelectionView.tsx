import type { LogEntry } from '../../common/logEntry';
import { CheckBox } from '../../components/checkBox';

interface ILogEntrySelectionView {
  logEntry: LogEntry;
  isSelected: boolean;
  selectLogEntry: (LogEntry?) => void;
}

export const LogEntrySelectionView: React.FC<ILogEntrySelectionView> = ({
  logEntry,
  isSelected,
  selectLogEntry,
}) => {
  return (
    <tr>
      <td>
        <CheckBox
          value={logEntry.id}
          isChecked={isSelected}
          onChanged={() => {
            if (isSelected) {
              selectLogEntry(undefined);
            } else {
              selectLogEntry(logEntry);
            }
          }}
          text=""
        />
      </td>
      <td>
        <p className="my-0">{logEntry.adventureTitle}</p>
        <p className="my-0">
          <small>{logEntry.missionDescription}</small>
        </p>
      </td>
    </tr>
  );
};
