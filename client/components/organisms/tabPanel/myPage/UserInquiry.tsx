import { useState } from 'react';
import QuestionList from '../../questionList/QuestionList';
import QuestionForm from '../../questionForm/QuestionForm';

const UserInquiry = () => {
  const [isPostQuestion, setIsPostQuestion] = useState<boolean>(false);

  const handleClick = (value: boolean) => {
    setIsPostQuestion(!isPostQuestion);
  };

  return (
    <div className="flex flex-col">
      {isPostQuestion && <QuestionForm onClick={handleClick} />}
      {!isPostQuestion && <QuestionList onClick={handleClick} />}
    </div>
  );
};

export default UserInquiry;
