import {
  getPostsInSpecifiedLocation,
  searchPostsByTitle,
} from './../../api/post';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
export interface useSearchPropsType {
  searchOption?: string;
  argumentOfLocation: {
    locationData: { lat: number; lng: number; address: string };
    range: number;
    category: string;
    page: number;
    size: number;
  };
  argumentOfTitle: any;
}
const useSearch = ({
  searchOption,
  argumentOfLocation,
  argumentOfTitle,
}: useSearchPropsType) => {
  const router = useRouter();
  const { data, refetch } = useQuery(
    ['sharingList'],
    async () => {
      if (searchOption === '주소') {
        return await getPostsInSpecifiedLocation(argumentOfLocation);
      } else if (searchOption === '글 제목') {
        return await searchPostsByTitle(argumentOfTitle);
      }
    },
    {
      onSuccess: (data) => {
        const {
          range,
          category,
          page,
          size,
          locationData: { lat, lng, address },
        } = argumentOfLocation;
        const {
          type,
          keyword,
          page: titlePage,
          size: titleSize,
        } = argumentOfTitle;
        const query = {
          searchOption,
          type,
          keyword,
          page: page || titlePage,
          size: size || titleSize,
          lat,
          lng,
          address,
          range,
          category,
        };
        router.push({ pathname: '/nearby', query }, '/nearby');
      },
      onError: (data) => console.log(data),
      retry: false,
      cacheTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  return { data, refetch };
};

export default useSearch;
