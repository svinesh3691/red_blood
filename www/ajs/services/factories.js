app.factory("seven", ['$http', function($http) {
	var myApp = new Framework7({
                    modalTitle: 'Alert',
                    material: true,// Enable Material theme
    });
    return myApp;   
}]);


app.factory("services", ['$http', function($http) {
    // var serviceBase = 'http://192.168.43.231/CMN/CIAPI/index.php/';
    // var serviceBase = 'http://localhost/CMN/CIAPI/index.php/';
    var serviceBase = 'http://vintechnosys.com/vintechnosys.com/API/red_blood/index.php/';
    
    var obj = {};
    obj.master = function(func_name,post_data){
        return $http.post(serviceBase + func_name, post_data);
    }
    obj.master_get = function(func_name,post_data){
        return $http.get(serviceBase + func_name, post_data);
    }
    return obj; 
      
}]);