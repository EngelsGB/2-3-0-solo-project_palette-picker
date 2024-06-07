import { v4 as uuidv4 } from 'uuid';
import { getPalettes, addPalette, removePalette } from './local-storage-helpers'

const createCard = (palette) => {
    // Create elements

    const cardBody = document.createElement("li");

    const headerText = document.createElement("h2");

    const color1div = document.createElement("div");
    const color1contrast = document.createElement("div");
    const color1text = document.createElement("p");
    const color1blackText = document.createElement("p");
    const color1button = document.createElement("button");
    
    const color2div = document.createElement("div");
    const color2contrast = document.createElement("div");
    const color2text = document.createElement("p");
    const color2blackText = document.createElement("p");
    const color2button = document.createElement("button");
    
    const color3div = document.createElement("div");
    const color3contrast = document.createElement("div");
    const color3text = document.createElement("p");
    const color3blackText = document.createElement("p");
    const color3button = document.createElement("button");

    const deleteButton = document.createElement("button");

    const temperatureText = document.createElement("p");

    // Give them classes and ids
    cardBody.classList.add("palette-cards");

    headerText.classList.add("card-title");

    color1div.classList.add("color-div");
    color1contrast.classList.add("color-examples")
    color1text.classList.add("color-text");
    color1blackText.classList.add("black-text");
    color1button.classList.add("copy-button");
    
    color2div.classList.add("color-div");
    color2contrast.classList.add("color-examples")
    color2text.classList.add("color-text");
    color2blackText.classList.add("black-text");
    color2button.classList.add("copy-button");
    
    color3div.classList.add("color-div");
    color3contrast.classList.add("color-examples")
    color3text.classList.add("color-text");
    color3blackText.classList.add("black-text");
    color3button.classList.add("copy-button");

    deleteButton.classList.add("delete-button");

    temperatureText.classList.add("temperature-text");

    // Append to div
    color1contrast.append(color1text, color1blackText);
    color2contrast.append(color2text, color2blackText);
    color3contrast.append(color3text, color3blackText);

    color1div.append(color1contrast, color1button);
    color2div.append(color2contrast, color2button);
    color3div.append(color3contrast, color3button);

    cardBody.append(headerText, color1div, color2div, color3div, deleteButton, temperatureText);

    //Set each element up
    headerText.textContent = palette["title"];

    color1text.textContent = "Text ";
    color1text.style.backgroundColor = palette["colors"][0]
    color1blackText.textContent = "Example";
    color1blackText.style.backgroundColor = palette["colors"][0]
    color1button.textContent = `Copy ${palette["colors"][0]}`

    color2text.textContent = "Text ";
    color2text.style.backgroundColor = palette["colors"][1]
    color2blackText.textContent = "Example";
    color2blackText.style.backgroundColor = palette["colors"][1]
    color2button.textContent = `Copy ${palette["colors"][1]}`

    color3text.textContent = "Text ";
    color3text.style.backgroundColor = palette["colors"][2]
    color3blackText.textContent = "Example";
    color3blackText.style.backgroundColor = palette["colors"][2]
    color3button.textContent = `Copy ${palette["colors"][2]}`

    deleteButton.textContent = "Delete Palette";

    temperatureText.textContent = palette["temperature"];
    if (temperatureText.textContent === "warm") temperatureText.style.backgroundColor = "#3D1514";
    else if (temperatureText.textContent === "cool") temperatureText.style.backgroundColor = "#151E41";
    else temperatureText.style.backgroundColor = "#555555";

    // Add to body
    document.querySelector("#palettes-section").append(cardBody);
}

const submitHandler = (event) => {
    event.preventDefault();

    const form = event.target;
    
    const palette = {};
    palette["uuid"] = uuidv4();
    palette["title"] = form[0].value;
    palette["colors"] = [];
    palette.colors.push(form[1].value);
    palette.colors.push(form[2].value);
    palette.colors.push(form[3].value);
    palette["temperature"] = form.temperature.value;

    createCard(palette);
    addPalette(palette);
    form.reset();
}

const eventHandler = (event) => {
    const button = event.target.closest("button");
    if (event.target.matches(".copy-button")) copyHandler(button);
    if (event.target.matches(".delete-button")) deleteHandler(button);
}

const copyHandler = (button) => {
    const hex = button.textContent.slice(5);
    try {
        navigator.clipboard.writeText(hex);
        button.textContent = 'Copied hex!';
        setTimeout(() => {
            button.textContent = `Copy ${hex}`;
        }, 1000);
    } catch (err) {
        console.error(err)
    }
}

const deleteHandler = (button) => {
    const name = button.parentElement.firstChild.textContent;
    for (const palette of getPalettes()) {
        if (palette.title === name) removePalette(palette.uuid);
    }
    button.parentElement.remove();
}

export {
    createCard,
    submitHandler,
    eventHandler
}