/*Creating Module*/
var app = angular.module('app', [
    'ui.router'
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
            var exit_confirm = confirm('Are you sure to exit app? ');
            if(exit_confirm) navigator.app.exitApp();
        }, false );


}
