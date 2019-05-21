export class User {
    _id: string;
    nom: string;
    mail: string;
    motdepasse: string;
    role: string;

    constructor(User?: any) {
        if (User) {
            this._id = User._id;
            this.nom = User.nom;
            this.mail = User.mail;
            this.motdepasse = User.motdepasse;
            this.role = User.role;
        }
    }
}