export class Logger {
    static info(message: string, data: any = {}) {
        console.info(`[INFO] ${message}`, data);
    }

    static warn(message: string, data: any = {}) {
        console.warn(`[WARN] ${message}`, data);
    }

    static error(message: string, data: any = {}) {
        console.error(`[ERROR] ${message}`, data);
    }
}