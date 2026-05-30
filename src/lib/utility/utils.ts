/**
 * Generates a random integer between min and max
 * @param min the smallest generable integer (inclusive)
 * @param max the biggest generable integer (inclusive)
 * @returns a random integer between min and max
 */
export const getRandomIntInclusive = (min: number, max: number): number => {
    if (min > max) {
        throw Error("min must be smaller than max")
    }
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}