import { useState, useEffect } from 'react';

interface RegexTextProps {
  state: string;
  regex: RegExp | string;
  text: { default: string; match: string; unMatch: string };
}

const useRegexText = ({ state, regex, text }: RegexTextProps): string => {
    const [regexText, setRegexText] = useState(text.default);
  
    useEffect(() => {
      if (regex instanceof RegExp)  {
        if (state !== '' && !regex.test(state)) {
          setRegexText(text.unMatch);
        } 
        else if (state !== '' && regex.test(state)){
          setRegexText(text.match);
        }
      }

      else if (typeof regex === 'string') {
        if (state !== '' && regex !== '' && state !== regex) {
          setRegexText(text.unMatch);
        } 
        else if (state !== '' && regex !== '' && state === regex) {
          setRegexText(text.match);
        }
      }
    }, [state, regex, text]);
  
    return regexText;
};

export default useRegexText;