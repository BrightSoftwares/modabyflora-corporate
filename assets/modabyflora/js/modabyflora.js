// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );

    var api_url_base = "http://localhost:8002";

    // Get the user token
    function get_user_token(){
        return window.localStorage.getItem("auth-token");
    }

    /**
     * TODO Login and store the user token
     * TODO Forgot password
     * TODO Register
     * TODO Add to cart
     * TODO checkout page
     */

    // Using the core $.ajax() method
    $.ajax({
    
        // The URL for the request
        url: `${api_url_base}/api-token-auth/`,
    
        // The data to send (will be converted to a query string)
        data: {
            username: "xxxxx",
            password: "yyyyyyy"
        },
    
        // Whether this is a POST or GET request
        type: "POST",
    
        // The type of data we expect back
        dataType : "json",
    })
    // Code to run if the request succeeds (is done);
    // The response is passed to the function
    .done(function( json ) {
        console.log(json);
        window.localStorage.setItem("auth-token", json.token);

        store_connected_user_data();
        //$( "<h1>" ).text( json.title ).appendTo( "body" );
        //$( "<div class=\"content\">").html( json.html ).appendTo( "body" );
    })
    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    .fail(function( xhr, status, errorThrown ) {
        console.log( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    })
    // Code to run regardless of success or failure;
    .always(function( xhr, status ) {
        console.log( "The request is complete!" );
    });

    // Get user's data
    function store_connected_user_data(){
        // Load the token
        var token = get_user_token();

        $.ajax({
    
            // The URL for the request
            url: `${api_url_base}/api/get-me/`,

            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Token ' + token);
            },
            type: "POST",
            dataType : "json",
        })
        .done(function( json ) {
            console.log(json);
            window.localStorage.setItem("userid", json.id);
            window.localStorage.setItem("username", json.user.username);
        })
        .fail(function( xhr, status, errorThrown ) {
            console.log( "Sorry, there was a problem!" );
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
        })
        .always(function( xhr, status ) {
            console.log( "The request is complete!" );
        });
    }
});