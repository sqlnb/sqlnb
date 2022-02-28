import { 
    INotebookData, 
    CurrentNbVersion,
    DBType,
    NbCellType,
} from './nbData';

export const demoNotebook = {
    version: CurrentNbVersion,
    name: "Demo Notebook",
    metadata: {},
    connectionInfo: {
        dbType: DBType.SQLITE,
    },
    cells: [
        {
            execIndex: 0,
            type: NbCellType.CODE,
            source: "SELECT 1 + 2 res;",
        },
        {
            execIndex: 1,
            type: NbCellType.CODE,
            source: "SELECT users.name\nFROM users JOIN orders\n\tON orders.uid = users.id\nWHERE orders.open;",
        },
        {
            execIndex: 2,
            type: NbCellType.CODE,
            source: "SELECT name, id\nFROM users;",
        },

        {
            execIndex: 3,
            type: NbCellType.CODE,
            source: "SELECT 1 + 2 res;",
        },
        {
            type: NbCellType.CODE,
            source: "SELECT users.name\nFROM users JOIN orders\n\tON orders.uid = users.id\nWHERE orders.open;",
        },
        {
            type: NbCellType.CODE,
            source: "SELECT name, id\nFROM users;",
        },
        {
            type: NbCellType.CODE,
            source: "SELECT 1 + 2 res;",
        },
        {
            type: NbCellType.CODE,
            source: "SELECT users.name\nFROM users JOIN orders\n\tON orders.uid = users.id\nWHERE orders.open;",
        },
        {
            type: NbCellType.CODE,
            source: "SELECT name, id\nFROM users;",
        },
    ],
} as INotebookData;
