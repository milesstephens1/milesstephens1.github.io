import "./App.css";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';

function StarBackground() {
  const canvasRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = 500;

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      vx: (Math.random() - 0.5) * 0.2,
    }));

    let animationId;
    let time = 0;

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(10, 25, 50, 0.9)");
      gradient.addColorStop(1, "rgba(30, 60, 100, 0.6)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update stars
      stars.forEach((star) => {
        star.x += star.vx;
        star.opacity =
          Math.sin(time * star.twinkleSpeed) * 0.3 + star.opacity;

        if (star.x > canvas.width) star.x = 0;
        if (star.x < 0) star.x = canvas.width;

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="star-background"
      style={{ transform: `translateY(${scrollY * 0.5}px)` }}
    />
  );
}


export default function App() {
  const [formData, setFormData] = useState({
    avg_temp: "",
    max_temp: "",
    temp_trend: "",
    avg_hr: "",
    avg_sleep: "",
    steps_drop: ""
  });
  
  const [prediction, setPrediction] = useState(null);

  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // POST AI Data
  const handleSubmit = async () => {
    setLoading(true);

    try {

      const payload = {
        avg_temp: parseFloat(formData.avg_temp),
        max_temp: parseFloat(formData.max_temp),
        temp_trend: parseInt(formData.temp_trend),
        avg_hr: parseFloat(formData.avg_hr),
        avg_sleep: parseFloat(formData.avg_sleep),
        steps_drop: parseInt(formData.steps_drop)
      };

      if (Object.values(payload).some(value => isNaN(value))) {
        alert("Please fill out all fields correctly.");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        payload
      );
      setPrediction(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      await new Promise(resolve => setTimeout(resolve, 614));
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="construction-banner">
        🚧 Under Construction
      </div>

      <header className="hero">
        <StarBackground />
        <div className="hero-content">
          <h1>NASA HUNCH: Polaris</h1>
          <p>
            A revolutionary system for monitoring astronaut health and supporting mental wellness during space missions. Powered by advanced artificial intelligence and designed with human care at its core.
          </p>
        </div>
      </header>

      <section className="card">
        <h2>Project Overview</h2>
        <p>
          We're reimagining how artificial intelligence can serve humanity's greatest explorers. Our concept system demonstrates how AI-powered health monitoring could provide critical support during long-duration space missions, helping astronauts maintain their wellbeing while advancing human space exploration.
        </p>
      </section>

      <section className="card-with-image">
        <div className="card">
          <h2>How It Works</h2>
          <ul>
            <li>Health and sleep data is gathered by health and diagnostic apps on your mobile device</li>
            <li>An AI agent analyzes patterns and identifies potential concerns</li>
            <li>A GPT Agent provides personalized mental wellness support</li>
            <li>Insights are communicated with Doctor for further analysis and diagnosis</li>
            <p><em>Doctor-on-demand services are available</em></p>
          </ul>
        </div>
        <div className="card-image">
          <img src="./src/assets/images.png" alt="How It Works - Polaris" />
        </div>
      </section>

      <section className="card">    
        <h2>Why This Matters</h2>
        <p>
          Astronauts face unique challenges—isolation, microgravity stress, and psychological pressures. An AI support system can detect early warning signs, provide real-time assistance, and significantly enhance mission safety and crew wellbeing. We're creating technology that empowers our explorers to reach further than ever before.
        </p>
      </section>

      <section className="card">
        <h2>Built With Responsibility</h2>
        <p>
          This system is designed to augment medical expertise, never replace it. All data is protected with enterprise-grade encryption, and human oversight remains essential at every step. We're committed to ethical AI that serves humanity's highest aspirations.
        </p>
      </section>

      <section className="card">
        <h2>Try Me!</h2>
        <p>A demo of how the AI might perform while in the field:</p>
        <p className="subtitle">Input the values into the text boxes, then press 'Predict' to run the AI and see it's prediction!</p>
        <br></br><br></br>
        <div className="input-container">
          <div className="inputs-row">
            <input
              name="avg_temp"
              placeholder="Average Temperature"
              value={formData.avg_temp}
              onChange={handleChange}
            />

            <input
              name="max_temp"
              placeholder="Max Temperature"
              value={formData.max_temp}
              onChange={handleChange}
            />

            <input
              name="temp_trend"
              placeholder="Temp Trend"
              value={formData.temp_trend}
              onChange={handleChange}
            />

            <input
              name="avg_hr"
              placeholder="Average Heart Rate"
              value={formData.avg_hr}
              onChange={handleChange}
            />

            <input
              name="avg_sleep"
              placeholder="Average Sleep"
              value={formData.avg_sleep}
              onChange={handleChange}
            />

            <input
              name="steps_drop"
              placeholder="Steps Drop"
              value={formData.steps_drop}
              onChange={handleChange}
            />
          </div>

          <button className="predict-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? <div className="spinner"/> : "Predict"}
          </button>

        </div>
          {prediction && (
            <div>
              <h3>Prediction:</h3>
              <p>{JSON.stringify(prediction.ill) ? `Patient is ill with ${JSON.stringify(prediction.probability * 100)}% confidence` : `Patient is fine with ${JSON.stringify(prediction.probability)}% confidence`}</p>
            </div>
          )}
      </section>

      <footer className="footer">
        <p>Polaris (NASA HUNCH Project) • Miles Stephens, Antonio Klein, & Rhys Williams</p>
      </footer>
    </div>
  );
}
