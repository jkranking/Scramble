module RatingHelper
  def has_user_given_rating?(trip)
    return true if trip.trip_ratings.find_by(user_id: current_user.id)
  end
end
