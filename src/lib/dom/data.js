/**
 * @file data
 * @author shenli （meshenli@gmail.com）
 */
define(
    function (require) {
        var util = require('../util');
        var dom = require('./base');
        var EXPANDO = '_winnie_data_' + util.now();
        var exports = {};
        var win = window;
        var attrPrefix = 'data-';

        var dataCache = {};
        var winDataCache = {}; // 避免污染全局

        var domOps = {
            data: function (el, name, value) {
                var key = el[EXPANDO];
                if (!key) {
                    if (name !== undefined && value === undefined) {
                        return undefined;
                    }
                    key = el[EXPANDO] = util.guid();
                }
                var cache = dataCache[key];

                if (value !== undefined) {
                    cache = dataCache[key] = dataCache[key] || {};
                    cache[name] = value;
                }
                else {
                    if (name !== undefined) {
                        return cache && cache[name];
                    }
                    else {
                        // 需要新建
                        cache = dataCache[key] = dataCache[key] || {};
                        return cache;
                    }
                }
            }
        };

        var objectOps = {
            data: function (ob, name, value) {
                if (ob === win) {
                    return objectOps.data(winDataCache, name, value);
                }
                var cache = ob[EXPANDO];
                if (value !== undefined) {
                    cache = ob[EXPANDO] = ob[EXPANDO] || {};
                    cache[name] = value;
                }
                else {
                    if (name !== undefined) {
                        return cache && cache[name];
                    }
                    else {
                        cache = ob[EXPANDO] = ob[EXPANDO] || {};
                        return cache;
                    }
                }
            }
        };
        exports.data = function (selector, name, value) {
            var els = dom.query(selector);
            var el = els[0];

            if (typeof name === 'object') {
                for (var k in name) {
                    exports.data(els, k, name[k]);
                }
            }
            if (value === undefined) {
                if (el) {
                    if (el.nodeType) {
                        return domOps.data(el, name);
                    }
                    else {
                        // window
                        return objectOps.data(el, name);
                    }
                }
            }
            else {
                for (var i = els.length - 1; i >= 0; i--) {
                    el = els[i];
                    if (el.nodeType) {
                        domOps.data(el, name, value);
                    }
                    else {
                        // window
                        objectOps.data(el, name, value);
                    }
                }
            }
        };
        /**
         * 设置data的值
         *
         * @param {HTMLElement} element 目标元素
         * @param {string} key data名
         * @param {string} value data值
         */
        exports.setData = function (element, key, value) {
            element.setAttribute(attrPrefix + key, value);
        };


        /**
         * 获取data的值
         *
         * @param {HTMLElement} element 目标元素
         * @param {string} key data名
         * @return {string|null} data值
         */
        exports.getData = function (element, key) {
            return element.getAttribute(attrPrefix + key);
        };

        /**
         * 删除指定的data项
         *
         * @param {HTMLElement} element 目标元素
         * @param {string} key data名
         */
        exports.removeData = function (element, key) {
            element.removeAttribute(attrPrefix + key);
        };

        return exports;
    });
