export interface chatFormType {
  onSubmit: (e:React.FormEvent<HTMLFormElement>) => void
  onChange: (e:React.ChangeEvent<HTMLTextAreaElement>) => void
}