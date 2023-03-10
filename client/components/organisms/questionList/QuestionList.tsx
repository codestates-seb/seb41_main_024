import List from '@mui/material/List';
import QuestionListItem from '../questionListItem/QuestionListItem';
import FormButton from '../../molecules/formbutton/FormButton';
import { MouseEventHandler } from 'react';

interface QuestionFormProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
const QuestionList = ({ onClick }: QuestionFormProps) => {
  return (
    <>
      <List
        className="overflow-auto m-auto"
        sx={{ height: '720px', bgcolor: 'background.paper' }}
      >
        {/* {데이터.map <QuestionListItem />} */}
        <QuestionListItem />
      </List>
      <FormButton
        className="h-14 w-80 my-6 mx-auto"
        variant="contained"
        content="문의 등록하기"
        onClick={onClick}
      />
    </>
  );
};

export default QuestionList;
