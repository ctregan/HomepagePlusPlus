'use strict';

describe('myApp.topReddit module', function() {

    beforeEach(module('myApp.topReddit'));

    describe('myApp.topReddit controller', function(){
        var scope, data, createController;
        beforeEach(inject(function($controller, $rootScope){
            scope = $rootScope.$new();
            scope.subreddit = 'programming';
            createController = function() {
                return $controller('topRedditController', {
                    $scope : scope
                });
            };

        }));

        it('should set subreddit context',function(){
            createController();
            expect(scope.url()).toBe('http://www.reddit.com/r/programming.json?limit=5');
            expect(scope.modifier).toBe(".json");
            expect(scope.time).toBe("");
            expect(scope.count).toBe(5);
        });

        describe("data retrieval",function(){
            var httpBackend, hotChildren, topChildren;
            beforeEach(inject(function($httpBackend){
                hotChildren = [];
                topChildren = [];
                $httpBackend.when('GET','http://www.reddit.com/r/programming.json?limit=5')
                                                    .respond({ data : {
                        children : hotChildren
                    }});

                $httpBackend.when('GET','http://www.reddit.com/r/programming/top.json?limit=5')
                    .respond({ data : {
                        children : topChildren
                    }});

                $httpBackend.when('GET','http://www.reddit.com/r/programming.json?t=year&limit=5')
                    .respond({ data : {
                        children : topChildren
                    }});

                httpBackend = $httpBackend;
            }));

            it('should request for data',function(){
                httpBackend.expectGET('http://www.reddit.com/r/programming.json?limit=5');
                createController();
                httpBackend.flush();
            });

            it('should set link data per response',function(){
                hotChildren.push({ url: "test1", title: "title1"});
                hotChildren.push({ url: "test2", title: "title2"});

                createController();
                httpBackend.flush();
                expect(scope.topLinks.length).toBe(2);
            });

            it('should refresh data when modifier changes',function(){
                hotChildren.push({ url: "hot1", title: "title1"});

                topChildren.push({ url: "top2", title: "title2"});
                topChildren.push({ url: "top3", title: "title3"});
                topChildren.push({ url: "top4", title: "title4"});

                createController();
                httpBackend.flush();
                expect(scope.topLinks.length).toBe(1);

                scope.modifier = "/top.json";
                scope.$digest();
                httpBackend.flush();
                expect(scope.topLinks.length).toBe(3);
                expect(JSON.stringify(scope.topLinks)).toBe(JSON.stringify(topChildren));
            });

            it('should refresh data when date mod changes',function(){
                hotChildren.push({ url: "hot1", title: "title1"});

                topChildren.push({ url: "top2", title: "title2"});
                topChildren.push({ url: "top3", title: "title3"});
                topChildren.push({ url: "top4", title: "title4"});

                createController();
                httpBackend.flush();
                expect(scope.topLinks.length).toBe(1);

                scope.time = "t=year";
                scope.$digest();
                httpBackend.flush();
                expect(scope.topLinks.length).toBe(3);
                expect(JSON.stringify(scope.topLinks)).toBe(JSON.stringify(topChildren));
            });
        });
    });

});
