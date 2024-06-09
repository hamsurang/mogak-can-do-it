import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@radix-ui/react-dialog';
import { Button } from '@radix-ui/themes';
import usePeerConnection from '../hooks/usePeerConnection';
import { TimeModal } from '../components/TimeModal';
import { css } from '../../styled-system/css';

const HomePage = () => {
  const navigate = useNavigate();
  const { peer, connectToPeer } = usePeerConnection();
  const [nickName, setNickName] = useState('');
  const [peerId, setPeerId] = useState('');
  const [hostId, setHostId] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickName.trim() && peerId.trim()) {
      connectToPeer(hostId, nickName, () => {
        navigate(`/mogak?nickName=${nickName}&peerId=${peerId}`);
      });
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
            <Button className={createButtonStyle}>방 만들기</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>방 만들기</DialogTitle>
            <DialogDescription>모각코 시간을 설정하세요.</DialogDescription>
            <TimeModal onSubmit={(startTime, endTime) => {}} />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className={joinButtonStyle}>방 참여하기</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>방 참여하기</DialogTitle>
            <DialogDescription>ID와 닉네임을 입력하세요.</DialogDescription>
            <form onSubmit={handleJoin} className={formStyle}>
              <input
                type="text"
                placeholder="Host's Peer ID 입력"
                value={hostId}
                onChange={(e) => setHostId(e.target.value)}
                required
                className={inputStyle}
              />
              <input
                type="text"
                placeholder="닉네임 입력"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                required
                className={inputStyle}
              />
              <button type="submit" className={buttonStyle}>
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
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
  backgroundColor: '#dc3545',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#c82333',
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
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});
