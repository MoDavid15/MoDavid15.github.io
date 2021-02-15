// Scene object
var scene = (function(){
    scene = {};

    // Initialize scene
    scene.init = function(){
        
        panels.init();
        footer.init();
        intro.init();
        nav.init();

        this.animcycle();
    }

    // Animation loop
    scene.animcycle = function(){

        requestAnimationFrame(scene.animcycle);

        intro.animate();
        footer.scroll.handle();
        nav.handle();
    }

    return scene;

})();

scene.init();