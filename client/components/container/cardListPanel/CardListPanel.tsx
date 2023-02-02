import { useEffect, useState } from 'react';
import CircleLoading from '../../organisms/circleLoading/CircleLoading';
import NearByList from '../../organisms/nearByList/NearByList';
import CardListPanelType from './CardListPanelType';
import SadErrorBox from '../../organisms/sadErrorBox/SadErrorBox';
import NoticeBox from '../../organisms/noticeBox/NoticeBox';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const defaultPaging: {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
} = {
  page: 1,
  size: 10,
  totalElements: 0,
  totalPages: 0,
};

const CardListPanel = ({ getApi }: CardListPanelType) => {
  const [itemList, setItemList] = useState([]);
  const [isItem, setIsItem] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isGetError, setIsGetError] = useState(false);
  const [paging, setPaging] = useState(defaultPaging);
  const [pageApiParams, setPageApiParams] = useState({
    page: defaultPaging.page,
    size: defaultPaging.size,
  });

  function checkItem(cardList: []) {
    return cardList.length !== 0;
  }

  useEffect(() => {
    getApi(pageApiParams.page, pageApiParams.size)
      .then((res) => {
        if (checkItem(res.data.data)) {
          setIsItem(true);
          setItemList(res.data.data);
          setPaging(res.data.pageInfo);
        } else {
          setIsItem(false);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setIsGetError(true);
      });
  }, [pageApiParams]);

  return (
    <div className="ani_fadeIn flex justify-center">
      {loading && <CircleLoading message="잠시만 기다려 주세요." />}
      {isItem && (
        <div className="w-full px-4">
          <div className="flex flex-col justify-center pb-[5rem]">
            <NearByList sharingLists={itemList} />
            <div className="flex justify-center mt-[1.875rem]">
              <Stack spacing={2}>
                <Pagination
                  count={paging.totalPages}
                  page={paging.page}
                  color="primary"
                  onChange={(e, value) =>
                    setPageApiParams({
                      ...pageApiParams,
                      page: value,
                    })
                  }
                />
              </Stack>
            </div>
          </div>
        </div>
      )}
      {!isItem && !isGetError && !loading && (
        <NoticeBox
          message="등록된 쉐어링이 없습니다."
          linkText="쉐어링 하러가기"
          linkHref="/search"
        />
      )}
      {!isItem && isGetError && !loading && <SadErrorBox />}
    </div>
  );
};

export default CardListPanel;
