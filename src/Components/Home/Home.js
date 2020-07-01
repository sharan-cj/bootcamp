import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

export default function Home() {
  const [taskData, setTaskData] = useState("");
  const url = "https://bootcamp-6bf24.firebaseio.com/.json";

  
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  /// retrieves data from firebase realtime database

  async function getData() {
    axios(url).then((response) => {
      console.log(response.data);
      setTaskData(response.data);
    });
  }



  return (
    <div className="home">
      <h1>Tasks</h1>

      <div className="task-container">
        {Object.keys(taskData).map((task) => {
          return (
            <div key={task} className="task-card">
              <h3>{taskData[task].taskId}</h3>
              <div>
                <p>
                  Task Name: <span>{taskData[task].taskName}</span>
                </p>
                <img src={taskData[task].taskImageUrl} />
              </div>
              <div className="description">
                <button
                  onClick={() => {
                    setShowDescription(!showDescription);
                  }}
                >
                  Description
                </button>
                {showDescription ? (
                  <p>{taskData[task].taskDescription}</p>
                ) : null}
              </div>

              {/* genarating random numbers as submissions, 
              this to be replace with students actual submissions */}

              <div className="submits">
                Submits : {Math.floor(Math.random() * 5) + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
