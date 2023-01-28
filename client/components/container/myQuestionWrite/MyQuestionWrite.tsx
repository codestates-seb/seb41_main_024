import postMyQna from '../../../api/postMyQna';
import MyQuestionForm from '../myQuestionForm/myQuestionForm';

const defaultFromValue = {
  title: '',
  content: '',
};

const MyQuestionWrite = () => {
  return (
    <MyQuestionForm
      qnaPostApi={postMyQna}
      defaultFromValue={defaultFromValue}
      successText="문의 등록이 완료되었습니다."
      btnSubmitValue="문의 등록"
    />
  );
};

export default MyQuestionWrite;
