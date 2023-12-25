import { observable, action, autorun } from 'mobx';
import { randomString } from '@/utils/tools';

class _NanxFormSTore {
    constructor() {
        autorun(() => {
            if (this.SERIALNO == null) {
                this.SERIALNO = randomString(10);
                this.AlphaVersion = '_NanxFormSTore' + randomString(10);
            }
        });
    }

    @observable buttonModalVisuble = false;
    @observable formWidth = 650; //缺省宽度
    @observable formTitle = null;
    @observable iconStr = null;

    @observable AlphaVersion = null;

    @action setAlphaVersion = (code) => {
        this.AlphaVersion = 'NanxTBS_' + code;
    };

    @action setFormTitle = (formTitle) => {
        this.formTitle = formTitle;
    };

    @action setFormWidth = (width) => {
        if (width) {
            console.log('width: ', width);
            this.formWidth = width;
        }
    };

    @action setIconStr = (str) => {
        this.iconStr = str;
    };

    @action hideButtonModal = async () => (this.buttonModalVisuble = false);
    @action showButtonModal = async () => {
        this.buttonModalVisuble = true;
    };
}

export default _NanxFormSTore;
