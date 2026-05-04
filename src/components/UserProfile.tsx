import type { User } from '../types/user.types';

type Props = {
  user: User | undefined;
};

const UserProfile = ({ user }: Props) => {
  if (!user) return <p>No user selected</p>;
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
      <p>{user.fullname}</p>
      <p>{user.age}</p>
      <p>{user.education}</p>
      <p>{user.gender}</p>
      <p>{user.skills.join(', ')}</p>
      <p>{user.bio}</p>
    </section>
  );
};

export default UserProfile;
