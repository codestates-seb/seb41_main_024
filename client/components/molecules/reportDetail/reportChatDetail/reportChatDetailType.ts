export interface reportChatDetailType {
  id: number;
  token: {Authorization : string | undefined};
  handleGetChatLog: Function;
  handleBlockUser: (nickName:string)=>void;
  handleDeleteReport: ()=>void;
}