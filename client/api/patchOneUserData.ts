import axios from 'axios';

const patchOneUserData = (formValue) => {
  return () =>
    axios.patch(
      `${process.env.NEXT_PUBLIC_URL_API}/members/patch`,
      JSON.stringify(formValue),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${process.env.NEXT_PUBLIC_TOKEN_AUTHOR}`,
        },
      }
    );
};

export default patchOneUserData;
