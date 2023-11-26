import React from 'react';
import { tryParseJSON } from '@/utils/tools';
import ReactJson from 'react-json-view';

const showJsonTree = (str) => {
    const parsedObject = tryParseJSON(str);

    if (parsedObject == null) {
        return <div>{str}</div>;
    } else {
        return <ReactJson src={parsedObject} theme="twilight" />;
    }
};

export default showJsonTree;
