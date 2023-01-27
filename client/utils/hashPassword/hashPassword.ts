import postSignup from '../../api/postSignup';

interface userInfoType {
  email: string;
  pw: string;
  phoneNumber: string;
  nickName: string;
}
const bcrypt = require('bcryptjs');
export const hashPassword = async (
  formValue: userInfoType,
  message: string
) => {
  bcrypt.genSalt(10, function (err: any, salt: number) {
    bcrypt.hash(formValue.pw, salt, async function (err: any, hash: string) {
      // Store hash in your password DB.
      console.log(hash);

      /* const requestResult = await postSignup({ ...formValue, pw: hash });///
      if (requestResult.status === 201) {
        alert(message);
      } */
    });
  });
};
