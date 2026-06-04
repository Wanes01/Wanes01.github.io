import { theme } from "$lib/stores/themes.svelte";

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

/**
 * Computes the path of an image from the /static directory
 * @param img the image name and extension (i.e 'image_file.svg')
 * @param isDoodle if the image is a doodle or an icon
 * @returns the relative path from /static of the image
 */
export const getThemeImgPath = (img: string, isDoodle: boolean): string => {
    return `/${isDoodle ? 'doodles' : 'icons'}${theme.dark ? '_dark' : ''}/${img}`;
}