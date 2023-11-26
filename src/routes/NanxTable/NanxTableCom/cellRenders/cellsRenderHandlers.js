import IconRender from './IconRender';
import ImgRender from './ImgRender';
import OfficeDocuRender from './OfficeDocuRender';
import JsonRender from './JsonRender';

class CellsRenderHandlers {
    yesOrNoHandle(text) {
        if (!text) {
            return null;
        }
        return text === 'y' ? '是' : '否';
    }
}

CellsRenderHandlers.prototype.IconRender = IconRender;
CellsRenderHandlers.prototype.ImgRender = ImgRender;
CellsRenderHandlers.prototype.JsonRender = JsonRender;
CellsRenderHandlers.prototype.OfficeDocuRender = OfficeDocuRender;

export default new CellsRenderHandlers();
