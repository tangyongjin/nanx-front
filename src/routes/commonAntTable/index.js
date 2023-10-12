
export default {

  onEnter: win_requireAuth, // add this
  path: 'table',
  component: require('../../components/layout').default,
  childRoutes: [
    {
      path: 'commonXTable',
      getComponent(nextState, cb) {
        import('./containers/commonXTable').then((m) => {
          cb(null, m.default)
        })
      }
    }
  ]
}