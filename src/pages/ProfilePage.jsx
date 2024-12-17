import { useEffect, useState } from 'react';
import { useUserContext } from '../service/UserContextProvider';
import { apiGetUserById } from '../api/users';
import { AdminView } from '../components/profile/AdminView';
import { UserView } from '../components/profile/UserView';

export default function ProfilePage() {
  const userData = useUserContext();
  const [user, setUser] = useState();

  useEffect(() => {
    getUserInfo(userData.userId);
  }, []);

  async function getUserInfo(userId) {
    const userx = await apiGetUserById(userId);
    setUser(userx);
  }

  if (user && user.role === 'ADMIN') {
    return <AdminView />;
  } else if (user && user.role === 'USER') {
    return <UserView />;
  } else {
    return <div>User data unavailable</div>;
  }
}
// Dvylik@simbol1u
