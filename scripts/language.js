function ShowLangMenu() {
    document.getElementById("LangMenu").style.visibility = "visible";
}

function SelectLanguage(lang) {
    location.href = "https://jesuschrist.com.ua/" +lang +"/" +window.location.hash;
}

window.addEventListener('click', (e) => {
    if (!document.getElementById("LangButton").contains(e.target)) {
        document.getElementById("LangMenu").style.visibility = "hidden";
    }
});

function UpdateLangButtonsLayout() {
    const windowWidth = document.documentElement.clientWidth;
    const windowScale = windowWidth/1080.0;
    
    const langButton = document.getElementById("LangButton");
    const langPicker = document.getElementById("LangPicker");
    const langMenu = document.getElementById("LangMenu");
    const langMenuButtonEN = document.getElementById("LangMenuButtonEN");
    const langMenuButtonUK = document.getElementById("LangMenuButtonUK");

    const buttonFontSize = 11*windowScale +12 +"px";
    langButton.style.fontSize = buttonFontSize;
    langMenuButtonEN.style.fontSize = buttonFontSize;
    langMenuButtonUK.style.fontSize = buttonFontSize;

    const buttonWidth = 25*windowScale +28 +"px";
    langButton.style.width = buttonWidth;
    langPicker.style.width = buttonWidth;
    langMenu.style.width = buttonWidth;
    langMenuButtonEN.style.width = buttonWidth;
    langMenuButtonUK.style.width = buttonWidth;   
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("LangButton").style.visibility = "visible";
    UpdateLangButtonsLayout();
});
window.addEventListener('resize', UpdateLangButtonsLayout);