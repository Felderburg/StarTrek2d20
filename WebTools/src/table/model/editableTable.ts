import { Table, TableCollection, TableRow, ValueResult } from "./table";


export class EditableTableRow {
    from: number;
    to?: number;
    result: ValueResult;
    edited: boolean = false;

    constructor(result?: ValueResult, from?: number, to?: number) {
        this.from = from;
        this.to = to;
        this.result = result;
    }

    static from(row?: TableRow) {
        const result = new EditableTableRow();
        result.from = row?.from;
        result.to = row?.to;
        result.result = row?.result;
        return result;
    }

    copy() {
        const result = new EditableTableRow();
        result.from = this.from;
        result.to = this.to;
        result.result = this.result;
        result.edited = this.edited;
        return result;
    }

    asTableRow() {
        return new TableRow(this.result, this.from, this.to);
    }
}

export class EditableTable {
    name: string;
    rows: EditableTableRow[] = [];

    static from(table?: Table) {
        const result = new EditableTable();
        result.name = table?.name;
        if (table != null) {
            result.rows = table.rows.map(r => EditableTableRow.from(r));
        } else {
            result.rows = [
                new EditableTableRow(new ValueResult("Option 1", "Option 1"), 1, 5),
                new EditableTableRow(new ValueResult("Option 2", "Option 2"), 6, 10),
                new EditableTableRow(new ValueResult("Option 3", "Option 3"), 11, 15),
                new EditableTableRow(new ValueResult("Option 4", "Option 4"), 16, 20)
            ];
        }
        return result;
    }

    copy() {
        const result = new EditableTable();
        result.name = this.name;
        result.rows = this.rows.map(r => r.copy());
        return result;
    }

    asTable() {
        return new Table(this.name, this.rows.map(r => r.asTableRow()));
    }
}


export class EditableTableCollection {

    mainTable: EditableTable;
    description?: string;
    category?: string;


    static from(tableCollection?: TableCollection) {
        let result = new EditableTableCollection();
        if (tableCollection != null) {
            result.description = tableCollection.description;
            result.category = tableCollection.category;
            result.mainTable = EditableTable.from(tableCollection.mainTable);
        } else {
            result.mainTable = new EditableTable();
        }
        return result;
    }

    copy() {
        const result = new EditableTableCollection();
        result.description = this.description;
        result.category = this.category;
        result.mainTable = this.mainTable?.copy();
        return result;
    }

    asTableCollection() {
        return new TableCollection(this.mainTable.asTable(), this.description, this.category);
    }
}
