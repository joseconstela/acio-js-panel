/**
* @summary Holds the current job information
* @type {Object}
*/
var currentJob = {
  _id: '',
  type: '',
  code: '',
  libraries: []
};

var workerId = null;

/**
* @summary Sends a message to aciojs library
* @param {String[]} msg Array containing the messages to be logged
*/
function log(message) {
  var def = { workerId: workerId };
  postMessage( JSON.stringify ( extend(def, message) ) );
}

/**
* @summary [function description]
* @param  {[type]} data [description]
*/
function result(data, opts) {
  log({
    type: 'result',
    jobId: currentJob._id,
    result: extend({data:data}, opts)
  });
}

/**
* @summary Executes the currentJob's code.
*/
function execute() {
  try {
    currentJob.libraries.forEach(function(l) {
      importScripts(l);
    })
    var code = decodeURIComponent(escape( currentJob.code ));
    eval(code);
  } catch (ex) {
    // TODO error handling
    log({
      status: 'error',
      error: ex.message
    });
  }
}

/**
* [extend description]
* @param  {[type]} m [description]
* @param  {[type]} e [description]
* @return {[type]}   [description]
*/
function extend(m, e) {
  var e = e || this;
  for (var x in m) e[x] = m[x];
  return e;
}

/**
* @summary [onmessage description]
* @param  {object} ev [description]
*/
onmessage = function (ev) {
  var d = ev.data;
  workerId = d.workerId;
  if(d.type === 'job') {
    currentJob = d.job;
    execute();
  }
};
