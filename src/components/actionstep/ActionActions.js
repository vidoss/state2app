const ActionActionTypes = require('./ActionActionTypes');

function createAjaxAction() {
  return {
    type: ActionActionTypes.CREATE_AJAX_ACTION
  }
}

module.exports = {
  createAjaxAction
}
