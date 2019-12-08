<?php

set_time_limit(100000);
ini_set('memory_limit', '-1');
setlocale(LC_TIME, "fr_FR");

function insert($bdd) { 
    $contains = false;
    $content = file_get_contents('./sde_consommation_energie_primaire.json');
    $obj = json_decode($content);
    $i = 0;

    foreach($obj as $value) {
        
        echo $i.''.PHP_EOL;

        $recordid = $value->recordid;
        $bilan_conso_energie_finale_mwh = $value->fields->bilan_conso_energie_finale_mwh;
        $nvx_equip = $value->fields->nvx_equip;
        $scenario = $value->fields->scenario;
        $vecteur_energetique = $value->fields->vecteur_energetique;
        $cat_primaire = $value->fields->cat_primaire;
        $equip_chauffage = $value->fields->equip_chauffage;
        $zones = $value->fields->zones;
        $usage = $value->fields->usage;
        $cat_secondaire = $value->fields->cat_secondaire;
        $ss_cat_secondaire = $value->fields->ss_cat_secondaire;
        $renovation = $value->fields->renovation;

        try {
        
            $req = $bdd->query('INSERT INTO `sde_consommation_energie_primaire` (`recordid`, `bilan_conso_energie_finale_mwh`, `nvx_equip`, `scenario`, `vecteur_energetique`, `cat_primaire`, `equip_chauffage`, `zones`, `usage_key`, `cat_secondaire`, `ss_cat_secondaire`, `renovation`) VALUES ("'.$recordid.'", '.$bilan_conso_energie_finale_mwh.', "'.$nvx_equip.'", "'.$scenario.'", "'.$vecteur_energetique.'", "'.$cat_primaire.'", "'.$equip_chauffage.'", "'.$zones.'", "'.$usage_key.'", "'.$cat_secondaire.'", "'.$ss_cat_secondaire.'", "'.$renovation.'")');

        } catch (Exception $e) {
            $contains = true;
        }
        $i++;
    }
    return $contains;
}

const host = "127.0.0.1";
const user = "root";
const pass = "password";
const name = "dataviz";

try {
    $bdd = new PDO('mysql:host='.constant("host").';dbname='.constant("name"),constant("user"),constant("pass"));
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $bdd->query('SET NAMES utf8');
} catch (Exception $e) {
    die("MySQL Error !");
}


insert($bdd);

?>