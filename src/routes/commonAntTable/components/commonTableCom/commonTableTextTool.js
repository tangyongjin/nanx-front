export default function getTextWidth(text) {
    const canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    context.font = '14px Microsoft YaHei';
    let textmetrics = context.measureText(text);
    return textmetrics.width;
}
