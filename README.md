# Pizza-API
## Description

Ce projet à été réalisé pour faire des appels à notre API Pizza (CRUD).

## Pré-requis
### Git - version control system (VCS)
- **Installation** : https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- **Vérification** :
```bash
git --version
```
- **Obtenu** :
```
git version 2.51.1
```
### JetBrains IntelliJ - Integrated Development Environment (IDE)
- **Installation** : https://www.jetbrains.com/help/idea/installation-guide.html
- **Vérification** :
```bash
webstorm --version
```
- Obtenu :
```
WebStorm 2025.2.4
Build #WS-252.27397.92
```
### Node JS - Framework js
- **Installation** : https://nodejs.org/en/download/
- **Vérification** :
```bash
node --version
```
- Obtenu :
```
v22.18.0
```
### NPM - Gestion de dépendances pour Java script
- **Installation** : [Il est recommendé d'installer NPM en même temps que Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
  [se réferer à l'installation de Node JS](https://nodejs.org/en/download/).
- **Vérification** :
```bash
npm --version
```
- Obtenu :
```
11.5.2
```

### Configuration

#### Comment mettre en place la base de donnée ?
Exécutez le fichier `Documentation/MCD_MLD/Create_table.sql` pour obtenir une base de donnée d'exemple.

## Déploiement
1. Créer un fichier `.env` à la racine du dossier avec:
```env
PORT=3000
HOST=localhost
PSEUDO=votre_utilisateur
PASSWORD=votre_mot_de_passe
DATABASE=nom_bdd
```

2. exécutez `npm install`
3. exécutez `npm run dev`

## Structure du dossier

```shell
├───controllers
├───db
├───Documentation
│   └───MCD_MLD
├───helpers
├───loaders
├───middlewares
├───models
├───node_modules
├───routes
└───services
```

