app.config(['$stateProvider','$urlRouterProvider',
  function(  $stateProvider , $urlRouterProvider ) {
          
          $urlRouterProvider.otherwise('app/home');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html',
                  controller:'app',
                  resolve: {
                      states: function(services) {
                          if(!localStorage.states) {
                            services.master_get('uthiram/vin_sd').then(function(res){
                                  localStorage.states = JSON.stringify(res.data);
                                  return true;
                            })
                          } else {
                            return true;
                          }
                      },
                      
                  },
              })

              .state('app.home', {
                  url: '/home',
                  templateUrl: 'tpl/welcome.html',
              })

              .state('app.about', {
                  url: '/about',
                  templateUrl: 'tpl/modules/about.html',
              })


              .state('app.contact', {
                  url: '/contact',
                  templateUrl: 'tpl/modules/contact.html',
              })

              .state('app.login', {
                  url: '/login',
                  templateUrl: 'tpl/modules/authenticate/login.html',
                  controller: 'login'
              })

              .state('app.register', {
                  url: '/register',
                  templateUrl: 'tpl/modules/authenticate/register.html',
                  controller: 'register'
              })

              .state('app.verify', {
                url: '/verify/:Flag',
                  templateUrl: 'tpl/modules/profile/verify.html',
                  controller: 'verify'
              })


              .state('app.profile', {
                  url: '/profile',
                  templateUrl: 'tpl/modules/profile/index.html',
                  controller: 'profile'
              })

              .state('app.donors', {
                  url: '/donors',
                  templateUrl: 'tpl/modules/profile/donors.html',
                  controller: 'donors'
              })

              .state('app.donor_list', {
                  url: '/donor_list',
                  templateUrl: 'tpl/modules/home.html',
                  controller: 'home'
              })


              .state('app.filter', {
                  url: '/filter',
                  templateUrl: 'tpl/modules/filter.html',
                  controller: 'filter'
              })

              
              .state('app.donor_registeration', {
                url: '/donor_registeration/:Flag/:From',
                  templateUrl: 'tpl/modules/profile/donor_registeration.html',
                  controller: 'donor_registeration'
              })


              .state('app.donor_edit', {
                url: '/donor_edit/:Id',
                  templateUrl: 'tpl/modules/profile/donor_edit.html',
                  controller: 'donor_edit'
              })

              .state('app.profile_edit', {
                url: '/profile_edit',
                  templateUrl: 'tpl/modules/profile/profile_edit.html',
                  controller: 'profile_edit'
              })

    }
  ]
);



