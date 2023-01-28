import patchMyQna from '../../../api/patchMyQna';
import { questionType } from '../inquiryListPanel/InquiryListPanelType';
import MyQuestionForm from '../myQuestionForm/myQuestionForm';

const MyQuestionEdit = ({ question }: { question: questionType }) => {
  const defaultFromValue = {
    title: question.title,
    content: question.content,
  };

  const qnaId = question.qnaId;

  return (
    <MyQuestionForm
      qnaPatchApi={patchMyQna}
      defaultFromValue={defaultFromValue}
      qnaId={qnaId}
      successText="문의 수정이 완료되었습니다."
      btnSubmitValue="문의 수정"
    />
  );
};

export default MyQuestionEdit;
