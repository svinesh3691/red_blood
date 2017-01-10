/*Creating Module*/
var app = angular.module('app', [
    'ui.router',
    'infinite-scroll'
]);



/* Core Phone gap [JS] Codes */ 
function onLoad() {
    
    document.addEventListener("deviceready", onDeviceReady, false);

}



// onDeviceReady
function onDeviceReady() {
		// Back Button Management
        document.addEventListener("backbutton", function (e) {
            e.preventDefault();
            // var exit_confirm = confirm('Are you sure to exit app? ');
            // if(exit_confirm) navigator.app.exitApp();
            
            var hash = window.location.hash;

            console.log(hash); 
            console.log(/#\/app\/donor_edit\/\d/g.test(hash)); 
            if(hash == "#/app/profile_edit") {
           		window.location.href = "#/app/profile";
           	} else if(
           		/#\/app\/donor_edit\/\d/g.test(hash)  || 
           		/#\/app\/donor_registeration\/2\/\d/g.test(hash) ||  
           		/#\/app\/donor_registeration\/3\/\d/g.test(hash)   
           		) {
           		window.location.href = "#/app/donors";
            } else if( /#\/app\/donor_registeration\/1\/\d/g.test(hash) ) {
           		window.location.href = "#/app/profile";
            } else if (hash == "#/app/home") {

            	var exit_confirm = confirm('Are you sure to exit app? ');
            	if(exit_confirm) navigator.app.exitApp();
            } else if (hash == "#/app/filter") {

           		window.location.href = "#/app/donor_list";
            } else {
           		window.location.href = "#/app/home";

            }
            // window.location.href = "#/app/home";




        }, false );


}
