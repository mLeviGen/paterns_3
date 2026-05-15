import { User, Admin, Moderator, SuperAdmin } from './classes.js';

export class UserFactory {
    static createUser(type, name, email, password) {
        const userType = type.toLowerCase();

        switch (userType) {
            case 'user':
                return new User(name, email, password);
            case 'admin':
                return new Admin(name, email, password);
            case 'moderator':
                return new Moderator(name, email, password);
            case 'superadmin':
                return new SuperAdmin(name, email, password);
            default:
                console.error(`[Factory Error]: Невідомий тип користувача "${type}"`);
                return null;
        }
    }
}