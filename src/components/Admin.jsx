import React, { useState, useEffect } from "react";
import { getAllUsers } from "../api/users";

export default function Admin() {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    const allUsers = await getAllUsers();
    setUsers(allUsers);
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="admin_user">
      <h1>User List</h1>
      <ul>
        {users && users.length
          ? users.map((user) => {
              const { id, username, first_name, last_name, email, address } =
                user;
              return (
                <div key={user.id}>
                  className="products_page"
                  <p>
                    {first_name} {last_name}
                  </p>
                  <p>{username}</p>
                  <p>{email}</p>
                  <p>{address}</p>
                </div>
              );
            })
          : null}
      </ul>
    </div>
  );
}
