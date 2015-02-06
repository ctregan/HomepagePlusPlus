'use strict';

describe('myApp.personal module', function() {

  beforeEach(module('myApp.personal'));

  describe('personal controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var personalctrl = $controller('PersonalCtrl');
      expect(personalctrl).toBeDefined();
    }));

  });
});