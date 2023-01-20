export interface chatFormType {
  value: string;
  onSubmit: (e:React.FormEvent<HTMLFormElement>) => void
  onChange: (e:React.ChangeEvent<HTMLTextAreaElement>) => void
}