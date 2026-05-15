export class Logger {
    static #instance = null;
    #logs = [];

    constructor() {
        if (Logger.#instance) {
            return Logger.#instance;
        }
        Logger.#instance = this;
    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new Logger();
        }
        return this.#instance;
    }

    logAction(action, user) {
        const date = new Date().toLocaleString('uk-UA');
        const logEntry = `[${date}] [${user.role}: ${user.name}] виконав дію: [${action}]`;
        
        this.#logs.push(logEntry);
        console.log(`%c${logEntry}`, "color: #ff9800"); 
    }

    getLogs() {
        return this.#logs;
    }
}