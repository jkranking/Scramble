class MarkersController < ApplicationController
  def create
    @trip = Trip.find(params[:trip_id])

    @photo = nil
    @photo = Photo.find(params[:photo]) if params[:photo]

    if user_signed_in? && @trip.user == current_user
      @marker = @trip.markers.create(marker_params)
      @marker.photo = @photo if @photo
      respond_to do |format|
        format.json { render json: @marker }
      end
    else
      respond_to do |format|
        format.json { render :json => { :error_message => 'You don\'t have permission to add a note to this trip' }, :status => 401 }
      end
    end
  end

  def update

    @marker = Marker.find(params[:id])
    if user_signed_in? && @marker.trip.user == current_user
      @marker.update(marker_params)
    else
      respond_to do |format|
        format.json { render :json => { :error_message => 'You don\'t have permission to edit a note from this trip' }, :status => 401 }
      end
    end
  end

  def destroy
    @marker = Marker.find(params[:id])
    if user_signed_in? && @marker.trip.user == current_user
      @marker.destroy
    else
      respond_to do |format|
        format.json { render :json => { :error_message => 'You don\'t have permission to remove a note from this trip' }, :status => 401 }
      end
    end
  end

  private

  def marker_params
    params.require(:marker).permit(:lng, :lat, :note)
  end
end
