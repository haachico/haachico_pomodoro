import { useNavigate } from "react-router-dom";
import "./index.css";
import PomodoroPopup from "../../components/Pomodoro";
import { useState } from "react";

function IntroPage() {
  const navigate = useNavigate();
  const [showPomodoro, setShowPomodoro] = useState(false);

  return (
    <div className="intro-page">
      {showPomodoro && (
        <div className="pomodoro-modal">
          <h2>Pomodoro Timer</h2> {/* Added heading for Pomodoro modal */}
          <PomodoroPopup
            onClose={() => {
              setShowPomodoro(false);
            }}
          />
        </div>
      )}
      <h1>Welcome to Your Productivity App!</h1>
      <p>Enhance your productivity with our task manager and Pomodoro timer.</p>
      <div className="intro-buttons">
        <button
          onClick={() => {
            navigate("/pomodoros/dashboard");
          }}
          aria-label="Get Started with Our Task Manager"
        >
          Get Started with Our Task Manager!
        </button>
        <button
          onClick={() => {
            navigate("/pomodoro");
          }}
          aria-label="Use Pomodoro Timer"
        >
          Use Pomodoro!
        </button>
      </div>

      {/* Feature Highlights Section */}
      <section className="features">
        <h2>Features</h2>
        <ul>
          <li>Organize tasks efficiently with our intuitive task manager.</li>
          <li>Boost focus using the integrated Pomodoro timer.</li>
          <li>Track your progress and achieve your goals.</li>
        </ul>
      </section>

      {/* User Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <blockquote>
          "This app has transformed the way I work. My productivity has soared!"
        </blockquote>
        <cite>- Alex P.</cite>
        <blockquote>
          "The Pomodoro timer keeps me on track throughout the day. Highly
          recommend!"
        </blockquote>
        <cite>- Jamie L.</cite>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <details>
          <summary>How do I create a new task?</summary>
          <p>
            Navigate to the task manager and click on 'Add New Task' to get
            started.
          </p>
        </details>
        <details>
          <summary>What is the Pomodoro Technique?</summary>
          <p>
            The Pomodoro Technique is a time management method that involves
            working in intervals (usually 25 minutes) separated by short breaks.
          </p>
        </details>
      </section>

      {/* Contact Information Section */}
      <section className="contact">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or feedback, feel free to reach out to us at
          support@productivityapp.com.
        </p>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 Productivity App. All rights reserved.</p>
        <nav>
          <a href="/privacy-policy">Privacy Policy</a> |{" "}
          <a href="/terms-of-service">Terms of Service</a>
        </nav>
      </footer>
    </div>
  );
}

export default IntroPage;
