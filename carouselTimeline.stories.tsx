import React from 'react';
import { Story } from '@storybook/react';
import { backgroundTypes } from '@constants/backgroundTypes';
import { CarouselTimeline } from './CarouselTimeline';
import { CarouselComponentProps } from './CarouselSection';
import { mockCarouselTimelineItems } from './mocks/mockCarouselTimelineItems';
import { mockCarouselTimelinePlaceholder } from './mocks/mockCarouselPlaceholders';

/*
 * Doesn't seem to be possible to get the placeholder to render any content at the moment.
 * This article was useful: https://www.getfishtank.com/blog/add-a-component-factory-to-storybook-in-sitecore
 * However this currently unresolved bug in storybook prevents it working: https://github.com/storybookjs/storybook/issues/18679
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Molecules/CarouselTimeline',
  component: CarouselTimeline,
  args: {
    fields: {
      items: mockCarouselTimelineItems,
    },
  },
  params: {
    backgroundType: backgroundTypes.DARK,
  },
  rendering: {
    placeholders: mockCarouselTimelinePlaceholder,
  },
};

const Template = (args: CarouselComponentProps) => <CarouselTimeline {...args} />;

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
