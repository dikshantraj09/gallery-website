import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PageTransition = () => {
  const [showFade, setShowFade] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const zoomTimeout = setTimeout(() => {
      setShowFade(true); // Start fade-to-black
    }, 2000); // Match the zoom animation duration

    const navigateTimeout = setTimeout(() => {
      navigate("/gallery");
    }, 3000); // Allow fade animation to complete

    return () => {
      clearTimeout(zoomTimeout);
      clearTimeout(navigateTimeout);
    };
  }, [navigate]);
  return (
    <div className="transition fade-animation">
      {!showFade && (
        <div className="zoom-animation">
          <h1 className="transition-text">I Love You! My Heart</h1>
        </div>
      )}
      {showFade && <div className="fade-animation" />}
    </div>
  );
};

export default PageTransition;
