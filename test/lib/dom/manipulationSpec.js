/**
 * @file manipulation
 * @author shenli （meshenli@gmail.com）
 */
define(function (require) {
    var Dom = require('lib/dom');

    describe('insertion', function () {
        var body = document.body;
        it('insertBefore should works', function () {
            var foo = body.appendChild(Dom.create('div'));
            var t = Dom.create('<p>insertBefore node</p>');
            Dom.insertBefore(t, foo);
            expect(foo.previousSibling).toBe(t);
            Dom.remove(foo);
            Dom.remove(t);
        });

        it('insertAfter should works', function () {
            var foo = body.appendChild(Dom.create('<div></div>'));
            var t = Dom.create('<p>insertAfter node</p>');
            Dom.insertAfter(t, foo);
            expect(foo.nextSibling).toBe(t);
            Dom.remove(foo);
            Dom.remove(t);
        });

        it('append should works', function () {
            var foo = body.appendChild(Dom.create('<div><div></div></div>'));
            var t = Dom.create('<p>append node</p>');
            Dom.append(foo,t);
            // 因为node clone，导致插入的节点和被插入的节点不是同一个
            // expect(foo.lastChild).toBe(t);
            expect(foo.lastChild.innerHTML).toBe(t.innerHTML);
            Dom.remove(foo);
            Dom.remove(t);
        });

        it('append does not change value for select', function () {
            var select = body.appendChild(Dom.create('<select>' +
            '<option>1</option>' +
            '<option>2</option>' +
            '</select>'));
            expect(select.selectedIndex).toBe(0);
            select.appendChild(Dom.create('<option>3</option>'));
            expect(select.selectedIndex).toBe(0);
            Dom.remove(select);
        });

        it('prepend should works', function () {
            var foo = body.appendChild(Dom.create('<div><div></div></div>'));
            var t = Dom.create('<p>prepend node</p>');
            Dom.prepend(foo,t);
            //expect(foo.firstChild).toBe(t);
            expect(foo.firstChild.innerHTML).toBe(t.innerHTML);
            Dom.remove(foo);
            Dom.remove(t);
        });


        it('wrapAll should works', function () {
            var time = (+new Date());
            var wrappedCls = 'f' + time;
            var wrapperCls = 'x' + time;
            var foo = body.appendChild(Dom.create('<div class="' + wrappedCls + '"></div>'));
            Dom.wrapAll(foo,
                Dom.create('<div class="' + wrapperCls + '">' +
                '<div class="x' + wrapperCls + '"></div>' +
                '</div>'));
            //expect(foo.nextSibling).toBe(foo2);
            expect(foo.parentNode.childNodes.length).toBe(1);
            expect(foo.parentNode.className).toBe('x' + wrapperCls);
            expect(foo.parentNode.parentNode.className).toBe(wrapperCls);
            Dom.remove([foo]);
            Dom.remove(Dom.queryAll('.' + wrapperCls));
        });

        it('wrap should works', function () {
            var time = (+new Date());
            var wrappedCls = 'f' + time;
            var wrapperCls = 'x' + time;
            var foo = body.appendChild(Dom.create('<div class="' + wrappedCls + '"></div>'));
            var foo2 = body.appendChild(Dom.create('<div class="' + wrappedCls + '"></div>'));
            Dom.wrap('.' + wrappedCls,
                Dom.create('<div class="' + wrapperCls + '">' +
                '<div class="x' + wrapperCls + '"></div>' +
                '</div>'));
            expect(foo.nextSibling).toBe(null);
            expect(foo.parentNode.childNodes.length).toBe(1);
            expect(foo.parentNode.className).toBe('x' + wrapperCls);
            expect(foo.parentNode.parentNode.className).toBe(wrapperCls);

            expect(foo2.nextSibling).toBe(null);
            expect(foo2.parentNode.childNodes.length).toBe(1);
            expect(foo2.parentNode.className).toBe('x' + wrapperCls);
            expect(foo.parentNode.parentNode.className).toBe(wrapperCls);

            expect(foo.parentNode.parentNode.nextSibling).toBe(foo2.parentNode.parentNode);
            Dom.remove([foo, foo2]);
            Dom.remove(Dom.queryAll('.' + wrapperCls));
        });

        it('wrapInner should works', function () {
            var time = (+new Date());
            var wrappedCls = 'f' + time;
            var wrapperCls = 'x' + time;
            var childCls = 'c' + time;
            var foo = body.appendChild(Dom.create('<div class="' + wrappedCls + '">' +
            '<div class="' + childCls + '"></div>' +
            //'<div class="c' + childCls + '"></div>' +
            '</div>'));
            Dom.wrapInner([foo],
                Dom.create('<div class="' + wrapperCls + '">' +
                '<div class="x' + wrapperCls + '"></div>' +
                '</div>'));
            expect(foo.childNodes.length).toBe(1);
            expect(foo.firstChild.className).toBe(wrapperCls);
            expect(foo.firstChild.firstChild.childNodes.length).toBe(1);
            expect(foo.firstChild.firstChild.firstChild.className).toBe(childCls);
            //expect(foo.firstChild.firstChild.lastChild.className).toBe('c' + childCls);
            Dom.remove(foo);
            Dom.remove('.' + wrapperCls);
        });

        it('unwrap works', function () {
            var time = (+new Date());
            var wrappedCls = 'f' + time;
            var foo = body.appendChild(Dom.create('<div class="' + wrappedCls + '">' +
            '<div class="x' + wrappedCls + '"></div>' +
            '</div>'));
            var fc = foo.firstChild;
            Dom.unwrap(fc);
            expect(fc.parentNode).toBe(document.body);
            //!!! ie<9 : foo.parentNode == fragment && Dom.contains(document,foo)==true
            expect(foo.parentNode).not.toBe(document.body);
            Dom.remove(fc);
            Dom.remove(foo);
        });
    });

});