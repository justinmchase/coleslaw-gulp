var path = require('path')
var through2 = require('through2')
var grammar = require('coleslaw').grammar
var semantics = require('coleslaw').semantics

module.exports = function (options) {

    return through2.obj(function (file, enc, cb) {
        if (file.isNull()) return cb(null, file)
        if (file.isStream()) return cb(new Error('Coleslaw streaming not supported'))

        var str = file.contents.toString('utf8')
        var match = grammar.match(str)
        var result = semantics(match)

        // todo: better error output...

        file.contents = new Buffer(result.asES5)
        file.path = file.path.replace('.cls', '.js')
        cb(null, file)
    })

}