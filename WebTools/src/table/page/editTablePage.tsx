import { connect } from "react-redux";
import { TableCollection, ValueResult } from "../model/table";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import { preventDefaultAnchorEvent } from "../../common/navigator";
import { Header } from "../../components/header";
import Markdown from "react-markdown";
import { DropDownElement, DropDownSelect } from "../../components/dropDownInput";
import { useState } from "react";
import { EditableTableCollection, EditableTableRow } from "../model/editableTable";
import { InputFieldAndLabel } from "../../common/inputFieldAndLabel";
import { Button } from "react-bootstrap";
import store from "../../state/store";
import { addTableCollection, replaceTableCollection } from "../../state/tableActions";
import { Dialog } from "../../components/dialog";
import { InputField } from "../../common/inputField";
import { IconButton } from "../../components/iconButton";

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
    const [tableCollection, setTableCollection] = useState(() => EditableTableCollection.from(initialTableCollection));

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
        } else if (isErrorPresent()) {
            Dialog.show("Please address the table errors before proceeding.");
        } else {
            if (initialTableCollection == null) {
                store.dispatch(addTableCollection(tableCollection.asTableCollection()));
            } else {
                store.dispatch(replaceTableCollection(initialTableCollection.uuid, tableCollection.asTableCollection()));
            }
            navigate("/tools/table");
        }
    }

    const selectRowName = (name: string, index: number) => {
        const collection = tableCollection.copy();
        const row = collection.mainTable.rows[index];
        row.result = new ValueResult(name, row.result?.description);
        setTableCollection(collection);
    }

    const selectRowDescription = (description: string, index: number) => {
        const collection = tableCollection.copy();
        const row = collection.mainTable.rows[index];
        row.result = new ValueResult(row.result?.name, description);
        setTableCollection(collection);
    }

    const selectRowFrom = (from: string, index: number) => {
        const collection = tableCollection.copy();
        const row = collection.mainTable.rows[index];
        row.from = parseInt(from);
        collection.mainTable.fillGaps();

        setTableCollection(collection);
    }

    const selectRowTo = (to: string, index: number) => {
        const collection = tableCollection.copy();
        const row = collection.mainTable.rows[index];
        row.to = parseInt(to);
        collection.mainTable.fillGaps();

        setTableCollection(collection);
    }

    const deleteRow = (index: number) => {
        const collection = tableCollection.copy();
        collection.mainTable.rows.splice(index, 1);
        collection.mainTable.fillGaps();

        setTableCollection(collection);
    }

    const isStartOverlapping = (row: EditableTableRow) => {
        let error = (row.from < 1 || row.from > 20);
        tableCollection.mainTable.rows
            .filter(r => r !== row)
            .forEach(r => error = error || r.overlapsStartOf(row));
        return error;
    }

    const isEndOverlapping = (row: EditableTableRow) => {
        let error = (row.to < row.from || row.to > 20);
        tableCollection.mainTable.rows
            .filter(r => r !== row)
            .forEach(r => error = error || r.overlapsEndOf(row));
        return error;
    }

    const isMissingName = (row: EditableTableRow) => {
        return !row.result?.name?.length;
    }

    const isErrorPresent = () => {
        let error = false;
        let rows = tableCollection.mainTable.rows;
        rows.forEach(r =>
            error = error || isMissingName(r) || isEndOverlapping(r) || isStartOverlapping(r)
        );
        return error;
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
                                value={tableCollection.mainTable.name ?? ""}
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

                <div className="mt-3">
                    <Header level={2}>Options</Header>

                    <table className="table table-dark mt-3">
                        <colgroup>
                            <col width={"7%"} />
                            <col width={"7%"} />
                            <col width={"25%"} />
                            <col width={"55%"} />
                            <col width={"6%"} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th className="bg-black">
                                    From
                                </th>
                                <th className="bg-black">
                                    To
                                </th>
                                <th className="bg-black">
                                    Name
                                </th>
                                <th className="bg-black">
                                    Description
                                </th>
                                <th className="bg-black">

                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {tableCollection.mainTable.rows.map((r,i) =>
                                (<tr key={'row-' + r.key}>
                                    <td>
                                        <InputField value={r.from} onChange={(value) => selectRowFrom(value, i)}
                                            maxLength={2} className="form-control bg-black rounded-1"
                                            max={20} min={1}
                                            error={isStartOverlapping(r)}
                                            style={{width: "3rem", textAlign: "center"}} />
                                    </td>
                                    <td>
                                        <InputField value={r.to} onChange={(value) => selectRowTo(value, i)}
                                            max={20} min={1}
                                            error={isEndOverlapping(r)}
                                            maxLength={2} className="form-control bg-black rounded-1" style={{width: "3rem", textAlign: "center"}} />
                                    </td>
                                    <td>
                                        <InputField value={r.result?.name ?? ""}
                                                onChange={(value) => selectRowName(value, i)}
                                                error={isMissingName(r)}
                                                className="form-control bg-black rounded-1 w-100" />

                                    </td>
                                    <td>
                                        <InputField value={r.result?.description ?? ""}
                                                onChange={(value) => selectRowDescription(value, i)}
                                                className="form-control bg-black rounded-1 w-100" />
                                    </td>
                                        <td className="text-end">
                                            <IconButton onClick={() => { deleteRow(i) }} icon="trash" variant="danger" />
                                        </td>
                                </tr>)
                            )}
                        </tbody>
                    </table>
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