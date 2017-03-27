describe('FavoritesController', () => {
  let underTest;
  let $rootScope;

  beforeEach(angular.mock.module(require('../app.module')));

  beforeEach(inject(($controller, _$rootScope_) => {
    $rootScope = _$rootScope_;
    underTest = $controller('favoritesController', { $scope: $rootScope.$new() });
  }));

  describe('remove', () => {
    it('calls the favorites service', inject((favoritesService) => {
      spyOn(favoritesService, 'remove');
      underTest.remove('not favorite anymore');

      expect(favoritesService.remove).toHaveBeenCalledWith('not favorite anymore');
    }));
  });
});
