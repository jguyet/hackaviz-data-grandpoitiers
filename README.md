# hackaviz-data-grandpoitiers

DEFIE 3: Consommations énergétiques de l’ensemble des secteurs d’activité (exprimée en énergie finale et en énergie primaire)

[Online Dataviz](http://jguyet-data-grandpoitiers.weoohh.com/)

<img src="./img/1.png">
<img src="./img/2.png">

#### ------------------------------------------------------------

#### INSTALLATION

#### Pres-requis: 
 1. installez un serveur Mysql puis créez une base de données nommée `dataviz`
 2. installez nodejs en version >= `v11.4.0`
 3. installez @angular/cli@latest >= `v8.3.8`

#### (1) Les données

##### Option (1) Avec le dump sql pré-formaté:
Créez une table qui accueillera notre donnée.
Puis importez depuis une interface web ou manuellement à l'aide des commandes mysql.
`mysql -u username -p database_name < dataviz.sql`

##### Option (2) Depuis data.grandpoitiers :
Allez sur https://data.grandpoitiers.fr/explore/dataset/sde_consommation_energie_primaire
Puis exportez les données en JSON dans l'onglet export.
Nommez le fichier de données en `sde_consommation_energie_primaire.json` puis placez le à côté du script `sde_json_to_mysql.php`
Ensuite changez dans le script `sde_json_to_mysql.php` à la ligne `42` à `45` les informations de votre base de données :
```
const host = "127.0.0.1";
const user = "root";
const pass = "password";
const name = "dataviz";
```
Créez une table nommée `sde_consommation_energie_primaire` avec les champs suivants :
```
CREATE TABLE `sde_consommation_energie_primaire` (
  `recordid` varchar(40) NOT NULL,
  `bilan_conso_energie_finale_mwh` float DEFAULT NULL,
  `nvx_equip` text,
  `scenario` text NOT NULL,
  `vecteur_energetique` text NOT NULL,
  `cat_primaire` text NOT NULL,
  `equip_chauffage` text NOT NULL,
  `zones` text NOT NULL,
  `usage_key` text NOT NULL,
  `cat_secondaire` text NOT NULL,
  `ss_cat_secondaire` text NOT NULL,
  `renovation` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```
Executez le script php en ligne de commande `php sde_json_to_mysql.php`

#### (2) Le front
Dans le dossier app, executez la commande `npm install`

Changez le endpoint dans la configuration, ouvrir les fichiers environements : `src/environements/environement.ts`
`src/environements/environement.dev.ts`
`src/environements/environement.prod.ts`
puis changez la ligne : `dataApi: 'http://37.44.236.91:8080'`
par `http://127.0.0.1:8080` si vous êtes en localhost.

Ensuite lancez l'application avec la commande cli `ng serve`

#### (3) Le backend

Dans le dossier api, executez la commande `npm install`

Changez les informations de base de données dans le fichier `database/Database.js`
A la ligne `11': changez `"mysql://root:password@localhost/dataviz"` par vos informations mysql.

Ensuite lancez l'api avec la commande `npm start server.js`

#### (4) Pour finir
Allez maintenant dans votre navigateur favori a l'adresse suivante `http://localhost:4200`

#### ------------------------------------------------------------

#### DONNÉES ISSUES DU MODÈLE ÉNERGÉTIQUE

Sur la base des données de l’AREC Nouvelle-Aquitaine (Agence Régionale d’Evaluation environnement et Climat), les productions et consommations d’énergie ont été modélisés sur le territoire de Grand Poitiers par une équipe de prestataires coordonnée par la société Artelys.
Des acteurs publics et privés ont été associés par Grand Poitiers afin de définir un scénario chiffré de transition énergétique du territoire.
Cette démarche a abouti à une feuille de route ambitieuse à l'horizon 2030, adoptée par le Conseil communautaire de Grand Poitiers :
- réduire de 25% les consommations d'énergie
- porter à 38% la part des énergies renouvelables (contre 8% aujourd’hui)

Les données suivantes sont disponibles en open data :

- consommations énergétiques de l’ensemble des secteurs d’activité (exprimée en énergie finale et en énergie primaire)
- émissions de gaz à effet de serre liées à ces consommations d’énergie
- productions d’énergies renouvelables

Chaque jeu de donnée est disponible à 2 échelles de temps : situation initiale issue du diagnostic et scénario retenu à l’horizon 2030.

#### INFORMATIONS PAGE CITY

Récupération des villes présentes dans la donnée issue de data.grandpoitiers.
Procédure de transformation des données :
- Sélection des champs vecteur_energetique distinct.
- Affichage d'un panel de bouton pour accéder à la dataviz.

#### INFORMATIONS PAGE DATA

A l'aide du nom de la ville, une prévision des consommations énérgetiques, suivants différentes catégories, a été généré.
Les Catégories sont les suivantes :
- Chauffage Urbain
- Electricite
- ENR Thermiques
- Fioul
- Gaz Naturel
- GPL
- Produits Petroliers

Pour chaques types d'énergies les multiples données ont été assemblé en une seule et unique valeur par catégorie.
Le champs bilan_conso_energie_finale_mwh contient la valeur de la consomation d'un SDE (Schéma Directeur Energie).
les scenarios = 2013 de même type d'énergie et de même zone ont été comptabilisé
les scenarios = 2030 (S2_Volontariste) de même type d'énergie et de même zone ont été comptabilisé
Une fois ces valeurs rassemblées, nous avons une valeur de départ pour 2013 et une valeur d'objectif pour 2030.
Nous pouvons donc prévoir une augmentation ou une diminution de la consommation pour les années entre ces deux valeurs puis les rendre visible.

#### INFORMATIONS PAGE API

Exemple d'un retour de valeurs rassemblées pour une même zone pour toutes les catégories d'énergies de 2013 et 2030 (objectif)

#### TECHNO UTILISÉ
Front-end :
- Language: Angular, version 8.3.20
- Interface Graphique Full Material.
- Utilisation de programmation fonctionnnel (Reactive) RXJS.

Pourquoi Angular ?
- Angular car j'ai une bonne connaissance de ce framework.

Back-end :
- Language: Nodejs, version > 11.4
- Exposition de l'api à l'aide de Swagger UI adapté pour nodejs.
- Base de données Mysql (transformation de la donnée data.grandpoitiers (json) à l'aide de script codé en php)
Pourquoi ? Mais Pourquoi ce faire autant de mal ?
- J'aurais vraiment voulu apprendre Spark sur ce Hackaviz, mais le peu de temps que j'avais de disponible ne me permetais pas de perdre du temps sur une techno que je ne connais pas.

#### ------------------------------------------------------------

#### CRÉDIT
Écrit/Codé par Jérémy Guyet développeur jguyet.weoohh@gmail.com

Remerciement à la #teamData pour l'organisation de cet évenement.
