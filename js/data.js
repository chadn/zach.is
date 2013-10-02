// create the autocomplete source array
var alpha = [
  'alpha',
  'bravo',
  'charlie',
  'delta',
  'echo',
  'foxtrot',
  'golf',
  'hotel',
  'india',
  'juliett',
  'kilo',
  'lima',
  'mike',
  'november',
  'oscar',
  'papa',
  'quebec',
  'romeo',
  'sierra',
  'tango',
  'uniform',
  'victor',
  'whiskey',
  'xray',
  'yankee',
  'zulu'
];

var Routes = {};

Routes.routes = [
    {
        route: 'making',
        label: 'making',
        children: [
            {
                route: 'making/this',
                label: 'this',
                children: [
                    {
                        route: 'making/this/site',
                        label: 'site'
                    }
                ]
            }
        ]
    },
    {
        route: 'working',
        label: 'working',
        children: [
            {
                route: 'working/for',
                label: 'for',
                children: [
                    {
                        route: 'working/for/the-man', 
                        label: 'the-man'
                    },
                    {
                        route: 'working/for/his-dad', 
                        label: 'his-dad'
                    },
                    {
                        route: 'working/for/the-cia',
                        label: 'the-cia'
                    }
                ]
            },
            {
                route: 'working/with',
                label: 'with',
                children: [
                    {
                        route: 'working/with/sean-connery', 
                        label: 'sean-connery'
                    },
                    {
                        route: 'working/with/tom-cruise', 
                        label: 'tom-cruise'
                    },
                    {
                        route: 'working/with/matt-damon', 
                        label: 'matt-damon'
                    },
                    {
                        route: 'working/with/al-pacino', 
                        label: 'al-pacino'
                    },
                    {
                        route: 'working/with/denzel-washington', 
                        label: 'denzel-washington'
                    }
                ]
            }
        ]
    },
    {
        route: 'eating',
        label: 'eating',
        children: [
            {
                route: 'eating/at',
                label: 'at',
                children: [
                    {
                        route: 'eating/at/restaurants',
                        label: 'restaurants'
                    },
                    {
                        route: 'eating/at/home',
                        label: 'home'
                    }
                ]
            },
            {
                route: 'eating/on',
                label: 'on',
                children: [
                    {
                        route: 'eating/on/tables', 
                        label: 'tables'
                    }
                ]
            }
        ]
    },
    {
        route: 'reading',
        label: 'reading',
        children: [
            {
                route: 'reading/articles',
                label: 'articles',
                children: [
                    {
                        route: 'reading/articles/about',
                        label: 'about',
                        children: [
                            {
                                route: 'reading/articles/about/cities', 
                                label: 'cities'
                            },
                            {
                                route: 'reading/articles/about/the-future', 
                                label: 'the-future'
                            },
                            {
                                route: 'reading/articles/about/architecture', 
                                label: 'architecture'
                            },
                            {
                                route: 'reading/articles/about/machu-pichu', 
                                label: 'machu-pichu'
                            },
                            {
                                route: 'reading/articles/about/fast-cars', 
                                label: 'fast-cars'
                            }
                        ]
                    },
                    {
                        route: 'reading/articles/from',
                        label: 'from',
                        children: [
                            {
                                route: 'reading/articles/from/the-new-york-times',
                                label: 'the-new-york-times'
                            },
                            {
                                route: 'reading/articles/from/wired',
                                label: 'wired'
                            },
                            {
                                route: 'reading/articles/from/the-atlantic',
                                label: 'the-atlantic'
                            },
                            {
                                route: 'reading/articles/from/hacker-news',
                                label: 'hacker-news'
                            },
                            {
                                route: 'reading/articles/from/google',
                                label: 'google'
                            }
                        ]
                    }
                ]
            },
            {
                route: 'reading/books',
                label: 'books',
                children: [
                    {
                        route: 'reading/books/by',
                        label: 'by',
                        children: [
                            {
                                route: 'reading/books/by/wayne-congar', 
                                label: 'wayne-congar'
                            },
                            {
                                route: 'reading/books/by/brendan-bilko', 
                                label: 'brendan-bilko'
                            },
                            {
                                route: 'reading/books/by/caleb-linville', 
                                label: 'caleb-linville'
                            },
                            {
                                route: 'reading/books/by/justin-edmund', 
                                label: 'justin-edmund'
                            },
                            {
                                route: 'reading/books/by/cat-lee', 
                                label: 'cat-lee'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        route: 'playing',
        label: 'playing'
    },
    {
        route: 'on',
        label: 'on'
    },
    {
        route: 'in',
        label: 'in'
    },
    {
        route: 'on-top-of',
        label: 'on-top-of'
    },
    {
        route: 'cooking',
        label: 'cooking'
    },
    {
        route: 'pinning',
        label: 'pinning'
    },
    {
        route: 'instagramming',
        label: 'instagramming'
    },
    {
        route: 'looking',
        label: 'looking'
    }
];

Routes.getFirstLevelData = function(nodes) {
    if (! nodes) {
        nodes = Routes.routes;
    }

    var data = [];

    $.each(nodes, function() {
        var node = {
            label: this.label,
            id: this.id
        };

        if (this.children) {
            node.load_on_demand = true;
        }

        data.push(node);
    });

    return data;
}

Routes.getChildrenOfNodeByName = function(node_name) {
    var result = null;

    function iterate(nodes) {
        $.each(nodes, function() {
            if (result) {
                return;
            }
            else {
                if (this.label == node_name) {
                    result = this;
                }

                if (this.children) {
                    iterate(this.children);
                }
            }
        });
    }

    iterate(Routes.routes);

    if(typeof result.children != 'undefined') {
        return Routes.getFirstLevelData(result.children);
    } else {
        return null;
    }
}