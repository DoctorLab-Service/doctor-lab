type TValueLocalStorage =  string | number | Array<string | number | Record<string, any>> | Record<string, any> | null

export const localStorage = {
    get: (key: string): TValueLocalStorage => {
        const item = JSON.parse(window.localStorage.getItem(key))
        if (!item || new Date().getTime() > item.expiration) {
        // Данные не существуют или время истекло, удаляем их
            window.localStorage.removeItem(key);
            return null;
        }
        return item.value;
    },
    set: (key: string, value: TValueLocalStorage, expiration?: number): void => {
        const item = {
            value: value,
            expiration, // Время истечения в миллисекундах
        };
        window.localStorage.setItem(key, JSON.stringify(item));
    },
    remove: (key: string) => window.localStorage.removeItem(key)
}