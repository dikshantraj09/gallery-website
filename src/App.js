import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import InvitationCard from "./InvitationCard";
import GalleryApp from "./Gallery3D";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvitationCard />} />
        <Route path="/gallery" element={<GalleryApp />} />
      </Routes>
    </Router>
  );
};

export default App;
