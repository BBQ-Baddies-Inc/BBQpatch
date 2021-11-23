import React, { useState, useEffect } from "react";
import { getAllUsers } from "../api/users";

export default function Users() {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    const allUsers = await getAllUsers();
    
    setUsers(allUsers);
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => {
          const {id, username, first_name, last_name, email, address, admin } = user;
          return (
            <div key={user.id}>
              <h2>{username}</h2>
              <p>{first_name, last_name}</p>
              <p>{email}</p>
              <p>{address}</p>
              <p>{admin}</p>
            
              </div>
          );
        })}
      </ul>
    </div>
  );
}