export class User {
  _id: string;
  nom: string;
  mail: string;
  motdepasse: string;
  role: string;

  constructor(user?: any) {
    if (user) {
      if (user._id) {
        this._id = user._id;
      }
      if (user.motdepasse) {
        this.motdepasse = user.motdepasse;
      }
      this.nom = user.nom;
      this.mail = user.mail;
      this.role = user.role; // 'professeur' 'eleve';
    }
  }
}
