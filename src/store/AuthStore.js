import { observable, action } from 'mobx';

class _AuthStore {
    @observable _value = null;
    @observable _loading = false;
    @observable _timeStamp = '00:00:00';
    @observable _runningStacks = [];

    @action addRunnitem = (uuid) => {
        if (document.getElementById('navbar_preloader')) {
            document.getElementById('navbar_preloader').style.display = 'block';
        }

        this._runningStacks.push(uuid);
        this.setLoading(true);
    };

    @action delRunnitem = (uuid) => {
        // 根据 uuid删除数组中一项
        this._runningStacks = this._runningStacks.filter((item) => item !== uuid);
        if (this._runningStacks.length == 0) {
            if (document.getElementById('navbar_preloader')) {
                document.getElementById('navbar_preloader').style.display = 'none';
            }

            this.setLoading(false);
        }
    };

    @action setTimeStamp = (neweValue) => {
        this._timeStamp = neweValue;
    };

    @action setLoading = async (loadingState) => {
        // if (loadingState) {
        //     console.log('show Loading');
        //     console.log(document.getElementById('appLoading'));
        //     document.getElementById('appLoading').style.display = 'block';
        // } else {
        //     console.log('hide Loading');
        //     document.getElementById('appLoading').style.display = 'none';
        // }

        this._loading = loadingState;
    };

    @action setValue = async (neweValue) => {
        this._value = neweValue;
    };
}

const AuthStore = new _AuthStore();
export default AuthStore;
