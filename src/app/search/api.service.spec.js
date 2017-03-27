describe('apiService', () => {
  beforeEach(angular.mock.module(require('../app.module')));

  describe('search', () => {
    let underTest;
    let $http;

    beforeEach(inject((apiService, _$http_) => {
      underTest = apiService;
      $http = _$http_;

      spyOn($http, 'get');
    }));

    it('calls the API', () => {
      let expected = '/api/v1/search.json?query=hello';
      underTest.search('hello');

      expect($http.get).toHaveBeenCalledWith(expected);
    });
  });
});