const keymirror = require('keymirror');
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

const AjaxActionTemplate = `
  const <%= actionName %> = createAction(<%= type %>, WebAPI.<%= actionName %>})
`

const WebApiTemplate = `
  <%
    const expRegex = /\${([^}]+)?}/;
    let args = [];
    let match;
    while( match = expRegex.exec('<%= url%>') {
      args.push(match[1]);
    }
    let argsList = args.join(',')
  %>

  function <%= actionName %>(<%= argsList) %>) {
    return request.<%= verb %>(\`<%= url %>\`)
            .type('json')
            .accept('json')
            <% if (verb !== 'GET') { %>
              .send({<%= argsList %>})
            <% } %>
  }
`

module.exports = {
  ActionKind,
  HTTPVerbs,
  AjaxActionTemplate,
  WebApiTemplate,
  apiUrlPrefix
}
