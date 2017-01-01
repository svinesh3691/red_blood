// App Controller
app.controller('app', ['$scope','seven','$rootScope','services',
    function ( $scope, seven, $rootScope, services ) {
            
            seven.hideIndicator();

            $scope.logout = function(){
                  delete localStorage.uthir_logged;
                  delete localStorage.uthir_user;
                  window.location.href="index.html";
            }
            
}]);



// Login controller
app.controller('login', ['$scope','seven','$location','services',
    function ( $scope , seven , $location , services) {

       $scope.data = {};
       $scope.data.uthi_email = "";
       $scope.data.uthi_password = "";

       $scope.login = function() {
       		var validations = validator();
       		if(validations) {
       			services.master('uthiram/login',$scope.data).then(function(res){
       				if(res.data.status == 400) {
       					alert('Wrong Username/ Password');
       					return false;
       				}
       				if(res.data.status == 200) {
       					localStorage.uthir_logged = 1;
       					localStorage.uthir_user = JSON.stringify(res.data.details);
       					$location.path( "/app/home" );
       				}
       			})
       		}
       }



       function validator(){
       		if($scope.data.uthi_email == "" ||$scope.data.uthi_password == ""   ) {
       			alert("All fields are required!");
       			return false;
       		}

       		if($scope.data.uthi_email == "") {
       			alert("Enter a valid email!");
       			return false;
       		}

       		return true;
       }
}]);



// Register controller
app.controller('register', ['$scope','seven','$state','services',
    function ( $scope , seven , $state , services) {

       $scope.data = {};
       $scope.data.uthi_name = "";
       $scope.data.uthi_email = "";
       $scope.data.uthi_password = "";
       $scope.data.uthi_cpassword = "";

       $scope.register = function() {
       		var validations = validator();
       		if(validations) {
       			services.master('uthiram/register',$scope.data).then(function(res){
       				if(res.status == 400) {
       					alert('This email ID is already registered with us');
       					return false;
       				}
       				if(res.status == 200) {
       					alert('Registeration successful');
       					return false;
       				}
       			})
       		}
       }



       function validator(){
       		if($scope.data.uthi_name == "" ||$scope.data.uthi_email == "" ||$scope.data.uthi_password == "" ||$scope.data.uthi_cpassword == ""  ) {
       			alert("All fields are required!");
       			return false;
       		}

       		if($scope.data.uthi_email == "") {
       			alert("Enter a valid email!");
       			return false;
       		}
       		
       		if($scope.data.uthi_password != $scope.data.uthi_cpassword) {
       			alert("Passwords does not match!");
       			return false;
       		}

       		return true;
       }
}]);


