import { IFormActions, IFormPathMatcher } from './form';
import { Observable } from 'rxjs/internal/Observable';
export declare type Dispatcher = (eventName: string, payload: any) => void;
export declare type IEffects = (selector: ISelector, actions: IFormActions) => void;
export declare type ISelector = (eventName: string, formPathPattern?: string | IFormPathMatcher) => Observable<any>;
