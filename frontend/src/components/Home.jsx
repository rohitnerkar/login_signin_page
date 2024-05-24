import axios from "axios";
import React, { useState } from "react";

function Home() {

    const [users, setUsers] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.get('http://localhost:8080/home');
          setUsers(response.data);
          alert("User Fetched Successfull.");
        } catch (err) {
            alert('Failed: ', err);
        }
      };
    return(
        <>
        <div>Home</div>
        <div>
            <button onClick={handleSubmit}>Get Users</button>
            <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} - {user.email} - {user.password}</li>
        ))}
      </ul>
        </div>
        </>
    )
}

export default Home;