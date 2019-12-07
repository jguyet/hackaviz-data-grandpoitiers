'use strict';

module.exports = function(app, db) {
    return db.define("sde_consommation_energie_primaire", {
        recordid                       : { type: 'text', size: 40, key: true },
        bilan_conso_energie_finale_mwh : { type: 'integer', size: 8, defaultValue: 0},
        nvx_equip                      : { type: 'text', big: true },
        scenario                       : { type: 'text', big: true },
        vecteur_energetique            : { type: 'text', big: true },
        cat_primaire                   : { type: 'text', big: true },
        equip_chauffage                : { type: 'text', big: true },
        zones                          : { type: 'text', big: true },
        usage_key                      : { type: 'text', big: true },
        cat_secondaire                 : { type: 'text', big: true },
        ss_cat_secondaire              : { type: 'text', big: true },
        renovation                     : { type: 'text', big: true }
    }, {
        hooks: {},
        methods: {},
        validations: {}
    });
};