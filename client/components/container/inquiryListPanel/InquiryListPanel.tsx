import { Pagination, Stack } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import getMyQna from '../../../api/getMyQna';
import checkZeroArry from '../../../utils/checkZeroArry/checkZeroArry';
import CircleLoading from '../../organisms/circleLoading/CircleLoading';
import NoticeBox from '../../organisms/noticeBox/NoticeBox';
import SadErrorBox from '../../organisms/sadErrorBox/SadErrorBox';
import { inquiryViewStateType } from '../myInquiry/MyInquiryType';
import MyQuestionDetail from '../myQuestionDetail/MyQuestionDetail';
import MyQuestionEdit from '../myQuestionEdit/MyQuestionEdit';
import MyQuestionList from '../myQuestionList/MyQuestionList';
import { questionType, defaultPagingType } from './InquiryListPanelType';

const defaultPaging: defaultPagingType = {
  page: 1,
  size: 10,
  totalElements: 0,
  totalPages: 0,
};

const InquiryListPanel = ({
  inquiryView,
  setInquiryView,
}: inquiryViewStateType) => {
  const [itemList, setItemList] = useState<questionType[]>([]);
  const [detailQnaId, setDetailQnaId] = useState(0);
  const [isItem, setIsItem] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isGetError, setIsGetError] = useState(false);
  const [paging, setPaging] = useState(defaultPaging);
  const [pageApiParams, setPageApiParams] = useState({
    page: defaultPaging.page,
    size: defaultPaging.size,
  });

  const handleClickgoDetail = (qnaId: number) => {
    setInquiryView({
      list: false,
      detail: true,
      edit: false,
    });
    setDetailQnaId(qnaId);
  };
  const handleClickEdit = (qnaId: number) => {
    setInquiryView({
      list: false,
      detail: false,
      edit: true,
    });
    setDetailQnaId(qnaId);
  };

  useEffect(() => {
    getMyQna(pageApiParams.page, pageApiParams.size)
      .then((res) => {
        if (checkZeroArry(res.data.data)) {
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
  }, [pageApiParams, inquiryView]);

  const question = itemList.filter((el) => {
    return el.qnaId === detailQnaId;
  })[0];

  return (
    <>
      <div className="pb-[5rem]">
        {loading && <CircleLoading message="잠시만 기다려 주세요." />}
        {inquiryView.list && isItem && (
          <div className="flex flex-col min-h-[calc(100vh - 606px)]">
            <MyQuestionList
              questionList={itemList}
              handleClickgoDetail={handleClickgoDetail}
            />
            <div className="flex justify-center mt-auto pt-[1.875rem] ani_fadeIn">
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
        )}
        {inquiryView.detail && isItem && (
          <MyQuestionDetail
            question={question}
            handleClickEdit={handleClickEdit}
          />
        )}
        {inquiryView.edit && isItem && <MyQuestionEdit question={question} />}
        {!isItem && !isGetError && !loading && (
          <NoticeBox message="등록된 문의가 없습니다." />
        )}
        {!isItem && isGetError && !loading && <SadErrorBox />}
      </div>
    </>
  );
};

export default InquiryListPanel;
