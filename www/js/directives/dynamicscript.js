Paathai.angular.directive('dynamicscript', ['$window', '$q' , 'DataService', function ($window, $q, DataService) {
        function load_script() {
            var s = document.createElement('script'); // use global document since Angular's $document is weak
            s.src = 'https://maps.googleapis.com/maps/api/js?key='+Paathai.api.google+'&libraries=places&location='+sessionStorage.getItem("lat")+','+sessionStorage.getItem("lng")+'&callback=initialize';
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

                            Paathai.travelMode = {
                                    walk : google.maps.TravelMode.WALKING,
                                    bicycle: google.maps.TravelMode.BICYCLING,
                                    transit: google.maps.TravelMode.TRANSIT,
                                    driving: google.maps.TravelMode.DRIVING
                                };

                            var destination_autocomplete = new google.maps.places.Autocomplete(document.getElementById('destination'), {componentRestrictions: {country: "in"}});



                            destination_autocomplete.addListener('place_changed', function() {

                                var myLoc = new google.maps.LatLng(parseFloat(sessionStorage.getItem('lat')), parseFloat(sessionStorage.getItem('lng')));

                                var routemap = new google.maps.Map(document.getElementById('routemap'), {
                                    center: myLoc,
                                    zoom: 13
                                });

                                var directionsService = new google.maps.DirectionsService;
                                var directionsDisplay = new google.maps.DirectionsRenderer;
                                directionsDisplay.setMap(routemap);

                                DataService.setMap(myLoc, destination_autocomplete.getPlace(), directionsService, directionsDisplay);

                                DataService.renderMap(Paathai.travelMode.driving);

                                Paathai.fw7.views[0].router.load({pageName: 'route'});
                            });

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