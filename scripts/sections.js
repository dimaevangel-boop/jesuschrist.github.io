const CFrontImageWidth = 2048;
const CFrontImageHeight = 1150;

function Show(elementName) {
    document.getElementById(elementName).style.display = "block";
}

function Hide(elementName) {
    document.getElementById(elementName).style.display = "none";
}

function Enable(elementName) {
    document.getElementById(elementName).disabled = false;
}

function Disable(elementName) {
    document.getElementById(elementName).disabled = true;
}

function HideAllSections() {
    Hide("JesusAndLoveSection");
    Hide("GodSection");
    Hide("CommandmentsSection");
    Hide("BaptismSection");
    Hide("AboutUsSection");
}

let PrevSectionName;

function ShowSection(sectionName) {
    if (PrevSectionName) {
        Hide(PrevSectionName+"Section");
        Enable(PrevSectionName+"Button");
    }
    PrevSectionName = sectionName;
    {
        Show(sectionName+"Section");
        Disable(sectionName+"Button");
    }
    
    // Updating section url:
    const newUrl = window.location.pathname + '#' + sectionName;
    history.pushState({ section: sectionName }, '', newUrl);
}

function GotoSection(sectionName) {
    ShowSection(sectionName);
    window.scrollTo({
        top: CFrontImageHeight*(window.innerWidth/CFrontImageWidth),
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', function() {
    HideAllSections();
    
    function showContentFromHash() {
        const hash = window.location.hash; 
        const sectionName = hash ? hash.substring(1) : null; 
        
        if (sectionName && document.getElementById(sectionName+"Section")) {
            ShowSection(sectionName);
        } else {
            ShowSection("JesusAndLove");
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

function SetWidth(elementName, width) {
    document.getElementById(elementName).style.width = width;
}

function SetHeight(elementName, height) {
    document.getElementById(elementName).style.height = height;
}

function SetFontSize(elementName, fontSize) {
    document.getElementById(elementName).style.fontSize = fontSize;
}

function UpdateButtonsLayout() {
    const buttonWidth = 170;
    const buttonHeight = 38;
    const buttonMarginX = 25;
    const buttonMarginY = 15;
    const horizontalY = 500;
    const verticalCenterY = 425;
    const windowWidth = window.innerWidth;
    const windowScale = windowWidth/1080.0;
    
    SetX("LoveText", windowWidth*0.5+"px");
    SetY("LoveText", 420*windowScale+"px");
    
    SetFontSize("LoveText1", 25*windowScale*0.5+25*0.5+"px");
    SetFontSize("LoveText2", 17*windowScale*0.5+17*0.5+"px");

    const buttonFontSize = 7*windowScale +12 +"px";
    SetFontSize("JesusAndLoveButton", buttonFontSize);
    SetFontSize("GodButton", buttonFontSize);
    SetFontSize("CommandmentsButton", buttonFontSize);
    SetFontSize("BaptismButton", buttonFontSize);
    SetFontSize("AboutUsButton", buttonFontSize);

    const sectionPanelHeight = 48;
    const sectionPanelSidePadding = 48;
    SetWidth("SectionPanel", windowWidth -sectionPanelHeight*windowScale*2+"px");
    SetX("SectionPanel", sectionPanelSidePadding*windowScale+"px");
    SetHeight("SectionPanel", sectionPanelHeight*windowScale+"px");
    SetY("SectionPanel", CFrontImageHeight*(windowWidth/CFrontImageWidth)-9-sectionPanelHeight*windowScale+"px");
    
    
    if (windowWidth >= 768) {
        const x1 = Math.round(windowWidth*0.5 - (buttonWidth+buttonMarginX*windowScale)) +"px";
        const x3 = Math.round(windowWidth*0.5 +(buttonWidth+buttonMarginX*windowScale)) +"px";
        const y = Math.round(horizontalY*windowScale) +"px";
        /*SetX("JesusAndLoveButton", x1);
        SetX("JesusAndLoveClickedButton", x1);
        SetX("GodButton", "50%");
        SetX("GodClickedButton", "50%");
        SetX("CommandmentsButton", x3);
        SetX("CommandmentsClickedButton", x3);
        SetY("JesusAndLoveButton", y);
        SetY("JesusAndLoveClickedButton", y);
        SetY("GodButton", y);
        SetY("GodClickedButton", y);
        SetY("CommandmentsButton", y);
        SetY("CommandmentsClickedButton", y);*/
    } else {
        const y2 = Math.round(verticalCenterY*windowScale) +"px";
        const y1 = Math.round((verticalCenterY -(buttonHeight/windowScale+buttonMarginY*windowScale))*windowScale) +"px";
        const y3 = Math.round((verticalCenterY +(buttonHeight/windowScale+buttonMarginY*windowScale))*windowScale) +"px";
        /*SetX("JesusAndLoveButton", "50%");
        SetX("JesusAndLoveClickedButton", "50%");
        SetX("GodButton", "50%");
        SetX("GodClickedButton", "50%");
        SetX("CommandmentsButton", "50%");
        SetX("CommandmentsClickedButton", "50%");
        SetY("JesusAndLoveButton", y1);
        SetY("JesusAndLoveClickedButton", y1);
        SetY("GodButton", y2);
        SetY("GodClickedButton", y2);
        SetY("CommandmentsButton", y3);
        SetY("CommandmentsClickedButton", y3);*/
    }
}
document.addEventListener('DOMContentLoaded', UpdateButtonsLayout);
window.addEventListener('resize', UpdateButtonsLayout);