export interface passwordTextFieldPropsType {
  id: string;
  label: string;
  name?: string;
  type?: string;
  value? : string | number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
