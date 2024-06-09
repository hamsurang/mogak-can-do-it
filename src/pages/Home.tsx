import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '../../styled-system/css';
import usePeerConnection from '../hooks/usePeerConnection';
import { HAMSURANG_PEOPLE } from '../constants';

const HomePage = () => {
  const navigate = useNavigate();
  const { peer, connectToPeer } = usePeerConnection();
  const [nickName, setNickName] = useState('');
  const [peerId, setPeerId] = useState('');
  const [hostId, setHostId] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickName.trim() && hostId.trim()) {
      connectToPeer(hostId, nickName, () => {
        navigate(`/mogak?nickName=${nickName}&peerId=${peerId}`);
      });
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickName.trim() && peerId.trim()) {
      navigate(`/mogak?nickName=${nickName}&peerId=${peerId}`);
    }
  };

  useEffect(() => {
    if (peer) {
      console.log(`My Peer ID: ${peer.id}`);
      setPeerId(peer.id);
    }
  }, [peer]);

  return (
    <div className={containerStyle}>
      <div className={buttonContainerStyle}>
        <Dialog>
          <DialogTrigger asChild>
            <button className={createButtonStyle}>방 만들기</button>
          </DialogTrigger>
          <DialogContent className={dialogContentStyle}>
            <DialogTitle className={dialogTitleStyle}>방 만들기</DialogTitle>
            <DialogDescription className={dialogDescriptionStyle}>
              닉네임을 선택하고 방을 만드세요.
            </DialogDescription>
            <form onSubmit={handleCreate} className={formStyle}>
              <Select.Root onValueChange={setNickName}>
                <Select.Trigger
                  className={selectTriggerStyle}
                  aria-label="닉네임"
                >
                  <Select.Value placeholder="닉네임 선택" />
                  <Select.Icon />
                </Select.Trigger>
                <Select.Content className={selectContentStyle}>
                  <Select.Viewport>
                    <Select.Group>
                      {HAMSURANG_PEOPLE.map((person) => (
                        <Select.Item
                          key={person.username}
                          value={person.name}
                          className={selectItemStyle}
                        >
                          <Select.ItemText>{person.name}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select.Root>
              <input
                type="text"
                placeholder="Host's Peer ID 입력"
                value={peerId}
                onChange={(e) => setPeerId(e.target.value)}
                required
                className={inputStyle}
              />
              <button
                type="submit"
                className={buttonStyle}
                disabled={!nickName.trim() || !peerId.trim()}
              >
                확인
              </button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <button className={joinButtonStyle}>방 참여하기</button>
          </DialogTrigger>
          <DialogContent className={dialogContentStyle}>
            <DialogTitle className={dialogTitleStyle}>방 참여하기</DialogTitle>
            <DialogDescription className={dialogDescriptionStyle}>
              ID와 닉네임을 입력하세요.
            </DialogDescription>
            <form onSubmit={handleJoin} className={formStyle}>
              <input
                type="text"
                placeholder="Host's Peer ID 입력"
                value={hostId}
                onChange={(e) => setHostId(e.target.value)}
                required
                className={inputStyle}
              />
              <Select.Root onValueChange={setNickName}>
                <Select.Trigger
                  className={selectTriggerStyle}
                  aria-label="닉네임"
                >
                  <Select.Value placeholder="닉네임 선택" />
                  <Select.Icon />
                </Select.Trigger>
                <Select.Content className={selectContentStyle}>
                  <Select.Viewport>
                    <Select.Group>
                      {HAMSURANG_PEOPLE.map((person) => (
                        <Select.Item
                          key={person.username}
                          value={person.name}
                          className={selectItemStyle}
                        >
                          <Select.ItemText>{person.name}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select.Root>
              <button
                type="submit"
                className={buttonStyle}
                disabled={!nickName.trim() || !hostId.trim()}
              >
                확인
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HomePage;

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderRadius: '8px',
});

const buttonContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  maxWidth: '300px',
});

const formStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  maxWidth: '300px',
});

const inputStyle = css({
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '16px',
});

const createButtonStyle = css({
  padding: '10px 20px',
  borderRadius: '4px',
  border: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: '#10916C',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#68916C',
  },
});

const joinButtonStyle = css({
  padding: '10px 20px',
  borderRadius: '4px',
  border: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: '#007bff',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

const buttonStyle = css({
  padding: '10px 20px',
  borderRadius: '4px',
  border: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: '#007bff',
  cursor: 'pointer',

  '&:disabled': {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
});

const dialogContentStyle = css({
  backgroundColor: 'white',
  borderRadius: '6px',
  padding: '20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
});

const dialogTitleStyle = css({
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '10px',
});

const dialogDescriptionStyle = css({
  fontSize: '14px',
  color: '#666',
  marginBottom: '20px',
});

const selectTriggerStyle = css({
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  backgroundColor: 'white',
  marginBottom: '10px',
});

const selectContentStyle = css({
  backgroundColor: 'white',
  borderRadius: '4px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginTop: '4px',
  overflow: 'hidden',
});

const selectItemStyle = css({
  padding: '10px',
  fontSize: '16px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
});
