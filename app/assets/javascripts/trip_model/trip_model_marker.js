var contentString = function(marker, label, img_url){
  var content = '<div class=info-window-content id="note-' + label + '">' +
  '<div class="note-content" id="note-content-' + label + '">' + marker.note + '</div>' + '<div class="image"><img class="li-trip-photo" src="' + img_url + '"></div>'
  if (window.users_trip) {
   content += editDeleteButtons(marker.id, label)
  }

  return content
}

var editDeleteButtons = function(marker_id, label){
  return '<a id="edit-marker-' + label + '" class="edit-marker" href="/trips/' + window.trip.id + '/markers/' + marker_id +'">Edit</a>' +
    '<a id="delete-marker-' + label + '" class="delete-marker" href="/trips/' + window.trip.id + '/markers/' + marker_id +'">Delete</a>' +
  '</div>'
}


function editNoteForm(content, label, id){
  return '<div class="form-group" id="note-form-' + label + '">' +
             '<label for="note">Note:</label>' +
             '<textarea class="form-control" rows="5" id="update-note-' + label + '">' + content + '</textarea>' +
             '<a id="marker-' + label + '" class="update-marker" href="/trips/' + window.trip.id + '/markers/' + id +'"">Update</a>' +
         '</div>'
}

function replaceListItem(label, note, marker){
  label++
  return '<b>' + label + '.</b>' + note +
    '<blockquote class="blockquote">lat: ' + marker.lat() + '<br>' +
    'lng: ' + marker.lng() + '</blockquote>'
}

TripModel.prototype.loadMarkersList = function(){
  window.markers.forEach(function(marker, i){
    var img_url = ''

    if (marker.photo) { img_url = marker.photo.image_url }

    var content = contentString(marker, i, img_url)
    var marker_id = marker.id

    var infowindow = new google.maps.InfoWindow({
      content: content
    });

    var marker = newMarker({lat: Number(marker.lat), lng: Number(marker.lng)}, this.map, false)


    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    this.markers.push(marker)
  }.bind(this))

}

var labelIndex = 0

newMarker = function(location, map, draggable){
  labelIndex++
  return new google.maps.Marker({
    position: location,
    map: map,
    label: labelIndex.toString(),
    draggable: draggable // this lets you drag the pings
  });
}
