$(function () {
    awem.dragReor({ from: $('#board1 .card'), to: '#board1 .card', sel: '.item' });

    // don't drag board when mouse down on .item
    function cancel(cx) { return $(cx.e.target).closest('.item').length; }

    awem.dragReor({ from: $('#board1'), to: '#board1', sel: '.card', cancel: cancel });

    // write to log
    $('#board1').on('awedrop',
        function (e, data) {
            var o = $(e.target);
            var msg = name(o) +
                ' moved from ' +
                name(data.from) +
                ' to ' +
                name(o.parent()) +
                ' | previ = ' +
                data.previ +
                ' newi = ' +
                o.index();
            $('#logci').html(msg + '</br>');
        });

    function name(o) {
        var r = o.attr('class');
        if (o.data('k')) r += ' ' + o.data('k');
        if (o.hasClass('item')) r = o.html();
        return r;
    }
});