var postOptions = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: null
}

var postFormOptions = {
    method: "POST",
    headers: {
        'Content-Type': 'multipart/form-body'
    },
    body: null
}

module.exports = {postOptions, postFormOptions} 
