import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

const CommonModal = inject('MenuStore')(
    observer((props) => {
        console.log('props: ', props);
        useEffect(() => {
            props.MenuStore.getMenuTreeByRoleCode();
        }, [props.MenuStore]);

        return <div>AAA</div>;
    })
);

export default CommonModal;
