const { query } = require('express');
const validator = require('validator');

module.exports = (queryTags) => {
    if (!queryTags) {
        return false;
    }

    if (!Array.isArray(queryTags)) {
        return false;
    }

    if (!(queryTags.every((i) => {return typeof i === 'string'}))) {
        return false;
    }

    queryTags.forEach((x, idx, queryTags) => {
        if (!validator.isEmpty(x) || !validator.isAlphanumeric(x)) {
            return false;
        }
    });

    return true;
}