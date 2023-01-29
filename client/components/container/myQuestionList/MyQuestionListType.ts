import { questionType } from '../inquiryListPanel/InquiryListPanelType';

export default interface MyQuestionListType {
  questionList: questionType[];
  handleClickgoDetail: Function;
}
