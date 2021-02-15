// Parent path
const PARENT_PATH = "/home/modavid/Documents/Website/";

// Screen stuff
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

// Colors
const MAIN_FONT_COLOR = [0, 206, 124];

// Listeners
const resize = function(){
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
}

window.onresize = resize;