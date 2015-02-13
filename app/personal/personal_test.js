'use strict';

describe('myApp.personal module', function() {

  beforeEach(module('myApp.personal'));

  describe('personal controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
        var $scope = {};
        var personalctrl = $controller('PersonalCtrl', {$scope : $scope });
        expect(personalctrl).toBeDefined();
        expect($scope.type).toEqual("Personal");
    }));
  });
});