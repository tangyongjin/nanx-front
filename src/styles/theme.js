// colorPrimary: '#225e04',
// colorInfo: '#225e04',

const themeJson = {
    token: {
        colorPrimary: '#3B3B47',
        colorInfo: '#3B3B47',
        colorTextBase: '#000000ef',
        borderRadius: 3,
        headerPadding: '150px',
        controlWidth: 312
    },

    components: {
        Input: {
            hoverBorderColor: 'rgb(82, 196, 26)',
            activeBorderColor: 'rgb(82, 196, 26)',
            colorError: 'rgb(82, 196, 26)',
            colorErrorBorderHover: 'rgb(72, 182, 19)'
        },

        InputNumber: {
            controlWidth: 312,
            algorithm: false,
            colorPrimaryHover: 'red',
            hoverBorderColor: 'rgb(82, 196, 26)',
            activeBorderColor: 'rgb(82, 196, 26)',
            handleHoverColor: 'rgb(82, 196, 26)',
            colorError: 'rgb(82, 196, 26)',
            colorErrorBorderHover: 'rgb(72, 182, 19)'
        },

        Menu: {
            groupTitleColor: 'rgba(245, 237, 237, 0.45)',
            dangerItemActiveBg: 'rgb(70, 187, 13)',
            algorithm: true,
            itemBg: '#032c05',
            darkItemColor: 'rgba(245, 237, 237, 0.45)',
            darkItemBg: '#032c05',
            darkSubMenuItemBg: '#032c05',
            itemColor: 'rgba(245, 237, 237, 0.45)',
            itemHoverColor: 'rgb(160, 217, 17)',
            colorText: 'rgba(245, 237, 237, 0.45)',
            itemHoverBg: 'rgb(82, 196, 26)',
            itemActiveBg: 'rgb(82, 196, 26)',
            lightSiderBg: '#ff0000',
            itemBorderRadius: '1',
            subMenuItemBorderRadius: 1
        },
        Upload: {
            colorError: 'rgb(250, 84, 28)'
        },
        Message: {
            colorWarning: 'rgb(82, 196, 26)'
        },

        Layout: {
            lightSiderBg: '#ffffff',
            headerPadding: '0 0 0 0',
            bodyBg: '#ffffff',
            headerBg: '#ffffff',
            siderBg: '#032c05'
        },
        Button: {
            controlHeight: '30px',
            defaultBorderColor: '#366503',
            primaryShadow: '0 10px 0px 0px #15ff000',
            defaultShadow: '0px 0px 0px 0px #ffffff'
        },
        Table: {
            borderColor: '#b3bab0'
        }
    }
};

export default themeJson;
