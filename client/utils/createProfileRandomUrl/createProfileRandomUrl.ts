const createProfileRandomUrl = (num: number = 15) => {
  const profileImages = [...Array(num)].map((it, idx) => {
    return (it = `/profile/profile${idx + 1}.svg`);
  });
  const randomNum = Math.floor(Math.random() * profileImages.length);
  const profileImage = profileImages.filter((el, idx) => {
    return idx === randomNum;
  });
  return profileImage[0];
};

export default createProfileRandomUrl;
