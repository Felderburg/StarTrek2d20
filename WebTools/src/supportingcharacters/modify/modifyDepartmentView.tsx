import Markdown from "react-markdown";
import { ICharacterPageProperties } from "../../common/iCharacterPageProperties";
import { Header } from "../../components/header";
import { SimpleDepartmentSelector } from "../../components/simpleDepartmentSelector";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Dialog } from "../../components/dialog";
import store from "../../state/store";
import { modifyCharacterAddAdvancement } from "../../state/characterActions";
import { Department } from "../../helpers/department";
import { CharacterAdvancementChoice } from "../../modify/model/characterAdvancementChoice";

interface IModifyDepartmentViewProperties extends ICharacterPageProperties {
    onNextStep: () => void;
    onPreviousStep: () => void;
}

export const ModifyDepartmentView: React.FC<IModifyDepartmentViewProperties> = ({character, onNextStep, onPreviousStep}) => {

    const { t } = useTranslation();
    const [departmentSelection, setDepartmentSelection] = useState<Department>();

    const applyModification = () => {
        if (departmentSelection == null) {
            Dialog.show("Please select a department");
        } else {
            store.dispatch(modifyCharacterAddAdvancement(CharacterAdvancementChoice.Department, departmentSelection));
            onNextStep();
        }
    }

    return (<>
        <div className="row">
            <div className="col-12 col-md-6">
                <Header level={2} className="my-4">{t('Construct.other.department')}</Header>
                <Markdown>{t('ModifySupportingCharacter.attribute.instruction')}</Markdown>
                <SimpleDepartmentSelector onSelectDepartment={(a) => setDepartmentSelection(a)}
                    character={character}
                    isChecked={(a) => departmentSelection === a} />
            </div>
        </div>

        <div className="mt-5 d-flex justify-content-between">
            <Button size="sm" onClick={() => onPreviousStep()}>{t('Common.button.previous')}</Button>
            <Button size="sm" onClick={() => applyModification()}>{t('Common.button.finish')}</Button>
        </div>
    </>);
}