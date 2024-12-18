import { useEffect, useState } from 'react';
import { AdminView } from '../components/profile/AdminView';
import { useUserContext } from '../service/UserContextProvider';
import { apiGetUserById } from '../api/users';
import { useNavigate } from 'react-router';

export default function AdminPage() {
  const userData = useUserContext();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo(userData.userId);
    if (user && user.role === 'ADMIN') navigate('/profile');
  }, []);

  async function getUserInfo(userId) {
    const userx = await apiGetUserById(userId);
    setUser(userx);
  }

  return (
    <div>
      <AdminView />
    </div>
  );
}
