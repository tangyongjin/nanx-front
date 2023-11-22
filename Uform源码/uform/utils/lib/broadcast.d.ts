declare type Subscriber<N> = (notification: N) => void;
declare type Filter<P, S> = (payload: P, subscription: S) => any;
export interface IBroadcast extends Broadcast<any, any, any> {
}
export declare class Broadcast<P, S, N> {
    private entries;
    private buffer;
    private length;
    subscribe(subscriber: Subscriber<N>, subscription?: any): () => any;
    unsubscribe(): void;
    flushBuffer({ subscriber, subscription }: {
        subscriber: any;
        subscription: any;
    }): void;
    notify(payload: P, filter?: Filter<P, S>): void;
}
export {};
