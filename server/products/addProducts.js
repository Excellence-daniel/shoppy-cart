const express = require('express');
const app = express();

export const addProducts = (request, response) => {
    console.log(request.body, 'request')
}