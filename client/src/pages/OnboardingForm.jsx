import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Import Axios
import { useUser } from '@clerk/clerk-react';
import { AppContext } from '../context/AppContext';

const OnboardingForm = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    displayName: '',
    role: '',
    country: '',
    address: '',
    pincode: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting onboarding data:', user);
    // Set additional user data
    const dataToSubmit = { 
      ...formData, 
      clerkId: user?.id, 
      email: user?.primaryEmailAddress?.emailAddress,
      phone: user?.primaryPhoneNumber?.phoneNumber 
    };

    try {
      // Send the data to the server using Axios
      console.log('Submitting onboarding data:', dataToSubmit);
      const response = await axios.post('http://localhost:4000/api/onboarding', dataToSubmit);
      console.log('Response from server:', response.data.message);
    } catch (error) {
      console.error('Error submitting onboarding data:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Onboarding Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="displayName">Display Name</label>
              <input
                type="text"
                id="displayName"
                className="form-control"
                placeholder="Enter your display name"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                required
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                className="form-control"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="">Select your role</option>
                <option value="User">User</option>
                <option value="Transporter">Transporter</option>
              </select>
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                className="form-control"
                placeholder="Enter your country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="form-control"
                placeholder="Enter your address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="pincode">Pincode</label>
              <input
                type="text"
                id="pincode"
                className="form-control"
                placeholder="Enter your pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
