/**
 * formats a string replacing tokens with an argument list, array, objects, and nested objects. 
 * @args Can be a list of arguments, array or object
 * 
 * Usage:
 * "hello {0} world {0}!".format("foo", "bar"); //"hello foo world bar"
 * "hello {0} world {0}!".format(["foo", "bar"]); //"hello foo world bar"
 * "hello {name} world {test}!".format({name: "foo", test: "bar"}); //"hello foo world bar"
 * "hello {obj.name} world {obj.test[0]}!".format({obj:{name: "foo", test: ["bar"]}}); //"hello foo world bar"
 * @author Victor B. https://gist.github.com/victornpb/5a9642b1d5f749695e14
 */
String.prototype.format = function () {

    /**
     * Access a deep value inside a object 
     * Works by passing a path like "foo.bar", also works with nested arrays like "foo[0][1].baz"
     * @author Victor B. https://gist.github.com/victornpb/4c7882c1b9d36292308e
     * Unit tests: http://jsfiddle.net/Victornpb/0u1qygrh/
     */
    function getDeepVal(obj, path) {
        if (typeof obj === "undefined" || obj === null) return;
        path = path.split(/[\.\[\]\"\']{1,2}/);
        for (var i = 0, l = path.length; i < l; i++) {
            if (path[i] === "") continue;
            obj = obj[path[i]];
            if (typeof obj === "undefined" || obj === null) return;
        }
        return obj;
    }

    var str = this.toString();
    if (!arguments.length)
        return str;
    var args = typeof arguments[0],
        args = (("string" == args || "number" == args) ? arguments : arguments[0]);
    str = str.replace(/\{([^\}]+)\}/g, function (m, key) {
        return getDeepVal(args, key);
    });
    return str;
};