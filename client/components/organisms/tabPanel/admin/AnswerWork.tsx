import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider } from '@mui/material';
import Input from '../../../atoms/input/Input';
import useInput from '../../../../hooks/addNewHooks/useInput';
import FormButton from '../../../molecules/formbutton/FormButton';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { getQuestions } from '../../../../api/admin';

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

const DUMMY_REPORT = {
  data: [
    {
        "qnaId": 1,
        "memberId": 1,
        "nickName": "배고파",
        "title": "qna test",
        "content": "qna test content",
        "createDate": "2023-01-27T23:33:47.446939",
        "qnaStatus": "ANSWERED",
        "answers": [
            {
                "answerId": 1,
                "memberId": 3,
                "qnaId": 1,
                "nickName": "admin",
                "title": "답변: qna test",
                "content": "answer test 1",
                "createDate": "2023-01-27T23:34:42.098385"
            },
            {
                "answerId": 2,
                "memberId": 3,
                "qnaId": 1,
                "nickName": "admin",
                "title": "답변: qna test",
                "content": "answer test 2",
                "createDate": "2023-01-27T23:34:47.871833"
            }
        ]
    },
    {
        "qnaId": 2,
        "memberId": 36,
        "nickName": "hahaha",
        "title": "qna test hahaha",
        "content": "qna test content",
        "createDate": "2023-01-27T23:44:22.694474",
        "qnaStatus": "NO_ANSWER",
        "answers": []
    },
    {
        "qnaId": 3,
        "memberId": 36,
        "nickName": "hahaha",
        "title": "qna test hahaha 2",
        "content": "qna test content",
        "createDate": "2023-01-27T23:44:28.573644",
        "qnaStatus": "NO_ANSWER",
        "answers": []
    }
  ]
}

const AnswerWork = () => {
  const { inputValue, onChange } = useInput({content: ''});
  const [questions, setQuestions] = useState([])
  const {data, isSuccess} = useQuery(['questions'], getQuestions);

  useEffect(()=>{
    setQuestions(data?.data)
  }, [data])

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
                    <FormButton className='mt-2' content="작성하기" variant="contained"/>
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