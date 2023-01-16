import { useState } from 'react';

interface UseForm {
  formValue: any;
  checkedPw: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const useForm = (initialData: {}): UseForm => {
  const [formValue, setFormValue] = useState(initialData);
  const [checkedPw, setCheckedPw] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if(name === "checkedPw") setCheckedPw(value);
    setFormValue({
      ...formValue,
      [name]: value
    });
    console.log(formValue)
  };

  return { formValue, checkedPw, handleInputChange };
};

export default useForm;