function favoritesService(stored) {
  this.favs = (stored === null) ? {} : angular.fromJson(stored);    

  this.add = (newFav) => {
    this.favs[newFav.name] = newFav;
    localStorage.setItem('Favorites', angular.toJson(this.favs))
  };

  this.remove = (fav) => {
    delete this.favs[fav];
    localStorage.setItem('Favorites', angular.toJson(this.favs))
  };
}

favoritesService.$inject = [ 'storedFavorites' ];

module.exports = favoritesService;