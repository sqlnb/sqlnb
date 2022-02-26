/**
 * 
 * 
 * Note:
 * – See Jupyter Notebook format: https://ipython.org/ipython-doc/3/notebook/nbformat.html
 * 
 */


/**
 * The current version of the notebook data model.
 */
export const CurrentNbVersion = "0.0";

/**
 * INotebookData – Interface for notebook data
 */
export interface INotebookData {
    /** The notebook file's format version */
    version: string;

    /** The notebook file's name */
    name: string;

    /** Top-level notebook metadata */
    metadata: INbMetadata;

    /** The notebook's notebook content */
    connectionInfo: INbConnectionInfo;

    /** The notebook's cells */
    cells: INbCellData[];

}


/**
 * INbMetadata – Interface for top-level notebook metadata.
 */
export interface INbMetadata {
}

/**
 * DBType
 */
export enum DBType {
    SQLITE   = "SQLITE",
    MYSQL    = "MYSQL",
    POSTGRES = "POSTGRES",
    DUCKDB   = "DUCKDB",
}

/**
 * INbConnectionInfo – Interface for the notebook's DB connection info.
 */
export interface INbConnectionInfo {
    /** The notebook's DB's type */
    dbType: DBType;
}


/**
 * NbCellType – Enumeration of notebook cell types.
 */
export enum NbCellType {
    CODE = "code",
    MARKDOWN = "markdown",
}

/**
 * INbCellData – Interface for cells in a notebook
 */
export interface INbCellData {
    /** This cell's index in the notebook cell array */
    // index: number;

    /** The type of cell (eg SQL code, Markdown) */
    type: NbCellType;

    /** The execution-order index */
    execIndex?: number;

    /** The cell's source code */
    metadata?: INbCellMetadata;

    /** The cell's source code */
    source: string;

    /** The cell's output */
    output?: (
        INbCellTextOutput  |
        INbCellTableOutput |
        INbCellErrorOutput
    )[];

}

/**
 * INbCellMetadata – Interface for cell-level notebook metadata.
 */
export interface INbCellMetadata {
}


/**
 * NbCellOutputType – Enumeration of notebook cell output types.
 */
export enum NbCellOutputType {
    TEXT  = "text",
    TABLE = "table",
    ERROR = "error",
}


/**
 * INbCellOutputBase
 */
export interface INbCellOutputBase {    
    type: NbCellOutputType;
}


/**
 * INbCellTextOutput
 */
export interface INbCellTextOutput extends INbCellOutputBase {
    text: string;
}

/**
 * INbCellTableOutput
 */
export interface INbCellTableOutput extends INbCellOutputBase {
    // TODO – Redefine this somehow

    columns: {
        name: string;
        type: string;
        data: any[];
    }[];
    
    // tableData: { 
    //     header: string;
    //     rows: any[];
    // }[];
}

/**
 * INbCellErrorOutput
 */
export interface INbCellErrorOutput extends INbCellOutputBase {
    error: string;
}

