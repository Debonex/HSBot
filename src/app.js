/**
 * @author Debonex
 * @fileoverview express app, url routes
 * @date 2020年7月23日16:10:01
 */
var express = require('express')
var expressWs = require('express-ws')
const core = require('./core')

var app = express()
expressWs(app)

/**
 * request entry
 */
app.use(function(req,res,next){
    next()
})

app.ws('/',function(ws,req){
    core.register(ws)
})

app.listen(8082)