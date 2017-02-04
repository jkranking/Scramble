var initMap = function(){
  var id = window.trip.id
  var pings = window.pings
  var markers = window.markers

  map = setMap()
  searchBox(map)

  var trip = new TripController(
    new TripView,
    new TripModel(map)
  )

  if (pings) {
    trip.model.loadPingsList()
    trip.addPolyline()
  }

  if (markers) {
    trip.model.loadMarkersList()
  }

  trip.view.showAdd()
  trip.view.showAddMarkerAndEditTrip()

  $('#add-ping').click(trip.pingHandler.bind(trip))
  $('#submit-pings').click(trip.submitPingsHandler.bind(trip))

  $('#add-marker').click(trip.markerHandler.bind(trip))
  $('#submit-marker').click(trip.submitMarkerHandler.bind(trip))
  $('#cancel-marker').click(trip.cancelNewMarker.bind(trip))

  $('#edit-trip').click(trip.editTripHandler.bind(trip))
  $('#update-trip').click(trip.updateTripHandler.bind(trip))
}






