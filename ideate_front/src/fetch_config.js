const postOptions = () => {
    return {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: null
    }
}

const postFormOptions = () => {
    return {
        method: "POST",
        body: null
    }
}

module.exports = {postOptions, postFormOptions} 
