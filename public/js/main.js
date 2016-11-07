/**
 * Created by Lich on 02.11.2016.
 */
$(document).ready(function(){
    $(document).on("click", ".delete-singer", function(ev) {
        $.ajax({
            url: `/api/singers/${$(ev.currentTarget).val()}`,
            method: "DELETE",
            complete: function(e) {
                console.log(e);
                window.location.reload();
            }
        });
    });

    $(document).on("submit", "#newSingerForm", function(ev) {
        ev.preventDefault();
        $.ajax({
            url: $(ev.currentTarget).attr('action'),
            method: $(ev.currentTarget).attr('method'),
            data: $(ev.currentTarget).serialize(),
            complete: function(e) {
                console.log(e);
                window.location.reload();
            }
        });

    });

});
