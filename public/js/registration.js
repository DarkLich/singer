/**
 * Created by Lich on 08.12.2016.
 */
$(document).ready(function(){
    $(document).on('keypress', ".form-control", (e)=>{
        var el = $(e.currentTarget);
        el.closest(".form-group").removeClass('has-error');
        el.popover('destroy');
    });
    $(document).on("submit", "#sign_in_form", function(ev) {
        ev.preventDefault();
        console.log($(".form-control[name='password']").val() == $(".form-control[name='confirm']").val())
        if ($(".form-control[name='password']").val() == $(".form-control[name='confirm']").val()) {
            $.ajax({
                url: $(ev.currentTarget).attr('action'),
                method: $(ev.currentTarget).attr('method'),
                data: $(ev.currentTarget).serialize(),
                dataType: "json",
                success: function(data) {
                    console.log('aaaa', data);
                    if (!_.isEmpty(data.errors)) {
                        _.each(data.errors, (err)=> {
                            let inp = $(`.form-control[name='${err.path}']`);
                            inp.closest(".form-group").addClass('has-error');
                            inp.popover({content: err.message, trigger: 'manual'}).popover('show');
                        });
                    } else {
                        window.location = "/";
                    }
                },
                complete: function(e,data) {
                    console.log('bbbb', e,data);
                    //window.location.reload();
                }
            });
        } else {
            var confirm = $(".form-control[name='confirm']");
            confirm.closest(".form-group").addClass('has-error');
            confirm.popover({content: "please confirm password", trigger: 'manual'}).popover('show');
        }
    });
});