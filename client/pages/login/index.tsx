import styled from "styled-components";
const Container = styled.div`
  color: pink;
`;
const Login = () => {
  return (
    <div>
      <Container>로그인</Container>
      <label htmlFor="email">email </label>
      <input id="email"></input>
      <label htmlFor="password">password </label>
      <input id="password"></input>
    </div>
  );
};

export default Login;
