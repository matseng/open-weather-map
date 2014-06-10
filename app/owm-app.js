angular.module('OWMApp', ['ngRoute']);

angular.module('OWMApp', ['ngRoute'])
    .value('owmCities',
      ['New York', 'Dallas', 'Chicago'])
    .config(function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl : './home.html',
            controller : 'HomeCtrl as home'
        })
        .when('/cities/:city', {
            templateUrl : './city.html',
            controller : 'CityCtrl',
            resolve : {
              resolvedCity: function(owmCities, $route, $location) {
              var city = $route.current.params.city;
              if(owmCities.indexOf(city) == -1 ) {
                  $location.path('/error');
                  return;
              }
              return city;
            }
          }
        })
        .when('/error', {
          template : '<p>Error Page Not Found</p>'
        })
        .otherwise({
          redirectTo : '/error'
        })
    })
    // Note: $routeChangeError detects missing templates
    .run(function($rootScope, $location) {
      $rootScope.$on('$routeChangeError', function() {
          console.log('Missing templates should be detected here...');
          $location.path('/error');
      });
    })
    .controller('HomeCtrl', function($scope) {
        this.welcomeMessage = 'Welcome home, world';
    })
    .controller('CityCtrl', function($scope, resolvedCity) {
        $scope.city = resolvedCity;
    });


  // $locationProvider.html5Mode(true);
