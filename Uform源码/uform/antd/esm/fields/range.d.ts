import React from 'react';
export interface ISliderMarks {
    [key: number]: React.ReactNode | {
        style: React.CSSProperties;
        label: React.ReactNode;
    };
}
export declare type SliderValue = number | [number, number];
export interface ISliderProps {
    min?: number;
    max?: number;
    marks?: ISliderMarks;
    value?: SliderValue;
    defaultValue?: SliderValue;
    onChange?: (value: SliderValue) => void;
}
