/**
     * Trims whitespace at the beginning and/or end of a string
     * @param value - string to be trimmed
     * @returns {String} - returns an empty string if the value passed is not of type {String}
     */
    var trimString = function(value) {
        if (itypeof(value) === 'string'){
            return value.replace(/^\s*/, '').replace(/\s*$/, '');
        }
        return '';
      };

    /**
     * The itypeof operator returns a string indicating the type of the unevaluated operand.
     * @param val {*}
     **/
    var itypeof = function(val) {
        return Object.prototype.toString.call(val).replace(/(\[|object|\s|\])/g, '').toLowerCase();
      };

    /**
     * checks if a variable is of @type {boolean}
     * @param value
     * @returns {boolean}
     */
    var isBoolean = function(value) {
        return itypeof(value) === 'boolean';
    };
    /**
     * This method checks if a variable is of type {string}
     * and if the string is not an empty string
     * @param value
     * @returns {*|Boolean|boolean}
     */
    var isStringNotEmpty = function(value) {
        return (itypeof(value) === 'string' && trimString(value) !== '');
    };

    /**
     * checks if @param1 is a substring of @param2
     * @param sub
     * @param full
     **/
    var isSubString = function(sub, full) {
        if (itypeof(sub) === 'string' && itypeof(full) === 'string') {
            if (full.toLowerCase().indexOf(sub.toLowerCase()) !== -1) {
                return true;
            }
        }
        return false;
    };

    /**
     * supplant is a string templating engine that replaces patterns
     * in a string with values from a template object
     * @param template
     * @param values
     * @param pattern
     **/
    var supplant = function(template, values, pattern) {
        var criteria1 = itypeof(template) !== 'string' && itypeof(values) !== 'object';
        var criteria2 = itypeof(template) !== 'string' || itypeof(values) !== 'object';
        if (criteria1 || criteria2) {
            return Array.prototype.slice.call(arguments);
        }

        pattern = itypeof(pattern) === 'regexp' ? pattern : /\{([^\{\}]*)\}/g;

        return template.replace(pattern, function(a, b) {
            var p = b.split('.'),
                r = values;

            try {
                for(var s in p) {
                   r = r[p[s]];
                }
            } catch (e) {
                r = a;
            }

            return (typeof r === 'string' || typeof r === 'number') ? r : a;
        });
    };

    var service = {
        supplant: supplant,
        isSubString: isSubString,
        isStringNotEmpty: isStringNotEmpty,
        isBoolean: isBoolean,
        trimString: trimString,
        itypeof: itypeof
    };
    

module.exports = service;