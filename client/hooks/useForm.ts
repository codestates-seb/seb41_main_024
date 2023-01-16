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
    if(name === 'checkedPw') setCheckedPw(value);
    if(name === 'phoneNumber') {
      setFormValue({
        ...formValue,
        // 전화번호 타입에 맞춰 알아서 - 를 붙혀주는 식입니다.
        [name] : value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
      })
    } 
    else {
      setFormValue({
        ...formValue,
        [name]: value
      });
    }
  };

  return { formValue, checkedPw, handleInputChange };
};

export default useForm;