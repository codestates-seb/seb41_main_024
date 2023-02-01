import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider, Pagination, Stack } from '@mui/material';

import { FormEvent, Fragment, MouseEvent, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getQuestions, handleAnswerQuestion } from '../../../api/admin';
import useInput from '../../../hooks/addNewHooks/useInput';
import Input from '../../atoms/input/Input';
import FormButton from '../../molecules/formbutton/FormButton';
import CircleLoading from '../../organisms/circleLoading/CircleLoading';
import {transDateFullFormat} from '../../../utils/transDateFormat/transDateFormat'


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
  }[];
}

const AnswerWork = () => {
  const { inputValue, onChange, setInputValue } = useInput({
    content: '',
    title: '',
    productsLink: '',
    category: '',
    maxNum: 0,
    deadLine: '',
  });
  const [questions, setQuestions] = useState([])
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    size: 10,
    totalElements: 0,
    totalPages: 1
  });

  const {data, isSuccess, refetch} = useQuery(['questions', pageInfo.page], () => getQuestions(pageInfo.page), 
  {
    keepPreviousData : true
  });

  useEffect(() => {
      if(isSuccess) {
        setQuestions(data.data.data);
        setPageInfo(data.data.pageInfo);
      }
  }, [pageInfo.page, data])

  const answerMutation = useMutation(handleAnswerQuestion, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleAnswer = async (
    qnaId: number,
    content: any,
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault;
    await answerMutation.mutate({ qnaId, content });
    setInputValue({
      content: '',
      title: '',
      productsLink: '',
      category: '',
      maxNum: 0,
      deadLine: '',
    })
  };

  return (
      <div className="flex flex-col text-center">
        {!isSuccess && <CircleLoading message="잠시만 기다려 주세요." />}
        {isSuccess && questions && (
          <>
            <div className="h-[calc(100vh-338px)] overflow-x-hidden overflow-scroll">
              <ul>
                {[...questions].reverse().map((qna: qnaType) => {
                    return (
                      <li key={qna.qnaId} className="mb-1">
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className="text-left">
                              <span>{qna.title}</span>
                              <span className="flex text-xs">
                                <span className="text-gray-400">
                                  <span>작성일 : {transDateFullFormat(qna.createDate)}</span>
                                </span>
                              </span> 
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Divider className="mb-5" />
                            <p className="mb-2 text-xs text-left text-gray-400">문의 내용</p>
                            <p className="text-left">{qna.content}</p>
                            <Divider className="my-5" />
                            {qna.qnaStatus === 'ANSWERED' && (
                              <Fragment>
                                <p className="mb-2 text-xs text-left text-gray-400">답변 내용</p>
                                <p className="text-left">{qna.answers[0].content}</p>
                              </Fragment>
                            )}
                            {qna.qnaStatus === 'NO_ANSWER' && (
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
                                  <FormButton
                                    className="mt-2"
                                    content="작성하기"
                                    variant="contained"
                                    onClick={(event) =>
                                      handleAnswer(qna.qnaId, inputValue.content, event)
                                    }
                                  />
                                </form>
                              </Fragment>
                            )}
                          </AccordionDetails>
                        </Accordion>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="flex justify-center">
              <Stack spacing={2}>
                <Pagination
                  count={pageInfo.totalPages}
                  page={pageInfo.page}
                  color="primary"
                  onChange={(event, value) => {
                    console.log(pageInfo, value)
                    setPageInfo((prevState) => {
                      return {...prevState, page: value}
                    });
                  }}
                />
              </Stack>
            </div>
          </>
      )
    }
  </div>
  )
};

export default AnswerWork;
