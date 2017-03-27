import angular from 'angular';

const MODULE_NAME = 'app';
const app = angular.module(MODULE_NAME, []);

app.constant('storedFavorites', window.localStorage.getItem('Favorites'));

// Borrowed from:
// http://stackoverflow.com/questions/17839141/checking-if-object-is-empty-works-with-ng-show-but-not-from-controller
app.filter('isEmpty', function () {
    var bar;
    return function (obj) {
        for (bar in obj) {
            if (obj.hasOwnProperty(bar)) {
                return false;
            }
        }
        return true;
    };
});

app.service('favoritesService', require('./favorites/favorites.service'));
app.service('apiService', require('./search/api.service'));

app.controller('searchController', require('./search/search.controller'));
app.controller('favoritesController', require('./favorites/favorites.controller'));

module.exports = app.name;