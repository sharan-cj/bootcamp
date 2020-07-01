import React, { useState, useEffect } from "react";
import "./CreateTask.css";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { storage } from "../firebase";

export default function CreateTask() {
  const [taskName, setTaskName] = useState("");
  const [taskId, setTaskId] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskImageUrl, setTaskImageUrl] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const [redirect, setRedirect] = useState(false);
  const [warning, setWarning] = useState(false);
  const [taskIdWarning, setTaskIdWarning] = useState(false);

  const url = "https://bootcamp-6bf24.firebaseio.com/.json";


  /// updates states using input data

  const inputHandler = (event) => {
    event.preventDefault();
    let id = event.target.id;
    if (id === "taskName") {
      setTaskName(event.target.value);
    } else if (id === "taskId") {
      setTaskId(event.target.value);
    } else if (id === "taskDescription") {
      setTaskDescription(event.target.value);
    }
    setWarning(false);
    setTaskIdWarning(false);
  };

  /// handles image file

  const inputFileHandler = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  // console.log("image", image);

  ///  checks whether the TaskId is entered before uploading the picture,
  ///  uploads the image file to firebase storage,
  ///  takes snapshot of the progress and renders in progress bar,
  ///  updates the state of the image Url  

  const uploadHandler = (event) => {
    event.preventDefault();
    if (taskId === "") {
      setTaskIdWarning(true);
    } else {
      const uploadTask = storage.ref(`images/${taskId}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(taskId)
            .getDownloadURL()
            .then((imgUrl) => {
              setTaskImageUrl(imgUrl);
            });
        }
      );
    }
  };

  /// checks whether all the inputs are entered before submitting


  const submitHandler = (event) => {
    setWarning(false);
    event.preventDefault();
    if (taskName === "" || taskId === "" || taskImageUrl==='' || taskDescription === "") {
      setWarning(true);
      console.log(taskDescription, taskId, taskName, taskImageUrl);
    } else {
      postData();
      setRedirect(true);
    }
  };

  /// posts data to firebase realtime database

  async function postData() {
    axios
      .post(url, {
        taskName: taskName,
        taskId: taskId,
        taskImageUrl: taskImageUrl,
        taskDescription: taskDescription,
      })
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <div className="create-task">
      <h1>Create a new task</h1>
      <div className="form">
        <div className="task-name" id="reset">
          <label>Task name:</label>
          <input
            type="text"
            id="taskName"
            placeholder="Enter the task name"
            onChange={inputHandler}
          />
        </div>
        <div className="task-id">
          <label>Task ID:</label>
          <input
            type="text"
            id="taskId"
            placeholder="Enter the task ID"
            onChange={inputHandler}
          />
        </div>
        {taskIdWarning ? (
          <div className="warning">
            Please Enter the Task ID to upload the image{" "}
          </div>
        ) : null}
        <div className="file-upload">
          <label>Upload picture:</label>
          <input type="file" id="file" onChange={inputFileHandler} />
          <div>
            <button className="upload-btn" onClick={uploadHandler}>
              Upload
            </button>
            {progress != 0 ? <progress value={progress} max="100" /> : null}
          </div>
        </div>
        <div className="task-description">
          <label>Task description:</label>
          <textarea
            id="taskDescription"
            placeholder="Enter the task details"
            onChange={inputHandler}
          />
        </div>
        {warning ? (
          <div className="warning">Please fill all the inputs</div>
        ) : null}
        <div className="submit-btn">
          <button onClick={submitHandler}>Submit</button>
        </div>
      </div>
      {redirect ? <Redirect to={"/home"} /> : null}
    </div>
  );
}
