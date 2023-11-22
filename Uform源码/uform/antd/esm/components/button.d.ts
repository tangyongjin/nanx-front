import React from 'react';
import { ISubmitProps } from '../type';
export declare const Submit: ({ showLoading, ...props }: ISubmitProps) => JSX.Element;
export declare const Reset: React.FC<Omit<ISubmitProps, 'showLoading'>>;
