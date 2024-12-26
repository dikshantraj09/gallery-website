import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti"; // Import confetti library
import "./App.css";
import mainImage from "./assets/main.png";
import { useNavigate } from "react-router-dom";
import PageTransition from "./PageTransition";

const CountdownTimer = ({ targetDate, onCelebration }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        setIsButtonEnabled(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div>
      <div className="countdown">
        <span>{timeLeft.days}d </span>
        <span>{timeLeft.hours}h </span>
        <span>{timeLeft.minutes}m </span>
        <span>{timeLeft.seconds}s</span>
      </div>
      <button
        className={`invitation-button ${isButtonEnabled ? "" : "disabled"}`}
        disabled={!isButtonEnabled}
        onClick={onCelebration}
      >
        Tap This!
      </button>
    </div>
  );
};

const InvitationCard = () => {
  const eventDate = "2024-12-26T14:52:50";//"2025-01-04T00:00:00";
  const [showTransition, setShowTransition] = useState(false);
  const navigate = useNavigate();
  const audio = new Audio("/celeb.mp3");
  const handleCelebration = () => {
    try {
      // Play sound
      
      audio
        .play()
        .catch((error) => console.error("Audio playback failed:", error));

      // Trigger confetti
      confetti({
        particleCount: 200,
        spread: 120,
        angle: 90,
        startVelocity: 30,
        origin: { x: 0.5, y: 0.7 },
      });
      
      // Show page transition
      setTimeout(() => {
        setShowTransition(true);
      }, 5000); // Wait 3 seconds before showing transition
      // setTimeout(() => {
      //   navigate("/gallery");
      // }, 25000); // Wait 3 seconds before navigating
    } catch (error) {
      console.error("Celebration failed:", error);
    }
  };

  if (showTransition) {
    audio.pause();
    return <PageTransition />;
  }

  return (
    <div className="card-container">
      <div className="card">
        <h2 className="invitation-title">Happiest Birthday</h2>
        <h3 className="invitation-title">To My Precious</h3>
        <h1 className="name">Ananya</h1>
        <div className="image-container">
          <img src={mainImage} alt="Ananya" className="profile-image" />
        </div>
        <h2 className="event-title">
          22<sup>nd</sup> Birthday
        </h2>
        <CountdownTimer
          targetDate={eventDate}
          onCelebration={handleCelebration}
        />
      </div>
    </div>
  );
};

export default InvitationCard;
