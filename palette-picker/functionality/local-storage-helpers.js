import palettes from './palettes.json'

const setLocalStorageKey = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const getLocalStorageKey = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch (err) {
        console.error(err);
        return null;
    }
}

const getPalettes = () => {
    const palettesArray = [];
    for (let i = 0; i < localStorage.length; i++) {
        palettesArray.push(getLocalStorageKey(localStorage.key(i)));
    }
    return palettesArray;
}

const setPalettes = (newPalettes) => {
    localStorage.clear();
    for (const palette of newPalettes) {
        addPalette(palette);
    }
}

const initPalettesIfEmpty = () => {
    for (const palette of palettes) {
        setLocalStorageKey(palette.uuid, palette);
    }
}

const addPalette = (newPalette) => {
    setLocalStorageKey(newPalette.uuid, newPalette);
}

const removePalette = (paleteUuid) => {
    localStorage.removeItem(paleteUuid);
}

export {
    getPalettes,
    setPalettes,
    initPalettesIfEmpty,
    addPalette,
    removePalette
}