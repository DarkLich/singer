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

    $(document).on("submit", "#user_profile_form", function(ev) {
        ev.preventDefault();
        $.ajax({
            url: $(ev.currentTarget).attr('action'),
            method: $(ev.currentTarget).attr('method'),
            data: $(ev.currentTarget).serialize(),
            complete: function(e) {
                console.log('bbbbbbbbbbbbbb', e);
            }
        });
    });

    $('.user-photo-uploader').change(function(e){
        var formData = new FormData();
        console.log('}}}}}}}', $(e.currentTarget)[0].files[0])
        formData.append("file", $(e.currentTarget)[0].files[0]);
        $.ajax({
            url: '/api/users/upload',  //Server script to process data
            type: 'POST',
            //xhr: function() {  // Custom XMLHttpRequest
            //    var myXhr = $.ajaxSettings.xhr();
            //    if(myXhr.upload){ // Check if upload property exists
            //        myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
            //    }
            //    return myXhr;
            //},
            //Ajax events
            //beforeSend: beforeSendHandler,
            //success: completeHandler,
            //error: errorHandler,
            success: function(res) {
                if (res.success) {
                    $(".user-photo").attr("src", Globals.rootUrl + res.path)
                }
                console.log('2222', res)
            },
            // Form data
            data: formData,

            //Options to tell jQuery not to process data or worry about content-type.
            cache: false,
            contentType: false,
            processData: false
        });
    });

    $('.singer-photo-uploader').change(function(e){
        var formData = new FormData();
        console.log('}}}}}}}', $(e.currentTarget)[0].files[0])
        formData.append("file", $(e.currentTarget)[0].files[0]);
        $.ajax({
            url: '/api/users/upload',  //Server script to process data
            type: 'POST',
            //xhr: function() {  // Custom XMLHttpRequest
            //    var myXhr = $.ajaxSettings.xhr();
            //    if(myXhr.upload){ // Check if upload property exists
            //        myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
            //    }
            //    return myXhr;
            //},
            //Ajax events
            //beforeSend: beforeSendHandler,
            //success: completeHandler,
            //error: errorHandler,
            success: function(res) {
                if (res.success) {
                    $(".user-photo").attr("src", Globals.rootUrl + res.path)
                }
                console.log('2222', res)
            },
            // Form data
            data: formData,

            //Options to tell jQuery not to process data or worry about content-type.
            cache: false,
            contentType: false,
            processData: false
        });
    });

    //$('.nav-tabs a').tab('show')

});
