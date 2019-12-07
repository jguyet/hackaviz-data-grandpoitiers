'use strict';

const orm = require("orm");
const SDEModel = require("./models/SDE");

/**
 *  https://github.com/dresende/node-orm2
 */
module.exports = function(app) {

    app.use(orm.express("mysql://root:tishirt@localhost/dataviz", {
        define: function (db, models) {
            models.sde = SDEModel(orm, db);

            [
                models.sde
            ].forEach((model) => {
                model.syncPromise((x) => {
                    if (x) console.error(x);
                })
            });
        }
    }));
};