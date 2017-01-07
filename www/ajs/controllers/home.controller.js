// Home Controller
app.controller('home', ['$scope','seven','$state','services',
    function ( $scope, seven, $state, services ) {
            $scope.donors       = [];
            $scope.completed    = false; 
            $scope.getting      = true; 
            $scope.spinner      = false; 
            seven.showIndicator();
			if(localStorage.uthir_user) {
					$scope.data = JSON.parse(localStorage.uthir_user);
			}
			var filter = JSON.parse(localStorage.filters);
            filter['start'] = 1;
            filter['limit'] = 3;
            services.master('uthiram/donors_search',filter).then(function(res){
                res.data.donors.forEach(function(item){
                        $scope.donors.push(item);
                    })
                $scope.getting  = false;
                $scope.spinner      = true; 
                seven.hideIndicator();
            })           

            $scope.callNow = function(num){
                document.location.href = 'tel:'+num;
            }  

            $scope.getData = function(){
                console.log('bla');
                if($scope.completed) return false;
                if($scope.getting) return false;
                $scope.getting = true;
                console.log('alb');
                filter['start']++;
                filter['start'] = filter['start'] * 2;
                services.master('uthiram/donors_search',filter).then(function(res){

                    if(!res.data.donors) {
                        $scope.completed = true;
                        $scope.getting = false;
                        return false;
                    }
                    res.data.donors.forEach(function(item){
                        $scope.donors.push(item);
                    })
                    $scope.getting = false;
                })   
            }


}]);



// Home Controller
app.controller('filter', ['$scope','seven','$state','services','$location',
    function ( $scope, seven, $state, services, $location ) {
            $scope.sd = JSON.parse(localStorage.states);
            var filters;
            if(localStorage.filters) filters = JSON.parse(localStorage.filters);
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
                console.log(NewValue);
                if(NewValue) {
                        $scope.loadTempDist();
                }
                
            }, true);


}]);

