import { useTranslation } from "react-i18next"
import { Header } from "../../components/header"
import LcarsFrame from "../../components/lcarsFrame"
import { PageIdentity } from "../../pages/pageIdentity"
import { TableCollection, ValueResult } from "../model/table"
import ReactMarkdown from "react-markdown"
import { TableView } from "./tableView"
import { useState } from "react"
import { ModalControl } from "../../components/modal"
import { ShareTableModal } from "./shareTableModal"
import TableMarshaller from "../model/tableMarshaller"
import { connect } from "react-redux"
import { useNavigate } from "react-router"
import { preventDefaultAnchorEvent } from "../../common/navigator"
import { AccessingView } from "../../common/accessingView"
import store from "../../state/store"
import { deleteTableCollection, setTableForEditing } from "../../state/tableActions"
import Button from "react-bootstrap/Button"
import { IconButton } from "../../components/iconButton"
import { DeleteConfirmationModal } from "./deleteConfirmationModal"

interface IViewTablePageProperties {
    tableCollection?: TableCollection;
}

const ViewTablePage: React.FC<IViewTablePageProperties> = ({tableCollection}) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [ value, setValue ] = useState<ValueResult[]>([]);

    const showModal = () => {
        ModalControl.show("lg", closeModal, (<ShareTableModal link={createUrl()}/>), "Share Table");
    }

    const closeModal = () => {
        ModalControl.hide();
    }

    const showDeleteModal = () => {
        ModalControl.show("lg", closeModal,
            (<DeleteConfirmationModal close={closeModal} confirmDelete={confirmDelete} />),
            t('DeleteConfirmationModal.title'));
    }

    const createUrl = () => {
        const { hostname, protocol, port } = window.location;
        return protocol + "//" + hostname + ((port !== "80" && port !== "443" && port !== "") ? ":" + port : "") + "/tools/table/import?table=" + TableMarshaller.instance.marshall(tableCollection);
    }

    const deleteTable = () => {
        showDeleteModal();
    }

    const editTable = () => {
        store.dispatch(setTableForEditing(tableCollection));
        navigate("/tools/table/edit");
    }

    const confirmDelete = () => {
        closeModal();
        store.dispatch(deleteTableCollection(tableCollection));
        navigate("/tools/table");
    }

    if (tableCollection == null) {
        setTimeout(() => {
            navigate("/tools/table");
        }, 500);
        return (<LcarsFrame activePage={PageIdentity.ViewTable}>
                <div id="app">
                    <div className="page container ms-0">
                        <AccessingView />
                    </div>
                </div>
            </LcarsFrame>);
    } else {
        return (<LcarsFrame activePage={PageIdentity.ViewTable}>
            <div id="app">

                <div className="page container ms-0">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/index.html">{t('Page.title.home')}</a></li>
                            <li className="breadcrumb-item"><a href="/index.html" onClick={(e) => preventDefaultAnchorEvent(e, () => navigate("/tools"))}>{t('Page.title.otherTools')}</a></li>
                            <li className="breadcrumb-item"><a href="/tools/table" onClick={(e) => preventDefaultAnchorEvent(e, () => navigate("/tools/table"))}>{t('Page.title.tableList')}</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{t('Page.title.viewTable')}</li>
                        </ol>
                    </nav>

                    <main>
                        <Header>{t('Page.title.viewTable')}</Header>
                        <div className="d-md-flex justify-content-between align-items-start flex-row-reverse" >
                            <div className="text-nowrap text-end">
                                <IconButton onClick={showModal} icon="share" title="Share" />
                                <IconButton onClick={editTable} icon="pencil" title={t('Common.button.modify')} />
                                <IconButton variant="danger" onClick={deleteTable} icon="trash" title={t('Common.button.delete')}/>
                            </div>
                            <div className="mt-4">
                                <Header level={3}>{tableCollection.name}</Header>
                                <ReactMarkdown>{tableCollection.description}</ReactMarkdown>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mt-4">
                                <TableView name={undefined} table={tableCollection.mainTable} />
                            </div>

                            <div className="col-md-6 mt-4">
                                <div className="text-end">
                                    <Button onClick={() => setValue(tableCollection.roll())} className="btn btn-primary btn-sm">
                                        <img src="/static/img/d20.svg" style={{height: "24px", aspectRatio: "1"}} className="me-1" alt={t('Common.button.random')} />
                                        {' '} Roll
                                    </Button>
                                </div>

                                {value && value.length === 0
                                    ? undefined
                                    : (value.map((v,i) => (<div className="d-flex mt-4" key={'result-' + i}>
                                        <h3 className="me-3">Result:</h3>
                                        <div><p><strong>{v.name}</strong></p>
                                        <ReactMarkdown>{v.description}</ReactMarkdown></div>
                                    </div>)))
                                }
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </LcarsFrame>);
    }
}

const mapStateToProps = (state) => {
    return {
        tableCollection: state.table?.selection
    }
}

export default connect(mapStateToProps)(ViewTablePage);