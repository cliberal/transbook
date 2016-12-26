$(function() {
    $('.del').click(function (e) {
        e = e || event;
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id);

        $.ajax({
            type: 'DELETE',
            url: '/admin/list?id=' + id
        })
        .done(function (res) {
            if (res.success) {
                if(tr.length > 0) {
                    tr.remove()
                }
            }
        })
    })
});
