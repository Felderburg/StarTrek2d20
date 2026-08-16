import { Base64 } from 'js-base64';
import pako from 'pako';
import { Table, TableCollection, TableRow, ValueResult } from './table';

export class TableMarshaller {
  private static singleton: TableMarshaller;

  static get instance() {
    if (TableMarshaller.singleton == null) {
      TableMarshaller.singleton = new TableMarshaller();
    }
    return TableMarshaller.singleton;
  }

  marshall(tableCollection: TableCollection) {
    const json = { mainTable: this.marshallTable(tableCollection.mainTable) };
    if (tableCollection.uuid) {
      json['uuid'] = tableCollection.uuid;
    }
    if (tableCollection.category) {
      json['category'] = tableCollection.category;
    }
    if (tableCollection.description) {
      json['description'] = tableCollection.description;
    }
    return this.encode(json);
  }

  unmarshall(encodedCollection: string) {
    const json = this.decode(encodedCollection);

    if (json['mainTable']) {
      const mainTable = this.unmarshallTable(json['mainTable']);

      const description = json['description'];
      const category = json['category'];
      const uuid = json['uuid'];

      if (uuid) {
        return new TableCollection(mainTable, description, category, uuid);
      } else {
        return new TableCollection(mainTable, description, category);
      }
    } else {
      return undefined;
    }
  }

  private unmarshallTable(json: any) {
    const name = json['name'];
    const rows = [];
    if (json['rows']) {
      json.rows
        ?.map((r) => {
          let result = null;
          if (r['result']) {
            result = new ValueResult(
              r['result']['name'],
              r['result']['description'],
            );
          }
          return new TableRow(result, r['from'], r['to']);
        })
        .forEach((r) => rows.push(r));
    }
    return new Table(name, rows);
  }

  decode(s: string) {
    if (s) {
      try {
        const encoded = Base64.toUint8Array(s);
        const text = new TextDecoder().decode(pako.inflate(encoded));
        return JSON.parse(text);
      } catch (e) {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  private marshallTable(table: Table) {
    const json = {};
    if (table.name) {
      json['name'] = table.name;
    }
    json['rows'] = table.rows?.map((r) => {
      return {
        result: {
          type: 'value',
          name: r.result?.name,
          description: r.result?.description,
        },
        from: r.from,
        to: r.to,
      };
    });

    return json;
  }

  private encode(json: any) {
    const text = JSON.stringify(json);
    const encoded = pako.deflate(new TextEncoder().encode(text));
    const result = Base64.fromUint8Array(encoded, true);
    return result;
  }
}
