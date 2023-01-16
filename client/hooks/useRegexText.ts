import { useState, useEffect } from 'react';

interface RegexTextProps {
  state: string;
  regex?: RegExp;
  text: { default: string; match: string; unMatch: string };
  checkPassword?: string
}

const useRegexText = ({ state, regex, text, checkPassword }: RegexTextProps): string => {
    const [regexText, setRegexText] = useState(text.default);
  
    useEffect(() => {
      if (regex instanceof RegExp && state !== '')  {
        if (!regex.test(state)) {
          setRegexText(text.unMatch);
        } 
        else if (regex.test(state)){
          setRegexText(text.match);
        }
      }

      else if (state !== '' && checkPassword !== '') {
        if (state !== checkPassword) {
          setRegexText(text.unMatch);
        } 
        else if (state === checkPassword) {
          setRegexText(text.match);
        }
      }
    }, [state, regex, text, checkPassword]);
  
    return regexText;
};

export default useRegexText;