import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider } from '@mui/material';
import Input from '../../../atoms/input/Input';
import useInput from '../../../../hooks/addNewHooks/useInput';
import FormButton from '../../../molecules/formbutton/FormButton';
import { FormEvent, Fragment, MouseEvent, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getQuestions, handleAnswerQuestion } from '../../../../api/admin';

interface qnaType {
  qnaId: number;
  memberId: number;
  nickName: string;
  title: string;
  content: string;
  createDate: string;
  qnaStatus: string;
  answers: {
    answerId: number;
    memberId: number;
    qnaId: number;
    nickName: string;
    title: string;
    content: string;
    createDate: string;
  }[]
}

const AnswerWork = () => {
  const { inputValue, onChange } = useInput({content: ''});
  const [questions, setQuestions] = useState([])
  const {data, isSuccess, refetch} = useQuery(['questions'], getQuestions);

  const answerMutation = useMutation(handleAnswerQuestion, {
    onSuccess: () => {
      refetch();
    }
  });

  useEffect(()=>{
    setQuestions(data?.data)
  }, [data])

  const handleAnswer = async (qnaId: number, content:any, event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> ) => {
    event.preventDefault
    await answerMutation.mutate({qnaId, content});
  }

  return(
    <div className='flex flex-col text-center'>
      <ul>
        {isSuccess 
        && questions?.map((qna:qnaType) => {
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
                  <Divider className='mb-5'/>
                  <p className='mb-2 text-xs text-left'>문의 내용</p>
                  <p className='text-left'>{qna.content}</p>
                  <Divider className='my-5'/>
                  
                  {qna.qnaStatus === "ANSWERED" 
                  &&
                  <Fragment>
                    <p className='mb-2 text-xs text-left'>답변 내용</p> 
                    <p className='text-left'>{qna.answers[0].content}</p>
                  </Fragment>
                  }
                  {qna.qnaStatus === "NO_ANSWER"
                  &&
                  <Fragment>
                    <form>
                      <Input
                        variant="outlined"
                        id="content"
                        name="content"
                        label="문의에 대한 답변을 작성해주세요"
                        value={inputValue.content}
                        onChange={onChange}
                        rows={4}
                        multiline
                        className="w-[100%]"
                      />
                      <FormButton className="mt-2" content="작성하기" variant="contained" onClick={(event) => handleAnswer(qna.qnaId, inputValue.content, event)}/>
                    </form>
                  </Fragment> 
                  }
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