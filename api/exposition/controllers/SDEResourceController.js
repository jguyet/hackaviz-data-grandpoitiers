'use strict';
const { query } = require('express-validator/check');
const { AddRoute, Validation, ValidationStep } = require('../../shared/services/security/Filter');
const { Code } = require('../../shared/services/security/Code');
const { match } = require('../../shared/patternMatching');

const SDEController = require('../../application/controllers/SDEController');

const SDEResourceController = {
    search: (app, type, route) => AddRoute(app, type, route,
        //////////////////////////////////////////////////////////
        // Validation ->
        //////////////////////////////////////////////////////////
        [
            Validation('query:q', [
                ['optional'],
                ['isString', Code.FIELD_TYPE]
            ]),
            Validation('query:page', [
                ['optional'],
                ['isNumeric', Code.FIELD_TYPE]
            ]),
            Validation('query:size', [
                ['optional'],
                ['isNumeric', Code.FIELD_TYPE]
            ]),
            ValidationStep
        ],
        //////////////////////////////////////////////////////////
        // Entry point ->
        //////////////////////////////////////////////////////////
        (req, res) => SDEController.searchByPage(req, res, req.query.q, req.query.page, req.query.size)),
    predict: (app, type, route) => AddRoute(app, type, route,
            //////////////////////////////////////////////////////////
            // Validation ->
            //////////////////////////////////////////////////////////
            [
                Validation('query:q', [
                    ['optional'],
                    ['isString', Code.FIELD_TYPE]
                ]),
                ValidationStep
            ],
            //////////////////////////////////////////////////////////
            // Entry point ->
            //////////////////////////////////////////////////////////
            (req, res) => SDEController.predictByZone(req, res, req.query.q)),
    get: (app, type, route) => AddRoute(app, type, route,
        [
            //////////////////////////////////////////////////////////
            // Validation ->
            //////////////////////////////////////////////////////////
            Validation('param:recordid', [
                ['exists', Code.EMPTY_FIELD],
                ['isString', Code.FIELD_TYPE]
            ]),
            ValidationStep,
            /**
             * Check on database if exists
             */
            function(req, res, next) {
                req.models.sde.get(req.params.recordid, function(err, sde) {
                    match(sde)
                    ([
                        (/* success */) => {
                            req._sde = sde;
                            next();
                        },
                        [undefined, (/* failed */) => {
                            req._validationErrors.push({ param: "sde", msg: { code: 1500, text: "recordid doesn't exists" } });
                            next();
                        }]//Doesn't exists
                    ]);
                });
            },
            ValidationStep
        ],
        (req, res) => SDEController.get(req, res))
};

module.exports = SDEResourceController;