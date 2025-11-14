const CFrontImageWidth = 2048;
const CFrontImageHeight = 1150;

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

function Mix(a, b, factor) {
    return a*(1-factor) +b*factor;
}

function UpdateButtonsLayout() {
    const buttonWidth = 170;
    const buttonHeight = 38;
    const buttonMarginX = 25;
    const buttonMarginY = 15;
    const horizontalY = 500;
    const verticalCenterY = 425;
    const windowWidth = document.documentElement.clientWidth;
    const windowScale = windowWidth/1080.0;
    
    const sectionPanelHeight = 48;
    const sectionPanelSidePadding = 48;
    
    SetWidth("SectionPanel", windowWidth -sectionPanelSidePadding*windowScale*2+"px");
    SetX("SectionPanel", sectionPanelSidePadding*windowScale+"px");
    if (windowWidth > 512) {
        SetHeight("SectionPanel", sectionPanelHeight*windowScale+"px");
        SetY("SectionPanel", CFrontImageHeight*(windowWidth/CFrontImageWidth)-sectionPanelHeight*windowScale+"px");
    } else {
        SetHeight("SectionPanel", sectionPanelHeight*windowScale+4+"px");
        SetY("SectionPanel", CFrontImageHeight*(windowWidth/CFrontImageWidth)-4-sectionPanelHeight*windowScale+"px");
    }

    SetX("LoveText", windowWidth*0.5+"px");
    SetY("LoveText", 420*windowScale+"px");
    
    SetFontSize("LoveText1", 25*windowScale*0.5+25*0.5+"px");
    SetFontSize("LoveText2", 17*windowScale*0.5+17*0.5+"px");

    let buttonFontSize
    if (windowWidth >= 400)
        buttonFontSize = 7*windowScale +12 +"px";
    else
        buttonFontSize = Mix(12, 7*windowScale +12, (windowWidth-300)/(400-300))+"px";
    SetFontSize("JesusAndLoveButton", buttonFontSize);
    SetFontSize("GodButton", buttonFontSize);
    SetFontSize("CommandmentsButton", buttonFontSize);
    SetFontSize("BaptismButton", buttonFontSize);
    SetFontSize("AboutUsButton", buttonFontSize);
}

//*** Sections ***

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
    
    // Updating buttons layout because scroll bar might have disappeared/appeared, changing the document area:
    UpdateButtonsLayout();
}

function GotoSection(sectionName) {
    ShowSection(sectionName);
    window.scrollTo({
        top: CFrontImageHeight*(window.innerWidth/CFrontImageWidth),
        behavior: 'smooth'
    });
}

function InitSections() {
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
}

document.addEventListener('DOMContentLoaded', function() {
    InitSections();
    UpdateButtonsLayout();
});
window.addEventListener('resize', UpdateButtonsLayout);