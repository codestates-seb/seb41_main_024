import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider } from '@mui/material';
import Input from '../../../atoms/input/Input';
import useInput from '../../../../hooks/addNewHooks/useInput';

const DUMMY_REPORT = {
  data: [
    {
      "qnaId": 3,
      "title": "이런거 이렇게 하면 어떨까요?",
      "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "createDate": "2023-01-25T05:58:11.464749",
      "modifiedAt": "2023-01-25T06:09:05.434932",
      "qnaStatus": "NO_ANSWER"
    },
    {
      "qnaId": 5,
      "title": "엔게더 너무 조아용~",
      "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "createDate": "2023-01-25T06:12:30.329162",
      "modifiedAt": "2023-01-25T06:12:30.32917",
      "qnaStatus": "NO_ANSWER"
    }
  ]
}

const AnswerWork = () => {
  const { inputValue, onChange } = useInput({content: ''});

  return(
    <div className='flex flex-col text-center'>
      <ul>
      {DUMMY_REPORT.data.map((qna) => {
            return (
              <li key={qna.qnaId} className='mb-2'>
                <Accordion >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{qna.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p className='text-left'>{qna.content}</p>
                    <Divider className='my-5'/>
                    <Input
                      variant="outlined"
                      id="content"
                      name="content"
                      label="문의에 대한 답변을 작성해주세요"
                      value={inputValue.content}
                      onChange={onChange}
                      rows={8}
                      multiline
                      className="w-[100%]"
                    />
                  </AccordionDetails>
                </Accordion>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default AnswerWork;