/* eslint-disable @typescript-eslint/no-shadow */
import type { DataConnection } from 'peerjs';
import Peer from 'peerjs';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  nickName: string;
  confirmed: boolean;
}

interface AttendancePayload {
  type: 'attendance';
  payload: string;
}

interface ConfirmPayload {
  type: 'confirm';
  payload: {
    nickName: string;
  };
}

type RtcPayload = AttendancePayload | ConfirmPayload;

const usePeerConnection = () => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [connections, setConnections] = useState<DataConnection[]>([]);
  const [attendance, setAttendance] = useState<string[]>([]);
  const [connectedPeers, setConnectedPeers] = useState<User[]>([]);

  useEffect(() => {
    const newPeer = new Peer();
    newPeer.on('open', () => {
      setPeer(newPeer);
    });
    newPeer.on('connection', (conn: DataConnection) => {
      conn.on('data', (data: unknown) => {
        const payload = data as RtcPayload;
        if (payload.type === 'attendance') {
          setAttendance((prev) => [...prev, payload.payload]);
        } else if (payload.type === 'confirm') {
          setConnectedPeers((prev) =>
            prev.map((peer) =>
              peer.nickName === payload.payload.nickName
                ? { ...peer, confirmed: true }
                : peer,
            ),
          );
        }
      });

      conn.on('open', () => {
        console.log(`Connection established with peer: ${conn.peer}`);
      });

      setConnections((prev) => [...prev, conn]);
    });

    return () => {
      newPeer.destroy();
    };
  }, []);

  const sendAttendance = (time: string) => {
    connections.forEach((conn) => {
      conn.send({ type: 'attendance', payload: time });
    });
    setAttendance((prev) => [...prev, time]);
  };

  const confirmAttendance = (nickName: string) => {
    connections.forEach((conn) => {
      conn.send({ type: 'confirm', payload: { nickName } });
    });
    setConnectedPeers((prev) =>
      prev.map((peer) =>
        peer.nickName === nickName ? { ...peer, confirmed: true } : peer,
      ),
    );
  };

  const connectToPeer = (
    peerId: string,
    nickName: string,
    onSuccess: () => void,
  ) => {
    const conn = peer?.connect(peerId);
    if (conn) {
      conn.on('open', () => {
        console.log(`Connected to peer: ${peerId}`);
        conn.send({ type: 'join', payload: { nickName } });
        setConnectedPeers((prev) => [
          ...prev,
          { id: peerId, nickName, confirmed: false },
        ]);
        onSuccess(); // 연결 성공 시 콜백 호출
      });

      conn.on('data', (data: unknown) => {
        const payload = data as RtcPayload;
        if (payload.type === 'attendance') {
          setAttendance((prev) => [...prev, payload.payload]);
        } else if (payload.type === 'confirm') {
          setConnectedPeers((prev) =>
            prev.map((peer) =>
              peer.nickName === payload.payload.nickName
                ? { ...peer, confirmed: true }
                : peer,
            ),
          );
        }
      });
    }
  };

  return {
    peer,
    attendance,
    connectedPeers,
    sendAttendance,
    confirmAttendance,
    connectToPeer,
  };
};

export default usePeerConnection;
