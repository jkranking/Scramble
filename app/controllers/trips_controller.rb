class TripsController < ApplicationController
  def index
    @trips = Trip.all
  end

  def new
    @trip = Trip.new
  end

  def create
    @trip = Trip.create(trip_params)
    Ping.create_multiple_pings(@trip, pings)
  end

  def show
    @trip = Trip.find(params[:id])
  end

  private

  def trip_params
    params.require(:trip).permit(:user_id, :zoom, :latitude, :longitude, :name)
  end

  def pings
    params.require(:pings)
  end
end
