import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { chatFormType } from './chatFormType';

const ChatForm = ({onSubmit, onChange, value}:chatFormType) => {
  return (
    <form className="flex p-[1rem]" onSubmit={onSubmit}>
      <div className="flex-1">
        <TextField value={value} size="medium" autoComplete="off" className="w-full" onChange={onChange}/>
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
  )
}

export default ChatForm;