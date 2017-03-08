const { createActions } = require('redux-actions');

module.exports = createActions({

  SET_USER: [
    user => firebase => firebase.database()
                            .ref(`users/${user.uid}`)
                            .update({uid: user.uid})
                            .then(() => user),
    () => ({isFirebase: true})
  ]

});
