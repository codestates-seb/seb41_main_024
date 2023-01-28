import MyQuestionListType from './MyQuestionListType';

const MyQuestionList = ({
  questionList,
  handleClickgoDetail,
}: MyQuestionListType) => {
  return (
    <ul className="max-w-[410px] mx-auto py-[10px] ani_fadeIn">
      {questionList.map((qitem) => {
        return (
          <li key={qitem.qnaId} className="p-[10px]">
            <button
              onClick={() => handleClickgoDetail(qitem.qnaId)}
              className="block border-t-0 border-b border-r-0 border-l-0 border-solid border-stone-300 pb-[10px] text-left w-full"
            >
              <strong className="font-normal text-base ">{qitem.title}</strong>
              <p className="pt-[8px] text-xs text-[#777] h-[40px] text-ellipsis overflow-hidden line_clamp2">
                {qitem.content}
              </p>
              <span className="flex justify-between mt-[8px] text-xs">
                <span className="text-[#F8719D]">{qitem.qnaStatus}</span>
                <span className="text-gray-400">
                  {/* <span>작성일 : {qitem.createDate}</span>
                    <span>수정일 : {qitem.modifiedAt}</span> */}
                  <span>작성일 : 2023-01-25</span>
                  <span>수정일 : 2023-01-25</span>
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
