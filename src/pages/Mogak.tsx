import { useState } from 'react';
import { css } from '../../styled-system/css';
import { UserList } from '../components/UserList';
import { HAMSURANG_PEOPLE } from '../constants';

type User = {
  name: string;
  username: string;
  isConnected: boolean;
  startTime?: string;
  endTime?: string;
};

const MogakPage = () => {
  const [users] = useState<User[]>(
    HAMSURANG_PEOPLE.map((user) => ({ ...user, isConnected: false })),
  );

  return (
    <div className={mogakPageStyle}>
      <h1>모각코</h1>
      <UserList users={users} />
    </div>
  );
};

export default MogakPage;

const mogakPageStyle = css({
  padding: '20px',
});
