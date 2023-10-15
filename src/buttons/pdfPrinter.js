import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PdfPrinter = (domCompoment, paperno) => {
    html2canvas(domCompoment, { scale: 2 }).then((canvas) => {
        // 返回图片dataURL，参数：图片格式和清晰度(0-1)
        const pageData = canvas.toDataURL('image/jpeg', 1.0);

        const dims = {
            a2: [1190.55, 1683.78],
            a3: [841.89, 1190.55],
            a4: [595.28, 841.89]
        };
        // 方向默认竖直，尺寸ponits，格式a2
        const pdf = new jsPDF('', 'pt', 'a4');
        const a4Width = dims.a4[0];
        const a4Height = dims.a4[1];

        const contentWidth = canvas.width,
            contentHeight = canvas.height;

        const pageHeight = (contentWidth / a4Width) * a4Height;
        let leftHeight = contentHeight;
        let position = 0;
        const imgWidth = a4Width,
            imgHeight = (a4Width / contentWidth) * contentHeight;

        if (leftHeight < pageHeight) {
            // addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
        } else {
            while (leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                leftHeight -= pageHeight;
                position -= a4Height;

                if (leftHeight > 0) {
                    pdf.addPage();
                }
            }
        }
        // var image = new Image();
        // image.src = '/flow.png';
        // pdf.addImage(image, 'PNG', 20, 680, 505, 200);
        pdf.save(paperno + '.pdf');
    });
};

export { PdfPrinter };
