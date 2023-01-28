import { questionType } from '../inquiryListPanel/InquiryListPanelType';

export default interface MyQuestionListType {
  question: questionType;
  handleClickEdit: Function;
}
