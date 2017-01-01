// Profile Controller
app.controller('profile', ['$scope','seven','$state','services',
    function ( $scope, seven, $state, services ) {
            
            seven.hideIndicator();
            $scope.data = JSON.parse(localStorage.uthir_user);
            if($scope.data['uthi_donor'] == 2) {
                $scope.donored = true; 
            }
            
}]);


// Donors Controller
app.controller('donors', ['$scope','seven','$state','services',
    function ( $scope, seven, $state, services ) {
            
            seven.hideIndicator();

            $scope.data = JSON.parse(localStorage.uthir_user);
            
            if($scope.data['uthi_donor'] == 2)  $scope.url_flag = 3; 
            else $scope.url_flag = 2; 

            var self = JSON.parse(localStorage.uthir_user);

            services.master('uthiram/donors_by_me',{'referrer_id': self.uthi_id}).then(function(res){
                $scope.donors =  res.data.donors;
            })
            
}]);



// Donor Registeration Controller
app.controller('donor_registeration', ['$scope','seven','$stateParams','services','$location',
    function ( $scope, seven, $stateParams, services ,$location) {
            
            seven.hideIndicator();
            $scope.sd = JSON.parse(localStorage.states);


            $scope.data = {};
            $scope.data.uthi_self = false;
            $scope.data.uthi_name = "";
            $scope.data.uthi_mail = "";
            $scope.data.uthi_phone_one = "";
            $scope.data.uthi_phone_two = "";
            $scope.data.uthi_gender = "";
            $scope.data.uthi_blood_group = "";
            $scope.data.uthi_dob = "";
            $scope.data.uthi_lbd = "";
            $scope.data.uthi_temp_state = "";
            $scope.data.uthi_temp_dist = "";
            $scope.data.uthi_perm_state = "";
            $scope.data.uthi_perm_dist = "";

            $scope.show_form = false;
            $scope.show_options = false;

            if($stateParams.Flag==1){
                $scope.show_form = true;
            	var self = JSON.parse(localStorage.uthir_user);
                $scope.data.uthi_self = true;
                $scope.data.uthi_referrer  = self.uthi_id;
            	$scope.data.uthi_id        = self.uthi_id;
                $scope.data.uthi_name      = self.uthi_name;
            	$scope.data.uthi_mail      = self.uthi_email;
            }  

            if($stateParams.Flag==2){
                $scope.show_options = true;
            }  

            if($stateParams.Flag==3){
                var self = JSON.parse(localStorage.uthir_user);
                $scope.data.uthi_referrer = self.uthi_id;
                $scope.show_form = true;
            }  
            


            $scope.register = function(){
                console.log($scope.data);
                for(var k in $scope.data) {
                    if($scope.data[k] == "" && k != "uthi_self") {
                        alert('All Fields are required!'); 
                        return false;
                    }
                }


                services.master('uthiram/register_donor',$scope.data).then(function(res){
                    if(res.data.status == 400) {
                        alert('This email ID is already registered with us');
                        return false;
                    }
                    if(res.data.status == 200) {
                        alert('Registeration successful');
                        if($stateParams.Flag==1) localStorage.uthir_user = JSON.stringify(res.data.details);
                        if($stateParams.From == 2 || $stateParams.From == 3 ) {
                            $location.path( "/app/donors" );
                        } else {
                            $location.path( "/app/profile" );

                        }
                    }
                });

            }

            $scope.back = function(){
                    if($stateParams.From == 2 || $stateParams.From == 3 ) {
                            $location.path( "/app/donors" );
                        } else {
                            $location.path( "/app/profile" );

                        }
            }

            $scope.loadTempDist = function() {
                $scope.temp_districts = $scope.sd[parseInt($scope.data.uthi_temp_state) - 1].districts;
            }
            $scope.loadPermDist = function() {
                $scope.perm_districts = $scope.sd[parseInt($scope.data.uthi_perm_state) - 1].districts;
            }
            
}]);




