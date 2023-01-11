import List from '@mui/material/List';
import QuestionListItem from '../questionListItem/QuestionListItem';
import FormButton from '../../../components/atoms/formbutton/FormButton';

interface QuestionFormProps {
  onClick: (value: boolean) => void;
}
const QuestionList = ({ onClick }: QuestionFormProps) => {
  return(
    <>
      <List className="overflow-auto m-auto" sx={{ width: '395px', height: '720px' , bgcolor: 'background.paper'}}>
      {/* {데이터.map <QuestionListItem />} */}
        <QuestionListItem />
      </List>
      <FormButton 
        className='h-14 w-80 my-6 mx-auto' 
        variant='contained' 
        content='문의 등록하기' 
        onClick={onClick}
      />
    </>
  )
}

export default QuestionList;