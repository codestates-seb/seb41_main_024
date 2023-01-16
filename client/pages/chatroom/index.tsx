import ChatHeader from '../../components/organisms/headers/chatHedaer/ChatHeader';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import ChatGroup from '../../components/organisms/chatGroup/ChatGroup';
import chatDummy from './dataChat';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import StompJS from 'stompjs';

const Chatroom = () => {  
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [stompClient, setStompClient] = useState<StompJS.Client | null>(null)

  useEffect(() => {
    const sockjs = new SockJS('http://localhost:8080/chat/')
    const stompClient = StompJS.over(sockjs)
    setStompClient(stompClient)

    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/messages', (message) => {
        setMessages((prev) => [...prev, message.body])
      })
    }, (error) => {
      console.log(error)
    })
  }, [])

  const onChangeInput =  (e: React.ChangeEvent<HTMLTextAreaElement>) => { 
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(stompClient){
      stompClient.send('/app/message', {}, input)
      setInput('')
    }
  }


  return (
    <div className="max-w-2xl my-0 mx-auto">
      <ChatHeader />
      <div className="bg-primary pt-[8.125rem] pb-[7.5rem] min-h-[calc(100vh-121px)]">
        <div className="flex justify-center my-9 mx-0">
          <strong className="inline-block py-[0.5rem] px-[1.25rem] bg-[rgba(217,217,217,0.3)] text-[#fff] font-normal leading-4 rounded">
            2023년 1월 5일 목요일
          </strong>
        </div>
        <ChatGroup chatData={chatDummy} />
      </div>

      <div className="fixed bottom-0 left-2/4 translate-x-[-50%] max-w-2xl w-full bg-white">
        <form className="flex p-[1rem]">
          <div className="flex-1">
            <TextField size="medium" autoComplete="off" className="w-full" onChange={onChangeInput}/>
          </div>
          <div className="flex justify-center pl-[1rem]">
            <IconButton
              aria-label="send"
              className="rounded-full bg-primary w-[3.125rem] h-[3.125rem] text-white self-center hover:"
              sx={{
                '&:hover, &.Mui-focused': {
                  bgcolor: (theme) => theme.palette.primary.main,
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatroom;
