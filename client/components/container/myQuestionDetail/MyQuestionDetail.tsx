import { Button } from '@mui/material';
import { transDateFullFormat } from '../../../utils/transDateFormat/transDateFormat';
import MyQuestionListType from './MyQuestionDetailType';

const MyQuestionDetail = ({
  question,
  handleClickEdit,
}: MyQuestionListType) => {
  return (
    <div className="flex flex-col justify-center ani_fadeIn py-[2.5rem] px-[1rem]">
      <div>
        <strong className="block font-normal text-2xl break-all">
          {question.title}
        </strong>
        <span className="flex flex-col w-full text-gray-400 text-right text-xs mt-[1.25rem]">
          <span>작성일 : {transDateFullFormat(question.createDate)}</span>
          {question.modifiedAt && (
            <span>수정일 : {transDateFullFormat(question.modifiedAt)}</span>
          )}
        </span>
        <p className="break-all mt-[1.875rem]">{question.content}</p>
        <div className="mt-[2.5rem] text-right">
          <Button
            variant="contained"
            onClick={() => handleClickEdit(question.qnaId)}
          >
            수정하기
          </Button>
        </div>
      </div>

      {question.qnaStatus === 'ANSWERED' && (
        <div className="mt-[2.5rem] pt-[2.5rem] border-t border-b-0 border-r-0 border-l-0 border-solid border-stone-300">
          <strong className="text-primary">관리자 답변</strong>
          <ul>
            {question.answers.map((answer) => {
              return (
                <li
                  key={answer.answerId}
                  className="mt-[1.25rem] pb-[1.25rem] border-t-0 border-b border-r-0 border-l-0 border-solid border-stone-200"
                >
                  <strong className="font-normal text-[1.125rem]">
                    {answer.title}
                  </strong>
                  <p>{answer.content}</p>
                  <span className="block text-gray-400 text-right text-xs">
                    {transDateFullFormat(answer.createDate)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyQuestionDetail;
