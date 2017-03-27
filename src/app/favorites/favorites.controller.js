class FavoritesController {
  constructor(favoritesService) {
    this.favoritesService = favoritesService;
    this.favorites = favoritesService.favs;
  }

  remove(fav) {
    this.favoritesService.remove(fav);
  }
}

FavoritesController.$inject = [ 'favoritesService' ];

module.exports = FavoritesController;