import ImgUpload from './ImgUpload';
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
  title: 'organisms/ImgUpload',
  component: ImgUpload,
  argTypes: {
    imgSrc: { control: 'text' },
  },
} as ComponentMeta<typeof ImgUpload>;

const Template: ComponentStory<typeof ImgUpload> = (args) => (
  <ImgUpload {...args} />
);

export const UploadedImg = Template.bind({});
UploadedImg.args = {
  src: '/profile/@thumb252×310.jpg',
};
