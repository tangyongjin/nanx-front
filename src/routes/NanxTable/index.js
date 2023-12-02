import UrlProtect from '@/routes/urlProtect';
import { abortHandler } from '@/api/axiosInstance';
export default {
    onEnter: UrlProtect, // add this
    onLeave: () => {
        console.log(' 😮‍💨 🤥  😮‍💨 🤥  😮‍💨 🤥  😮‍💨 🤥  😮‍💨 🤥  😮‍💨 🤥  😮‍💨 🤥  😮‍💨 🤥  😮‍💨 🤥 onChange');
        // console.log('abortHandler: ', abortHandler);
        // abortHandler.abort();
    }, // add this

    path: 'table',
    component: require('@/layout/PortalLayout').default,
    childRoutes: [
        {
            path: 'commonXTable',
            getComponent(nextState, cb) {
                import('./NanxTableRoute').then((m) => {
                    cb(null, m.default);
                });
            }
        }
    ]
};
