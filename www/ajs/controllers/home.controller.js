// Home Controller
app.controller('home', ['$scope','seven','$state','services',
    function ( $scope, seven, $state, services ) {

            seven.showIndicator();
			
			$scope.data = JSON.parse(localStorage.uthir_user);

            var self = JSON.parse(localStorage.uthir_user);

            services.master('uthiram/donors_search',{}).then(function(res){
                $scope.donors =  res.data.donors;
            	seven.hideIndicator();
            })            

}]);
