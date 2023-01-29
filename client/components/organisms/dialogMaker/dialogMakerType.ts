export interface dialogMakerType {
  name: string;
  title: string;
  question?: string;
  func: (pram?: any) => void;
}
