import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: "",
      userCoordinates: {
        latitude: 0,
        longitude: 0,
      },
      rehabCenters: [],
    };
  }

  fetchRehabCenters = async (lat, lng) => {
    // Implement logic to fetch rehab centers from your backend or any API
    // Example:
    // const response = await fetch(`API_ENDPOINT?lat=${lat}&lng=${lng}`);
    // const data = await response.json();
    // this.setState({ rehabCenters: data });

    // For demo purposes, using hardcoded values
    const demoData = [
      { name: "Civil Hospital", latitude: 31.375399, longitude: 75.3823672 },
      {
        name: "Civil Hospital Bhatinda, Punjab",
        latitude: 30.1949204,
        longitude: 74.9500154,
      },
      {
        name: "Kotla Mubarakpur, Drug Treatment Clinic",
        latitude: 28.5482272,
        longitude: 77.1430136,
      },
      {
        name: "Dibrugarh Assam Medical College & Hospital",
        latitude: 27.4758393,
        longitude: 94.9046556,
      },
      {
        name: "New Life De-addiction Rehab Center for Drugs and Alcohol",
        latitude: 27.4758393,
        longitude: 94.9046556,
      },
      {
        name: "Dr ARAVINDS DEADDICTION CLINIC",
        latitude: 27.4609424,
        longitude: 94.8699343,
      },
      {
        name: "New Civil Hospital Surat, Gujarat",
        latitude: 21.1789521,
        longitude: 72.8189739,
      },
      {
        name: "Deaddiction Centre, Psychiatry Department",
        latitude: 28.88121,
        longitude: 76.6064818,
      },
      {
        name: "Institute of Mental Health and Neurosciences, Kashmir",
        latitude: 34.1082861,
        longitude: 74.8185439,
      },
      {
        name: "Shree Bhausaheb Hire Govt Medical College, Dhule",
        latitude: 20.865166,
        longitude: 74.7599134,
      },
      {
        name: "Indira Gandhi Government Medical College & Hospital",
        latitude: 21.1536811,
        longitude: 79.091123,
      },
      // Add more demo rehab centers if needed
    ];
    this.setState({ rehabCenters: demoData });
  };

  handleLocationSubmit = async (e) => {
    e.preventDefault();
    const { userLocation } = this.state;

    try {
      // Use a geocoding service to convert the location description to coordinates
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          userLocation
        )}&key=YOURGMAPSAPIKEY`
      );

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        this.setState(
          {
            userCoordinates: {
              latitude: lat,
              longitude: lng,
            },
          },
          () => {
            // Fetch rehab centers based on the obtained coordinates
            this.fetchRehabCenters(lat, lng);
          }
        );
      } else {
        console.error("Error fetching coordinates");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  handleInputChange = (e) => {
    this.setState({ userLocation: e.target.value });
  };

  render() {
    const { google } = this.props;
    const { rehabCenters, userCoordinates } = this.state;

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          backgroundColor: "#f0f0f0",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333" }}>
          Nearest Rehab Centers
        </h2>

        {/* User Location Input Form */}
        <form
          onSubmit={this.handleLocationSubmit}
          style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label style={{ marginBottom: "10px", color: "#555" }}>
            Enter Your Location:
            <input
              type="text"
              name="userLocation"
              placeholder="E.g., New York City"
              required
              onChange={this.handleInputChange}
              style={{
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "300px",
                marginLeft: "10px",
              }}
            />
          </label>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Find Nearest Rehab Centers
          </button>
        </form>

        {/* Map with Markers */}
        <Map
          google={google}
          zoom={12}
          initialCenter={{ lat: 21.7679, lng: 78.8718 }}
          style={{
            width: "100%",
            height: "calc(100% - 100px)",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {rehabCenters.map((center, index) => (
            <Marker
              key={index}
              position={{ lat: center.latitude, lng: center.longitude }}
              title={`${center.name} - Nearest Rehab`}
            />
          ))}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "YOURGMAPSAPIKEY",
})(MapContainer);
