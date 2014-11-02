/**
 * @file util
 * @author ishenli （meshenli@gmail.com）
 */
define(function(require) {

    var dom = require('lib/dom');
    var $ = require('jquery');

    describe('class', function () {
        var tpl = '';

        $.ajax({
            url: './base/test/lib/dom/class.html',
            async: false,
            success: function (d) {
                tpl = d;
            }
        });

        beforeEach(function () {
            $('body').append(tpl);
            foo = dom.query('#foo-class');
            a = dom.query('#foo-class a');
            input = dom.query('#foo-class input');
            radio = dom.query('#test-radio-class');
            radio2 = dom.query('#test-radio2-class');
            button = dom.query('#foo-class button');
            label = dom.query('#foo-class label');
            table = dom.query('#test-table');
            td = dom.query('#test-table td');
            select = dom.query('#test-select');
            select2 = dom.query('#test-select2');
            select3 = dom.query('#test-select3');
            opt = dom.query('#test-opt');
            div = dom.query('#test-div');
        });

        afterEach(function () {
            $('#test-data-class').remove();
        });

        var foo ,
            a ,
            input ,
            radio,
            radio2 ,
            button,
            label ,
            table ,
            td ,
            select ,
            select2,
            select3,
            opt,
            div;

        it('hasClass works', function () {
            a.className = 'link link2\t' + 'link9 link3';
            expect(dom.hasClass(a, 'link')).toBe(true);
            expect(dom.hasClass(a, '.link')).toBe(true);
            expect(dom.hasClass(a, 'link4')).toBe(false);
            expect(dom.hasClass(a, 'link link3')).toBe(true);
            expect(dom.hasClass(a, '.link .link3')).toBe(true);
            expect(dom.hasClass(a, 'link link4')).toBe(false);
            expect(dom.hasClass(a, '.link .link4')).toBe(false);
            expect(dom.hasClass(a, 'link9')).toBe(true);
        });

        it('addClass works', function () {
            dom.addClass(a, 'link-added');
            expect(dom.hasClass(a, 'link-added')).toBe(true);
            dom.addClass(a, '.cls-a cls-b');
            expect(dom.hasClass(a, 'cls-a')).toBe(true);
            expect(dom.hasClass(a, 'cls-b')).toBe(true);
        });

        it('removeClass works', function () {
            a.className = 'link link2 link3 link4 link5';
            dom.removeClass(a, 'link');
            expect(dom.hasClass(a, 'link')).toBe(false);
            dom.removeClass(a, 'link2 link4');
            dom.removeClass(a, '.link3');
            expect(a.className).toBe('link5');
        });

        it('replaceClass works', function () {
            a.className = 'link link3';
            // oldCls 有的话替换
            dom.replaceClass(a, '.link', 'link2');
            expect(dom.hasClass(a, 'link')).toBe(false);
            expect(dom.hasClass(a, 'link2')).toBe(true);
            // oldCls 没有的话，仅添加
            dom.replaceClass(a, 'link4', 'link');
            expect(a.className).toBe('link3 link2 link');
        });

        it('toggleClass works', function () {
            a.className = 'link link2';
            dom.toggleClass(a, 'link2');
            expect(dom.hasClass(a, 'link2')).toBe(false);
            //Dom.toggleClass(a, '.link2',false);
            //expect(Dom.hasClass(a, 'link2')).to.be(false);
            dom.toggleClass(a, '.link2');
            expect(dom.hasClass(a, 'link2')).toBe(true);
            // Dom.toggleClass(a, '.link2',true);
            // expect(Dom.hasClass(a, 'link2')).to.be(true);
        });
    });
});