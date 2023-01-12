import React from 'react';
import ButtonStories from '../../atoms/button/Button.tsx';

const UserMetaInfo = () => {
  return (
    <div className="flex items-center border-b-1 border-x-0 border-t-0 border-solid border-[#475569] py-6 px-6">
      <div>
        <div className="bg-emerald-500 w-8 h-8"></div>
      </div>
      <div className="grow ml-2">
        <strong className="font-semibold text-base">팔라당150</strong>
        <p>수원시 권선구 권선동</p>
      </div>
      <ButtonStories
        src="/detail/edit.svg"
        width={24}
        height={24}
        alt="edit-button"
      />
    </div>
  );
};

export default UserMetaInfo;
