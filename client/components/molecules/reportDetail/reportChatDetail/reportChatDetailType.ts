export interface reportChatDetailType {
  id: number;
  handleGetChatLog: Function;
  handleBlockUser: (nickName:string)=>void;
  handleDeleteReport: ()=>void;
}