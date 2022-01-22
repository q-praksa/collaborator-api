const express = require('./express');
 
module.exports = async ({ expressApp}) => {
    await express({app: expressApp});

}