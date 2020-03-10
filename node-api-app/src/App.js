import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

const initialValues = {
  name: "",
  bio: ""
};

function App() {
  const [users, setUsers] = useState([]);
  const [addUser, setAddUser] = useState(initialValues);
  console.log(users);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const createUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/users", addUser)
      .then((res) => {
        console.log("new user log", res);
        fetchUsers();
        setAddUser(initialValues);
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = (user) => {
    axios
      .delete(`http://localhost:5000/api/users/${user.id}`)
      .then((res) => {
        console.log(res);
        fetchUsers();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <div className="container">Some users</div>
      <div className="main-user-container">
        {users &&
          users.map((user, index) => (
            <div className="user-container" key={index}>
              <h2> Name: {user.name}</h2>
              <h3> Bio: {user.bio}</h3>
              <span
                className="delete"
                onClick={() => {
                  deleteUser(user);
                }}
              >
                x
              </span>
            </div>
          ))}
      </div>
      <form onSubmit={createUser}>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          type="text"
          onChange={(e) =>
            setAddUser({
              ...addUser,
              name: e.target.value
            })
          }
          value={addUser.name}
        />
        <label htmlFor="bio">Bio: </label>
        <input
          id="bio"
          type="text"
          onChange={(e) =>
            setAddUser({
              ...addUser,
              bio: e.target.value
            })
          }
          value={addUser.bio}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;
