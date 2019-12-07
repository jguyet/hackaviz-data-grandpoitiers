# hackaviz-data-grandpoitiers

DEFIE 3: Consommations énergétiques de l’ensemble des secteurs d’activité (exprimée en énergie finale et en énergie primaire)

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

Récuperation des villes présentes dans la données issue de data.grandpoitiers.
Procédure de transformation des données :
- Sélection des champs vecteur_energetique distinct.
- Affichage d'un panel de bouton pour accéder à la dataviz.

#### INFORMATIONS PAGE DATA

A l'aide du nom de la ville une prévision des consommations énérgetiques suivants différentes catégories a été généré.
Les Catégories sont les suivantes :
- Chauffage Urbain
- Electricite
- ENR Thermiques
- Fioul
- Gaz Naturel
- GPL
- Produits Petroliers

Pour chaques types d'énergies les multiples données ont été assemblé en une seul et unique valeur par catégorie.
le champs bilan_conso_energie_finale_mwh contient la valeur de la consomation d'un SDE (Schéma Directeur Energie).
les scenario = 2013 de même type d'énergie et de même zone ont été comptabilisé
les scenario = 2030 (S2_Volontariste) de même type d'énergie et de meme zone ont été comptabilisé
Une fois ces valeurs rassemblées, nous avons une valeur de départ pour 2013 et une valeur d'objectif pour 2030.
Nous pouvons donc prevoir une augmentation ou une diminution de la consommation pour les années entre ces deux valeurs puis les rendre visible.

#### INFORMATIONS PAGE API

Exemple d'un retour de valeurs rassemblé pour une même zone pour toutes les catégories d'énergies de 2013 et 2030 (objectif)

#### TECHNO UTILISÉ
Front-end :
- Language: Angular, version 8.3.20
- Interface Graphique Full Material.
- Utilisation de programmation fonctionnnel (Reactive) RXJS.

Pourquoi Angular ?
- Angular car j'ai une bonne connaissance de ce framework.

Back-end :
- Language: Nodejs, version > 11.4
- Exposition de l'api à l'aide de Swagger UI adapter pour nodejs.
- Base de données Mysql (transformation de la donnée data.grandpoitiers (json) à l'aide de script codé en php)
Pourquoi ? Mais Pourquoi ce faire autant de mal ?
- J'aurais vraiment voulu apprendre Spark sur ce Hackaviz, le peu de temps que j'avais de disponible ne me permetais pas de perdre du temps sur une techno que je ne connais pas.

#### CRÉDIT
Écrit/Codé par Jérémy Guyet développeur jguyet.weoohh@gmail.com

Remerciement à la #teamData pour l'organisation de cette évenement.
