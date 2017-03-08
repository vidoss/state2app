const keymirror = require('keymirror');
const {convertFromHTML} = require('draft-js');

const apiUrlPrefix = '/api/';
const ActionKind = keymirror({
  SIMPLE_ACTION: null,
  AJAX_ACTION:   null
});

const HTTPVerbs = keymirror({
  GET: null,
  POST: null,
  PUT: null,
  DELETE: null
});

const actionTypesTemplate = convertFromHTML(`
<pre>
{
  FETCH_: 'FETCH_'
};
</pre>
`);

const ajaxActionTemplate = convertFromHTML(`
<pre>
const createAction = require('redux-actions');
const getCustomerById = createAction(
  ActionTypes.FETCH_,
  WebAPI.get
);
</pre>
`);

const webApiTemplate = convertFromHTML(`
<pre>
const request = require('superagent');
const WebAPI = {
  get() {
    return request.get('/api/')
      .type('json')
      .accept('json')
  }
};
</pre>
`);

module.exports = {
  ActionKind,
  HTTPVerbs,
  apiUrlPrefix,
  webApiTemplate,
  actionTypesTemplate,
  ajaxActionTemplate
}
