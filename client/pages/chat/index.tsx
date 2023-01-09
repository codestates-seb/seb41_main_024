import axios from 'axios';
import React, { useState } from 'react';

const Chat = (props) => {
  const [chatData, setChatData] = useState({
    roomName: '',
    chatRooms: [],
  });
  const findAllRoom = async () => {
    axios.get('/chat/rooms').then((response) => {
      setChatData({ ...chatData, chatRooms: response.data });
    });
  };
  const createRoom = async () => {
    if ('' === chatData.roomName) {
      alert('방 제목을 입력해 주십시요.');
      return;
    } else {
      const params = new URLSearchParams();
      params.append('name', chatData.roomName);
      axios
        .post('/chat/room', params)
        .then((response) => {
          alert(response.data.roomName + '방 개설에 성공하였습니다.');
          chatData.roomName = '';
          findAllRoom();
        })
        .catch((response) => {
          alert('채팅방 개설에 실패하였습니다.');
        });
    }
  };
  const enterRoom = async (roomId) => {
    const sender = prompt('대화명을 입력해 주세요.');
    if (sender !== '') {
      localStorage.setItem('wschat.sender', sender);
      localStorage.setItem('wschat.roomId', roomId);
      location.href = '/chat/room/enter/' + roomId;
    }
  };

  return (
    <div>
      {' '}
      <div>
        <div>
          <div>
            <h3>채팅방 리스트</h3>
          </div>
        </div>
        <div>
          <div>
            <label>방제목</label>
          </div>
          <input
            type="text"
            onKeyUp={(e) => {
              if (e.key === 'Enter') return createRoom();
            }}
          />
          <div>
            <button type="button" onClick={createRoom}>
              채팅방 개설
            </button>
          </div>
        </div>
        <ul>
          <li onClick={enterRoom}>
            {chatData?.map((item) => (
              <span>{item.roomName}</span>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Chat;
