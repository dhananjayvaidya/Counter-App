
var apps = angular.module('firstApplication', ['ngMaterial']);
	
	apps.controller('AppCtrl', function ($scope, $timeout, $mdSidenav,$mdToast) {
			var x =0;  //count variable Globally defined
			$scope.status = '  ';
  $scope.customFullscreen = false;
  	var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };
		$scope.toastPosition = angular.extend({},last);
		$scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }
		$scope.showSimpleToast = function(message) {
    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .position(pinTo )
        .hideDelay(3000)
    );
  };
		//silder scope methods
		$scope.toggleLeft = buildToggler('left');
		$scope.toggleRight = buildToggler('right');
		
		//page navigation methods
		$scope.showAboutUs = loadAboutUs();
		
		//core methods
		$scope.increment = plusX();
		$scope.decrement = reduceX();
		$scope.reset = resetX();
		$scope.saveThisCount = saveThisCounts(x);
		$scope.fetchCount = loadStoredCount();
		
		
		function resetX(){return function(){x = 0;$("#displayCount").html(x);$("#count_name").val("");};}
		function plusX(){return function(){(x>= 1 ? x++:x++);$("#displayCount").html(x);};}
		function reduceX(){return function(){(x >= 1?x--:x=0);$("#displayCount").html(x);};}
		
		function buildToggler(componentId) {return function() {$mdSidenav(componentId).toggle();};}
		function saveThisCounts(x){
			
			var name = document.getElementById("#count_name").value;
			console.log(name);
			if (name == ""){
					alert("Please enter count name");
			}else{
			localStorage.setItem("@#$_"+name,x);
			//showSimpleToast("Count Saved Successfully");
			}
		}
		//navigation functions
		function loadAboutUs(){return function() {window.location="#about";$('.forms').hide();$('#about-us').show();$mdSidenav('left').toggle();};}
			function loadStoredCount(){
				return function() {
				
				window.location="#fetchCount";
				$('.forms').hide();
				$('#showCount').show();
				//load the data
				var dataSet = localStorage; 
				for(var g= 0;g<dataSet.length;g++){
					var y = dataSet.key(g);
					if (y.indexOf("@#$_") == 0){
						markUp += "";
					}
				}
				};
				}
		var hashCode;
		var t = setInterval(function(){
		   if (location.hash == ""){
				//show default layout
				$(".forms").hide();
				$("#form1").show();
		   }else if (location.hash !== hashCode ){
				switch(location.hash){
					case "#about":
						loadAboutUs();
					break;
					case "#fetchCount":
						loadStoredCount();
					break;
				}
		   }
		},1);
});
  
	