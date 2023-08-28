export function validateKeysOnObject<t>(obj: t, keys: string[]): boolean {
    for (const field of keys) {
        if (!obj[field]) {
            return false;
        }
    }

    return true;
}