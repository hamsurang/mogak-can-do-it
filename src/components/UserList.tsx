import * as Avatar from '@radix-ui/react-avatar';
import { css } from '../../styled-system/css';

type User = {
  name: string;
  username: string;
  isConnected: boolean;
  startTime?: string;
  endTime?: string;
};

type UserListProps = {
  users: User[];
};

export const UserList = ({ users }: UserListProps) => {
  return (
    <ul className={userContainerStyle}>
      {users.map((user) => (
        <li key={user.username} className={userStyle}>
          <span
            className={`${statusStyle} ${user.isConnected ? 'connected' : 'disconnected'}`}
          />
          <Avatar.Root className={avatarRootStyle}>
            <Avatar.Image
              className={avatarImageStyle}
              src={`https://github.com/${user.username}.png`}
              alt={user.name}
            />
            <Avatar.Fallback className={avatarFallbackStyle} delayMs={600}>
              {user.name.charAt(0)}
            </Avatar.Fallback>
          </Avatar.Root>
          <span>{user.name}</span>
          {user.startTime && (
            <span className={timeStyle}>
              {user.startTime} ~ {user.endTime}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

const userContainerStyle = css({
  listStyle: 'none',
  margin: '0 auto',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  backgroundColor: 'gray.100',
  borderRadius: 'md',
  maxWidth: '400px',
});

const userStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px',
  backgroundColor: 'white',
  borderRadius: 'md',
  boxShadow: 'sm',
});

const statusStyle = css({
  width: '10px',
  height: '10px',
  borderRadius: 'full',
  '&.connected': {
    backgroundColor: 'green.500',
  },
  '&.disconnected': {
    backgroundColor: 'gray.400',
  },
});

const timeStyle = css({
  marginLeft: 'auto',
  color: 'gray.600',
  fontWeight: 'medium',
});

const avatarRootStyle = css({
  display: 'inline-block',
  borderRadius: '50%',
  width: '32px',
  height: '32px',
  overflow: 'hidden',
  backgroundColor: 'gray.200',
});

const avatarImageStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '50%',
});

const avatarFallbackStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'gray.400',
  color: 'white',
  borderRadius: '50%',
});
