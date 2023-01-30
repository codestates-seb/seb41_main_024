export interface defaultPagingType {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface answerType {
  answerId: number;
  memberId: number;
  qnaId: number;
  nickName: string;
  title: string;
  content: string;
  createDate: string;
}

export interface questionType {
  qnaId: number;
  memberId: number;
  nickName: string;
  title: string;
  content: string;
  createDate: string;
  modifiedAt?: string;
  qnaStatus: string;
  answers: answerType[] | [];
}
