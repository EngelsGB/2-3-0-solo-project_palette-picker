import { getPalettes, initPalettesIfEmpty } from './local-storage-helpers.js';
import { createCard, submitHandler, eventHandler } from './worker-functions.js'

const main = () => {
    if (localStorage.length === 0) initPalettesIfEmpty();
    for (const palette of getPalettes()) {
        createCard(palette); 
    }
    document.querySelector("form").addEventListener("submit", submitHandler);
    document.querySelector("#palettes-section").addEventListener("click", eventHandler);
}

main()