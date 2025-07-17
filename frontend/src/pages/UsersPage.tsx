import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/userApi';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;