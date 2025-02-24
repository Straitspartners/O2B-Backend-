// import React from "react";
// import "./Itinerarydate.css";
// import facebook from "./Asset/facebook.png";
// import instagram from "./Asset/instagram.png";
// import linkedin from "./Asset/linkedin.png";
// import { Button } from "react-bootstrap";


// const ItineraryCard = ({ title }) => {
//   return (
//     <div className="itinerary-card">
//       <div className="itinerary-header"> Airport ➝ CGK - DPS with Airlines</div>
//       <div className="itinerary-info">
//         <p>👥 Crew Type: Married Couple</p>
//         <p>📅 From Date: January 10</p>
//         <p>📅 To Date: January 20</p>
//       </div>
//       <Button className="see-more">See More →</Button>
//     </div>
//   );
// };

// const ItineraryDate = () => {
//   return (
//     <div className="itinerary-container">
//      <div className="itinerary-div">
//       <h2 className="section-title">Upcoming Itinerary</h2>
//       <div className="itinerary-section">
//         <ItineraryCard />
//         <ItineraryCard />
//         <ItineraryCard />
//       </div>
//       <h2 className="section-title">Present Itinerary</h2>
//       <div className="itinerary-section">
//         <ItineraryCard />
//         <ItineraryCard />
//         <ItineraryCard />
//       </div>
//       <h2 className="section-title">Past Itinerary</h2>
//       <div className="itinerary-section">
//         <ItineraryCard />
//         <ItineraryCard />
//         <ItineraryCard />
//       </div>
//       <div className="Get-Started-footer">
//         <table class="footer-table">
//           <thead>
//             <tr>
//               <th class="footer-table-tr1">Only 2 Bali</th>
//               <th class="footer-table-tr2">
//                 <img src={facebook} />
//                 <img src={instagram} />
//                 <img src={linkedin} />
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Copyright ©2024 Only2Bali. All Rights Reserved</td>
//               <td></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default ItineraryDate;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Itinerarydate.css";
import { Link } from "react-router-dom";

const ItineraryCard = ({ itinerary }) => {
  return (
    <div className="itinerary-card">
      <div className="itinerary-header">
        Airport ➝ {itinerary.traveldetails__international_airport} with Airlines
      </div>
      <div className="itinerary-info">
        <p>👥 Crew Type: {itinerary.crew_type_display}</p>
        <p>📅 From Date: {itinerary.traveldetails__from_date}</p>
        <p>📅 To Date: {itinerary.traveldetails__to_date}</p>
      </div>
      <div className="see-more">
      <Link to={`/AllItineraryPages?from_date=${itinerary.traveldetails__from_date}&to_date=${itinerary.traveldetails__to_date}&international_airport=${itinerary.traveldetails__international_airport}&crew_type=${itinerary.crew_type_display}`}>
          See More →
        </Link>
      </div>
    </div>
  );
};

const ItineraryDate = () => {
  const [pastItineraries, setPastItineraries] = useState([]);
  const [presentItineraries, setPresentItineraries] = useState([]);
  const [futureItineraries, setFutureItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        // Assuming token is stored in localStorage
        const token = localStorage.getItem("access_token"); // Or replace this with how you store your token

        // Make a request to the DRF backend to fetch itinerary data with Authorization header
        const response = await axios.get("http://192.168.31.111:8000/api/journeys/itinerarydate/", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request header
          },
        });

        setPastItineraries(response.data.past_itineraries);
        setPresentItineraries(response.data.present_itineraries);
        setFutureItineraries(response.data.future_itineraries);
        setLoading(false);
      } catch (err) {
        setError("Error fetching itineraries");
        setLoading(false);
      }
    };

    fetchItineraries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="itinerary-container">
      <h2 className="section-title">Upcoming Itinerary</h2>
      <div className="itinerary-section">
        {futureItineraries.map((itinerary, index) => (
          <ItineraryCard key={index} itinerary={itinerary} />
        ))}
      </div>

      <h2 className="section-title">Present Itinerary</h2>
      <div className="itinerary-section">
        {presentItineraries.map((itinerary, index) => (
          <ItineraryCard key={index} itinerary={itinerary} />
        ))}
      </div>

      <h2 className="section-title">Past Itinerary</h2>
      <div className="itinerary-section">
        {pastItineraries.map((itinerary, index) => (
          <ItineraryCard key={index} itinerary={itinerary} />
        ))}
      </div>

      <footer className="footer">
        <p>Copyright © 2024 Only2Bali. All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default ItineraryDate;
