export interface dialogMakerType {
  name: string;
  title: string;
  question?: string;
  className?: string | "";
  variant?: "text" | "outlined" | "contained" | undefined;
  func: (pram?: any) => void;
}
