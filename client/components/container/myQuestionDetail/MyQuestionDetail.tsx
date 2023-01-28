import { Button } from '@mui/material';
import MyQuestionListType from './MyQuestionDetailType';

const MyQuestionDetail = ({
  question,
  handleClickEdit,
}: MyQuestionListType) => {
  return (
    <div className="flex flex-col justify-center ani_fadeIn py-[40px] px-[16px]">
      <div>
        <strong className="block font-normal text-2xl break-all">
          {question.title}
        </strong>
        <span className="block text-gray-400 text-right text-xs mt-20px]">
          <span>작성일 : 2023-01-25</span>
          <span>수정일 : 2023-01-25</span>
        </span>
        <p className="break-all mt-[30px]">{question.content}</p>
        <div className="mt-[40px] text-right">
          <Button
            variant="contained"
            onClick={() => handleClickEdit(question.qnaId)}
          >
            수정하기
          </Button>
        </div>
      </div>

      <div className="mt-[40px] pt-[40px] border-t border-b-0 border-r-0 border-l-0 border-solid border-stone-300">
        <strong className="text-primary">관리자 답변</strong>
        <p className="mt-[20px]">{question.qnaStatus}</p>
      </div>
    </div>
  );
};

export default MyQuestionDetail;
