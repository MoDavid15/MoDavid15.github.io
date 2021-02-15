// Intro panel
var intro = (function(){

    // Define scene
    intro = {

        // The entire body
        body : {

        },

        // Intro panel
        head : {
            title : {
                y : SCREEN_HEIGHT / 2,  // Current y position
                o : -5,                 // Opacity
            },

            body : {
                o : -5,                 // Opacity
            },
        }
    }

    // Intialize intro panel
    intro.init = function(){

        // Get references to DOM objects
        this.head.title.content = document.getElementsByClassName("intro-panel-title")[0];
        this.head.body.content = document.getElementsByClassName("intro-panel-body-content")[0];
        this.body.content = document.getElementsByClassName("content")[0];

        this.head.title.content.style.display = "block";
        this.head.body.content.style.display = "block";
    }

    // Animates the intro panel
    intro.animate = function(){

        this.head.title.content.style.marginTop = `${this.head.title.y}px`;
        this.head.title.content.style.opacity = `${this.head.title.o * 100}%`;
        this.head.body.content.style.opacity = `${this.head.body.o * 100}%`;

        if(footer.scroll.o > SCREEN_HEIGHT / 10 || footer.scroll.o < -SCREEN_HEIGHT / 10){

            this.head.title.y = SCREEN_HEIGHT / 2;
            this.head.title.o = -5; this.head.body.o = -5;

            return;
        }

        this.head.title.y = smooth(this.head.title.y, 0, 4);
        this.head.title.o = smooth(this.head.title.o, 1, 4);

        if(this.head.title.o > 0.8){
            this.head.body.o = smooth(this.head.body.o, 1, 4);
        }
    }
    
    return intro;
    
})();