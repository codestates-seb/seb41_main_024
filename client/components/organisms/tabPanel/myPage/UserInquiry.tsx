import { useState } from 'react';
import QuestionList from '../../questionList/QuestionList';
import QuestionForm from '../../questionForm/QuestionForm';

const UserInquiry = () => {
  const [isPostQuestion, setIsPostQuestion] = useState<boolean>(false);

  const handleClick = (value: boolean) => {
    setIsPostQuestion(value);
  };

  return (
    <div className="flex flex-col">
      {isPostQuestion && <QuestionForm onClick={() => handleClick(false)} />}
      {!isPostQuestion && <QuestionList onClick={() => handleClick(true)} />}
    </div>
  );
};

export default UserInquiry;
