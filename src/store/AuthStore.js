import { observable, action } from 'mobx';

class _AuthStore {
    // constructor() {
    //     makeAutoObservable(this, {
    //         _value: observable,
    //         _loading: observable,
    //         _timeStamp: observable,
    //         _runningStacks: observable,
    //         set2029: action,
    //         setLoading: action,
    //         setTimeStamp: action,
    //         addRunnitem: action,
    //         delRunnitem: action
    //     });
    // }

    @observable _value = null;
    @observable _loading = false;
    @observable _timeStamp = '00:00:00';
    @observable _runningStacks = [];

    @action addRunnitem = (uuid) => {
        if (document.getElementById('preloader')) {
            document.getElementById('preloader').style.display = 'block';
        }

        this._runningStacks.push(uuid);
        this.setLoading(true);
    };

    @action delRunnitem = (uuid) => {
        // 根据 uuid删除数组中一项
        this._runningStacks = this._runningStacks.filter((item) => item !== uuid);
        if (this._runningStacks.length == 0) {
            if (document.getElementById('preloader')) {
                document.getElementById('preloader').style.display = 'none';
            }

            this.setLoading(false);
        }
    };

    @action setTimeStamp = (neweValue) => {
        this._timeStamp = neweValue;
    };

    @action setLoading = async (loadingState) => {
        this._loading = loadingState;
    };

    @action setValue = async (neweValue) => {
        this._value = neweValue;
    };

    // sysLogin = async (values) => {
    //   let loginresult = await api.sysLogin(values);
    //   console.log(loginresult);
    //   return loginresult;
    // };
}

const AuthStore = new _AuthStore();
export default AuthStore;
