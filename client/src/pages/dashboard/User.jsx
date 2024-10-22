import React, { useState } from 'react';
import axios from 'axios';

function User() {
  const [activeTab, setActiveTab] = useState('book');
  const [booking, setBooking] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    vehicleType: '',
    goodsType: '',
    weight: ''
  });
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [trackingId, setTrackingId] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);

  // Handler for booking form changes
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBooking(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get price estimation
  const calculateEstimate = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/estimate-price', booking);
      setEstimatedPrice(response.data.price);
    } catch (error) {
      console.error('Error calculating estimate:', error);
    }
  };

  // Submit booking
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/book-vehicle', booking);
      alert('Booking successful! Your tracking ID is: ' + response.data.trackingId);
      setTrackingId(response.data.trackingId);
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
  };

  // Track shipment
  const handleTrackingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/api/track/${trackingId}`);
      setTrackingInfo(response.data);
    } catch (error) {
      console.error('Error tracking shipment:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col">
          <h2>User Dashboard</h2>
          <div className="btn-group" role="group">
            <button 
              className={`btn ${activeTab === 'book' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('book')}
            >
              Book Vehicle
            </button>
            <button 
              className={`btn ${activeTab === 'track' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('track')}
            >
              Track Shipment
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'book' && (
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Book a Vehicle</h3>
                <form onSubmit={handleBookingSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Pickup Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="pickupLocation"
                      value={booking.pickupLocation}
                      onChange={handleBookingChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Drop-off Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="dropoffLocation"
                      value={booking.dropoffLocation}
                      onChange={handleBookingChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Vehicle Type</label>
                    <select
                      className="form-control"
                      name="vehicleType"
                      value={booking.vehicleType}
                      onChange={handleBookingChange}
                      required
                    >
                      <option value="">Select a vehicle type</option>
                      <option value="van">Van</option>
                      <option value="truck">Truck</option>
                      <option value="trailer">Trailer</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Goods Type</label>
                    <input
                      type="text"
                      className="form-control"
                      name="goodsType"
                      value={booking.goodsType}
                      onChange={handleBookingChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Weight (kg)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="weight"
                      value={booking.weight}
                      onChange={handleBookingChange}
                      required
                    />
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-secondary me-2"
                    onClick={calculateEstimate}
                  >
                    Calculate Estimate
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Book Now
                  </button>
                </form>

                {estimatedPrice && (
                  <div className="alert alert-info mt-3">
                    Estimated Price: ${estimatedPrice}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'track' && (
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Track Shipment</h3>
                <form onSubmit={handleTrackingSubmit} className="mb-4">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tracking ID"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn btn-primary">
                      Track
                    </button>
                  </div>
                </form>

                {trackingInfo && (
                  <div className="tracking-info">
                    <h4>Tracking Information</h4>
                    <div className="card">
                      <div className="card-body">
                        <p><strong>Status:</strong> {trackingInfo.status}</p>
                        <p><strong>Current Location:</strong> {trackingInfo.currentLocation}</p>
                        <p><strong>Driver:</strong> {trackingInfo.driverName}</p>
                        <p><strong>Estimated Delivery:</strong> {trackingInfo.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;