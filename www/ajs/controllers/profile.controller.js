// Profile Controller
app.controller('profile', ['$scope','seven','$state','services','$location',
    function ( $scope, seven, $state, services , $location) {
            

            seven.hideIndicator();
            $scope.data = JSON.parse(localStorage.uthir_user);
               console.log($scope.data.uthi_activated);             
            if($scope.data.uthi_activated == 0){
                $location.path( "/app/verify/2" );
                return false; 
            }  
            if($scope.data['uthi_donor'] == 2 || $scope.data['uthi_donor'] == 3) {
                $scope.donored = true; 
            }
            
}]);



// Change Password Controller
app.controller('change_password', ['$scope','seven','$state','services','$location',
    function ( $scope, seven, $state, services , $location) {
            

            $scope.d                = {};
            $scope.d.current_pass   = "";
            $scope.d.new_pass       = "";
            $scope.d.repeat_pass    = "";

            seven.hideIndicator();
            $scope.data = JSON.parse(localStorage.uthir_user);
            console.log($scope.data);

            $scope.update = function() {
                console.log($scope.d);
                if($scope.d.current_pass == "" || $scope.d.new_pass == "" || $scope.d.repeat_pass == "" ) {
                    alert("PLease fill all the fields!");
                    return false
                }
                if($scope.data.uthi_password != $scope.d.current_pass) {
                    alert('Your current password is wrong! PLease try again');
                    return false;
                }

                if($scope.d.new_pass != $scope.d.repeat_pass) {
                    alert("New password and Repeat passwords doesnot match ! ");
                    return false;
                }

                if($scope.d.new_pass == $scope.d.current_pass) {
                    alert("New password cannot be same as repeat password! ");
                    return false;
                }

                services.master('uthiram/change_password',{'uthi_id': $scope.data.uthi_id,'uthi_password': $scope.d.new_pass}).then(function(res){
                   
                    if(res.data.status == 200 ) {
                        seven.hideIndicator();


                        alert("Password changed successfully!");
                        localStorage.uthir_user = JSON.stringify(res.data.details);
                        $location.path( "/app/profile" );


                    }
                })

            }
            
}]);


