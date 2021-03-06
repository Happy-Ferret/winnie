/**
 * @file util
 * @author shenli <shenli03@baidu.com>
 */
define(function (require) {

    require('./util/array');
    require('./util/type');
    require('./util/object');
    require('./util/string');
    require('./util/web');
    require('./util/function');

    var util = require('./util/base');
    util.version = '0.1.0';
    return util;
});
