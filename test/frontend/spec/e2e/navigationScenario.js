describe('E2E: Tests Navigation', function() {
    afterEach(function(){
        //pause();
    });
    describe('navigation tests', function() {
    
        it('should navigates to games', function() {
          browser().navigateTo('/games');
            expect(browser().location().url()).toBe('/games');
        });
        
        it('should navigates to home', function() {
          browser().navigateTo('/');
            expect(browser().location().url()).toBe('/');
        });
    });
});