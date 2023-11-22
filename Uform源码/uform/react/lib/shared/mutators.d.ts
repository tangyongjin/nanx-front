export declare const createMutators: (props: any) => {
    change(value: any): void;
    dispatch(name: string, payload: any): void;
    errors(errors: string | string[], ...args: any[]): void;
    push(value: any): void;
    pop(): void;
    insert(index: number, value: any): void;
    remove(index: number): void;
    unshift(value: any): void;
    shift(): void;
    move($from: number, $to: number): void;
};
