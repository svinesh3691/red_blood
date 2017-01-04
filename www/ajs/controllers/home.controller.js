// Home Controller
app.controller('home', ['$scope','seven','$state','services',
    function ( $scope, seven, $state, services ) {

            seven.showIndicator();
			if(localStorage.uthir_user) {
					$scope.data = JSON.parse(localStorage.uthir_user);
			}
			

            services.master('uthiram/donors_search',{}).then(function(res){
                $scope.donors =  res.data.donors;
            	seven.hideIndicator();
            })            

}]);



// Home Controller
app.controller('filter', ['$scope','seven','$state','services','$location',
    function ( $scope, seven, $state, services, $location ) {
            $scope.sd = JSON.parse(localStorage.states);
            var filters = JSON.parse(localStorage.filters);
            $scope.filter = (filters) || {};
            console.log($scope.filter);

            $scope.filterNow = function () {
                console.log($scope.filter);
                localStorage.filters = JSON.stringify($scope.filter);
                $location.path( "/app/donor_list" );
            }  


            $scope.loadTempDist = function() {
                $scope.temp_districts = $scope.sd[parseInt($scope.filter.state) - 1].districts;
            }

            $scope.$watch('filter.state', function(NewValue, OldValue) {
                $scope.loadTempDist();
                setTimeout(function(){
                        $scope.filter.district = filters.district || '';
                        $scope.$apply();
                        console.log($scope.filter);
                },111)
            }, true);


}]);

