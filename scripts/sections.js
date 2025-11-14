function Show(elementName) {
    document.getElementById(elementName).style.display = "block";
}

function Hide(elementName) {
    document.getElementById(elementName).style.display = "none";
}

function HideAllSectionsAndClickedButtons() {
    Hide("JesusAndLoveSection");
    Hide("GodSection");
    Hide("CommandmentsSection");
    Hide("BaptismSection");
    Hide("AboutUsSection");

    Hide("JesusAndLoveClickedButton");
    Hide("GodClickedButton");
    Hide("CommandmentsClickedButton");
    //Hide("BaptismClickedButton");
    //Hide("AboutUsClickedButton");
}

let PrevSectionName;

function ShowSection(sectionName) {
    if (PrevSectionName) {
        Hide(PrevSectionName+"Section");
        Hide(PrevSectionName+"ClickedButton");
        Show(PrevSectionName+"Button");
    }
    PrevSectionName = sectionName;
    {
        Show(sectionName+"Section");
        Hide(sectionName+"Button");
        Show(sectionName+"ClickedButton");
    }
    
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

function SetTextColor(elementName, color) {
    document.getElementById(elementName).style.color = color;
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
    
    if (windowWidth >= 768) {
        const x1 = Math.round(windowWidth*0.5 - (buttonWidth+buttonMarginX*windowScale)) +"px";
        const x3 = Math.round(windowWidth*0.5 +(buttonWidth+buttonMarginX*windowScale)) +"px";
        const y = Math.round(horizontalY*windowScale) +"px";
        SetX("JesusAndLoveButton", x1);
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
        SetY("CommandmentsClickedButton", y);

        SetTextColor("JesusAndLoveClickedButton", 'rgb(200,200,200)');
        SetTextColor("GodClickedButton", 'rgb(200,200,200)');
        SetTextColor("CommandmentsClickedButton", 'rgb(200,200,200)');
    } else {
        const y2 = Math.round(verticalCenterY*windowScale) +"px";
        const y1 = Math.round((verticalCenterY -(buttonHeight/windowScale+buttonMarginY*windowScale))*windowScale) +"px";
        const y3 = Math.round((verticalCenterY +(buttonHeight/windowScale+buttonMarginY*windowScale))*windowScale) +"px";
        SetX("JesusAndLoveButton", "50%");
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
        SetY("CommandmentsClickedButton", y3);
        
        SetTextColor("JesusAndLoveClickedButton", 'rgb(75,75,75)');
        SetTextColor("GodClickedButton", 'rgb(200,200,200)');
        SetTextColor("CommandmentsClickedButton", 'rgb(200,200,200)');
    }
}
document.addEventListener('DOMContentLoaded', UpdateButtonsLayout);
window.addEventListener('resize', UpdateButtonsLayout);