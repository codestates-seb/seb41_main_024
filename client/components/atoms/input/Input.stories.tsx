import { inputType } from './inputType';
import React, { ReactNode, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    onChange: { action: 'changed' },
  },
} as Meta;

type StoryInputProps = inputType & { children: string | ReactNode };
//Story는 제네릭 타입, input을 렌더링 할 때 args를 전달한다.
const Template: Story<StoryInputProps> = (args) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return <Input {...args} value={value} onChange={handleChange} />;
};
export const Default = Template.bind({});
Default.args = {
  label: 'Input Label',
  placeholder: 'Input Placeholder',
  children: 'Input Children',
};

export const Select = Template.bind({});
Select.args = {
  label: 'Select Label',
  placeholder: 'Select Placeholder',
  select: true,
  children: (
    <>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </>
  ),
  className: 'w-[200px]',
};

export const Multiline = Template.bind({});
Multiline.args = {
  label: 'Multiline Label',
  placeholder: 'Multiline Placeholder',
  multiline: true,
  rows: 4,
  children: 'Multiline Children',
};

export const Required = Template.bind({});
Required.args = {
  label: 'Required Label',
  placeholder: 'Required Placeholder',
  required: true,
  children: 'Required Children',
};

export const EndAdornment = Template.bind({});
EndAdornment.args = {
  label: 'End Adornment Label',
  placeholder: 'End Adornment Placeholder',
  endAdornment: '$',
  children: 'End Adornment Children',
};
