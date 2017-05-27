/**
 * Created by cyh on 2016/11/19.
 */

Vue.config.delimiters = ['``', '``'];
var vm = new Vue({
    el: '#app',
    data: {
        items: items,
        select_index: 0
    },
    methods: {
        clickThumbnail: function (index, item) {
            $('.carousel').carousel(index);
            vm.select_index = index;
        }
    }
});
$(function () {
    $('.carousel').on('slid.bs.carousel', function (e) {
        var index = $(this).find('.active').attr('index');
        vm.select_index = index
    });

});

