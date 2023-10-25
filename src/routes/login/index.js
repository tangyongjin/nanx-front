
export default {
  childRoutes: [
    {
      path: 'login',
      getComponent(nextState, cb){
        import('./containers/Login').then((m)=> {
          cb(null, m.default)
        })
      }
    }
  ]
};
