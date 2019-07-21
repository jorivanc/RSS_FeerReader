/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Test suite 'RSS Feeds' */
    describe('RSS Feeds', function() {
        /* This tests makes sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('should have a non-empty, defined and valid URL ', function() {
           //isValidURL(url) validates if an ulr is valid or not by trying to create a new URL object with the feed's url. if theres an error is because the feed's url was not valid (returns false) otherwise returns true.  this way of validaing an url is a modification from https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
            function isValidURL(url){
              try {
                new URL(url);
                return true;
                } catch (error) {
                    return false;
                  }
                }//end isValidURL

              allFeeds.forEach(feed => {
              expect(feed.url).toBeDefined();
              // console.log(isValidURL(feed.url));
               expect(isValidURL(feed.url)).toBeTruthy();
             });
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('should have a defined, non-empty name', function(){

           //This function validates if a variable 'str' is a string.
           function isString(str){
             if (typeof str === 'string' || str instanceof String)
                return true;
              else
                return false;
            }//end isString

           allFeeds.forEach( feed => {
              expect(feed.name).toBeDefined();
              expect(feed.name.length).toBeGreaterThan(0);
              expect(isString(feed.name)).toBeTruthy();
           });
         });
    });//End suite 'RSS Feeds'


    /* Test suite 'The menu' */
    describe('The Menu', function() {

        let body = $('body');
        let menu = $('.menu-icon-link');

        /* Test that ensures the menu element is
         * hidden by default.
         */
         it('should be hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBeTruthy();
         })

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
          it('should change visibility display/hide when clicked', function() {
             menu.click();
             expect(body.hasClass('menu-hidden')).toBeFalsy();

             menu.click();
             expect(body.hasClass('menu-hidden')).toBeTruthy();
          });
        });//End suite 'The Menu'


    /* Test suite 'Initial Entries' */
    describe('Initial Entries', function(){

        beforeEach(function(done){
            loadFeed(0,function(){
              done();
            });
        });

        /* Ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         it('should contain at least a single .entry element within the .feed container', function(done){
           expect($('.feed .entry').length).toBeGreaterThan(0);
           done();
         });
       });//End suite 'Initial Entries'


    /* Test suite 'New Feed Selection' */
    describe('New Feed Selection', function(){
        let originalFeed, newFeed;

        beforeEach(function(done){
            loadFeed(0,function(){
              //originalFeed contains the title of the first .entry displayed on the .feed
               originalFeed = $('.feed').find('h2').html();
               //once the first .feed is loaded we can load a new .feed since they run asynchonously
               loadFeed(1,function(){
                 //newFeed contains the title of the first .entry displayed on the newly loaded .feed
                 newFeed = $('.feed').find('h2').html();
                  done();
               });
            });
        });

        /* Test that ensures that when a new feed is loaded
         * by the loadFeed function, the content actually changes.
         */
         it('if a new feed is loaded the content should change',function(done){
           //I considered that it was enough to compare the first (.entry) titles of each loaded .feed
           //if its neccessary to compare all the .entry titles we simply have to change desired_Feed = $('.feed').find('h2').text(); in lines 123 and 127.
           expect(originalFeed).not.toEqual(newFeed);
           done();
         });
    });//End suite 'New Feed Selection'
}());
