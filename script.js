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

        SetTextColor("JesusChristClickedButton", 'rgb(200,200,200)');
        SetTextColor("LoveClickedButton", 'rgb(200,200,200)');
        SetTextColor("ChurchClickedButton", 'rgb(200,200,200)');
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
        
        SetTextColor("JesusChristClickedButton", 'rgb(75,75,75)');
        SetTextColor("LoveClickedButton", 'rgb(200,200,200)');
        SetTextColor("ChurchClickedButton", 'rgb(200,200,200)');
    }
}
document.addEventListener('DOMContentLoaded', UpdateButtonsLayout);
window.addEventListener('resize', UpdateButtonsLayout);

//*** Tooltip ***

const Tooltip = document.getElementById('Tooltip');
let ActiveDescribedElem;

const CTooltipOffset = 10; // Vertical space between element and tooltip
const CViewportPadding = 10; // Minimum padding from the edge of the screen

function PositionTooltip(describedElem) {
    // Get the position and dimensions of the described element and tooltip:
    const describedElemRect = describedElem.getBoundingClientRect();
    const tooltipRect = Tooltip.getBoundingClientRect();

    // Default position (below the element, aligned left-to-right):
    let top = describedElemRect.bottom +window.scrollY +CTooltipOffset;
    let left = describedElemRect.left +window.scrollX;

    // --- 1. Checking for Right Edge Collision ---
    const rightEdgePosition = left +tooltipRect.width;

    const viewportWidth = window.innerWidth;
    if (rightEdgePosition > viewportWidth -CViewportPadding) {
        // Collision detected! Flip the alignment to right-to-left.
        
        // Calculating the new 'left' position so the right edge of the tooltip 
        // is CViewportPadding away from the viewport's right edge.
        left = viewportWidth + window.scrollX -tooltipRect.width -CViewportPadding;
    }

    // --- 2. Checking for Left Edge Collision (in case of flip/small window) ---
    if (left < CViewportPadding +window.scrollX) {
        // If flipping caused a left collision, snap it to the edge.
        left = CViewportPadding +window.scrollX;
    }

    // --- 3. Applying Positioning ---
    Tooltip.style.top = `${top}px`;
    Tooltip.style.left = `${left}px`;
}

function ShowTooltip(event) {
    const element = event.currentTarget;
    ActiveDescribedElem = element;

    // 1. Setting Content
    Tooltip.innerHTML = element.dataset.tooltipText;

    // 2. Making Tooltip temporarily visible for measurement
    // We use 'show' class for measurement, but keep visibility hidden initially
    Tooltip.classList.add('show');
    Tooltip.style.visibility = 'hidden'; 
    Tooltip.style.opacity = 0; 
    
    // 3. Calculating and applying position
    PositionTooltip(element);

    // 4. Finally showing the Tooltip
    Tooltip.style.visibility = 'visible'; 
    Tooltip.style.opacity = 1; 
}

function HideTooltip() {
    Tooltip.classList.remove('show');
    Tooltip.style.visibility = 'hidden'; 
    Tooltip.style.opacity = 0; 
    ActiveDescribedElem = null;
}

document.addEventListener('DOMContentLoaded', () => {
    let triggers;

    triggers = document.querySelectorAll('.handwrittenTextDescribed');
    triggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', ShowTooltip);
        trigger.addEventListener('mouseleave', HideTooltip);
    });
    triggers = document.querySelectorAll('.handwrittenTextSmallerDescribed');
    triggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', ShowTooltip);
        trigger.addEventListener('mouseleave', HideTooltip);
    });
    triggers = document.querySelectorAll('.basicTextDescribed');
    triggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', ShowTooltip);
        trigger.addEventListener('mouseleave', HideTooltip);
    });
    
    // Repositioning Tooltip on scroll/resize for reliability:
    window.addEventListener('scroll', () => {
        if (ActiveDescribedElem) {
            positionTooltip(ActiveDescribedElem);
        }
    });
    window.addEventListener('resize', () => {
        if (ActiveDescribedElem) {
            positionTooltip(ActiveDescribedElem);
        }
    });
});