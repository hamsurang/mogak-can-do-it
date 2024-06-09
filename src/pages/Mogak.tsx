import { useState } from 'react';
import { UserList } from '../components/UserList';
import { TimeModal } from '../components/TimeModal';
import { HAMSURANG_PEOPLE } from '../constants';
import { css } from '../../styled-system/css';

type User = {
  name: string;
  username: string;
  isConnected: boolean;
  startTime?: string;
  endTime?: string;
};

const MogakPage = () => {
  const [users, setUsers] = useState<User[]>(
    HAMSURANG_PEOPLE.map((user) => ({ ...user, isConnected: false })),
  );

  const handleTimeSubmit = (startTime: string, endTime: string) => {
    setUsers(
      users.map((user) => ({
        ...user,
        startTime,
        endTime,
      })),
    );
  };

  return (
    <div className={mogakPageStyle}>
      <h1>모각코</h1>
      <TimeModal onSubmit={handleTimeSubmit} />
      <UserList users={users} />
    </div>
  );
};

export default MogakPage;

const mogakPageStyle = css({
  padding: '20px',
});