// Donor Edit Controller
app.controller('donor_edit', ['$scope','seven','$stateParams','services','$location',
    function ( $scope, seven, $stateParams, services ,$location) {
            seven.showIndicator();
            $scope.data = {};
            $scope.sd = JSON.parse(localStorage.states);

            services.master('uthiram/edit_donor',{'id':$stateParams.Id}).then(function(res){
                    
                    if(res.data.status == 200) {
                        console.log(res.data);
                        res.data.details.uthi_lbd = new Date(res.data.details.uthi_lbd); 
                        res.data.details.uthi_dob = new Date(res.data.details.uthi_dob); 

                        $scope.data = res.data.details;
                        $scope.temp_districts = $scope.sd[parseInt($scope.data.uthi_temp_state) - 1].districts;
                        $scope.perm_districts = $scope.sd[parseInt($scope.data.uthi_perm_state) - 1].districts;
                        seven.hideIndicator();

                    }
                });



            $scope.update = function(){
                console.log($scope.data);
                for(var k in $scope.data) {
                    if($scope.data[k] == "" && k != "uthi_self" && k != "uthi_email" && k != "uthi_password") {
                        alert('All Fields are required!'); 
                        return false;
                    }
                }


                services.master('uthiram/update_donor',$scope.data).then(function(res){
                    if(res.data.status == 400) {
                        alert('This email ID is already registered with us');
                        return false;
                    }
                    if(res.data.status == 200) {
                        if( res.data.details.uthi_id ==  res.data.details.uthi_referrer ) {
                            localStorage.uthir_user = JSON.stringify(res.data.details);
                        } 
                        $location.path( "/app/donors" );

                    }
                });

            }

            $scope.back = function(){
                    // window.location.href = window.history.back(-1);
                            $location.path( "/app/donors" );
                       
            }

                        $scope.loadTempDist = function() {
                $scope.temp_districts = $scope.sd[parseInt($scope.data.uthi_temp_state) - 1].districts;
            }
            $scope.loadPermDist = function() {
                $scope.perm_districts = $scope.sd[parseInt($scope.data.uthi_perm_state) - 1].districts;
            }

            
}]);



// Donor Edit Controller
app.controller('profile_edit', ['$scope','seven','$stateParams','services','$location',
    function ( $scope, seven, $stateParams, services ,$location) {
            seven.showIndicator();
            console.log('Profile Edit Controller');
            $scope.data = {};
            var self = JSON.parse(localStorage.uthir_user);
            var my_id = self.uthi_id; 
            $scope.sd = JSON.parse(localStorage.states);
            

            services.master('uthiram/edit_donor',{'id':my_id}).then(function(res){
                    
                    if(res.data.status == 200) {
                        res.data.details.uthi_lbd = new Date(res.data.details.uthi_lbd); 
                        res.data.details.uthi_dob = new Date(res.data.details.uthi_dob); 
                        $scope.donor = false; 
                        if(parseInt(res.data.details['uthi_donor']) == 2)  $scope.donor = true; 
                        $scope.data = res.data.details;
                        $scope.temp_districts = $scope.sd[parseInt($scope.data.uthi_temp_state) - 1].districts;
                        $scope.perm_districts = $scope.sd[parseInt($scope.data.uthi_perm_state) - 1].districts;
                        seven.hideIndicator();

                    }
            });



            $scope.update = function(){
                console.log($scope.data);
                // for(var k in $scope.data) {
                //     if($scope.data[k] == "" && k != "uthi_self" && k != "uthi_email" && k != "uthi_password") {
                //         alert('All Fields are required!'); 
                //         return false;
                //     }
                // }


                services.master('uthiram/update_profile',$scope.data).then(function(res){
                    if(res.data.status == 400) {
                        alert('This email ID is already registered with us');
                        return false;
                    }
                    if(res.data.status == 200) {
                            localStorage.uthir_user = JSON.stringify(res.data.details);
                        $location.path( "/app/profile" );

                    }
                });

            }

            $scope.loadTempDist = function() {
                $scope.temp_districts = $scope.sd[parseInt($scope.data.uthi_temp_state) - 1].districts;
            }
            $scope.loadPermDist = function() {
                $scope.perm_districts = $scope.sd[parseInt($scope.data.uthi_perm_state) - 1].districts;
            }
            
}]);

