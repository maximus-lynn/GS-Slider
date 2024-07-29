import { render, screen } from '@testing-library/react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { backgroundTypes } from '@constants/backgroundTypes';
import { mockComponentFactory } from '@src/mocks/mockComponentFactory';
import { CarouselContent } from './CarouselContent';
import { CarouselComponentProps } from './CarouselSection';
import { mockCarouselContentItems } from './mocks/mockCarouselContentItems';
import { mockCarouselContentPlaceholder } from './mocks/mockCarouselPlaceholders';

describe('CarouselContent', () => {
  const props: CarouselComponentProps = {
    fields: {
      items: mockCarouselContentItems,
    },
    params: {
      backgroundType: backgroundTypes.DARK,
      endKeylineText: 'Next title',
    },
    rendering: {
      componentName: 'CarouselContent',
      placeholders: mockCarouselContentPlaceholder,
    },
  };

  it('should render the text block placeholder with all it’s fields', () => {
    render(
      <SitecoreContext componentFactory={mockComponentFactory}>
        <CarouselContent {...props} />
      </SitecoreContext>
    );
    expect(screen.getByText('Content Carousel')).toBeVisible();
    expect(screen.getByText('Subtitle')).toBeVisible();
    expect(screen.getByText('Introduction text')).toBeVisible();
    expect(
      screen.getByText(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
      )
    ).toBeVisible();
  });

  it('should render all the carousel slides', () => {
    render(
      <SitecoreContext componentFactory={mockComponentFactory}>
        <CarouselContent {...props} />
      </SitecoreContext>
    );
    const slideTitles = [
      'Slide one',
      'Slide two',
      'Slide three',
      'Slide four',
      'Slide five',
      'Slide six',
      'Slide seven',
      'Slide eight',
      'Slide nine',
    ];
    for (let i = 0; i < slideTitles.length; i++) {
      expect(screen.getByText(slideTitles[i])).toBeVisible();
    }
  });

  it('should render the next section title in the bottom bumper', () => {
    render(
      <SitecoreContext componentFactory={mockComponentFactory}>
        <CarouselContent {...props} />
      </SitecoreContext>
    );
    expect(screen.getByText('Next title')).toBeVisible();
  });
});
