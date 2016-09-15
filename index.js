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
            this.render();
        },
        render: function() {
            var cat = octopus.getCurrentCat();

            var title = document.getElementById('title');
            title.textContent = cat.name;

            var image = document.getElementById('catImage');
            image.src = cat.img;

            this.counts = document.getElementById('counter');
            this.counts.textContent = cat.counts;

            image.addEventListener('click', octopus.onClick);
        },
        renderCounts: function(counts) {
            this.counts.textContent = counts;
        }
    };

    var adminView = {
        init: function() {
            this.adminContainer = document.getElementById('adminContainer');
            this.adminButton = document.getElementById('adminButton');
            this.title = document.createElement('input');
            this.imageUrl = document.createElement('input');
            this.counts = document.createElement('input');
            this.cancel = document.createElement('button');
            this.submit = document.createElement('button');
            this.title.setAttribute('type', 'text');
            this.imageUrl.setAttribute('type', 'url');
            this.counts.setAttribute('type', 'text');
            this.cancel.setAttribute('type', 'button');
            this.submit.setAttribute('type', 'submit');
            this.cancel.textContent = 'Cancel';
            this.submit.textContent = 'Submit';

            this.render();
        },
        render: function() {
            this.adminButton.addEventListener('click', () => {
                this.renderForm();
            });
        },
        renderForm: function() {
            var cat = octopus.getCurrentCat();
            var form = document.createElement('form');

            this.title.setAttribute('value', cat.name);
            this.imageUrl.setAttribute('value', cat.img);
            this.counts.setAttribute('value', cat.counts);

            this.cancel.addEventListener('click', () => this.removeChilds());

            form.appendChild(this.title);
            form.appendChild(this.imageUrl);
            form.appendChild(this.counts);
            form.appendChild(this.cancel);
            form.appendChild(this.submit);
            form.addEventListener('submit', (event) => this.onSubmit(event));

            this.adminContainer.appendChild(form);
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
