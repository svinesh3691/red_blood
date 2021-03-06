// Home Controller
app.controller('home', ['$scope','seven','$state','services',
    function ( $scope, seven, $state, services ) {
            $scope.donors       = [];
            $scope.completed    = false; 
            $scope.getting      = true; 
            $scope.spinner      = false; 
			if(localStorage.uthir_user) {
					$scope.data = JSON.parse(localStorage.uthir_user);
			}
            if(localStorage.filters) {
                var filter = JSON.parse(localStorage.filters);
                $scope.shw = true;
            } else {
                $scope.shw = false;
                filter = {};  
            } 
            var start = 0;
            filter['start'] = 0;
            filter['limit'] = 6;

            var con = $scope.checkConnection();
            if(!con) return false;
            
            seven.showIndicator();
            services.master('uthiram/donors_search',filter).then(function(res){
                seven.hideIndicator();

                if(!res.data.donors) {
                    $scope.nores = true;
                    return false;
                }
                res.data.donors.forEach(function(item){
                        $scope.donors.push(item);
                })
                $scope.getting  = false;
                $scope.spinner  = true; 
            })           

            $scope.callNow = function(num){
                document.location.href = 'tel:'+num;
            }  

            $scope.getData = function(){
                if($scope.completed) return false;
                if($scope.getting) return false;
                $scope.getting = true;
                start++;
                filter['start'] = start * 6;
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



// Filter Controller
app.controller('filter', ['$scope','seven','$state','services','$location',
    function ( $scope, seven, $state, services, $location ) {
            $scope.sd = JSON.parse(localStorage.states);
            var filters;
            if(localStorage.filters) filters = JSON.parse(localStorage.filters);
            $scope.filter = (filters) || {};
            console.log($scope.filter);

            if(localStorage.filters) {
                
                $scope.shw = true;
            }
            else{
                $scope.shw = false;
            } 

            $scope.filterNow = function () {
                console.log($scope.filter);
                localStorage.filters = JSON.stringify($scope.filter);
                $location.path( "/app/donor_list" );
            }  

            $scope.clearNow = function(){
                delete localStorage.filters;
                $scope.filters = {};
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

