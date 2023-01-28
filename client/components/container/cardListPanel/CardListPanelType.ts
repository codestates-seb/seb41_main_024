import { AxiosResponse } from 'axios';

export default interface CardListPanelType {
  getApi: (page: number, size: number) => Promise<AxiosResponse<any, any>>;
}
