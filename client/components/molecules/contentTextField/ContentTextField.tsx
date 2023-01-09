import { FormControl, FormHelperText } from '@mui/material';
import Input from '../../atoms/input/Input';

const ContentTextField = (props) => {
  return (
    <FormControl sx={{ m: 1, width: "328px" }} variant="outlined">
      <Input
        id="outlined-multiline-flexible"
        label="내용"
        rows={10}
        multiline
        className="h-15.75"
      >
      </Input>
      <FormHelperText id="outlined-multiline-flexible-helper-text">
        전하실 말씀을 입력해주세요
      </FormHelperText>
    </FormControl>
  );
};

export default ContentTextField;