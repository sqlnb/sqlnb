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
            type: NbCellType.CODE,
            source: "SELECT users.name\nFROM users JOIN orders\n\tON orders.uid = users.id\nWHERE orders.open;",
        },
        {
            type: NbCellType.CODE,
            source: "SELECT name, id\nFROM users;",
        },
    ],
} as INotebookData;
