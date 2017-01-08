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
                        seven.showIndicator();

       		var validations = validator();
       		if(validations) {
       			services.master('uthiram/login',$scope.data).then(function(res){
       				if(res.data.status == 400) {
       					alert('Wrong Username/ Password');
       					return false;
       				}
       				if(res.data.status == 200) {
                                    seven.hideIndicator();
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
app.controller('register', ['$scope','seven','$state','services','$location',
    function ( $scope , seven , $state , services, $location) {

       $scope.data = {};
       $scope.data.uthi_name = "";
       $scope.data.uthi_email = "";
       $scope.data.uthi_password = "";
       $scope.data.uthi_cpassword = "";

       $scope.register = function() {
                  seven.showIndicator();

       		var validations = validator();
       		if(validations) {
       			services.master('uthiram/register',$scope.data).then(function(res){
       				if(res.data.status == 400) {
                                    seven.hideIndicator();
       					alert('This email ID is already registered with us');
       					return false;
       				}
       				if(res.data.status == 200) {
                                    seven.hideIndicator();
       					alert('Registeration successful');
       					localStorage.uthir_logged = 1;
                                    localStorage.uthir_user = JSON.stringify(res.data.details);
                                    $location.path( "/app/verify/1" );

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




// Verify controller
app.controller('verify', ['$scope','seven','$location','services','$stateParams',
    function ( $scope , seven , $location , services,$stateParams) {

      $scope.flag = $stateParams.Flag;
      $scope.code = "";
      var self = JSON.parse(localStorage.uthir_user);
       $scope.verify = function() {
                  seven.showIndicator();

                  var validations = validator();
                  if(validations) {
                        services.master('uthiram/verify',{'code':$scope.code, 'uthi_user': self['uthi_id']}).then(function(res){
                              if(res.data.status == 400) {
                                    seven.hideIndicator();
                                    alert('Wrong Code!!!');
                                    return false;
                              }
                              if(res.data.status == 200) {
                                    seven.hideIndicator();
                                    alert('Account Sucessfully verified!');
                                    localStorage.uthir_logged = 1;
                                    localStorage.uthir_user = JSON.stringify(res.data.details);
                                    if($scope.flag == 1) {
                                          $location.path( "/app/home" );
                                    } else if($scope.flag == 2) {
                                          $location.path( "/app/profile" );
                                    } else if($scope.flag == 3) {
                                          $location.path( "/app/donors" );
                                    }
                              }
                        })
                  }
       }



       function validator(){

                  return true;
       }

       $scope.close = function(){
            $location.path( "/app/home" );
            
            
       }
}]);

