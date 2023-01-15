import Input from '../../../components/atoms/input/Input';
import ContentTextField from '../../../components/molecules/contentTextField/ContentTextField';
import FormButton from '../../../components/atoms/formbutton/FormButton';
import { FormControl , FormHelperText } from '@mui/material';

interface QuestionFormProps {
  onClick: (value: boolean) => void;
}
const QuestionForm = ({ onClick }: QuestionFormProps) => {
  // useState? useRef? reacthookform?
  // axios 보내주실 분이 결정해주세요!!
  return(
    <div className="flex justify-center mt-7">
      <form className="flex flex-col justify-center w-10/12 max-w-lg">
        <FormControl className="mt-4">
          <Input 
            id={'title-input'}
            name="title"
            type={'text'} 
            label={'제목'} 
          />
          <FormHelperText id="title-input-helper-text">
            전하실 말씀을 입력해주세요
          </FormHelperText>
        </FormControl>
        <ContentTextField />
        <FormButton 
          className="h-14 w-80 my-6 mx-auto" 
          variant="contained"
          content="문의 등록"
          onClick={onClick}
        />
      </form>
    </div>
  )
}

export default QuestionForm;