function apiService($http) {
  this.search = (input) => {
    return $http.get(
      `/api/v1/search.json?query=${input}`
    );
  };
}

apiService.$inject = [ '$http' ];

module.exports = apiService;