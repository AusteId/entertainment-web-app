import { useEffect, useState } from 'react';
import { useUserContext } from '../service/UserContextProvider';
import { apiGetUserById } from '../api/users';
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
  if (user) {
    return <UserView user={user} />;
  } else {
    return <div>No user data</div>;
  }
}
