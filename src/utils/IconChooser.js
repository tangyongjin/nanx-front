import React from 'react';
import * as antIcons from '@ant-design/icons';

const IconSet = [
    'icon-a-DefineFunction',
    'icon-chatgpt',
    'icon-ChatGPT',
    'icon-chatgpticon',
    'icon-CSV',
    'icon-dashboard',
    'icon-DATA',
    'icon-dianzihuadan',
    'icon-dianziyoujian',
    'icon-Download',
    'icon-Download1',
    'icon-ECEL',
    'icon-EML',
    'icon-excel',
    'icon-function',
    'icon-GIF',
    'icon-gpt',
    'icon-Icon-fill-question',
    'icon-JPG',
    'icon-mimazidian',
    'icon-OUTLOOK',
    'icon-pdf',
    'icon-PDF',
    'icon-PDF1',
    'icon-PDF2',
    'icon-PNG',
    'icon-ppt',
    'icon-PPT',
    'icon-preview',
    'icon-TET',
    'icon-top-dashboard',
    'icon-tupianziliao',
    'icon-upload',
    'icon-Upload',
    'icon-upload1',
    'icon-Upload1',
    'icon-upload2',
    'icon-VIDEO',
    'icon-view',
    'icon-word',
    'icon-WORD',
    'icon-word1',
    'icon-word2',
    'icon-zijinfenxi',
    'icon-zip',
    'icon-zip1',
    'icon-zonghewendang'
];

const IconChooser = (props) => {
    const { icon: IconText } = props;

    if (IconSet.includes(IconText)) {
        let dashname = `#${IconText}`;
        return (
            <svg style={{ fontSize: '24px' }} className="icon" aria-hidden="true">
                <use href={dashname}></use>
            </svg>
        );
    } else {
        return React.createElement(antIcons[IconText]);
    }
};
export default IconChooser;
