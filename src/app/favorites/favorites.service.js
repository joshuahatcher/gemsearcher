function favoritesService($window, stored) {
  this.favs = (stored === null) ? {} : angular.fromJson(stored);    

  this.add = (newFav) => {
    this.favs[newFav.name] = newFav;
    $window.localStorage.setItem('Favorites', angular.toJson(this.favs))
  };

  this.remove = (fav) => {
    delete this.favs[fav];
    $window.localStorage.setItem('Favorites', angular.toJson(this.favs))
  };
}

favoritesService.$inject = [ '$window', 'storedFavorites' ];

module.exports = favoritesService;