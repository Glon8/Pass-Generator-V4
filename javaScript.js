window.addEventListener("DOMContentLoaded", () => {
    const item = [
        document.getElementById("inp"),
        document.getElementById("rep"),
        document.getElementById("sym"),
        document.getElementById("let"),
        document.getElementById("cap"),
        document.getElementById("gen"),
        document.getElementById("len")];

    const conf = false;

    let switches = [false, false, false, false];

    let list = [33,34,35,36,37,38,64,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,89,90];

    //===============================================
    appendEvent(conf, switches, item, list);

    generate(conf, switches, item, list); //  <================ generation
});

function appendEvent(c, switches, item, list) {
    for(let i = 1; i < item.length - 1; i++){
        item[i].addEventListener("click", ()=>{
            switches[i - 1] = item[i].checked == true? true : false;

            generate(c, switches, item, list); //  <================ generation

            if(c) console.log(switches[i - 1]);
        });
    }

    item[5].addEventListener("click", ()=>{
        generate(c, switches, item, list); //  <================ generation
    });

    item[6].addEventListener("input",()=>{
        generate(c, switches, item, list); //  <================ generation
    });
}

function generate(c, switches, item, list){
    let output = "";
    let passwordLength = item[6].value;

    if(passwordLength == null || passwordLength == 0) passwordLength = 8;

    let whiteList = [48,49,50,51,52,53,54,55,56,57];

    if(switches[1]) for(let i = 0; i <= 6; i++) whiteList.push(list[i]);

    if(switches[2]) for(let i = 7; i <= 32; i++) whiteList.push(list[i]);
    
    if(switches[3]) for(let i = 33; i < list.length; i++) whiteList.push(list[i]);

    if(switches[0]) passwordLength = passwordLength > whiteList.length? whiteList.length : passwordLength;

    if(c) console.log(whiteList);

    for(let i = 0; i < passwordLength; i++){
    let nextNum = Math.floor(Math.random() * (whiteList.length - 0)) + 0;

    output += String.fromCharCode(whiteList[nextNum]);

    if(switches[0]) whiteList.splice(nextNum,1);
    }

    if(c) console.log(output);

    item[0].value = output;
}


