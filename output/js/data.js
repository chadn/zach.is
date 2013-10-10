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

Routes.usableRoutes = [
    'building/models/',
    'on/instagram/',
    'wearing/lots/of/hats/',
    'working/at/pinterest/on/metadata/',
    'making/gifs/',
    'making/simple-shapes/',
    'reading/wired/',
    'disappointed/with/the/government/',
    'flying/',
    'working/for/robert-rauschenberg/',
    'using/lots/of/tools/',
    'building/skyscrapers/'
    // 'drawing/in/rome/'
]

Routes.routes = [
    {
        route: 'up/',
        label: 'up',
        children: [
            {
                route: 'up/and/',
                label: 'and',
                children: [
                    {
                        route: 'up/and/running',
                        label: 'running'
                    }
                ]
            }
        ]
    },
    {
        route: 'making/',
        label: 'making',
        children: [
            {
                route: 'making/gifs',
                label: 'gifs'
            },
            {
                route: 'making/simple-shapes',
                label: 'simple-shapes'
            },
            {
                route: 'making/this/',
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
        route: 'working/',
        label: 'working',
        children: [
            {
                route: 'working/at/',
                label: 'at',
                children: [
                    {
                        route: 'working/at/pinterest/', 
                        label: 'pinterest',
                        children: [
                            {
                                route: 'working/at/pinterest/on/', 
                                label: 'on',
                                children: [
                                    {
                                        route: 'working/at/pinterest/on/metadata/', 
                                        label: 'metadata'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                route: 'working/for/',
                label: 'for',
                children: [
                    {
                        route: 'working/for/the-man/', 
                        label: 'the-man'
                    },
                    {
                        route: 'working/for/his-dad/', 
                        label: 'his-dad'
                    },
                    {
                        route: 'working/for/the-cia/',
                        label: 'the-cia'
                    },
                    {
                        route: 'working/for/robert-rauschenberg/',
                        label: 'robert-rauschenberg'
                    }
                ]
            },
            {
                route: 'working/with/',
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
                        label: 'denzel-washington-and-all-his-friends'
                    }
                ]
            }
        ]
    },
    {
        route: 'building/',
        label: 'building',
        children: [
            {
                route: 'building/models/',
                label: 'models',
            },
            {
                route: 'building/skyscrapers/',
                label: 'skyscrapers',
            }
        ]
    },
    {
        route: 'eating/',
        label: 'eating',
        children: [
            {
                route: 'eating/at/',
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
                route: 'eating/on/',
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
        route: 'reading/',
        label: 'reading',
        children: [
            {
                route: 'reading/articles/',
                label: 'articles',
                children: [
                    {
                        route: 'reading/articles/about/',
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
                        route: 'reading/articles/from/',
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
                route: 'reading/books/',
                label: 'books',
                children: [
                    {
                        route: 'reading/books/by/',
                        label: 'by',
                        children: [
                            {
                                route: 'reading/books/by/abraham-lincoln', 
                                label: 'abraham-lincoln'
                            },
                            {
                                route: 'reading/books/by/john-grisham', 
                                label: 'john-grisham'
                            },
                            {
                                route: 'reading/books/by/stephen-king', 
                                label: 'stephen-king'
                            },
                            {
                                route: 'reading/books/by/jane-austen', 
                                label: 'jane-austen'
                            },
                            {
                                route: 'reading/books/by/j-k-rowling', 
                                label: 'j-k-rowling'
                            }
                        ]
                    }
                ]
            },
            {
                route: 'reading/wired',
                label: 'wired'
            }
        ]
    },
    {
        route: 'flying/',
        label: 'flying',
    },
    {
        route: 'wearing/',
        label: 'wearing',
        children: [
            {
                route: 'wearing/lots/', 
                label: 'lots',
                children: [
                    {
                        route: 'wearing/lots/of/', 
                        label: 'of',
                        children: [
                            {
                                route: 'wearing/lots/of/hats', 
                                label: 'hats'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        route: 'using/',
        label: 'using',
        children: [
            {
                route: 'using/lots/', 
                label: 'lots',
                children: [
                    {
                        route: 'using/lots/of/', 
                        label: 'of',
                        children: [
                            {
                                route: 'using/lots/of/tools/', 
                                label: 'tools'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        route: 'disappointed/',
        label: 'disappointed',
        children: [
            {
                route: 'disappointed/with/', 
                label: 'with',
                children: [
                    {
                        route: 'disappointed/with/the/', 
                        label: 'the',
                        children: [
                            {
                                route: 'disappointed/with/the/government/', 
                                label: 'government'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        route: 'playing/',
        label: 'playing'
    },
    {
        route: 'on/',
        label: 'on',
        children: [
            {
                route: 'on/instagram', 
                label: 'instagram'
            },
            {
                route: 'on/pinterest', 
                label: 'pinterest'
            },
            {
                route: 'on/facebook', 
                label: 'facebook'
            }
        ]
    },
    {
        route: 'in/',
        label: 'in'
    },
    {
        route: 'on-top-of/',
        label: 'on-top-of'
    },
    {
        route: 'cooking/',
        label: 'cooking'
    },
    {
        route: 'pinning/',
        label: 'pinning'
    },
    {
        route: 'instagramming/',
        label: 'instagramming'
    },
    {
        route: 'looking/',
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
            route: this.route,
            label: this.label
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
          if (this.route == node_name) {
            result = this;
          }

          if (this.children) {
            iterate(this.children);
          }
        }
      });
    }

    iterate(Routes.routes);

    if (!result) {
      return;
    } else if (typeof result.children != 'undefined') {
      return Routes.getFirstLevelData(result.children);
    } else {
      return null;
    }
}