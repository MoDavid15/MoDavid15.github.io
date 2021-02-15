// Footer and its buttons
var footer = (function(){
    footer = {

        // Pages total and counter
        pages : {
            total : 0,
        },

        // Buttons
        prev : {},
        next : {},
        exit : {},

        // Scroll details
        scroll : {
            y : 0,               // Current y of scroll for scene
            o : -SCREEN_HEIGHT,  // Current offset of the entire scene
        },
    };

    // Initializes footer
    footer.init = function(){

        // Get references to DOM objects
        this.next.button = document.getElementsByClassName("footer-buttons-next")[0];
        this.prev.button = document.getElementsByClassName("footer-buttons-prev")[0];
        this.pages.counter = document.getElementsByClassName("footer-buttons-counter")[0];

        // Set some stuff
        this.pages.total = panels.list.length - 1;
        this.pages.counter.textContent = `${1} / ${this.pages.total}`;

        // Add event listeners
        let self = this;

        this.next.button.addEventListener("click", this.scroll.down);
        this.prev.button.addEventListener("click", this.scroll.up);

        // Disable scrolling
        document.body.addEventListener("wheel", function(e){ 
            e.preventDefault(); 
        }, {passive : false,});
    }

    // Scrolls
    footer.scroll.up = function(e){
        if(footer.scroll.y <= 0){
            return;
        }

        footer.scroll.y -= 1;
        footer.pages.counter.textContent = 
            `${footer.scroll.y + 1} / ${footer.pages.total}`;
    }

    footer.scroll.down = function(e){
        if(footer.scroll.y >= footer.pages.total - 1){
            return;
        }

        footer.scroll.y += 1;
        footer.pages.counter.textContent = 
            `${footer.scroll.y + 1} / ${footer.pages.total}`;
    }

    footer.scroll.handle = function(){
        this.o = smooth(this.o, this.y * SCREEN_HEIGHT, 5);

        window.scrollTo(0, this.o);
    }

    return footer;

})();