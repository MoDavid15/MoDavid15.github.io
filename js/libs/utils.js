// Smooth function
function smooth(start, end, step){
    return start + (end - start) / step;
}

// Set blur
function setblur(object, amount){
    object.style.filter = `blur(${amount}px)`;
}