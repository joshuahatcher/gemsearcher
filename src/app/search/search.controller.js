class SearchController {
  constructor(apiService, favoritesService) {
    this.apiService = apiService;
    this.favoritesService = favoritesService;
  }

  searchGems(input) {
    this.loading = true;

    this.apiService.search(input).then((response) => {
      this.gemData = response.data;
      this.loading = false;
      console.log('Gem search results: ', response.data);
    })
  };

  showDependencies(gem, group='development') {
    gem.dependencyList = gem.dependencies[group];
  };

  addToFavs(gem) {
    this.favoritesService.add(gem);
  };
};

SearchController.$inject = [ 'apiService', 'favoritesService' ];

module.exports = SearchController;