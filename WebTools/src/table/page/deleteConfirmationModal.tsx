import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";

interface IDeleteConfirmationModalProperties {
    confirmDelete: () => void;
    close: () => void;
}

export const DeleteConfirmationModal: React.FC<IDeleteConfirmationModalProperties> = ({confirmDelete, close}) => {

    const { t } = useTranslation();
    return (<div>
                <Markdown>{t('DeleteConfirmationModal.instruction')}</Markdown>

                <div className="text-end">
                    <Button className="me-2" size="sm" onClick={() => close()}>{t('Common.button.cancel')}</Button>
                    <Button className="ms-2" size="sm" variant="danger" onClick={() => confirmDelete()}>{t('Common.button.delete')}</Button>
                </div>
            </div>);
}
