import { Table, TableCollection, TableRow, ValueResult } from "./table";
import { v4 as uuidv4 } from 'uuid';

export class EditableTableRow {
    key: string;
    private _from: number;
    private _to?: number;
    private _result: ValueResult;
    edited: boolean = false;

    constructor(result?: ValueResult, from?: number, to?: number, key: string = uuidv4()) {
        this.key = key;
        this._from = from;
        this._to = to;
        this._result = result;
    }

    static from(row?: TableRow) {
        const result = new EditableTableRow();
        result._from = row?.from;
        result._to = row?.to;
        result._result = row?.result;
        return result;
    }

    get result() {
        return this._result;
    }

    set result(value: ValueResult) {
        this._result = value;
        this.edited = true;
    }

    get from() {
        return this._from;
    }

    set from(value: number|undefined) {
        this._from = value;
        this.edited = true;
    }

    get to() {
        return this._to;
    }

    set to(value: number|undefined) {
        this._to = value;
        this.edited = true;
    }

    containsRangeOf(row: EditableTableRow) {
        return this.from <= row.from && (this.to >= row.to);
    }

    overlapsRangeOf(row: EditableTableRow) {
        return this.containsRangeOf(row) || this.overlapsStartOf(row) ||
            this.overlapsEndOf(row);
    }

    overlapsEndOf(row: EditableTableRow) {
        return this.overlapsValue(row.to);
    }

    overlapsStartOf(row: EditableTableRow) {
        return this.overlapsValue(row.from);
    }

    overlapsValue(value: number) {
        return (value >= this.from && value <= this.to);
    }

    copy() {
        const result = new EditableTableRow();
        result.key = this.key;
        result._from = this._from;
        result._to = this._to;
        result._result = this._result;
        result.edited = this.edited;
        return result;
    }

    asTableRow() {
        return new TableRow(this._result, this._from, this.to);
    }
}

export class EditableTable {
    name: string;
    rows: EditableTableRow[] = [];
    suffixValue: number = 0;

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

        result.determineSuffix();
        return result;
    }

    copy() {
        const result = new EditableTable();
        result.name = this.name;
        result.rows = this.rows.map(r => r.copy());
        result.suffixValue = this.suffixValue;
        return result;
    }

    asTable() {
        return new Table(this.name, this.rows.map(r => r.asTableRow()));
    }

    sortRows() {
        this.rows.sort((r1, r2) => {
            if (r1.from !== r2.from) {
                return r1.from - r2.from;
            } else if (r1.to !== r2.to) {
                return r1.to - r2.to;
            } else {
                return -1;
            }
        });
    }

    private determineSuffix() {
        this.suffixValue = (this.rows.length + 1);
        let done = false;
        while (!done) {
            done = true;
            this.rows.forEach(r => {
                if (r.result.name === ("Option " + this.suffixValue)) {
                    this.suffixValue += 1;
                    done = false;
                }
            })
        }
    }

    fillGaps() {
        let values = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ];

        this.sortRows();

        [...this.rows].filter(r => r.edited)
            .forEach(r => {
                let overlaps = this.rows.filter(r2 => !r2.edited && r.overlapsRangeOf(r2));
                overlaps.forEach(r2 => this.rows.splice(this.rows.indexOf(r2), 1));
            })

        this.rows.forEach(r => {
            let to = r.to == null ? r.from : Math.max(r.from, r.to);
            for (let i = r.from; i <= to; i++) {
                if (values.includes(i)) {
                    values.splice(values.indexOf(i), 1);
                }
            }
        });

        let chunks: number[][] = [];
        values.forEach(v => {
            if (chunks.length === 0) {
                chunks.push([v]);
            } else {
                let last = chunks[chunks.length-1];
                if (last[last.length-1] === (v-1)) {
                    last.push(v);
                } else {
                    chunks.push([v]);
                }
            }
        });

        chunks.forEach(c => {
            let existingRow = undefined;
            if (c[c.length-1] < 20) {
                let temp = this.rows.filter(r => r.from === (c[c.length-1]+1));
                if (temp.length) {
                    existingRow = temp[0];
                }
            }

            if (existingRow != null && !existingRow.edited) {
                let index = this.rows.indexOf(existingRow);
                this.rows[index] = new EditableTableRow(existingRow.result, c[0], existingRow.to, existingRow.key);
            } else {
                this.rows.push(new EditableTableRow(new ValueResult("Option " + this.suffixValue, "Option " + this.suffixValue), c[0], c[c.length-1]));
                this.suffixValue++;
            }
        });

        [...this.rows].filter(r1 => r1.edited)
            .forEach(r1 => {
                let overlaps = this.rows.filter(r2 => !r2.edited && r1.overlapsRangeOf(r2));
                overlaps.forEach(r2 => {
                    if (r1.containsRangeOf(r2)) {
                        this.rows.splice(this.rows.indexOf(r2), 1);
                    } else {
                        let from = (r2.from >= r1.from && r2.from <= r1.to) ? r1.to + 1 : r2.from;
                        let to = (r2.to >= r1.from && r2.to <= r1.to) ? r1.from - 1 : r2.to;
                        let index = this.rows.indexOf(r2);
                        this.rows[index] = new EditableTableRow(r2.result, from, to);
                    }
                })
            }
        );

        this.sortRows();
    }
}


export class EditableTableCollection {

    uuid: string;
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
            result.mainTable = EditableTable.from();
        }
        return result;
    }

    copy() {
        const result = new EditableTableCollection();
        result.description = this.description;
        result.category = this.category;
        result.mainTable = this.mainTable?.copy();
        result.uuid = this.uuid;
        return result;
    }

    asTableCollection() {
        return new TableCollection(this.mainTable.asTable(), this.description, this.category, this.uuid);
    }
}
