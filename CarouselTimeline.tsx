import React from 'react';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import CarouselSection, { CarouselComponentProps, carouselTypes } from './CarouselSection';

export const CarouselTimeline = (props: CarouselComponentProps): JSX.Element => {
  return <CarouselSection {...props} carouselType={carouselTypes.TIMELINE} />;
};

export default withDatasourceCheck()<CarouselComponentProps>(CarouselTimeline);
