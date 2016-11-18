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

    $(document).on("click", ".delete-user", function(ev) {
        $.ajax({
            url: `/api/users/${$(ev.currentTarget).val()}`,
            method: "DELETE",
            complete: function(e) {
                console.log(e);
                window.location.reload();
            }
        });
    });

    $(document).on("submit", "#newUserForm", function(ev) {
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

    $(document).on("click", ".video-button", function(ev) {
        ev.preventDefault();
        $.ajax({
            url: `/a`,
            method: "GET",
            dataType: 'html',
            data: {},
            complete: function(e, data, d) {
                console.log(e, data, d);
                if (e.responseText) {
                    $(".vieo-container").append(e.responseText);
                }

            },
            done: function(e, data, d) {
                console.log(e, data, d);
                $(".vieo-container").append();
            },
        });
    });




});
