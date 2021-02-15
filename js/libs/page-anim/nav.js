// Nav bar
var nav = (function(){
    nav = {
        blur : 0,       // Blur value
        maxblur : 10,   // Maxblur value

        rows : [],      // Stores rows
        maxrows : 7,   // Max number of rows
        currentpan : 0, // Current panel

        cats : {

            // Subcategory stuffs
            isSubCatting : false,
            subcat : null,
            cursubtitle : "",
            subcatrep : 0,

        },              // Categories in nav bar
        shows : [],     // Which category is shown
        clearing : false,

        search : {},    // Search bar

        info : [
            {
                name : "computer science",
                contents : [
                    "programming",
                    "languages",
                    "research",
                    "concepts",
                    "paradigms",
                    "the internet",
                    "algorithms",
                    "the web",
                    "architectures",
                ],
            },
            {
                name : "mathematics",
                contents : [
                    "history of maths",
                    "algebra",
                    "geometry",
                    "trigonometry",
                    "linear algebra",
                    "calculus",
                    "signal analysis",
                ],
            },
            {
                name : "literature",
                contents : [
                    "my poems",
                    "essays",
                    "notable pieces",
                ],
            },
            {
                name : "projects",
                contents : [
                    "games",
                    "songs",
                    "other art",
                    "tech",
                ],
            },
            {
                name : "author",
                contents : [
                    "about the author",
                ],
            },
            {
                name : "information",
                contents : [
                    "about the site",
                    "how to contribute",
                    "github",
                ],
            }
        ],
    };

    // Init nav bar
    nav.init = function(){

        // Get references to DOM objects
        this.titlelink = document.getElementsByClassName("header-title-text-link")[0];
        this.search.bar = document.getElementsByClassName("header-search-bar")[0];
        this.search.icon = document.getElementsByClassName("header-search-icon")[0];
        this.cats.all = document.getElementsByClassName("header-navbar-list")[0].children;

        // Set some stuff
        this.titlelink.href = `${PARENT_PATH}/index.html`;

        // Add event listeners
        let self = this;

        for(let i = 0; i < nav.cats.all.length; i++){
            nav.cats.all[i].addEventListener("click", function(e){

                if(document.body.contains(nav.catpanel)){
                    document.body.removeChild(nav.catpanel);
                }

                for(let i = 0; i < nav.shows.length; i++){
                    nav.shows[i] = false;
                }

                nav.shows[i] = true; 
                nav.currentpan = i;
                nav.showcat(i);
            });
        }

        this.search.bar.addEventListener("focus", this.search.focus);
        this.search.bar.addEventListener("focusout", this.search.focusout);
    }

    // Search bar event listeners
    nav.search.focus = function(){

        nav.search.icon.style.display = "block";
        nav.search.icon.children[0].style.animation = "fadeinright 0.15s";
        nav.search.icon.children[0].style.animationFillMode = "forwards";
        nav.search.icon.children[0].style.animationDelay = "0.2s";

        for(let i = 0; i < nav.cats.all.length; i++){

            nav.cats.all[i].children[0].style.opacity = "100%";
            nav.cats.all[i].children[0].style.animation = "fadeouttop 0.15s";
            nav.cats.all[i].children[0].style.animationFillMode = "forwards";
            nav.cats.all[i].children[0].style.animationDelay = `${i * 0.03}s`;
        }
    }

    nav.search.focusout = function(e){

        nav.search.icon.style.display = "none";
        nav.search.icon.children[0].style.animation = "fadeoutright 0.15s";
        nav.search.icon.children[0].style.animationFillMode = "forwards";

        for(let i = 0; i < nav.cats.all.length; i++){

            nav.cats.all[i].children[0].style.opacity = "0%";
            nav.cats.all[i].children[0].style.animation = "fadeintop 0.2s";
            nav.cats.all[i].children[0].style.animationFillMode = "forwards";
            nav.cats.all[i].children[0].style.animationDelay = `${
                (nav.cats.all.length - i - 1) * 0.03 + 0.1}s`;
        }
    }

    // Handles the entire navbar
    nav.handle = function(){

        footer.next.button.style.opacity = `${Math.round((1 - this.blur / this.maxblur * 2) * 100)}%`;
        footer.prev.button.style.opacity = `${Math.round((1 - this.blur / this.maxblur * 2) * 100)}%`;
        footer.pages.counter.style.opacity = `${Math.round((1 - this.blur / this.maxblur * 2) * 100)}%`;

        if(this.cats.isSubCatting){
            if(!this.cats.subcat){

                let subcat = document.createElement("div");
                let subcatholder = document.createElement("div");
                let subcattitle = document.createElement("h1");

                this.cats.subcat = subcat;
                subcat.className = "catpanel-subcat";
                subcatholder.className = "catpanel-subcat-holder";
                subcattitle.className = "catpanel-subcat-holder-title";
                subcattitle.textContent = `[ ${this.cats.cursubtitle} ]`;

                subcatholder.appendChild(subcattitle);
                subcat.appendChild(subcatholder);
                this.catpanel.appendChild(subcat);

                this.cattitle.style.opacity = "100%";
                this.cattitle.style.animation = "fadeoutright 0.3s";
                this.cattitle.style.animationFillMode = "forwards";

                for(let i = 0; i < this.cattable.children.length; i++){
                    for(let j = 0; j < this.cattable.children[i].children.length; j++){
                        if(this.cattable.children[i].children[j].textContent == `< ${this.cats.cursubtitle} >`){
                            this.cattable.children[i].children[j].children[0].children[0].children[0].textContent = 
                                "< click me to go here >";
                            break;
                        }
                    }
                }
            }

            this.cats.subcatrep = smooth(this.cats.subcatrep, 100, 4);
            this.cats.subcat.style.opacity = `${Math.round(this.cats.subcatrep)}%`;

            let total = 0;
            for(let i = 0; i < this.cats.all.length; i++){
                if(this.shows[i]){
                    total = this.info[i].contents.length; break;
                }
            }

            for(let i = 0; i < this.cattable.children.length; i++){
                for(let j = 0; j < this.cattable.children[i].children.length; j++){
                    if(this.cattable.children[i].children[j].textContent == "< click me to go here >"){
                        continue;
                    }
                    
                    this.cattable.children[i].children[j].children[0].style.opacity = "100%";
                    this.cattable.children[i].children[j].children[0].style.animation = "fadeoutleft 0.3s";
                    this.cattable.children[i].children[j].children[0].style.animationFillMode = "forwards";
                    this.cattable.children[i].children[j].children[0].style.animationDelay = `${0.03 * (total - i)}s`;
                }
            }
        } else {
            if(this.cats.subcat){
                if(this.catpanel.contains(this.cats.subcat)){
                    for(let i = 0; i < this.cattable.children.length; i++){
                        for(let j = 0; j < this.cattable.children[i].children.length; j++){
                            if(this.cattable.children[i].children[j].textContent == "< click me to go here >"){
                                this.cattable.children[i].children[j].children[0].children[0].children[0].textContent = 
                                    `< ${this.info[this.currentpan].contents[i + j * this.maxrows]} >`;
                                break;
                            }
                        }
                    }

                    for(let i = 0; i < this.cattable.children.length; i++){
                        for(let j = 0; j < this.cattable.children[i].children.length; j++){
                            if(this.cattable.children[i].children[j].textContent == `< ${this.cats.cursubtitle} >`){
                                continue;
                            }
                            
                            this.cattable.children[i].children[j].children[0].style.opacity = "0";
                            this.cattable.children[i].children[j].children[0].style.animation = "fadeinleft 0.3s";
                            this.cattable.children[i].children[j].children[0].style.animationFillMode = "forwards";
                            this.cattable.children[i].children[j].children[0].style.animationDelay = `${0.03 * i}s`;
                        }
                    }

                    this.catpanel.removeChild(this.cats.subcat);
                    this.cats.subcat = null;

                    this.cattitle.style.opacity = "0%";
                    this.cattitle.style.animation = "fadeinright 0.3s";
                    this.cattitle.style.animationFillMode = "forwards";
                }
            }
        }

        for(let i = 0; i < this.cats.all.length; i++){
            if(this.shows[i]){

                this.blur = smooth(this.blur, this.maxblur, 4);
                this.changeblur();

                return;
            }
        }

        if(!this.clearing){
            return;
        }

        this.blur = smooth(this.blur, 0, 2);
        this.changeblur();
        this.catpanel.style.opacity = `${this.blur / this.maxblur * 100}%`;

        if(Math.round(this.blur / this.maxblur * 100) < 1){
            
            this.clearing = false;
            document.body.removeChild(this.catpanel);
        }
    }

    nav.changeblur = function(){

        setblur(panels.list[footer.scroll.y + 1], Math.round(this.blur * 2) / 2);
        this.catpanel.style.backgroundColor = `rgb(0, 0, 0,${this.blur / this.maxblur / 1.25})`;
    }

    nav.showcat = function(index){

        let catpanel = document.createElement("div");
        let catholder = document.createElement("div");
        let cattitle = document.createElement("h1");
        let cattable = document.createElement("table");
        let catexit = document.createElement("div");

        this.catpanel = catpanel;
        this.cattitle = cattitle;
        this.cattable = cattable;
        footer.exit.button = catexit;

        catpanel.className = "catpanel";
        catpanel.style.backgroundColor = "rgb(0, 0, 0, 0)";

        catholder.className = "catpanel-holder";
        cattitle.className = "catpanel-holder-title";
        cattitle.textContent = `[ ${this.info[index].name} ]`;
        cattable.className = "catpanel-table";

        catexit.className = "catpanel-exit";
        catexit.innerHTML = "<p class='catpanel-exit-text'>[ back ]</p>";
        catexit.addEventListener("click", this.exit);

        for(let i = 0; i < this.maxrows; i++){

            let row = document.createElement("tr");
            row.class = "catpanel-table-row";
            this.rows[i] = row;
            cattable.appendChild(row);
        }

        for(let i = 0; i < this.info[index].contents.length; i++){

            let data = document.createElement("td");
            let link = document.createElement("div");
            let href = document.createElement("a");
            let row = this.rows[i % this.maxrows];
            
            data.class = "catpanel-table-row-data";
            href.addEventListener("mouseover", function(e){

                nav.cats.cursubtitle = nav.info[index].contents[i];
                nav.cats.isSubCatting = true;
            });
            href.addEventListener("mouseout", function(e){

                nav.cats.subcatrep = 0;
                nav.cats.isSubCatting = false;
            });

            link.className = "catpanel-table-row-data-link";
            link.style.animationDelay = `${0.03 * i + 0.36}s`;

            href.className = "catpanel-table-row-data-link-href";
            href.href = `${PARENT_PATH}html/${this.info[index].name.replace(/ /g, "-")}` +
                `/${this.info[index].contents[i].replace(/ /g, "-")}.html`;
            href.innerHTML = `<i>< ${this.info[index].contents[i]} ></i>`;
            
            link.appendChild(href);
            data.appendChild(link);
            row.appendChild(data);
        }

        catholder.appendChild(cattitle);
        catpanel.appendChild(catholder);
        catpanel.appendChild(cattable);
        catpanel.appendChild(catexit);
        document.body.appendChild(catpanel);
    }

    nav.exit = function(e){
        for(let i = 0; i < nav.cats.all.length; i++){
            nav.shows[i] = false;
        }
        nav.clearing = true;
    }

    return nav;

})();