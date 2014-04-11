/*jslint plusplus: true, evil: true, browser: true, forin: false, sloppy: true, unparam: true */
/*global module, require, window, global, angular, */

/**
 * DateSpy.JS 0.1, 2013/10/01
 * @author Ferron Hanse
 * Extracted from jsUnitMockTimeOut & Sinon.JS
 */

/**
 * Fake timer API
 * setTimeout
 * setInterval
 * clearTimeout
 * clearInterval
 * tick
 * reset
 * Date
 *
 * Inspired by jsUnitMockTimeOut from JsUnit & Sinon.JS Fake Timer
 */

var datespy = {};

(function (global) {
    var id = 1,
        methods = [];

    function addTimer(args, recurring) {
        if (args.length === 0) {
            throw new Error("Function requires at least 1 parameter");
        }

        var toId = id++,
            delay = args[1] || 0;

        if (!this.timeouts) {
            this.timeouts = {};
        }

        this.timeouts[toId] = {
            id: toId,
            func: args[0],
            callAt: this.now + delay,
            invokeArgs: Array.prototype.slice.call(args, 2)
        };

        if (recurring === true) {
            this.timeouts[toId].interval = delay;
        }

        return toId;
    }

    function parseTime(str) {
        if (!str) {
            return 0;
        }

        var strings = str.split(":"),
            l = strings.length,
            i = l,
            ms = 0,
            parsed;

        if (l > 3 || !/^(\d\d:){0,2}\d\d?$/.test(str)) {
            throw new Error("tick only understands numbers and 'h:m:s'");
        }

        while (i--) {
            parsed = parseInt(strings[i], 10);

            if (parsed >= 60) {
                throw new Error("Invalid time " + str);
            }

            ms += parsed * Math.pow(60, (l - i - 1));
        }

        return ms * 1000;
    }

    function createObject(object) {
        var newObject,
            F;

        if (Object.create) {
            newObject = Object.create(object);
        } else {
            F = function () { };
            F.prototype = object;
            newObject = new F();
        }

        newObject.Date.clock = newObject;
        return newObject;
    }

    function mirrorDateProperties(target, source) {
        if (source.now) {
            target.now = function now() {
                return target.clock.now;
            };
        } else {
            delete target.now;
        }

        if (source.toSource) {
            target.toSource = function toSource() {
                return source.toSource();
            };
        } else {
            delete target.toSource;
        }

        target.toString = function toString() {
            return source.toString();
        };

        target.prototype = source.prototype;
        target.parse = source.parse;
        target.UTC = source.UTC;
        target.prototype.toUTCString = source.prototype.toUTCString;
        return target;
    }

    datespy.clock = {
        now: 0,

        create: function create(now) {
            var clock = createObject(this);

            if (typeof now === "number") {
                clock.now = now;
            }

            if (!!now && typeof now === "object") {
                throw new TypeError("now should be milliseconds since UNIX epoch");
            }

            return clock;
        },

        setTimeout: function setTimeout(callback, timeout) {
            return addTimer.call(this, arguments, false);
        },

        clearTimeout: function clearTimeout(timerId) {
            if (!this.timeouts) {
                this.timeouts = [];
            }

            if (this.timeouts.hasOwnProperty(timerId)) {
                delete this.timeouts[timerId];
            }
        },

        setInterval: function setInterval(callback, timeout) {
            return addTimer.call(this, arguments, true);
        },

        clearInterval: function clearInterval(timerId) {
            this.clearTimeout(timerId);
        },

        tick: function tick(ms) {
            ms = typeof ms === "number" ? ms : parseTime(ms);
            var tickFrom = this.now, tickTo = this.now + ms, previous = this.now,
                timer = this.firstTimerInRange(tickFrom, tickTo),
                firstException;
            while (timer && tickFrom <= tickTo) {
                if (this.timeouts[timer.id]) {
                    tickFrom = this.now = timer.callAt;
                    try {
                        this.callTimer(timer);
                    } catch (e) {
                        firstException = firstException || e;
                    }
                }

                timer = this.firstTimerInRange(previous, tickTo);
                previous = tickFrom;
            }

            this.now = tickTo;

            if (firstException) {
                throw firstException;
            }

            return this.now;
        },

        firstTimerInRange: function (from, to) {
            var timer, smallest,
                tId;

            for (tId in this.timeouts) {
                if (this.timeouts.hasOwnProperty(tId)) {
                    if (!(this.timeouts[tId].callAt < from || this.timeouts[tId].callAt > to)) {
                        if (!smallest || this.timeouts[tId].callAt < smallest) {
                            smallest = this.timeouts[tId].callAt;

                            timer = {
                                func: this.timeouts[tId].func,
                                callAt: this.timeouts[tId].callAt,
                                interval: this.timeouts[tId].interval,
                                id: this.timeouts[tId].id,
                                invokeArgs: this.timeouts[tId].invokeArgs
                            };
                        }
                    }
                }
            }

            return timer || null;
        },

        callTimer: function (timer) {
            var exception;
            if (typeof timer.interval === "number") {
                this.timeouts[timer.id].callAt += timer.interval;
            } else {
                delete this.timeouts[timer.id];
            }

            try {
                if (typeof timer.func === "function") {
                    timer.func.apply(null, timer.invokeArgs);
                } else {
                    eval(timer.func);
                }
            } catch (e) {
                exception = e;
            }

            if (!this.timeouts[timer.id]) {
                if (exception) {
                    throw exception;
                }
                return;
            }

            if (exception) {
                throw exception;
            }
        },

        reset: function reset() {
            this.timeouts = {};
        },

        Date: (function () {
            var MockDate = Date;

            function ClockDate(year, month, date, hour, minute, second, ms) {
                // Defensive and verbose to avoid potential harm in passing
                // explicit undefined when user does not pass argument
                switch (arguments.length) {
                case 0:
                    return new MockDate(ClockDate.clock.now);
                case 1:
                    return new MockDate(year);
                case 2:
                    return new MockDate(year, month);
                case 3:
                    return new MockDate(year, month, date);
                case 4:
                    return new MockDate(year, month, date, hour);
                case 5:
                    return new MockDate(year, month, date, hour, minute);
                case 6:
                    return new MockDate(year, month, date, hour, minute, second);
                default:
                    return new MockDate(year, month, date, hour, minute, second, ms);
                }
            }

            return mirrorDateProperties(ClockDate, MockDate);
        }())
    };

    methods = ["Date", "setTimeout", "setInterval",
        "clearTimeout", "clearInterval"];

    function restore() {
        var method,
            i,
            l;

        for (i = 0, l = this.methods.length; i < l; i++) {
            method = this.methods[i];
            if (global[method].hadOwnProperty) {
                global[method] = this["_" + method];
            } else {
                delete global[method];
            }
        }

        // Prevent multiple executions which will completely remove these props
        this.methods = [];
    }

    function stubGlobal(method, clock) {
        var date, prop;
        clock[method].hadOwnProperty = Object.prototype.hasOwnProperty.call(global, method);
        clock["_" + method] = global[method];

        if (method === "Date") {
            date = mirrorDateProperties(clock[method], global[method]);
            global[method] = date;
        } else {
            global[method] = function () {
                return clock[method].apply(clock, arguments);
            };

            for (prop in clock[method]) {
                if (clock[method].hasOwnProperty(prop)) {
                    global[method][prop] = clock[method][prop];
                }
            }
        }

        global[method].clock = clock;
    }

    datespy.useFakeTimers = function useFakeTimers(now) {
        var clock = datespy.clock.create(now),
            i,
            l;
        clock.restore = restore;
        clock.$restoreDate = restore;
        clock.methods = Array.prototype.slice.call(arguments,
            typeof now === "number" ? 1 : 0);

        if (clock.methods.length === 0) {
            clock.methods = methods;
        }

        for (i = 0, l = clock.methods.length; i < l; i++) {
            stubGlobal(clock.methods[i], clock);
        }

        return clock;
    };
}(typeof global === "object" && typeof global !== "function" ? global : this));

