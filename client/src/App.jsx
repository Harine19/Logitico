import { Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import User from "./pages/dashboard/User";
import Transporter from "./pages/dashboard/transporter";
import Admin from "./pages/dashboard/Admin";
import About from "./pages/About";
import axios from "axios";
import Book from "./pages/Book";
import SignIn from "./pages/Sign_In";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import OnboardingForm from "./pages/OnboardingForm";

const App = () => {
	return (
		<>
			<Navbar/>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/user" element={<User/>}/>
				<Route path="/manufacturer" element={<Transporter/>}/>
				<Route path="/admin" element={<Admin/>}/>
				<Route path="/about" element={<About/>}/>
				<Route path="/book" element={<Book/>}/>
				<Route path="/onboard" element={<OnboardingForm/>}/>
				<Route path="/sign-in" element={<SignIn/>}/>
			</Routes>
		</>
	);
};

export default App;
