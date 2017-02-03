function initMap(){
  $(document).ready(function() {
    var lat = Number($('.latitude').attr('id'))
    var lng = Number($('.longitude').attr('id'))
    var zoom = Number($('.zoom').attr('id'))
    var myLatlng = {lat: lat, lng: lng};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: zoom,
      center: myLatlng
    });

    var trip = new TripController(
      new TripView,
      new TripModel(map)
    )

    var addPing = $('#add-ping').click(trip.pingHandler.bind(trip))

    $('#submit-pings').click(function handler(event) {
      event.preventDefault()
      trip.model.updateCenter()
      $.post({
        url: "/trips",
        data: {trip: {latitude: trip.model.center_lat,
                      longitude: trip.model.center_lng,
                      zoom: trip.model.zoom,
                      user_id: 1}}
      }).done(function(response){
        alert(response)
      })
      google.maps.event.removeListener(latLng);
      $('#submit-pings').hide()
      $('#add-ping').show()
    })


  });
}

