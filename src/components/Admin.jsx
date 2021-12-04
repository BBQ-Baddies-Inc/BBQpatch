import React, { useState, useEffect } from "react";
import { getAllUsers } from "../api/users";
import { Link, useHistory } from "react-router-dom";

// export default function adminPage(props) {
//   const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = props;
//   // let history = useHistory();

// }

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
                <div className="space_list" key={user.id}>
                  <p>
                    Customer Name: {first_name} {last_name}
                  </p>
                  <p>Username: {username}</p>
                  <p>Email Address: {email}</p>
                  <p>Mailing Address: {address}</p>
                </div>
              );
            })
          : null}
      </ul>
    </div>
  );
}
