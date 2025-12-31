/** Возвращает рандомное число между min и max включительно. */
export const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const STORAGE_KEY = 'lola-catch-used-numbers';
const MIN_NUMBER = 1;
export const MAX_NUMBER = 7;

export function getRandomUniqueNumber(): number | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    const used: number[] = raw ? JSON.parse(raw) : [];

    const allNumbers = Array.from(
        {length: MAX_NUMBER - MIN_NUMBER + 1},
        (_, i) => MIN_NUMBER + i,
    );

    const available = allNumbers.filter((n) => !used.includes(n));

    if (available.length === 0) {
        return null; // все числа использованы
    }

    const value = available[Math.floor(Math.random() * available.length)];

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...used, value]));

    return value;
}

export function resetUniqueNumbers() {
    localStorage.removeItem(STORAGE_KEY);
}

export function getUsedUniqueNumbers(): number[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

export function getAvailableUniqueNumbers(): number[] {
    const used = getUsedUniqueNumbers();
    const allNumbers = Array.from(
        {length: MAX_NUMBER - MIN_NUMBER + 1},
        (_, i) => MIN_NUMBER + i,
    );
    return allNumbers.filter((n) => !used.includes(n));
}
