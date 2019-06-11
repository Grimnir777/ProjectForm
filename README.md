# ProjectForm - QCM Interactif

Projet sur une semaine consistant à créer un site web de QCM interactif.

## Présentation du projet

Le projet consiste à créer un site web où l'on peut créer et participer à des QCMs. Nous avions le choix concernant les technologies.

Nous avons choisi ces technologies :
* AngularJS (front)
* NodeJS avec une surcouche TypeScript (back)
* MongoDB (base de données)

### Installation

Pour installer le projet:
1. Vérifier d'avoir la dernière version de *Node.js* et d'*AngularJS*
2. Vérifier d'avoir une instance de mongoDB en route
3. Cloner le répertoire `git clone https://github.com/Grimnir777/ProjectForm`
4. Dans le fichier `frontend\src\app\web-socket.service.ts` ,remplacer l'*uri* par `http://localhost:3000/QCMs`
5. Dans le fichier `frontend\src\app\package.json`, remplacer la commande `"start": "ng serve --host 0.0.0.0"` par `"start": "ng serve"`
6. Dans le fichier `frontend\src\environments\environment.ts`, remplacer la constante *environment* par :
```javascript
export const environment = {
  production: false,
  baseAPI: 'http://localhost:3000/',
  userAPI: 'http://localhost:3000/' + 'userAPI/',
  qcmAPI: 'http://localhost:3000/' + 'qcmAPI/'
};
```
7. Dans le fichier `backend\app\app.ts`, remplacer *db* par  `mongodb://localhost:27017/projectForm`
8. Dans le back `ProjectForm/backend` et le front `ProjectForm/frontend` exécuter `npm install`
9. Dans le back `ProjectForm/backend` et le front `ProjectForm/frontend` exécuter `npm start`
10. Vous pouvez accéder au site web `http://localhost:4200/`