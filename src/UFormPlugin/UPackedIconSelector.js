import React from 'react';
import { Input as AntInput } from 'antd';
import { compose, mapStyledProps, mapTextComponent } from './uformHelpers/UFormUtils';
import { registerFormField, connect } from '@uform/react';
import IconToggleButton from '@/component/IconToggleButton';
import IconLister from '@/component/iconLister';

const WrapperAntStringComomnet = (TarGet) => {
    return class Select extends React.Component {
        constructor(props) {
            super(props);
            console.log('props: ', props);
        }

        state = { ifShowList: false };
        toggleShow = () => {
            this.setState((prevState) => ({
                ifShowList: !prevState.ifShowList
            }));
        };

        render() {
            const uploadCallbackRender = (iconStr) => {
                let tarGetField = this.props.field_id;
                console.log('iconStr: ', iconStr);
                let tarGetValue = iconStr;

                this.props.actions.setFormState((state) => {
                    state.values = {
                        ...state.values,
                        [tarGetField]: tarGetValue
                    };
                });
            };

            return (
                <div>
                    <TarGet readOnly style={{ width: '312px' }} placeholder={'请输入....'} {...this.props} />
                    <IconToggleButton ifShowList={this.state.ifShowList} toggleShow={this.toggleShow} />
                    <IconLister ifShowList={this.state.ifShowList} callbackRender={uploadCallbackRender} />
                </div>
            );
        }
    };
};

const mapStringValue = (props) => {
    return props;
};

const Input = WrapperAntStringComomnet(AntInput);

const UPackedIconSelector = connect({
    getProps: compose(mapStyledProps, mapStringValue),
    getComponent: mapTextComponent
})(Input);

registerFormField('UPackedIconSelector', UPackedIconSelector);
export { UPackedIconSelector };