// Donors Controller
app.controller('donors', ['$scope','seven','$state','services','$location',
    function ( $scope, seven, $state, services , $location) {
            
            seven.hideIndicator();

            $scope.data = JSON.parse(localStorage.uthir_user);
            if($scope.data.uthi_activated == 0){
                $location.path( "/app/verify/3" );
                return false; 
            }  
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
            $scope.data.uthi_donor = "";

            $scope.show_form = false;
            $scope.show_options = false;


            

            if($stateParams.Flag==1) {
            	var self = JSON.parse(localStorage.uthir_user);
                $scope.data.uthi_self = true;
                $scope.data.uthi_referrer  = self.uthi_id;
            	$scope.data.uthi_id        = self.uthi_id;
                $scope.data.uthi_name      = self.uthi_name;
            	$scope.data.uthi_mail      = self.uthi_email;

                $scope.uthi_donor_options = [
                        {
                            'uthi_donor_options_id' : 2, 
                            'uthi_donor_options_value' : "Available" 
                        },
                        {
                            'uthi_donor_options_id' : 3, 
                            'uthi_donor_options_value' : "Not Available" 
                        },
                ];
            }  

            if($stateParams.Flag==2){
                $scope.show_options = true;
            }  

            if($stateParams.Flag==3){
                var self = JSON.parse(localStorage.uthir_user);
                $scope.data.uthi_referrer = self.uthi_id;
                $scope.show_form = true;

                $scope.uthi_donor_options = [
                        {
                            'uthi_donor_options_id' : 12, 
                            'uthi_donor_options_value' : "Available" 
                        },
                        {
                            'uthi_donor_options_id' : 13, 
                            'uthi_donor_options_value' : "Not Available" 
                        },
                ];
            }  
            


            $scope.register = function(){
                seven.showIndicator();
                for(var k in $scope.data) {
                    if($scope.data[k] == "" && k != "uthi_self") {
                        alert('All Fields are required!'); 
                        return false;
                    }
                }


                services.master('uthiram/register_donor',$scope.data).then(function(res){
                seven.hideIndicator();
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


                        res.data.details.uthi_lbd = new Date(res.data.details.uthi_lbd); 
                        res.data.details.uthi_dob = new Date(res.data.details.uthi_dob); 

                        $scope.data = res.data.details;
                        $scope.temp_districts = $scope.sd[parseInt($scope.data.uthi_temp_state) - 1].districts;
                        $scope.perm_districts = $scope.sd[parseInt($scope.data.uthi_perm_state) - 1].districts;
                        

                        if( res.data.details.uthi_id ==  res.data.details.uthi_referrer ) {

                            $scope.uthi_donor_options = [
                                    {
                                        'uthi_donor_options_id' : 2, 
                                        'uthi_donor_options_value' : "Available" 
                                    },
                                    {
                                        'uthi_donor_options_id' : 3, 
                                        'uthi_donor_options_value' : "Not Available" 
                                    },
                            ];

                        } else {
                            $scope.uthi_donor_options = [
                                    {
                                        'uthi_donor_options_id' : 12, 
                                        'uthi_donor_options_value' : "Available" 
                                    },
                                    {
                                        'uthi_donor_options_id' : 13, 
                                        'uthi_donor_options_value' : "Not Available" 
                                    },
                            ];
                        }

                        seven.hideIndicator();

                    }
                });



            $scope.update = function(){
                for(var k in $scope.data) {
                    if($scope.data[k] == "" && k != "uthi_self" && k != "uthi_email" && k != "uthi_password") {
                        alert('All Fields are required!'); 
                        return false;
                    }
                }

                        seven.showIndicator();

                services.master('uthiram/update_donor',$scope.data).then(function(res){
                    if(res.data.status == 400) {
                        alert('This email ID is already registered with us');
                        seven.hideIndicator();
                        return false;
                    }
                    if(res.data.status == 200) {
                        if( res.data.details.uthi_id ==  res.data.details.uthi_referrer ) {
                            localStorage.uthir_user = JSON.stringify(res.data.details);
                        } 
                        seven.hideIndicator();

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
            $scope.data = {};
            var self = JSON.parse(localStorage.uthir_user);
            var my_id = self.uthi_id; 
            $scope.sd = JSON.parse(localStorage.states);


            services.master('uthiram/edit_donor',{'id':my_id}).then(function(res){
                    
                    if(res.data.status == 200) {
                        res.data.details.uthi_lbd = new Date(res.data.details.uthi_lbd); 
                        res.data.details.uthi_dob = new Date(res.data.details.uthi_dob); 
                        $scope.donor = false; 
                        if(parseInt(res.data.details['uthi_donor']) == 2 || parseInt(res.data.details['uthi_donor']) == 3)  $scope.donor = true; 
                        $scope.data = res.data.details;

                       if($scope.data.uthi_temp_state != "0") $scope.temp_districts = $scope.sd[parseInt($scope.data.uthi_temp_state) - 1].districts;
                       if($scope.data.uthi_perm_state != "0")  $scope.perm_districts = $scope.sd[parseInt($scope.data.uthi_perm_state) - 1].districts;
                        seven.hideIndicator();

                    }
            });



            $scope.update = function(){
                
                seven.showIndicator();
                console.log($scope.data);
                // for(var k in $scope.data) {
                //     if($scope.data[k] == "" && k != "uthi_self" && k != "uthi_email" && k != "uthi_password") {
                //         alert('All Fields are required!'); 
                //         return false;
                //     }
                // }


                services.master('uthiram/update_profile',$scope.data).then(function(res){
                    if(res.data.status == 400) {
                        seven.hideIndicator();
                        alert('This email ID is already registered with us');
                        return false;
                    }
                    if(res.data.status == 200) {
                        seven.hideIndicator();
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

