/*config Phase*/
app.config(['$controllerProvider','$compileProvider','$filterProvider','$provide',
   function( $controllerProvider , $compileProvider , $filterProvider , $provide ) {
            // lazy controller, directive and service
            app.controller = $controllerProvider.register;
            app.directive  = $compileProvider.directive;
            app.filter     = $filterProvider.register;
            app.factory    = $provide.factory;
            app.service    = $provide.service;
            app.constant   = $provide.constant;
            app.value      = $provide.value;
        }
]);


/*Run Phase*/
app.run(['$rootScope','$state','$stateParams','seven','services',
function( $rootScope , $state , $stateParams , seven , services ) {
        localStorage.appVers = "1.0.3";
        // Checking whether the User is authenticated and has a token
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
              if(localStorage.uthir_logged)     $rootScope.logged = true;
              else                              $rootScope.logged = false
        });

        // On Each state change success scroll to the top of the page
        $rootScope.$on('$stateChangeSuccess', function() {
              document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

        // if(!localStorage.states) {
        //           seven.showIndicator();
        //           services.master_get('uthiram/vin_sdxx').then(function(res){
        //                 localStorage.states = JSON.stringify(res.data);

        //           })
        // }

        if(!localStorage.blood_group) {
            localStorage.blood_group = JSON.stringify([
                {
                  'blood_id'    : 1,
                  'blood_group' : "A +ive"
                },
                {
                  'blood_id'    : 2,
                  'blood_group' : "A -ive"
                },
                {
                  'blood_id'    : 3,
                  'blood_group' : "B +ive"
                },
                {
                  'blood_id'    : 4,
                  'blood_group' : "B -ive"
                },
                {
                  'blood_id'    : 5,
                  'blood_group' : "AB +ive"
                },
                {
                  'blood_id'    : 6,
                  'blood_group' : "AB -ive"
                },
                {
                  'blood_id'    : 7,
                  'blood_group' : "O +ive"
                },
                {
                  'blood_id'    : 8,
                  'blood_group' : "O +ive"
                }
            ]);
        }

}]);
