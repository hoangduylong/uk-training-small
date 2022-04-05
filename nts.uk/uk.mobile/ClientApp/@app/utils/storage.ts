const prefix: string = 'nts.uk';

class Cookie {
    private static get expired() {
        return 'Expired; expires=Mon, 01 Jan 1900 00:00:00 GMT; path=/';
    }

    private static get items(): { [key: string]: string } {
        let map = {},
            items = document.cookie.split(';');

        items.forEach((item: string) => {
            let delimiter = item.indexOf('='),
                name = item.slice(0, delimiter).trim();

            map[name] = item.slice(delimiter + 1);
        });

        return map;
    }

    public static hasItem(name: string): boolean {
        return !!Cookie.items[`${prefix}.${name}`];
    }

    public static getItem(name: string): string {
        return Cookie.items[`${prefix}.${name}`];
    }

    public static setItem(name: string, value: string) {
        document.cookie = `${`${prefix}.${name}`}=${value}; path=/`;
    }

    public static removeItem(name: string): void {
        document.cookie = `${`${prefix}.${name}`}=${Cookie.expired}`;
    }
}

class UKStorage {
    constructor(private storage: Storage) { }

    public hasItem(name: string): boolean {
        return !!this.storage.getItem(`${prefix}.${name}`);
    }

    public getItem(name: string): null | string | number | Date | Object {
        let value = this.storage.getItem(`${prefix}.${name}`);

        try {
            if (value.match(/^\{.+\}$/)) {
                return JSON.parse(value);
            } else if (value.match(/^\d+$/)) {
                return Number(value);
            } else if (value.match(/^".+"$/)) {
                return new Date(value.replace(/^"|"$/g, ''));
            }

            return value;
        } catch {
            return value;
        }
    }

    public setItem(name: string, value: string | number | Date | Object) {
        this.storage.setItem(`${prefix}.${name}`, typeof value == 'string' ? value : JSON.stringify(value));
    }

    public removeItem(name: string) {
        this.storage.removeItem(`${prefix}.${name}`);
    }
}

export const storage = {
    cookie: Cookie,
    local: new UKStorage(localStorage),
    session: new UKStorage(sessionStorage)
};