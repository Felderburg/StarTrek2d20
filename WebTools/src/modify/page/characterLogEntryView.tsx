import { useTranslation } from "react-i18next";
import { LogEntry } from "../../common/logEntry";
import { ICharacterProperties } from "../../solo/page/soloCharacterProperties";
import Markdown from "react-markdown";
import { Button } from "react-bootstrap";
import { InputFieldAndLabel } from "../../common/inputFieldAndLabel";
import { useState } from "react";
import { TextArea } from "../../common/textarea";

interface ICharacterLogEntryViewProperties extends ICharacterProperties {
    onNextStep: () => void;
    onPreviousStep: () => void;
    saveLogEntry: (logEntry: LogEntry) => void;
}

export const CharacterLogEntryView: React.FC<ICharacterLogEntryViewProperties> = ({character, onNextStep, onPreviousStep, saveLogEntry}) => {
    const { t } = useTranslation();
    const [ title, setTitle ] = useState<string>("");
    const [ details, setDetails ] = useState<string>("");
    const [ notes, setNotes ] = useState<string>("");

    const createLogEntryAndNext = () => {
        let entry = new LogEntry((character.logEntries?.length ?? 0) + 1);
        entry.adventureTitle = title;
        entry.missionDescription = details;
        entry.notes = notes;
        saveLogEntry(entry);
        onNextStep();
    }

    return <>
        <div className="row">

            <div className="col-12 col-md-6">
                <Markdown className="mt-4">{t('CharacterLogEntry.instruction')}</Markdown>

                <div className="my-3">
                    <InputFieldAndLabel
                        id="title"
                        value={title}
                        labelName="Adventure Title"
                        onChange={setTitle}
                        />
                </div>

                <div className="my-3">
                    <TextArea
                        value={details}
                        placeholder="Mission details"
                        onChange={setDetails}
                    />
                </div>
            </div>
            <div className="col-12 col-md-6">
                <Markdown className="mt-4">{t('CharacterLogEntry.notes.instruction')}</Markdown>

                <div className="my-3">
                    <TextArea
                        value={notes}
                        placeholder="Notes (optional)"
                        onChange={setNotes}
                    />
                </div>
            </div>

            <div className="col-12 col-md-6">
                <Markdown className="mt-4">{t('CharacterLogEntry.values.instruction')}</Markdown>

            </div>

            <div className="col-12 col-md-6">
                <Markdown className="mt-4">{t('CharacterLogEntry.directives.instruction')}</Markdown>

            </div>
        </div>

        <div className="mt-5 d-flex justify-content-between">
            <Button size="sm" onClick={() => onPreviousStep()}>{t('Common.button.previous')}</Button>
            <Button size="sm" onClick={() => createLogEntryAndNext()}>{t('Common.button.next')}</Button>
        </div>
    </>;
}