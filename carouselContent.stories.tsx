import React from 'react';
import { Story } from '@storybook/react';
import { backgroundTypes } from '@constants/backgroundTypes';
import { CarouselContent } from './CarouselContent';
import { CarouselComponentProps } from './CarouselSection';
import { mockCarouselContentItems } from './mocks/mockCarouselContentItems';
import { mockCarouselContentPlaceholder } from './mocks/mockCarouselPlaceholders';

/*
 * Doesn't seem to be possible to get the placeholder to render any content at the moment.
 * This article was useful: https://www.getfishtank.com/blog/add-a-component-factory-to-storybook-in-sitecore
 * However this currently unresolved bug in storybook prevents it working: https://github.com/storybookjs/storybook/issues/18679
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Molecules/CarouselContent',
  component: CarouselContent,
  args: {
    fields: {
      items: mockCarouselContentItems,
    },
  },
  params: {
    backgroundType: backgroundTypes.DARK,
  },
  rendering: {
    placeholders: mockCarouselContentPlaceholder,
  },
};

const Template = (args: CarouselComponentProps) => <CarouselContent {...args} />;

export const Light: Story = Template.bind({});
Light.args = {
  params: {
    backgroundType: backgroundTypes.LIGHT,
  },
};

export const Dark: Story = Template.bind({});
Dark.args = {
  params: {
    backgroundType: backgroundTypes.DARK,
  },
};

export const Gray: Story = Template.bind({});
Gray.args = {
  params: {
    backgroundType: backgroundTypes.GRAY,
  },
};
