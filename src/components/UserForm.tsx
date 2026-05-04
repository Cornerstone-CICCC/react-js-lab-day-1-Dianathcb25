import { type ChangeEvent } from 'react';
import type { User } from '../types/user.types';

type Props = {
  formData: Omit<User, 'id'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<User, 'id'>>>;
  onSave: (data: Omit<User, 'id'>) => void;
  onClear: () => void;
  isEditing: boolean;
};

const UserForm = ({
  formData,
  setFormData,
  onSave,
  onClear,
  isEditing,
}: Props) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (e.target.type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((current) => ({
        ...current,
        skills: checked
          ? [...current.skills, value]
          : current.skills.filter((s) => s !== value),
      }));
    } else {
      setFormData((current) => ({
        ...current,
        [name]: e.target.type === 'number' ? Number(value) : value,
      }));
    }
  };

  return (
    <div>
      <h1>User Form</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}
      >
        <label>
          Full Name:{' '}
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            placeholder="Enter full name"
            onChange={handleChange}
          />
        </label>

        <label>
          Age:{' '}
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>

        <label>
          Education:
          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
          >
            <option value="Grad School">Grad School</option>
            <option value="High School">High School</option>
            <option value="College">College</option>
          </select>
        </label>

        <label>
          Gender:
          <label>
            Female
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            />{' '}
          </label>
          <label>
            Male
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            />{' '}
          </label>
          <label>
            Other
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === 'Other'}
              onChange={handleChange}
            />{' '}
          </label>
        </label>

        <label>
          Skills:
          <label>
            TypeScript
            <input
              type="checkbox"
              name="skills"
              checked={formData.skills.includes('TypeScript')}
              value="TypeScript"
              onChange={handleChange}
            />
          </label>
          <label>
            React
            <input
              type="checkbox"
              name="skills"
              value="React"
              checked={formData.skills.includes('React')}
              onChange={handleChange}
            />
          </label>
          <label>
            Node
            <input
              type="checkbox"
              name="skills"
              value="Node"
              checked={formData.skills.includes('Node')}
              onChange={handleChange}
            />
          </label>
          <label>
            NoSQL
            <input
              type="checkbox"
              name="skills"
              value="NoSQL"
              checked={formData.skills.includes('NoSQL')}
              onChange={handleChange}
            />
          </label>
        </label>

        <label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
        </label>

        <button type="submit">{isEditing ? 'Save User' : 'Add User'}</button>
        <button type="button" onClick={onClear}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default UserForm;
