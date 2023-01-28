import {
  Button,
  FormControl,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import Input from '../../atoms/input/Input';
import CircleLoading from '../../organisms/circleLoading/CircleLoading';
import SadErrorBox from '../../organisms/sadErrorBox/SadErrorBox';
import myQuestionFormType from './myQuestionFormType';

const myQuestionForm = ({
  qnaPostApi,
  qnaPatchApi,
  defaultFromValue,
  qnaId,
  successText,
  btnSubmitValue,
}: myQuestionFormType) => {
  const [formValue, setFormValue] = useState(defaultFromValue);
  const [loading, setLoading] = useState(false);
  const [isGetError, setIsGetError] = useState(false);
  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      qnaPostApi && (await qnaPostApi(formValue));
      qnaPatchApi && (await qnaPatchApi(formValue, qnaId));
      alert(successText);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      setIsGetError(true);
      console.log(`다음과 같은 오류 ${error}가 발생했습니다:`);
    }
  };

  return (
    <div className="pb-[5rem]">
      {loading ? (
        <CircleLoading message="잠시만 기다려 주세요." />
      ) : (
        !isGetError && (
          <div className="flex justify-center mt-7 ani_fadeIn">
            <form
              onSubmit={onSubmitHandler}
              className="flex flex-col justify-center w-10/12 max-w-lg"
            >
              <FormControl className="mt-4">
                <Input
                  id="title-input"
                  name="title"
                  type="text"
                  label="제목"
                  value={formValue.title}
                  required={true}
                  onChange={onChange}
                />
                <FormHelperText id="title-input-helper-text">
                  제목을 입력해주세요.
                </FormHelperText>
              </FormControl>
              <FormControl className="mt-4" variant="outlined">
                <Input
                  id="outlined-multiline-flexible"
                  name="content"
                  label="내용"
                  rows={10}
                  multiline
                  className="h-15.75"
                  value={formValue.content}
                  onChange={onChange}
                  required={true}
                ></Input>
                <FormHelperText id="outlined-multiline-flexible-helper-text">
                  전하실 말씀을 입력해주세요
                </FormHelperText>
              </FormControl>
              <Button
                type="submit"
                className="h-14 w-80 my-6 mx-auto"
                variant="contained"
              >
                {btnSubmitValue}
              </Button>
            </form>
          </div>
        )
      )}
      {isGetError && <SadErrorBox />}
    </div>
  );
};

export default myQuestionForm;
