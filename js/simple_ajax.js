var ajax = function(params) {
  // TODO Validate the necessary parameters
  var xhr = new XMLHttpRequest();

  // TODO add all the parameters of xhr
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        params.onSuccess(this);
      } else if (params.failCallback) {
        params.onFailCallback(this);
      }
    }
  };

  // Timeout
  if (params.timeout) {
    xhr.timeout = params.timeout;
    xhr.ontimeout = params.timeoutCallback(this);
  }

  if (params.withCredentials) xhr.withCredentials = true;

  if (params.data && params.method === 'GET') {
    // TODO suppport different content type
    var data = [];
    for (var key in params.data) {
      data.push(key + '=' + params[key]);
    }
    params.url += ( '?' + data.join('&'));
  }

  if (params.user && params.pasword) xhr.open(params.method, params.url, params.async ? params.async : true, params.user, params.password);
  else if (params.user) xhr.open(params.method, params.url, params.async ? params.async : true, params.user);
  else if (params.async) xhr.open(params.method, params.url, params.async);

  for (var key in params.headers) {
    xhr.setRequestHeader(key, params.headers[key]);
  }

  if (params.data) xhr.send(JSON.stringify(params.data));
  else xhr.send();
};
