DateSpy.JS
=======

A Simple Date Mocking Library

DateSpy.JS API
---------------

```javascript
var clock = datespy.useFakeTimers();
```
Causes the global `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval` and `Date` to be replaced with a custom implementation which is bound to the returned clock object.

```javascript
var clock = datespy.useFakeTimers(now);
```

As above, but rather than starting the clock at the current timestamp, start at the provided timestamp.

```javascript
var clock = datespy.useFakeTimers([now, ]prop1, prop2, ...);

// e.g.
datespy.useFakeTimers(0, "setTimeout", "clearTimeout",
                                      "setInterval", "clearInterval", "Date");
```




Sets the clock start timestamp and names functions to fake. Possible functions are setTimeout, clearTimeout, setInterval, clearInterval, and Date. Can also be called without the timestamp.

```javascript
clock.tick(ms);
```
Tick the clock ahead ms milliseconds. Causes all timers scheduled within the affected time range to be called.

```javascript
clock.restore();
```
Restore the faked methods. Call in e.g. tearDown.


```javascript

var originalDate = new Date();

describe('Testing date spy library', function () {
    "use strict";
    var clock;

    beforeEach(function () {
        clock = datespy.useFakeTimers();
    });

    afterEach(function () {
        clock.restore();
    });

    it('Testing Date Spy Tick', function () {
        clock.tick(99);

        clock.tick(1);

        // Also:
        expect(new Date().getTime()).toBe(100);
    });

    it('Expect Fake Time to not match Original Date', function () {
        expect(new Date().getFullYear()).not.toBe(originalDate.getFullYear());
        expect(new Date().getDate()).not.toBe(originalDate.getDate());
        expect(new Date().getDay()).not.toBe(originalDate.getDay());
    });

    it('Expect that spy will be called', function () {
        var timerCallback = jasmine.createSpy('timerCallback');

        setTimeout(function () {
            timerCallback();
        }, 1000);

        expect(timerCallback).not.toHaveBeenCalled();

        clock.tick(1001);

        expect(timerCallback).toHaveBeenCalled();

    });
});


describe('Test to ensure that date spy functionality restore clock', function () {
    "use strict";
    it('Expect original date to match new Date', function () {
        expect(new Date().getFullYear()).toBe(originalDate.getFullYear());
        expect(new Date().getDate()).toBe(originalDate.getDate());
        expect(new Date().getDay()).toBe(originalDate.getDay());
    });
});
```

Angular.JS Integration
----------------------

```javascript

describe('Test angular support', function () {
    "use strict";

    var clock;

    beforeEach(function () {
        clock = angular.mock.$mockDate();
    });

    afterEach(function () {
        clock.restore();
    });

    it('Expect $mockDate to return a mock representation of the Date object', function () {

        var dCallback = jasmine.createSpy('dateCallback');
        setTimeout(function () {
            dCallback();
        }, 1000);

        expect(dCallback).not.toHaveBeenCalled();

        clock.tick(1000);

        expect(dCallback).toHaveBeenCalled();
    });

    it('Testing Date Spy Tick', function () {
        clock.tick(99);

        clock.tick(1);

        // Also:
        expect(new Date().getTime()).toBe(100);
    });
});
```

DateSpy.JS Angular.JS API
---------------

```javascript
var clock = angular.mock.$mockDate();
```
Causes the global `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval` and `Date` to be replaced with a custom implementation which is bound to the returned clock object.

```javascript
var clock = angular.mock.$mockDate(now);
```

As above, but rather than starting the clock at the current timestamp, start at the provided timestamp.

```javascript
var clock = angular.mock.$mockDate([now, ]prop1, prop2, ...);
```

Sets the clock start timestamp and names functions to fake. Possible functions are setTimeout, clearTimeout, setInterval, clearInterval, and Date. Can also be called without the timestamp.

```javascript
clock.tick(ms);
```
Tick the clock ahead ms milliseconds. Causes all timers scheduled within the affected time range to be called.

```javascript
clock.$restoreDate();
```
Restore the faked methods and the global date object. Call in e.g. tearDown.


Build & Coverage Status
------------
[![Build Status](https://travis-ci.org/ferronrsmith/datespy.png?branch=master)](https://travis-ci.org/ferronrsmith/datespy) &nbsp;&nbsp; [![Coverage Status](https://coveralls.io/repos/ferronrsmith/datespy/badge.png?branch=master)](https://coveralls.io/r/ferronrsmith/datespy?branch=master)