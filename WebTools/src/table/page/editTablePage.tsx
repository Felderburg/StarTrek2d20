import { connect } from "react-redux";
import { TableCollection } from "../model/table";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import { preventDefaultAnchorEvent } from "../../common/navigator";
import { Header } from "../../components/header";
import Markdown from "react-markdown";
import { DropDownElement, DropDownSelect } from "../../components/dropDownInput";
import { useState } from "react";
import { EditableTableCollection } from "../model/editableTable";
import { InputFieldAndLabel } from "../../common/inputFieldAndLabel";
import { Button } from "react-bootstrap";
import store from "../../state/store";
import { addTableCollection } from "../../state/tableActions";
import { Dialog } from "../../components/dialog";

interface IEditTablePageProperties {
    initialTableCollection?: TableCollection;
    categories: string[]
}

const OTHER = -2;
const NO_SELECTION = -1;

const EditTablePage: React.FC<IEditTablePageProperties> = ({initialTableCollection, categories}) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [otherSelected, setOtherSelected] = useState(false);
    const [tableCollection, setTableCollection] = useState(EditableTableCollection.from(initialTableCollection));

    const categoryItems = () => {
        let sorted = categories.sort().map((v, i) => new DropDownElement(i, v));
        sorted.push(new DropDownElement(OTHER, "Other"));
        sorted.unshift(new DropDownElement(NO_SELECTION, ""));
        return sorted;
    }

    const selectCategory = (value: number|string) => {
        let category = null;
        if (value === OTHER) {
            setOtherSelected(true);
        } else if (value === NO_SELECTION) {
            setOtherSelected(false);
        } else {
            setOtherSelected(false);
            category = categories[value as number];
        }
        selectCategoryValue(category);
    }

    const selectCategoryValue = (category: string) => {
        let collection = tableCollection.copy();
        collection.category = category;
        setTableCollection(collection);
    }

    const selectTableName = (name: string) => {
        let collection = tableCollection.copy();
        collection.mainTable.name = name;
        setTableCollection(collection);
    }

    const selectTableDescription = (description: string) => {
        let collection = tableCollection.copy();
        collection.description = description;
        setTableCollection(collection);
    }

    const saveTableCollection = () => {
        if (tableCollection.category == null) {
            Dialog.show("Please provide a category.");
        } else if (tableCollection.mainTable?.name == null) {
            Dialog.show("Please provide a name for this table.");
        } else if (tableCollection.description == null) {
            Dialog.show("Please provide a description for this table.");
        } else {
            store.dispatch(addTableCollection(tableCollection.asTableCollection()));
            navigate("/tools/table");
        }
    }

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

                <Header>{initialTableCollection == null ? t('EditTablePage.header.createTable') : t('EditTablePage.header.modifyTable')}</Header>

                <div className="row row-cols-1 row-cols-md-2">
                    <div className="col mt-3">
                        <Header level={2}>Category</Header>
                        <Markdown>Categorize this table.</Markdown>
                        <DropDownSelect items={categoryItems()}
                            defaultValue={otherSelected ? OTHER : categories.indexOf(tableCollection.category)}
                            onChange={(value) => selectCategory(value)} />
                        <div className="mt-4">
                            {otherSelected
                                ? (<InputFieldAndLabel labelName="Other category" id="category"
                                value={tableCollection.category ?? ""}
                                onChange={(value) => selectCategoryValue(value)}/>)
                                : null}
                        </div>
                    </div>

                    <div className="col mt-3">
                        <Header level={2}>Name and Description</Header>
                        <div className="mt-4">
                            <InputFieldAndLabel labelName={t('Construct.other.name')} id="name"
                                value={""}
                                onChange={(value) => selectTableName(value) }/>
                        </div>
                        <div className="mt-3">
                            <textarea className="w-100"
                                placeholder="Description"
                                rows={6}
                                onChange={(ev) => selectTableDescription(ev.target.value) }
                                value={tableCollection.description} />
                        </div>
                    </div>

                </div>

                <div className="text-end mt-4">
                    <Button size="sm" onClick={() => saveTableCollection()}>{t('Common.button.save')}</Button>
                </div>

            </div>
        </div>
    </LcarsFrame>);
}

const mapStateToProps = (state) => {
    return {
        categories: Array.from(new Set<string>(state.table?.collections?.map(c => c.category) ?? []).values()),
        initialTableCollection: state.table?.editing
    }
}

export default connect(mapStateToProps)(EditTablePage);