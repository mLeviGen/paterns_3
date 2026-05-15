import { UserDataBase } from './classes.js';
import { UserFactory } from './factory.js';
import { Logger } from './logger.js';

document.body.innerHTML = '<h2>Лабораторна №3: Factory & Logger</h2><pre id="output"></pre>';
const output = document.getElementById('output');
const print = (t) => output.innerText += t + '\n';


const db = UserDataBase.getInstance();
const logger = Logger.getInstance();


const sAdmin = UserFactory.createUser('superadmin', 'Олександр', 'root@dev.ua', '12345');
db.createUser(sAdmin);
logger.logAction("Вхід у систему та ініціалізація бази", sAdmin);


const usersToCreate = [
    { type: 'admin', name: 'Дмитро' },
    { type: 'moderator', name: 'Олена' },
    { type: 'user', name: 'Іван' },
];

usersToCreate.forEach(u => {
    const created = UserFactory.createUser(u.type, u.name, `${u.name.toLowerCase()}@test.com`, 'pass');
    if (created) {
        db.createUser(created);
        logger.logAction(`Створено користувача ${u.name} з роллю ${created.role}`, sAdmin);
        print(`Додано: ${created.role} ${u.name}`);
    }
});

const admin = db.searchUser("Дмитро")[0];
const moderator = db.searchUser("Олена")[0];
const simpleUser = db.searchUser("Іван")[0];

if (admin) logger.logAction("Видалення старого запису бази", admin);
if (moderator) logger.logAction(`Блокування користувача ${simpleUser.name}`, moderator);

print("\n--- ЖУРНАЛ СИСТЕМИ (LOGGER) ---");
logger.getLogs().forEach(entry => print(entry));