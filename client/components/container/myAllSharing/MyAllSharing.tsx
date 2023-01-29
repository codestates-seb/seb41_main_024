import React from 'react';
import NTabs from '../../organisms/nTabs/NTabs';
import getMyBoard from '../../../api/getMyBoard';
import getMySharingList from '../../../api/getMySharingList';
import getMyLike from '../../../api/getMyLike';
import CardListPanel from '../cardListPanel/CardListPanel';

const MyAllSharing = () => {
  return (
    <>
      <NTabs
        ariaLabel="내 모든 쉐어링"
        tabLabels={['개설한 쉐어링', '참여한 쉐어링', '찜한 쉐어링']}
        themeSub={true}
      >
        <CardListPanel getApi={getMyBoard} />
        <CardListPanel getApi={getMySharingList} />
        <CardListPanel getApi={getMyLike} />
      </NTabs>
    </>
  );
};

export default MyAllSharing;
