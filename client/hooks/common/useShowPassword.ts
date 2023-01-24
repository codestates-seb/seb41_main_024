import React from 'react';

function useShowPassword(showState: boolean) {
  const [showPassword, setShowPassword] = React.useState(showState);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return [
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
  ] as const;
}
export default useShowPassword;
