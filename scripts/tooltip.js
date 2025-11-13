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
            PositionTooltip(ActiveDescribedElem);
        }
    });
    window.addEventListener('resize', () => {
        if (ActiveDescribedElem) {
            PositionTooltip(ActiveDescribedElem);
        }
    });
});