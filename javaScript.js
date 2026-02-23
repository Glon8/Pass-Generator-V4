/* config state - switch to true to recieve logs in to console */
const debug = false;

/* switches states: ["repeatable", "symbols", "letters", "capitals"] */
const switches = [true, true, true, true];

/* lists of available askii characters */
const askii_symbols = [33, 34, 35, 36, 37, 38, 64];
const askii_digits = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
const askii_upper_case = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 89, 90];
const askii_lower_case = [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122];

window.addEventListener("DOMContentLoaded", () => {
    /* html tags by id */
    const components = [
        document.getElementById("inp"), // < password input field
        document.getElementById("rep"), // < button - "repeatable"
        document.getElementById("sym"), // < button - "symbols"
        document.getElementById("let"), // < button - "letters"
        document.getElementById("cap"), // < button - "capitals"
        document.getElementById("gen"), // < button - "generate"
        document.getElementById("len")  // < length input field 
    ];

    //=============================================== First Load
    /* appending events to each html tag in components */
    appendEvent(components);

    /* generating first password */
    generate(components);
});

function appendEvent(components) {
    /* adding on click event to every button */
    for (let i = 1; i < components.length - 1; i++) {
        components[i].addEventListener("click", () => {
            /* flipping switches on click */
            switches[i - 1] = components[i].checked == true ? true : false;

            /* regenerating password with every change in configuration */
            generate(components);

            /* printing out to console if debug mode is on */
            if (debug) console.log(switches[i - 1]);
        });
    }

    /* adding on click event to generate button */
    components[5].addEventListener("click", () => {
        generate(components);
    });

    /* adding input listener to length input field */
    components[6].addEventListener("input", () => {
        /* regenerating password with every change in configuration */
        generate(components);
    });
}

function generate(components) {
    let output = "";
    let password_length = components[6].value;

    /* check for password length */
    if (password_length == null || password_length < 4) password_length = 8;

    /* default set of characters for generation (digits only) */
    const white_list = [];
    white_list.push(...askii_digits);

    /* if symbols acceptable */
    if (switches[1]) white_list.push(...askii_symbols);

    /* if lower case letters acceptable */
    if (switches[2]) white_list.push(...askii_lower_case);

    /* if upper case letters acceptable */
    if (switches[3]) white_list.push(...askii_upper_case);

    /* if repeatable password acceptable */
    if (switches[0]) password_length = password_length > white_list.length ? white_list.length : password_length;

    /* printing out to console if debug mode is on */
    if (debug) console.log(white_list);

    /* creating random password with a white list */
    for (let i = 0; i < password_length; i++) {
        const next_num = Math.floor(Math.random() * white_list.length);

        output += String.fromCharCode(white_list[next_num]);

        if (switches[0]) white_list.splice(next_num, 1);
    }
    
    /* printing out to console if debug mode is on */
    if (debug) console.log(output);

    /* passing generated password to password input field */
    components[0].value = output;
}




