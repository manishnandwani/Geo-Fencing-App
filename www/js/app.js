// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ui.router','ngCordova','ngMap','firebase'])


.run(function($ionicPlatform) 
{
  $ionicPlatform.ready(function()
   {
    if(window.cordova && window.cordova.plugins.Keyboard) 
    {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) 
    {
      StatusBar.styleDefault();
    }
  })
})

.config(function($stateProvider, $urlRouterProvider)
    {
        $stateProvider

        .state("home",{
            url:'/home',
            templateUrl:'partials/home.html',
            controller:'homeCtrl',
           
        })

        $stateProvider.state("user",{
          url:'/user',
            templateUrl:'partials/user.html',
            controller:'userCtrl',
           
        })

        $stateProvider.state("menu",{
          url:'/menu',
            templateUrl:'partials/menu.html',
            controller:'menuCtrl',
           
        })

        $urlRouterProvider.otherwise('/home')
    })




.controller('mapCtrl', function($interval,$cordovaGeolocation) 
{
  var vm = this;
  var watchOptions = {timeout : 3000, enableHighAccuracy: false }
  var posOptions = {timeout: 3000, enableHighAccuracy:false}
  var watch
  vm.where = function(){
    vm.pos=[]
    
    $cordovaGeolocation.getCurrentPosition(posOptions)
      .then(function(pos){
          var lat  = pos.coords.latitude
          var long = pos.coords.longitude
          vm.pos.push([lat,long])
          console.log(vm.pos)
          console.log('long', long);  
      }, 
      function(error){
          console.log('error:', error);
      })
    
      watch = $cordovaGeolocation.watchPosition(watchOptions)
      .then(
        null,
      
        function(err) {
          // error
        },
        function(position) {
          var lat  = position.coords.latitude
          var long = position.coords.longitude
        console.log(lat)
      })
    
    
     $cordovaGeolocation.clearWatch(watch)
  };
  vm.where()
})

// firebase started down here-----------------------------------------------
.controller("homeCtrl",function(gray,fray,$firebaseAuth,$firebaseStorage){
      
  var home=this

  var auth = $firebaseAuth();
home.check=function($http)
{
  if (home.user) {
    return true;

    console.log("Signed in as:", home.user.uid);
    console.log("true");

  } else {
    console.log("Signed out");
    console.log("false")
    return false;
  }
}

  
  var firebaseUser=auth.$getAuth();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
    }
  });

  home.googlelogin = function()
  {
    if (firebaseUser) 
        {console.log("Signed in as:", firebaseUser.uid);
        home.check();}
    else 
      console.log("Signed out"); 

    console.log("google")
      auth.$signInWithPopup("google").then(function(result) {

          home.user = result.user
          gray=home.user
          console.log(home.user)
          console.log("Signed in as:", result.user.uid);
        }).catch(function(error) {
          console.error("Authentication failed:", error);
        });
  }

   home.facebooklogin = function()
   {console.log("facebook")
      auth.$signInWithPopup("facebook").then(function(result) {

          home.user = result.user
          fray=home.user
          console.log(home.user)
          console.log("Signed in as:", result.user.uid);
        }).catch(function(error) {
          console.error("Authentication failed:", error);
        });
   }
})

.controller("userCtrl",function(gray,fray)
{
  var user = this;
})

.controller("menuCtrl",function(gray,fray)
{
  var menu = this;
})

.factory("gray",function()
{ 
    return []
})
.factory("fray",function()
{ 
    return []
})

