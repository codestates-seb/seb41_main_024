import { transDateFullFormat } from '../../../utils/transDateFormat/transDateFormat';
import MyQuestionListType from './MyQuestionListType';

const MyQuestionList = ({
  questionList,
  handleClickgoDetail,
}: MyQuestionListType) => {
  return (
    <ul className="w-full mx-auto p-[0.625rem] ani_fadeIn">
      {questionList.map((qitem) => {
        return (
          <li key={qitem.qnaId} className="p-[0.625rem]">
            <button
              onClick={() => handleClickgoDetail(qitem.qnaId)}
              className="block border-t-0 border-b border-r-0 border-l-0 border-solid border-stone-300 pb-[0.625rem] text-left w-full"
            >
              <strong className="font-normal text-base ">{qitem.title}</strong>
              <p className="pt-[0.5rem] text-xs text-[#777] h-[2.5rem] text-ellipsis overflow-hidden line_clamp2">
                {qitem.content}
              </p>
              <span className="flex justify-between mt-[0.5rem] text-xs">
                {qitem.qnaStatus === 'ANSWERED' ? (
                  <span className="text-[#2EB150]">답변 완료</span>
                ) : (
                  <span className="text-[#F8719D]">확인 중</span>
                )}

                <span className="flex flex-col text-gray-400">
                  <span>작성일 : {transDateFullFormat(qitem.createDate)}</span>
                  {qitem.modifiedAt && (
                    <span>
                      수정일 : {transDateFullFormat(qitem.modifiedAt)}
                    </span>
                  )}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default MyQuestionList;
