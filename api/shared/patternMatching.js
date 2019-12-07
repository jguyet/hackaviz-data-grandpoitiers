'use strict';

exports.match = function(value) {
    function match_aux(patternsMatch, value) {
        var i;
        var nan;
    
        for (i = 0; i < patternsMatch.length; i += 1) {
            if (typeof patternsMatch[i] === 'function') {
                nan = patternsMatch[i];
            } else if ((patternsMatch[i].length === 2)
                && ((patternsMatch[i][0] === value) || (typeof patternsMatch[i][0] === 'function' && patternsMatch[i][0](value)))) {
                patternsMatch[i][1](value);
                return ;
            } else if (patternsMatch[i].length === 3 && (patternsMatch[i][0] === value) && patternsMatch[i][1](value) === true) {
                patternsMatch[i][2](value);
                return ;
            }
        }
        //no match
        if (nan !== undefined) {
            nan(value);
        }
    }
    return function(patternsMatch) {
        match_aux(patternsMatch, value);
    };
};