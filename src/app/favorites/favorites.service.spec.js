describe('favoritesService', () => {
  let underTest;

  beforeEach(angular.mock.module(require('../app.module')));

  beforeEach(inject((favoritesService) => {
    underTest = favoritesService;
  }));

  describe('add', () => {
    let mockFav, mockGem;

    beforeEach(() => {
      mockFav = { name: 'someFav', some: 'param' };
      mockGem = { name: 'newFav', something: 'or other' };

      underTest.favs = {
        someFav: mockFav
      };
    });

    it('adds a new gem to the favorites map', () => {
      underTest.add(mockGem);

      expect(underTest.favs).toEqual({
        someFav: mockFav,
        newFav: { name: 'newFav', something: 'or other' } 
      });
    });

    it('adds stringified favorited gems to local storage', () => {
      spyOn(localStorage, 'setItem');
      spyOn(angular, 'toJson');
      underTest.add(mockGem);

      expect(localStorage.setItem).toHaveBeenCalled();
      expect(angular.toJson).toHaveBeenCalledWith(underTest.favs);
    });
  });

  describe('remove', () => {
    let mockFav;

    beforeEach(() => {
      mockFav = { name: 'someFav', some: 'param' };

      underTest.favs = {
        someFav: mockFav
      };
    });

    it('removes gem from favorite object', () => {
      underTest.remove('someFav');

      expect(underTest.favs).toEqual({});
    });

    it('updates local storage after removal', () => {
      spyOn(localStorage, 'setItem');
      spyOn(angular, 'toJson');
      underTest.remove('someFav');

      expect(localStorage.setItem).toHaveBeenCalled();
      expect(angular.toJson).toHaveBeenCalledWith(underTest.favs);
    });
  });
});