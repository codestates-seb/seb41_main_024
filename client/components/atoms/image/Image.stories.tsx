import Img from './Image';
import styles from './image.module.css';

import { Meta, Story } from '@storybook/react';

import { imageType } from './imageType';

export default {
  title: 'Image',
  component: Img,
} as Meta;

interface TemplateProps extends imageType {
  className: string;
}

const Template: Story<TemplateProps> = ({
  className,
  ...args
}: TemplateProps) => (
  <div className={className}>
    <Img {...args} />
  </div>
);

export const Heart = Template.bind({});
Heart.args = {
  className: styles.imgContainer,
  src: '/sharingList/heart.svg',
  alt: 'heart',
};

export const Pepsi = Template.bind({});
Pepsi.args = {
  className: styles.imgContainer,
  src: '/sharingList/pepsi.svg',
  alt: 'pepsi',
};

export const Favorite = Template.bind({});
Favorite.args = {
  className: styles.imgContainer,
  src: '/sharingList/favorite_border.svg',
  alt: 'favorite',
};
