/**
 * @author Debonex
 * @fileoverview register handlers for new Websockets.
 * @date 2020年7月23日16:10:55
 */

var config = require('../configs/core.json')

/**
 * 1. load all configed plugins
 * 2. push plugins which can handle msgs into handlePlugins
 */
var handlePlugins = []
for (let plugin of config.plugins) {
    var p = require('./plugins/' + plugin)
    if (p.handle != undefined) handlePlugins.push(p)
}


const register = function (ws) {
    console.log('WebSocket established')
    ws.on('message', function (msg) {
        console.log('recieve: ' + msg)
    })
    for (let i = 0; i < handlePlugins.length; i++) {
        handlePlugins[i].handle(ws)
    }
}


exports.register = register