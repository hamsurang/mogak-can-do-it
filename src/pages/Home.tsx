import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import usePeerConnection from '../hooks/usePeerConnection';

const HomePage: React.FC = () => {
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
    <div>
      <p>내 peerId: {peer?.id || 'loading..'}</p>
      <form onSubmit={handleJoin}>
        <input
          type="text"
          placeholder="Host's Peer ID 입력"
          value={hostId}
          onChange={(e) => setHostId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="닉네임 입력"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          required
        />
        <button type="submit">확인</button>
      </form>
    </div>
  );
};

export default HomePage;
