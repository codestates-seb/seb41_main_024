export default interface myQuestionFormType {
  qnaPostApi?: Function;
  qnaPatchApi?: Function;
  defaultFromValue: {
    title: string;
    content: string;
  };
  qnaId?: number;
  successText: string;
  btnSubmitValue: string;
}
