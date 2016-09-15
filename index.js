(function() {
    var data = {
        cats: [
            {
                name: 'Cattie',
                counts: 0,
                img: 'http://d39kbiy71leyho.cloudfront.net/wp-content/uploads/2016/05/09170020/cats-politics-TN.jpg'
            },
            {
                name: 'Gut',
                counts: 0,
                img: 'https://www.royalcanin.com/~/media/Royal-Canin/Product-Categories/cat-adult-landing-hero.ashx'
            },
            {
                name: 'Cute',
                counts: 0,
                img: 'https://d1wn0q81ehzw6k.cloudfront.net/additional/thul/media/4e34feee0acdc38a?w=400&h=400'
            },
            {
                name: 'Pil',
                counts: 0,
                img: 'http://metrazhi.com/wp-content/uploads/2016/06/tttytyty.jpg'
            },
            {
                name: 'Damn',
                counts: 0,
                img: 'http://2.bp.blogspot.com/-pATX0YgNSFs/VP-82AQKcuI/AAAAAAAALSU/Vet9e7Qsjjw/s1600/Cat-hd-wallpapers.jpg'
            },
        ],
        current: null
    };

    var octopus =  {
        init: () => {
            data.current = 0;

            listView.init();
            catView.init();
            adminView.init();
        },
        getCurrentCat: () => {
            return data.cats[data.current];
        },
        getCats: function() {
            return data.cats;
        },
        onSelectCat: function (position) {
            return function() {
                data.current = position;
                catView.render();
            };
        },
        onClick: function() {
            data.cats[data.current].counts++;
            catView.renderCounts(data.cats[data.current].counts);
        },
        updateCurrentCat: function(cat) {
            data.cats[data.current] = cat;
            catView.render();
        }
    };

    var listView = {
        init: function() {
            this.list = document.getElementById('catList');
            this.render();
        },
        render: function() {
            var cats = octopus.getCats();

            cats.forEach((cat) => {
                var li = document.createElement('li');
                li.textContent = cat.name;

                this.list.appendChild(li);

                li.addEventListener('click', octopus.onSelectCat(cats.indexOf(cat)));
            });
        }
    };

    var catView = {
        init: function() {
            this.catContainer = document.getElementById('catContainer');
            this.title = document.getElementById('title');
            this.image = document.getElementById('catImage');

            this.render();
        },
        render: function() {
            var cat = octopus.getCurrentCat();

            this.title.textContent = cat.name;

            this.image.src = cat.img;

            this.counts = document.getElementById('counter');
            this.counts.textContent = cat.counts;

            this.image.addEventListener('click', octopus.onClick);
        },
        renderCounts: function(counts) {
            this.counts.textContent = counts;
        }
    };

    var adminView = {
        init: function() {
            // Get DOM reference
            this.adminContainer = document.getElementById('adminContainer');
            this.adminButton = document.getElementById('adminButton');
            this.title = document.createElement('input');
            // Create form elements
            this.form = document.createElement('form');
            this.imageUrl = document.createElement('input');
            this.counts = document.createElement('input');
            this.cancel = document.createElement('button');
            this.submit = document.createElement('button');
            // Set form elements value
            this.title.setAttribute('type', 'text');
            this.imageUrl.setAttribute('type', 'url');
            this.counts.setAttribute('type', 'text');
            this.cancel.setAttribute('type', 'button');
            this.submit.setAttribute('type', 'submit');
            this.cancel.textContent = 'Cancel';
            this.submit.textContent = 'Submit';
            // Add elements to form
            this.form.appendChild(this.title);
            this.form.appendChild(this.imageUrl);
            this.form.appendChild(this.counts);
            this.form.appendChild(this.cancel);
            this.form.appendChild(this.submit);
            // Add on click event render the values of the current cat
            this.adminButton.addEventListener('click', () => this.render());
            // Add listener to cancel button
            this.cancel.addEventListener('click', () => this.removeChilds());
            // Add submit listener to form
            this.form.addEventListener('submit', (event) => this.onSubmit(event));

        },
        render: function() {
            var cat = octopus.getCurrentCat();

            //Add current cat values
            this.title.setAttribute('value', cat.name);
            this.imageUrl.setAttribute('value', cat.img);
            this.counts.setAttribute('value', cat.counts);
            //Render it into admin
            this.adminContainer.appendChild(this.form);
        },
        removeChilds: function() {
            while(this.adminContainer.firstChild) {
                this.adminContainer.removeChild(this.adminContainer.firstChild);
            }
        },
        onSubmit: function(event) {
            octopus.updateCurrentCat({
                name: this.title.value,
                img: this.imageUrl.value,
                counts: this.counts.value
            });
            this.removeChilds();
            event.preventDefault();
        }
    }

    octopus.init();
})();
