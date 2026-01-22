import "./App.css";

export default function App() {
  return (
    <div className="page">
      <div className="construction-banner">
        🚧 Under Construction
      </div>

      <header className="hero">
        <h1>NASA HUNCH: Astronaut Health AI</h1>
        <p>
          A revolutionary system for monitoring astronaut health and supporting mental wellness during space missions. Powered by advanced artificial intelligence and designed with human care at its core.
        </p>
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
            <li>Wearable sensors continuously collect comprehensive health data</li>
            <li>Advanced AI analyzes patterns and identifies potential concerns</li>
            <li>An intelligent assistant provides personalized mental wellness support</li>
            <li>Critical insights are seamlessly communicated to mission control</li>
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

      <footer className="footer">
        <p>NASA HUNCH Project • Advancing Health in Space</p>
      </footer>
    </div>
  );
}
