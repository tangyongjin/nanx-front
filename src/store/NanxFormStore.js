import { observable, action, autorun } from 'mobx';
import { randomString } from '@/utils/tools';

class _NanxFormStore {
    constructor() {
        autorun(() => {
            if (this.SERIALNO == null) {
                this.SERIALNO = randomString(10);
                this.AlphaVersion = '_NanxFormStore' + randomString(10);
            }
        });
    }

    @observable buttonModalVisuble = false;
    @observable formWidth = 650; //缺省宽度
    @observable formTitle = null;
    @observable iconStr = null;

    @observable AlphaVersion = null;

    @action setAlphaVersion = (code) => {
        this.AlphaVersion = 'NanxFormStore_' + code;
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

    @action setFormProperties({ formWidth, formTitle, icon }) {
        this.setFormWidth(formWidth);
        this.setFormTitle(formTitle);
        this.setIconStr(icon);
        this.showButtonModal();
    }

    @action hideButtonModal = async () => (this.buttonModalVisuble = false);
    @action showButtonModal = async () => {
        this.buttonModalVisuble = true;
    };
}

export default _NanxFormStore;
