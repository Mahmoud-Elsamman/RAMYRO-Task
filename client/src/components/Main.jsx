import React, { useState, useEffect } from "react";
import connection, { startConnection } from "../services/signalRService";
import "./Main.css";

const Main = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    startConnection();

    connection.on("ReceiveProgress", (value) => {
      setProgress(value);
      if (value === 100) {
        setLoading(false);
        fetchProcessData();
      }
    });

    return () => {
      connection.off("ReceiveProgress");
    };
  }, []);

  const handleStartProcess = async () => {
    try {
      setLoading(true);
      setData(null);
      setError(null);
      setProgress(0);

      const response = await fetch("http://localhost:5150/api/process/start", {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to start process");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchProcessData = async () => {
    try {
      const response = await fetch("http://localhost:5150/api/process/data");
      if (!response.ok) throw new Error("Failed to fetch process data");
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='container'>
      <h1>Long Running Process</h1>
      <button
        onClick={handleStartProcess}
        disabled={loading}
        className='start-button'
      >
        {loading ? "Processing..." : "Start"}
      </button>

      {loading && (
        <div className='progress-container'>
          <div className='progress-bar' style={{ width: `${progress}%` }}>
            <span>{progress}%</span>
          </div>
        </div>
      )}

      {error && <div className='error-message'>Error: {error}</div>}

      {data && (
        <div className='data-container'>
          <h2>Process Results:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Main;
