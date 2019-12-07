'use strict';

module.exports = function(app) {

var tableRoute = [
    [],//data
    ["Routes", "MethodType"]//fields
];
/**
 * Method for create routes 
 * @param {*} exp 
 */
const _ = function(exp) {
    var split = exp.split(' ');
    var methodType = split[0];
    var route = split[1];
    var s = split[2].split('.').filter(x => !!x);
    var func = s[s.length - 1].split('(')[0];
    var classe = '.' + s[0];
    var resourceController = require(classe);

    tableRoute[0].push({ Routes: route, MethodType: methodType });
    resourceController[func](app, methodType, route);
};

/**
 * @swagger
 * securityDefinitions:
 *   authentication:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

/**
 * @swagger
 * /search_query:
 *   get:
 *     summary: paginated list of SDE
 *     tags:
 *       - name: SDE
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: q
 *         description: query parameter
 *         required: false
 *         type: string
 *         in: query
 *       - name: page
 *         description: default 1
 *         required: false
 *         type: integer
 *         in: query
 *       - name: size
 *         description: default 20
 *         required: false
 *         type: integer
 *         in: query
 *     responses:
 *       200:
 *         description: empty
 *       404:
 *         description: empty
 */
_("GET /search_query ./exposition/controllers/SDEResourceController.search()");

/**
 * @swagger
 * /predict_query:
 *   get:
 *     summary: all list of SDE predicated
 *     tags:
 *       - name: SDE
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: q
 *         description: query parameter
 *         required: false
 *         type: string
 *         in: query
 *     responses:
 *       200:
 *         description: empty
 *       404:
 *         description: empty
 */
_("GET /predict_query ./exposition/controllers/SDEResourceController.predict()");

/**
 * @swagger
 * /sde/{recordid}:
 *   get:
 *     summary: get SDE by recordid
 *     tags:
 *       - name: SDE
 *     parameters:
 *       - in: path
 *         name: recordid
 *         description: sde id
 *         schema:
 *          type: UUID
 *     responses:
 *       200:
 *         description: empty
 *       404:
 *         description: empty
 */
_("GET /sde/:recordid ./exposition/controllers/SDEResourceController.get()");

tableRoute[0] = tableRoute[0].sort((a, b) => a.Routes > b.Routes ? 1 : -1);
console.table(tableRoute[0], tableRoute[1]);
};