function Show(elementName) {
    document.getElementById(elementName).style.display = "block";
}

function Hide(elementName) {
    document.getElementById(elementName).style.display = "none";
}

function HideAllSectionsAndClickedButtons() {
    Hide("JesusChristSection");
    Hide("LoveSection");
    Hide("ChurchSection");

    Hide("JesusChristClickedButton");
    Hide("LoveClickedButton");
    Hide("ChurchClickedButton");
}

let prevSectionName;

function ShowSection(sectionName) {
    if (prevSectionName) {
        Hide(prevSectionName+"Section");
        Hide(prevSectionName+"ClickedButton");
        Show(prevSectionName+"Button");
    }
    prevSectionName = sectionName;
    {
        Show(sectionName+"Section");
        Hide(sectionName+"Button");
        Show(sectionName+"ClickedButton");
    }
    
    // Footer visibility:
    /*if (sectionName == "Church")
        Hide("Footer");
    else
        Show("Footer");*/
    
    // Updating section url:
    const newUrl = window.location.pathname + '#' + sectionName;
    history.pushState({ section: sectionName }, '', newUrl);
}

document.addEventListener('DOMContentLoaded', function() {
    HideAllSectionsAndClickedButtons();
    
    function showContentFromHash() {
        const hash = window.location.hash; 
        const sectionName = hash ? hash.substring(1) : null; 
        
        if (sectionName && document.getElementById(sectionName+"Section")) {
            ShowSection(sectionName);
        } else {
            ShowSection("JesusChrist");
        }
    }
    
    // Initial load:
    showContentFromHash();

    // Handling back/forward button presses:
    window.addEventListener("popstate", showContentFromHash);
});

//*** Buttons Layout ***

function SetX(elementName, x) {
    document.getElementById(elementName).style.left = x;
}

function SetY(elementName, y) {
    document.getElementById(elementName).style.top = y;
}

function UpdateButtonsLayout() {
    const buttonWidth = 170;
    const buttonHeight = 38;
    const buttonMarginX = 25;
    const buttonMarginY = 15;
    const horizontalY = 500;
    const verticalCenterY = 450;
    const windowWidth = window.innerWidth;
    const windowScale = windowWidth/1080.0;
    
    document.getElementById("TestText").innerHTML = "Window Width: " +windowWidth + " | Scale: " +windowScale;
    
    if (windowWidth >= 768) {
        const x1 = Math.round(windowWidth/2 - (buttonWidth+buttonMarginX*windowScale)) +"px";
        const x3 = Math.round(windowWidth/2 +(buttonWidth+buttonMarginX*windowScale)) +"px";
        const y = Math.round(horizontalY*windowScale) +"px";
        //const y = Math.round(horizontalY) +"px";
        SetX("JesusChristButton", x1);
        SetX("JesusChristClickedButton", x1);
        SetX("LoveButton", "50%");
        SetX("LoveClickedButton", "50%");
        SetX("ChurchButton", x3);
        SetX("ChurchClickedButton", x3);
        SetY("JesusChristButton", y);
        SetY("JesusChristClickedButton", y);
        SetY("LoveButton", y);
        SetY("LoveClickedButton", y);
        SetY("ChurchButton", y);
        SetY("ChurchClickedButton", y);
    } else {
        const y2 = Math.round(verticalCenterY*windowScale) +"px";
        const y1 = Math.round((verticalCenterY -(buttonHeight/windowScale+buttonMarginY*windowScale))*windowScale) +"px";
        const y3 = Math.round((verticalCenterY +(buttonHeight/windowScale+buttonMarginY*windowScale))*windowScale) +"px";
        SetX("JesusChristButton", "50%");
        SetX("JesusChristClickedButton", "50%");
        SetX("LoveButton", "50%");
        SetX("LoveClickedButton", "50%");
        SetX("ChurchButton", "50%");
        SetX("ChurchClickedButton", "50%");
        SetY("JesusChristButton", y1);
        SetY("JesusChristClickedButton", y1);
        SetY("LoveButton", y2);
        SetY("LoveClickedButton", y2);
        SetY("ChurchButton", y3);
        SetY("ChurchClickedButton", y3);
    }
}
document.addEventListener('DOMContentLoaded', UpdateButtonsLayout);
window.addEventListener('resize', UpdateButtonsLayout);