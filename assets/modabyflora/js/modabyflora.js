// Moda by FLora site javascript

// Redirect to home page if user tries to reach login but is already connected
var host_pathname = window.location.pathname; // Returns path only (/path/example.html)
var host_url      = window.location.href;     // Returns full URL (https://example.com/path/example.html)
var host_origin   = window.location.origin;   // Returns base URL (https://example.com)

//var api_url_base = "http://localhost:8002"; 
var api_url_base = "";

if(host_origin === "http://localhost:4000")
{
    // In dev mode, we have separated hosts for the static host and the api
    api_url_base = "http://localhost:8002";
} else {
    // In production we use the same url base for the static html and the api
    api_url_base = "https://whatsappecommerce.herokuapp.com";
}

// Checks with the API if the user is connected
function is_user_connected(){
    // Load the token
    var token = get_user_token();
    var is_connected = false;

    $.ajax({
        url: `${api_url_base}/api/get-me/`,
        async: false,

        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Token ' + token);
        },
        type: "POST",
        dataType : "json",
    })
    .done(function( json ) {
        console.log("is_user_connected > success")
        console.log(json);
        is_connected = true;
    })
    .fail(function( xhr, status, errorThrown ) {
        console.log( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    });

    return is_connected;
}

// Get the user token
function get_user_token(){
    return window.localStorage.getItem("auth-token");
}

console.log("User is trying to connect to the path " + host_pathname);
if(host_pathname == "/login/"){
    if(is_user_connected()){
        // If user is connected and is trying to connect
        console.log("User is already connected. Redirecting to the home page.");
        location.href = "/";
    } else {
        console.log("User not connected. Allow to connect to login page")
    }
    
} else {
    console.log("User is not trying to connect to the login page");
}


$( document ).ready(function() {
    console.log( "ready!" );

    // Check the user login
    function display_navbar_userprofile(){
        if(is_user_connected()){
            console.log("User is connected. Showing the navbar profile");
            $('#navbar-login-link').hide();
            $('#navbar-useraccount').show();
        } else {
            // Redirect to login to connect
            console.log("User is not connected. Showing login link");
            $('#navbar-login-link').show();
            $('#navbar-useraccount').hide();
        }
    }

    /**
     * TODO Login and store the user token
     * TODO Forgot password
     * TODO Register
     * TODO Add to cart
     * TODO checkout page
     */

    function signin(event){
        event.preventDefault();

        $.ajax({
    
            // The URL for the request
            url: `${api_url_base}/api-token-auth/`,
        
            // The data to send (will be converted to a query string)
            data: {
                username: $('#defaultLoginFormEmail').val(),
                password: $('#defaultLoginFormPassword').val()
            },
        
            // Whether this is a POST or GET request
            type: "POST",
        
            // The type of data we expect back
            dataType : "json",
        })
        // Code to run if the request succeeds (is done);
        // The response is passed to the function
        .done(function( json ) {
            console.log("Login has been successful!");
            console.log(json);
            var divuser = $("#userapidata")[0];
            jQuery.data( divuser, "userdata", json);

            window.localStorage.setItem("auth-token", json.token);

            store_connected_user_data();

            // Redirect to home page
            location.href = "/";
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

    }

    // Logout
    function signout(event){
        event.preventDefault();
        var token = get_user_token();

        // Logout from api
        $.ajax({
        
            // The URL for the request
            url: `${api_url_base}/api-logout/`,

            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Token ' + token);
            },
            type: "GET",
        
            // The type of data we expect back
            dataType : "json",
        })
        // Code to run if the request succeeds (is done);
        // The response is passed to the function
        .done(function( json ) {
            console.log("Logout has been successful!");
            console.log(json);
            console.log("Clear the local storage");
            clear_connected_user_data();

            //var divuser = $("#userapidata")[0];
            //jQuery.data( divuser, "userdata", json);
            //window.localStorage.setItem("auth-token", json.token);
            //store_connected_user_data();

            // Redirect to home page
            location.href = "/";
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

    }

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


    // Clear the user's data from local storage
    function clear_connected_user_data(){
        console.log("clear_connected_user_data > clearing the user's data");
        window.localStorage.removeItem("userid");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("auth-token");
    }

    // Control the user's account
    display_navbar_userprofile();
    
    // Submit the user login
    $("#defaultLoginForSubmit").click(signin);
    $("#navbar-userlogout").click(signout);

    var divuser = $("#userapidata")[0];
    var apidata = jQuery.data( divuser, "userdata");
    console.log(apidata);
    $("#cart-nb-elements").val(apidata.user.orders.length);
});