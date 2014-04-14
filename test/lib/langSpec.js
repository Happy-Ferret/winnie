/**
 * @file lib test
 * @author shenli （meshenli@gmail.com）
 */
define(function(require) {

    var lib = require('lib');

    describe('deepClone', function () {
        it('简单的对象克隆',function (){
            var testObj = {
                name: 'shenli',
                age: [11, 12],
                work: {
                    company: 'baidu'
                }
            };
            var cloneObj = lib.deepClone(testObj);
            cloneObj.name = 'ishenli';
            cloneObj.work.company = 'taobao';
            expect(cloneObj.age[0]).toEqual(11);
            expect(cloneObj.work.company).toEqual('taobao');
            expect(testObj.work.company).toEqual('baidu');
        });

    });
});