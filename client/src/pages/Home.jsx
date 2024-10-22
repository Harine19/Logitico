import { useContext, useEffect } from 'react'; 
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

function Home() {
  const { setUser, userdets } = useContext(AppContext);
  const { user } = useUser();
  const navigate = useNavigate();

  // Emit the 'checkUser' event when the component is mounted
  useEffect(() => {
    const checkUser = async () => {
      if (user?.id) {
        try {
          const response = await axios.post('http://localhost:4000/api/checkUser', {
            clerkId: user.id,
          });
          console.log('User check response:', response.data);
          
          if (response.data.exists) {
            setUser(response.data.user); // Store user data in context
            console.log('User data:', response.data.user);
          } else {
            navigate('/onboard'); // Redirect to the onboard page if the user is new
          }
        } catch (error) {
          console.error('Error checking user:', error);
        }
      }
    };

    checkUser();
  }, [user, setUser, navigate]);

  return (
    <div className="container mt-5">
      <div className="jumbotron text-center">
        <h1 className="display-4">Welcome to Our Logistics Platform!</h1>
        <p className="lead">Connect with drivers and book transportation services for your goods.</p>
        <hr className="my-4" />
        <p>Experience seamless booking, real-time tracking, and competitive pricing.</p>
        <a className="btn btn-primary btn-lg" href="#features" role="button">Learn More</a>
      </div>

      <div id="features" className="mt-5">
        <h2 className="text-center">Features</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Book Transportation</h5>
                <p className="card-text">Easily book a vehicle for your goods with just a few clicks.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Real-Time Tracking</h5>
                <p className="card-text">Track your driver’s location in real time from your device.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Competitive Pricing</h5>
                <p className="card-text">Get upfront price estimates based on your requirements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
