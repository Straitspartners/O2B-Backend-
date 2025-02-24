import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Route from "./Asset/Route.png";
import Settings from "./Asset/settings.png";
import profile from "./Asset/profile.png";
import logout from "./Asset/logout.png";
import "./Editprofile.css";
import { Button } from "react-bootstrap";
import axios from 'axios';  // Import axios

const Editprofile = () => {
  const [userName, setUserName] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  // Optional if updating password
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To store error messages

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current user's profile when the component mounts
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://192.168.31.111:8000/api/users/user-profile/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Pass the token for authentication
          }
        });
        const { username, mobile_number, email, gender, dob } = response.data;

        // Set the form fields with the fetched data
        setUserName(username);
        setMobileNumber(mobile_number);
        setGender(gender);
        setDob(dob);
        setEmail(email);
        setPassword(''); // You might not want to preload the password for security reasons

        setLoading(false);
      } catch (error) {
        setError('Failed to load user profile. Please try again.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const settings = () => {
    navigate("/Settings");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the updated data from the state
    const updatedProfile = {
      username: userName,
      mobile_number: mobile_number,
      gender: gender,
      dob: dob,
      email: email,
      password: password, // Include this if the password is being updated
    };

    try {
      // Send the PUT request to the backend API
      const response = await axios.put(
        'http://192.168.31.111:8000/api/users/profile/update/',  // Your backend API endpoint
        updatedProfile,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Authentication token
          }
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        navigate("/Settings");  // Redirect to the settings page after successful update
      }
    } catch (error) {
      // Handle error (e.g., if email is already taken)
      if (error.response) {
        alert(error.response.data.error || 'An error occurred.');
      } else {
        alert("Network error.");
      }
    }
  };

  const CustomInput = ({ label, value, type = "text", onChange }) => {
    return (
      <div className="position-relative custom-input">
        <label className="floating-label">{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="form-control"
        />
      </div>
    );
  };

  // Show loading indicator while fetching the profile
  if (loading) {
    return <div>Loading...</div>;  // You can replace this with a spinner for better UX
  }

  // Show error message if fetching fails
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar expand="lg" className="custom-navbar bg-#F8F2E5 px-3">
        <Container fluid>
          <Navbar.Brand href="#home">Only2Bali</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <NavDropdown
                title={
                  <span className="d-flex align-items-center">
                    <img
                      src={profile}
                      alt="Profile"
                      width="30"
                      height="30"
                      className="rounded-circle me-2"
                    />
                    <span>Profile</span>
                  </span>
                }
                id="profile-dropdown"
                align="end"
                drop="down"
              >
                <NavDropdown.Item
                  href="#itinerary"
                  className="d-flex align-items-center"
                >
                  <img
                    src={Route}
                    alt="Itinerary"
                    width="25"
                    height="25"
                    className="me-4"
                  />
                  Your Itinerary
                </NavDropdown.Item>
                <NavDropdown.Item onClick={settings} className="d-flex align-items-center">
                  <img
                    src={Settings}
                    alt="Settings"
                    width="25"
                    height="25"
                    className="me-4"
                  />
                  Settings
                </NavDropdown.Item>

                <NavDropdown.Item
                  href="#logout"
                  className="d-flex align-items-center"
                >
                  <img
                    src={logout}
                    alt="Logout"
                    width="25"
                    height="25"
                    className="me-4"
                  />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Full page container */}
      <div className="body-setting d-flex justify-content-center align-items-center min-vh-100">
        <div className="div-setting text-center w-60" style={{ width: "60%" }}>
          <div className="p-4 rounded" style={{ width: "500px" }}>
            <h1>Edit Profile</h1>
            {/* Form Fields */}
            <form className="w-100 w-md-75 mx-auto" onSubmit={handleSubmit}>
              <CustomInput
                label="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <CustomInput
                label="Mobile Number"
                value={mobile_number}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <CustomInput
              type="date"
                label="D.O.B"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <CustomInput
                label="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
              <CustomInput
                label="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Submit Button */}
              <div className="text-center mt-3">
                <button
                  type="submit"
                  className="btn btn-success px-4 rounded-pill"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editprofile;
