import React from "react";

const Signup = (props) => {
  return (
    <div>
      <div>회원가입</div>
      <label htmlFor="email">email </label>
      <input id="email"></input>
      <label htmlFor="password">password </label>
      <input id="password"></input>
      <label htmlFor="passwordConfirm">password 확인 </label>
      <input id="passwordConfirm"></input>
    </div>
  );
};

export default Signup;
