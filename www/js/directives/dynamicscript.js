Paathai.angular.directive('dynamicscript', ['$window', '$q', function ($window, $q) {
        function load_script() {
            var s = document.createElement('script'); // use global document since Angular's $document is weak
            s.src = 'https://maps.googleapis.com/maps/api/js?key='+sessionStorage.getItem("key")+'&libraries=places&location='+sessionStorage.getItem("lat")+','+sessionStorage.getItem("lng")+'&callback=initialize';
            //s.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize';
            document.body.appendChild(s);
        }
        function lazyLoadApi(key) {
            var deferred = $q.defer();
            $window.initialize = function () {
                deferred.resolve();
            };
            // thanks to Emil Stenström: http://friendlybit.com/js/lazy-loading-asyncronous-javascript/
            if ($window.attachEvent) {  
                $window.attachEvent('onload', load_script); 
            } else {
                $window.addEventListener('load', load_script, false);
            }
            return deferred.promise;
        }
        return {
            restrict: 'E',
            link: function (scope, element, attrs) { // function content is optional
            // in this example, it shows how and when the promises are resolved
                if ($window.google && $window.google.maps) {
                    console.log('gmaps already loaded');
                } else {
                    lazyLoadApi().then(function () {
                        if ($window.google && $window.google.maps) {
                            new google.maps.places.Autocomplete(document.getElementById('destination'), {componentRestrictions: {country: "in"}});
                        } else {
                            console.log('gmaps not loaded');
                        }
                    }, function () {
                        console.log('promise rejected');
                    });
                }
            }
        };
    }]);