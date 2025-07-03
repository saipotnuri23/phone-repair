import React, { useState } from "react";
import "./Repair.css";
import battery from "../../assets/battery.png";
import brokenscreen from "../../assets/brokenscreen.png";
import { useNavigate } from "react-router-dom";

export default function Repair() {
  const navigate = useNavigate();

  const [selectedIssues, setSelectedIssues] = useState([]);
  const [error, setError] = useState('');

  const handleIssueToggle = (issue) => {
    setError('');
    if (selectedIssues.includes(issue)) {
      setSelectedIssues(selectedIssues.filter((i) => i !== issue));
    } else {
      setSelectedIssues([...selectedIssues, issue]);
    }
  };

  const handleContinue = () => {
    if (selectedIssues.length === 0) {
      setError("Please select an issue.");
    } else {
      navigate("/ShopList", { state: { issues: selectedIssues } });
    }
  };

  const isSelected = (issue) => selectedIssues.includes(issue);

  return (
    <div className="device-issue-container">
      <div className="device-issue-card">
        <div className="device-issue-left">
          <h2 className="device-issue-title">What's wrong with it?</h2>
          <p className="device-issue-subtitle">Don't worry, we will fix it!</p>

          <div className="issue-options">
            <button
              className={`issue-button ${isSelected('Battery') ? 'active' : ''}`}
              onClick={() => handleIssueToggle('Battery')}
            >
              <img src={battery} alt="Battery" className="issue-icon" />
              <span>Battery</span>
            </button>

            <button
              className={`issue-button ${isSelected('Broken Screen') ? 'active' : ''}`}
              onClick={() => handleIssueToggle('Broken Screen')}
            >
              <img src={brokenscreen} alt="Broken Screen" className="issue-icon" />
              <span>Broken Screen</span>
            </button>
          </div>

          <div className="extra-options">
            {['Charging Port', 'Camera Lens', 'Free Diagnostic'].map((item) => (
              <button
                key={item}
                className={`extra-button ${isSelected(item) ? 'active' : ''}`}
                onClick={() => handleIssueToggle(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {error && <p className="error-message">{error}</p>}

          <textarea
            placeholder="describe other issues"
            className="issue-textarea"
            rows="6"
            onChange={(e) => handleIssueToggle(e.target.value)}
          />

          <div className="action-buttons">
            <button onClick={() => navigate(-1)} className="back-button">Go back</button>
            <button onClick={handleContinue} className="continue-button">Continue</button>
          </div>
        </div>

        <div className="ai-analyzer">
          <div className="ai-analyzer-circle">
            <div className="ai-analyzer-inner-circle"></div>
          </div>
          <p className="ai-analyzer-title">AI ANALYZER</p>
          <p className="ai-analyzer-desc">OUR AI WILL ANALYZE THE ISSUE</p>
        </div>
      </div>
    </div>
  );
}
