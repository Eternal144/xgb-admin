export const IMG_PATH = 'IMG_PATH';
export const ICON_PATH = 'ICON_PATH';
export const FILE_PATH = 'FILE_PATH';

export function imgPath(newPath) {
    return {
        type: IMG_PATH, newPath
    }
}

export function iconPath(newPath) {
    return {
        type: ICON_PATH, newPath
    }
}

export function FILE_PATH(newPath) {
    return {
        type: FILE_PATH, newPath
    }
}
