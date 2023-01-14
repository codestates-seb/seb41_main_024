import React from 'react';
import { ReactComponent as Alert } from '../../../../public/detail/alert.svg';
import Img from '../../../atoms/image/Image';
import BasicTabs from '../../../molecules/tab/BasicTabs';
import NearByList from '../../nearByList/NearByList';
const dummyLabel = [
  { label: '상세설명', index: 0 },
  { label: '거래위치', index: 1 },
  { label: '주변상품', index: 2 },
];

const DetailPageTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleClick = (e) => {
    const element = document.getElementById(`section-${e.target.id.slice(-1)}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="mx-2.5">
      <BasicTabs
        value={value}
        handleChange={handleChange}
        tabLabels={dummyLabel}
        centered={true}
        handleClick={handleClick}
      />
      <section id="section-0" className="mt-4">
        <div className="pt-3">
          <strong className="text-[#FF0000] font-medium flex items-center justify-center text-sm">
            <Alert /> 거래 전 주의사항 안내
          </strong>
          <p className="mt-4 text-center text-xs border-b-1 px-2 py-4 border-x-0 border-t-0 border-solid border-[#475569]">
            판매자가 별도의 메신저로 결제링크를 보내는 행위는 사기일 가능성이
            높으니 거래를 자제해 주시고 고객센터로 신고해주시기 바랍니다.
          </p>
          <main className="mt-6 text-base text-center">
            빨대가 필요한데 양이 너무 많아요 ㅠㅠ 500개짜리 사서 100개씩 나누실
            5분 구합니다~~ 위치는 일단 저희집 근처로 지정했는데 조정 가능해요!
            편하게 말씀해주세요^^
          </main>
        </div>
      </section>
      <section id="section-1" className="px-2 py-4">
        <Img src="/detail/map.svg" />
      </section>
      <section id="section-2" className="px-2 py-4">
        <p className="text-base">주변 상품</p>
        <NearByList />
      </section>
    </div>
  );
};

export default DetailPageTab;
