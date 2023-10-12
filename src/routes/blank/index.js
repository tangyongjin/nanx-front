
export default {

    onEnter: win_requireAuth, // add this
    path: 'blank',
    component: require('../../components/layout').default,
    childRoutes: [
      {
        path: 'blank',
        getComponent(nextState, cb) {
          import('./containers/blank').then((m) => {
            cb(null, m.default)
          })
        }
      }
    ]
  }