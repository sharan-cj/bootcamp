import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Score.css";

export default function Score() {
  const [taskData, setTaskData] = useState("");
  const [userData, setUserData] = useState("");
  const url = "https://bootcamp-6bf24.firebaseio.com/.json";

  useEffect(() => {
    getData();
    getUserData();
  });

  const rateHandler = (event) => {
    event.preventDefault();
    const rating = prompt("Rate the user on a scale of 1 to 10");
    let task = event.currentTarget.parentNode.parentNode.id;
    let user = event.currentTarget.id;
    postUserRating(task, user, rating);
  };
  async function postUserRating(task, user, rating) {
    axios
      .post(`https://bootcamp-6bf24.firebaseio.com/${task}/ratings.json`, {
        rating: rating,
        userName: user,
      })
      .then((response) => {
        console.log(response);
      });
  }
  async function getData() {
    axios(url).then((response) => {
    //   console.log(response.data);
      setTaskData(response.data);
    });
  }
  async function getUserData() {
    axios("https://devapptask.firebaseio.com/.json").then((response) => {
      setUserData(response.data);
    //   console.log(response.data);
    });
  }

  return (
    <div className="scores">
      {Object.keys(taskData).map((task) => {
        return (
          <div className="submissions" key={task}>
            <h1>Submissions for {taskData[task].taskId}</h1>
            <div className="user-rating-container">
              {typeof taskData[task].ratings === "undefined" ? null : (
                <div>
                  {" "}
                  {Object.keys(taskData[task].ratings).map((user) => {
                    return (
                      <div key={user} className="card">
                        <div>
                          User :{" "}
                          <span> {taskData[task].ratings[user].userName}</span>
                        </div>
                        <div>
                          Rating :
                          <span> {taskData[task].ratings[user].rating}</span>
                        </div>
                        
                      </div>
                    );
                  })}{" "}
                </div>
              )}
            </div>
            <hr />
            <div className="submission-container">
              {Object.keys(userData).map((user) => {
                return (
                  <div className="submission-card" key={user}>
                    <h3>
                      User name : <span>{userData[user].userName}</span>
                    </h3>
                    <img src={taskData[task].taskImageUrl} />
                    <div className="rating" id={task}>
                      <div>
                        <button
                          id={userData[user].userName}
                          onClick={rateHandler}
                        >
                          Rate
                        </button>
                      </div>
                    </div>

                    <div className="download">
                      <button>Download</button>
                    </div>
                  </div>
                );
              })}
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
