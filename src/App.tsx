import { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import type { User } from './types/user.types';
import { v4 as uuidV4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [editingId, setEditingId] = useState<string>();

  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    fullname: '',
    age: 0,
    education: '',
    gender: '',
    skills: [],
    bio: '',
  });

  const handleSave = (data: Omit<User, 'id'>) => {
    if (editingId) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingId ? { ...data, id: editingId } : u)),
      );
      toast.success('User updated');
    } else {
      setUsers((prev) => [...prev, { ...data, id: uuidV4() }]);
      toast.success('User added!');
    }
    handleClear();
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setFormData({
      fullname: user.fullname,
      age: user.age,
      education: user.education,
      gender: user.gender,
      skills: user.skills,
      bio: user.bio,
    });
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (selectedUser?.id === id) setSelectedUser(undefined);
    toast.error('User deleted!');
  };

  const handleClear = () => {
    setFormData({
      fullname: '',
      age: 0,
      education: '',
      gender: '',
      skills: [],
      bio: '',
    });
    setEditingId(undefined);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
      <h1>USERS</h1>
      <UserForm
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        onClear={handleClear}
        isEditing={!!editingId}
      />
      <hr />

      <UserList
        users={users}
        onView={setSelectedUser}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <hr />

      <UserProfile user={selectedUser} />

      <div>
        <Toaster />
      </div>
    </div>
  );
};

export default App;
