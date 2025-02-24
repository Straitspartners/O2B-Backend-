import React from "react";

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
import "./Settings.css";
import { Button } from "react-bootstrap";

const Setting = () => {
  const navigate = useNavigate();

  var HandleEditprofile = () => {
    navigate("/Editprofile");
  };
  var Handlechangepassword = () => {
    navigate("/forgotpassword");
  };
  const HandleFaq = () => {
    navigate("/FaqPage");
  };
  const HandleItineraryDate =()=>{
    navigate("/ItineraryDate")
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
                <NavDropdown.Item className="d-flex align-items-center">
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
      <div className="body-setting d-flex justify-content-center align-items-center min-vh-100 ">
        <div className="div-setting text-center w-60" style={{ width: "60%" }}>
          <h1>
            <Button className="it-custom-button">></Button> Settings
          </h1>

          <p className=" it-p1 border-1 fw-bold">👨🏻‍💼 Account</p>
          <div class="d-flex justify-content-center">
            <hr class="w-50 border-1 border-black " />
          </div>
          <p className="it-p">
            Edit profile{" "}
            <Button className="custom-button" onClick={HandleEditprofile}>
              >
            </Button>
          </p>

          <p className="it-p">
            Change Password
            <Button className="custom-button" onClick={Handlechangepassword}>
              >
            </Button>
          </p>
          <p className="it-p1 fw-bold">📍 Itinerary</p>
          <div class="d-flex justify-content-center">
            <hr class="w-50 border-1 border-black " />
          </div>

          <p className="it-p">
            Upcoming Itinerary<Button className="custom-button" onClick={HandleItineraryDate}>></Button>
          </p>
          <p className="it-p">
            Past Itinerary<Button className="custom-button">></Button>
          </p>
          <p className="it-p1 fw-bold">💬 Feedback & Support</p>
          <div class="d-flex justify-content-center">
            <hr class="w-50 border-1 border-black " />
          </div>
          <p className="it-p">
            FAQ'S
            <Button className="custom-button" onClick={HandleFaq}>
              >
            </Button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Setting;