datespy.timers = {
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    setInterval: setInterval,
    clearInterval: clearInterval,
    Date: Date
};

function detectTestFramework() {
    return undefined !== window.jasmine &&
        window.angular !== undefined && angular.mock !== undefined;
}

/**
 * Helps IE run the fake timers. By defining global functions, IE allows
 * them to be overwritten at a later point. If these are not defined like
 * this, overwriting them will result in anything from an exception to browser
 * crash.
 */
if (/MSIE ([0-9]{1,}[\.0-9]{0,})/.test(navigator.userAgent) || detectTestFramework()) {
    (function () {
        "use strict";
        function setTimeout() {}
        function clearTimeout() {}
        function setInterval() {}
        function clearInterval() {}
        function Date() {}

        // Reassign the original functions. Now their writable attribute
        // should be true. Hackish, I know, but it works.
        setTimeout = datespy.timers.setTimeout;
        clearTimeout = datespy.timers.clearTimeout;
        setInterval = datespy.timers.setInterval;
        clearInterval = datespy.timers.clearInterval;
        Date = datespy.timers.Date;
    }());
}

// angular mocks support
if (window.angular !== undefined && angular.mock !== undefined) {
    angular.extend(angular.mock, {
        $mockDate : function () {
            return datespy.useFakeTimers.apply(null, arguments);
        }
    });
}