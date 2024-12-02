import { test, expect, describe } from '@jest/globals'
import { EditableTable, EditableTableRow } from '../../../src/table/model/editableTable';
import { ValueResult } from '../../../src/table/model/table';

describe('testing tables', () => {

    test('should sort rows (standard)', () => {
        let table = new EditableTable();
        table.rows.push(new EditableTableRow(new ValueResult("a", "b"), 5, 6));
        table.rows.push(new EditableTableRow(new ValueResult("c", "d"), 1, 2));
        table.rows.push(new EditableTableRow(new ValueResult("e", "f"), 3, 3));

        table.sortRows();
        expect(table.rows[0].from).toBeLessThan(table.rows[1].from ?? 0);
        expect(table.rows[1].from).toBeLessThan(table.rows[2].from ?? 0);

        expect(table.rows[0].to).toBeLessThan(table.rows[1].to ?? 0);
        expect(table.rows[1].to).toBeLessThan(table.rows[2].to ?? 0);

    });

    test('should fill gaps in table', () => {
        let table = EditableTable.from();
        expect(table.rows.length).toBe(4);

        const row1 = table.rows[0];
        row1.to = 2;

        expect(row1.edited).toBe(true);

        table.fillGaps();
        expect(table.rows.length).toBe(4);
        expect(table.rows[1].from).toBe(3);
    });
});