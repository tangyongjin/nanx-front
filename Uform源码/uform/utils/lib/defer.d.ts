export declare const defer: <P, E>() => {
    promise: Promise<unknown>;
    resolve: (payload: P) => void;
    reject: (error: E) => void;
};
