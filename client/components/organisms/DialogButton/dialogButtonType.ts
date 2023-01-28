export interface dialogButtonType {
  name: string;
  title: string;
  question?: string;
  func: (pram?:any) => void;
}