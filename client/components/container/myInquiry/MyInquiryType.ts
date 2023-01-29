export interface inquiryViewType {
  list: boolean;
  detail: boolean;
  edit: boolean;
}
export interface inquiryViewStateType {
  inquiryView: inquiryViewType;
  setInquiryView: React.Dispatch<React.SetStateAction<inquiryViewType>>;
}
