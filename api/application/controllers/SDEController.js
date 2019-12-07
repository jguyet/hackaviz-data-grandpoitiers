'use strict';

const { match } = require('../../shared/patternMatching');
var MID = require('monotonic-id');

/**
 * @Controller
 * Search to the sde database from Query and pages numbers / Sizing
 */
exports.searchByPage = function(req, res, query = "", page = 1, size = 20) {

    if (query.includes("distinct")) {
        const distinct = query.split("=")[1].split("\"").filter(x => x != "")[0];
        req.models.sde.aggregate().distinct(distinct).groupBy(distinct).get(function(err, result) {
            if (err) { console.log(err); }
            const sdesDistincts = JSON.parse(JSON.stringify(result)).map(x => x['distinct_' + distinct]);
            res.setHeader('Total-Count', sdesDistincts.length);
            res.status(200).send(sdesDistincts);
        });
        return ;
    }

    const formatedQuery = query.split("&")
        .filter(x => x != "" && x.includes("="))
        .map(x => ({ [x.split("=")[0]]: x.split("=")[1].split("\"").filter(x => x != "")[0] }))
        .reduce((a, b) => ({ ... a, ... b }), {});

    console.log(formatedQuery);

    req.models.sde
    .find(formatedQuery, Number(size)/** limit */)
    .offset(size * (page - 1))
    .run(function(err, result) {
        if (err) { console.log(err); }
        const sdes = JSON.parse(JSON.stringify(result)).map(x => {
            var program = x.extra;
            delete x.extra;
            x.program = program;
            return x;
        });

        req.models.sde.count(formatedQuery, function(err, result) {
            if (err) { console.log(err); }
            res.setHeader('Total-Count', result);
            res.status(200).send(sdes);
        });
    });
};

/**
 * @Controller
 * Search to the sde database from Query and pages numbers / Sizing
 */
exports.predictByZone = function(req, res, query = "") {

    const formatedQuery = query.split("&")
        .filter(x => x != "" && x.includes("="))
        .map(x => ({ [x.split("=")[0]]: x.split("=")[1].split("\"").filter(x => x != "")[0] }))
        .reduce((a, b) => ({ ... a, ... b }), {});

    if (Object.keys(formatedQuery).length == 0) {
        res.setHeader('Total-Count', 0);
        res.status(200).send([]);
        return ;
    }

    req.models.sde
    .find({ ... formatedQuery, scenario: "S2_Volontariste" })
    .run(function(err, result) {
        if (err) {
            console.log(err);
            res.setHeader('Total-Count', 0);
            res.status(200).send([]);
            return ;
        }
        var sdes = JSON.parse(JSON.stringify(result)).map(x => {
            var program = x.extra;
            delete x.extra;
            x.program = program;
            return x;
        });


        req.models.sde
        .find({ ... formatedQuery, scenario: "2013" })
        .run(function(err2, result2) {
            if (err2) {
                console.log(err2);
                res.setHeader('Total-Count', 0);
                res.status(200).send([]);
                return ;
            }
            var sdes2 = JSON.parse(JSON.stringify(result2)).map(x => {
                var program = x.extra;
                delete x.extra;
                x.program = program;
                return x;
            });

            // remove non distincts
            /*sdes = sdes.filter(x => sdes2.filter(y => {
                if (y["vecteur_energetique"] != x["vecteur_energetique"]){
                    return false;
                }
                if (y["cat_primaire"] != x["cat_primaire"]){
                    return false;
                }
                if (y["equip_chauffage"] != x["equip_chauffage"]){
                    return false;
                }
                return true;
            }).length == 1);*/

            var ar = {};
            sdes2.forEach((a) => {
                if (ar[a["vecteur_energetique"]] == undefined) {
                    ar[a["vecteur_energetique"]] = { bilan_conso_energie_finale_mwh: a["bilan_conso_energie_finale_mwh"], objectif_bilan_conso_energie_finale_mwh: 0 };
                    //console.log(a["vecteur_energetique"]);
                } else {
                    const lastv = ar[a["vecteur_energetique"]];
                    ar[a["vecteur_energetique"]] = { bilan_conso_energie_finale_mwh: lastv["bilan_conso_energie_finale_mwh"] + a["bilan_conso_energie_finale_mwh"], objectif_bilan_conso_energie_finale_mwh: 0 };
                }
            });

            sdes.forEach((a) => {
                if (ar[a["vecteur_energetique"]] == undefined) {
                    ar[a["vecteur_energetique"]] = { bilan_conso_energie_finale_mwh: 0, objectif_bilan_conso_energie_finale_mwh: a["bilan_conso_energie_finale_mwh"] };
                    //console.log(a["vecteur_energetique"]);
                } else {
                    const lastv = ar[a["vecteur_energetique"]];

                    if (lastv["objectif_bilan_conso_energie_finale_mwh"] == undefined) {
                        lastv["objectif_bilan_conso_energie_finale_mwh"] = 0;
                    }
                    ar[a["vecteur_energetique"]] = { ... ar[a["vecteur_energetique"]], objectif_bilan_conso_energie_finale_mwh: lastv["objectif_bilan_conso_energie_finale_mwh"] + a["bilan_conso_energie_finale_mwh"] };
                }
            });

            res.setHeader('Total-Count', Object.keys(ar).length);
            res.status(200).send(ar);

        });
    });
};

exports.get = function(req, res) {
    res.status(200).send(JSON.parse(JSON.stringify(req._sde)));
};