import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } from '../features/userSlice';
import { RootState } from '../store';
import axios from 'axios';

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(fetchUsersStart());
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(fetchUsersSuccess(response.data));
      } catch (err: any) {
        dispatch(fetchUsersFailure(err.message));
      }
    };
    fetchUsers();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Users</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
