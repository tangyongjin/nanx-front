import React from 'react';
import { message } from 'antd';
import { Button } from 'antd';
import IconWrapper from '@/utils/IconWrapper';

const DynaLoader = ({ NanxTableStore, buttonSelf }) => {
    const loadDynamic = async (file_path) => {
        try {
            let module = await require(`./${file_path}.js`).default;
            await NanxTableStore.setLazyButtonUsedCom(module);
        } catch (error) {
            console.error('Error loading dynamic component:', error);
        }
    };

    const handleButtonClick = async () => {
        console.log('按钮点击>>', buttonSelf);
        await loadDynamic(buttonSelf.file_path);
        // console.log('buttonSelf.file_path: ', buttonSelf.file_path);

        if (buttonSelf.form_show_spec == 'must_have') {
            if (NanxTableStore.selectedRows.length != 1) {
                message.error('请选择1条数据.');
                return;
            }
        }

        if (buttonSelf.file_path == 'refreshTable') {
            let IN = new NanxTableStore.lazyButtonUsedCom({ NanxTableStore: NanxTableStore });
            IN.componentDidMount();
            return;
        }

        if (buttonSelf.file_path == 'tableDel') {
            let IN = new NanxTableStore.lazyButtonUsedCom({ NanxTableStore: NanxTableStore });
            IN.componentDidMount();
            return;
        }

        if (buttonSelf.file_path == 'ResetPassword') {
            let IN = new NanxTableStore.lazyButtonUsedCom({ NanxTableStore: NanxTableStore });
            IN.componentDidMount();
            return;
        }

        await NanxTableStore.setFormWidth(buttonSelf.form_width);
        await NanxTableStore.setFormTitle(buttonSelf.form_title);
        await NanxTableStore.setIconStr(buttonSelf.icon);
        await NanxTableStore.showButtonModal();
    };

    return (
        <Button
            danger
            key={buttonSelf.id}
            className="table-button"
            type="primary"
            icon={IconWrapper(buttonSelf.icon)}
            style={{ marginRight: 5, marginBottom: 8 }}
            onClick={handleButtonClick}>
            {buttonSelf.title}
        </Button>
    );
};

export default DynaLoader;

// import React from 'react';
// import { message } from 'antd';
// import { Button } from 'antd';
// import IconWrapper from '@/utils/IconWrapper';

// const DynaLoader = ({ NanxTableStore, buttonSelf }) => {
//     const loadDynamic = async (file_path) => {
//         try {
//             let module = await require(`./${file_path}.js`).default;
//             await NanxTableStore.setLazyButtonUsedCom(module);
//         } catch (error) {
//             console.error('Error loading dynamic component:', error);
//         }
//     };

//     const handleButtonClick = async () => {
//         console.log('按钮点击>>', buttonSelf);
//         await loadDynamic(buttonSelf.file_path);
//         // console.log('buttonSelf.file_path: ', buttonSelf.file_path);

//         if (buttonSelf.form_show_spec == 'must_have') {
//             if (NanxTableStore.selectedRows.length != 1) {
//                 message.error('请选择1条数据.');
//                 return;
//             }
//         }

//         const noModalBtns = ['ResetPassword', 'refreshTable', 'tableDel'];

//         if (noModalBtns.includes(buttonSelf.file_path)) {
//             let IN = new NanxTableStore.lazyButtonUsedCom({ NanxTableStore: NanxTableStore });
//             IN.componentDidMount();
//             return;
//         }

//         await NanxTableStore.setFormWidth(buttonSelf.form_width);
//         await NanxTableStore.setFormTitle(buttonSelf.form_title);
//         await NanxTableStore.setIconStr(buttonSelf.icon);
//         await NanxTableStore.showButtonModal();
//     };

//     return (
//         <Button
//             danger
//             key={buttonSelf.id}
//             className="table-button"
//             type="primary"
//             icon={IconWrapper(buttonSelf.icon)}
//             style={{ marginRight: 5, marginBottom: 8 }}
//             onClick={handleButtonClick}>
//             {buttonSelf.title}
//         </Button>
//     );
// };

// export default DynaLoader;
