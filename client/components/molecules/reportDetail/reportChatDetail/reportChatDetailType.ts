export interface reportChatDetailType {
  id: number;
  reportId: number
  refetch: Function
  handleGetChatLog: Function;
  handleBlockUser: (nickName:string, reportId:number)=>void;
  handleDeleteReport: ()=>void;
}