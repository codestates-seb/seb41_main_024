import React, { useState } from 'react';
import NTabs from '../../organisms/nTabs/NTabs';
import InquiryListPanel from '../inquiryListPanel/InquiryListPanel';
import MyQuestionWrite from '../myQuestionWrite/MyQuestionWrite';
import { inquiryViewStateType, inquiryViewType } from './MyInquiryType';

const defaultInquiryView: inquiryViewType = {
  list: true,
  detail: false,
  edit: false,
};

const MyAllSharing = () => {
  const [inquiryView, setInquiryView] = useState(defaultInquiryView);
  const [writeView, setWriteView] = useState(true);
  const handleClickReset = () => {
    setInquiryView(defaultInquiryView);
    setWriteView(!writeView);
  };

  return (
    <>
      <NTabs
        ariaLabel="내 문의사항"
        tabLabels={['문의 목록', '문의 등록']}
        themeSub={true}
        handleClick={handleClickReset}
      >
        <InquiryListPanel
          inquiryView={inquiryView}
          setInquiryView={setInquiryView}
        />
        <MyQuestionWrite writeView={writeView} />
      </NTabs>
    </>
  );
};

export default MyAllSharing;
