import type { User } from '../types/user.types';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaInfo } from 'react-icons/fa';

type Props = {
  users: User[];
  onView: (data: User) => void;
  onEdit: (data: User) => void;
  onDelete: (id: string) => void;
};

const UserList = ({ users, onView, onEdit, onDelete }: Props) => {
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      onDelete(id);
    }
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
      <h2>Users</h2>
      {users.length <= 0 ? (
        <p>
          <em>There are no users!</em>
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullname}</td>
                <td>
                  <button onClick={() => onView(user)}>
                    <FaInfo />
                  </button>
                  <button onClick={() => onEdit(user)}>
                    <MdEdit />
                  </button>
                  <button onClick={() => handleDelete(user.id)}>
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default UserList;
