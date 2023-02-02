import React, { SyntheticEvent, useEffect, useState } from 'react';
import { ReactComponent as Alert } from '../../../../public/detail/alert.svg';
import Img from '../../../atoms/image/Image';
import BasicTabs from '../../../molecules/tab/BasicTabs';
import NearByList from '../../nearByList/NearByList';
import DetailMap from '../../detailMap/DetailMap';
import { productDataProps } from './detailPageTabType';
import { useQuery } from '@tanstack/react-query';
import { getPostsInSpecifiedLocation } from '../../../../api/post';
import { Divider } from '@mui/material';
import { Box } from '@mui/system';

const LABEL = ['상세설명', '거래위치', '주변상품'];

const DetailPageTab = ({ productData }: productDataProps) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [sharingListExcludeThisPost, setSharingListExcludeThisPost] =
    useState();
  const handleChange = (event: SyntheticEvent, newCurrentTab: number) => {
    setCurrentTab(newCurrentTab);
  };
  const handleClick = (e: any) => {
    const element = document.getElementById(`section-${e.target.id.slice(-1)}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { data, refetch } = useQuery({
    queryKey: ['sharingListInDetail'],
    queryFn: () => {
      return getPostsInSpecifiedLocation({
        locationData: {
          lat: productData?.latitude,
          lng: productData?.longitude,
          address: productData?.address,
        },
        range: 1.5,
        category: 'product',
        page: 1,
        size: 7,
        sortBy: 'distance',
      });
    },
    refetchOnWindowFocus: false,
    retry: 2,
    onError: (data) => console.log(data),
    onSuccess: (data) => {
      const nearByDetailSharingList = data?.data?.filter(
        (item: productDataProps['productData']) =>
          item?.boardId !== productData?.boardId
      );
      setSharingListExcludeThisPost(nearByDetailSharingList);
    },
    enabled: false,
  });
  useEffect(() => {
    productData?.address && refetch();
  }, [productData?.address]);

  return (
    <div className="mx-2.5">
      <div className="sticky top-[50px] p-4 bg-[white] z-10">
        <BasicTabs
          currentTab={currentTab}
          handleChange={handleChange}
          tabLabels={LABEL}
          centered={true}
          handleClick={handleClick}
        />
      </div>
      <div>
        <section id="section-0" className="mt-4">
          <div className="pt-3">
            <strong className="text-[#FF0000] font-medium flex items-center justify-center text-sm">
              <Alert /> 거래 전 주의사항 안내
            </strong>
            <p className="m-4 text-center text-xs px-2 py-4 border-x-0 border-t-0 border-b-0 border-solid border-[#475569]">
              판매자가 별도의 메신저로 결제링크를 보내는 행위는 사기일 가능성이
              높으니 거래를 자제해 주시고
              <br />
              고객센터로 신고해주시기 바랍니다.
            </p>
            <Divider sx={{ p: 1 }}>상세 설명</Divider>
            <main className="m-4 text-base text-center leading-relaxed">
              {productData?.content}
            </main>
          </div>
        </section>
        <section id="section-1" className="px-2 py-4">
          <Divider sx={{ p: 1 }}>거래 위치</Divider>
          {productData && (
            <Box
              sx={{
                p: 4,
                mt: 4,
                mb: 2,
                border: '2px solid #b1afac',
                borderRadius: '10px',
                backgroundColor: '#efece6',
              }}
            >
              <DetailMap
                latitude={productData?.latitude}
                longitude={productData?.longitude}
              />
            </Box>
          )}
        </section>
        <section id="section-2" className="px-2 py-2">
          <Divider sx={{ p: 1 }}>주변 상품</Divider>
          <NearByList sharingLists={sharingListExcludeThisPost || []} />
        </section>
      </div>
    </div>
  );
};

export default DetailPageTab;
