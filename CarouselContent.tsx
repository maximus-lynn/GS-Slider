import React from 'react';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import CarouselSection, { CarouselComponentProps, carouselTypes } from './CarouselSection';

export const CarouselContent = (props: CarouselComponentProps): JSX.Element => {
  return <CarouselSection {...props} carouselType={carouselTypes.CONTENT} />;
};

export default withDatasourceCheck()<CarouselComponentProps>(CarouselContent);
