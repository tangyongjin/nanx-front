import { Path, ArrayPath } from '@uform/types';
declare type Destruct = {
    [key: string]: string;
} | Path;
export declare function getPathSegments(path: Path): ArrayPath;
declare const parseDestruct: (str: string | number) => Destruct;
declare const parseDesturctPath: (path: string | number | (string | number)[]) => any;
declare const parsePaths: (path: string | number | (string | number)[]) => any;
export declare const getIn: (obj: any, path: string | number | (string | number)[], value?: any) => any;
export declare const setIn: (obj: any, path: string | number | (string | number)[], value?: any, getSchema?: (path: string[] | number[]) => any) => any;
export declare const deleteIn: (obj: any, path: string | number | (string | number)[], value?: any, getSchema?: (path: string[] | number[]) => any) => any;
export declare const existIn: (obj: any, path: string | number | (string | number)[]) => boolean;
export { parseDesturctPath, parseDestruct, parsePaths };
