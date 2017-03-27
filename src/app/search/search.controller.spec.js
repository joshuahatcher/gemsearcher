describe('SearchController', () => {
  let underTest;
  let $rootScope;

  beforeEach(angular.mock.module(require('../app.module')));

  beforeEach(inject(($controller, _$rootScope_) => {
    $rootScope = _$rootScope_;
    underTest = $controller('searchController', { $scope: $rootScope.$new() });
  }));

  describe('searchGems', () => {
    let apiService;

    beforeEach(inject(($q, _apiService_) => {
      apiService = _apiService_;

      spyOn(apiService, 'search').and.returnValue($q.when({ data: 'some gemz' }));
    }));

    it('sets loading state', () => {
      underTest.searchGems();
      expect(underTest.loading).toBe(true);

      $rootScope.$digest();

      expect(underTest.loading).toBe(false);
    });

    it('calls API', () => {
      underTest.searchGems('hello');

      expect(apiService.search).toHaveBeenCalledWith('hello');
    });

    it('sets gem API response to controller object', () => {
      underTest.gemData = undefined;
      underTest.searchGems();
      $rootScope.$digest();

      expect(underTest.gemData).toEqual('some gemz');
    });
  });

  describe('showDependencies', () => {
    let mockGem;

    beforeEach(() => {
      mockGem = {
        dependencies: {
          development: [ 'hello', 'hi', 'hey' ],
          runtime: [ 'run', 'very', 'fast' ]
        }
      };
    });

    it('sets the dependency list to the relevant group', () => {
      underTest.showDependencies(mockGem, 'runtime');

      expect(mockGem.dependencyList).toEqual([ 'run', 'very', 'fast' ])
    });

    it('sets dependency list to development group by default if no group provided', () => {
      underTest.showDependencies(mockGem);

      expect(mockGem.dependencyList).toEqual([ 'hello', 'hi', 'hey' ]);
    });

    it('resets dependency list if one is already set', () => {
      mockGem.dependencyList = [ 'some', 'other', 'dependencies' ];
      underTest.showDependencies(mockGem);

      expect(mockGem.dependencyList).toEqual([ 'hello', 'hi', 'hey' ]);
    });
  });

  describe('addToFavs', () => {
    it('calls the favorites service', inject((favoritesService) => {
      spyOn(favoritesService, 'add');
      underTest.addToFavs();

      expect(favoritesService.add).toHaveBeenCalled();
    }));
  });
});
