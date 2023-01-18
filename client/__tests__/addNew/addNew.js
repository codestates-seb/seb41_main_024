import { renderHook, act } from '@testing-library/react-hooks';
import React from 'react';
//작성한 useHook 함수를 import 하면 됩니다.
import useInput from '../../hooks/addNewHooks/useInput';

describe('useInput', () => {
  //아래 부분은 useInput으로 무엇을 테스트하는지 몰라서 찾아봤습니다.
  //이부분은 그대로 쓰셔도 되고, 자유롭게 변경하셔도 될 듯 합니다.
  //https://jestjs.io/docs/using-matchers 해당 페이지에서 테스트 메서드를 찾을 수 있습니다.
  test('useInput은 길이가 3인 배열을 리턴한다. (value, onChange,handleSubmit)', () => {
    const { result } = renderHook(() => useInput(''));
    expect(result.current).toHaveLength(3);
  });

  test('initialValue를 입력하면 value 값이 설정 된다.', () => {
    const { result } = renderHook(() => useInput('test'));
    expect(result.current[0]).toBe('test');
  });
  test('onChange 함수로 value 값을 변경할 수 있다', () => {
    const { result } = renderHook(() => useInput(''));

    act(() => {
      result.current[1]({
        target: { value: '테스트입니다' },
      });
    });

    expect(result.current[0].undefined).toBe('테스트입니다');
  });
});
