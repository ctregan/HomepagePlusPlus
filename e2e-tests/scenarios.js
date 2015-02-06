'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /personal when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/personal");
  });


  describe('personal', function() {

    beforeEach(function() {
      browser.get('index.html#/personal');
    });


    it('should render personal when user navigates to /personal', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('work', function() {

    beforeEach(function() {
      browser.get('index.html#/work');
    });


    it('should render work when user navigates to /work', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
