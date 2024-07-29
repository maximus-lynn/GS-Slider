import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useDebouncedCallback } from 'use-debounce';
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from '@lib/component-props';
import { backgroundTypes } from '@constants/backgroundTypes';
import SectionWrapper from '@components/containers/sectionWrapper/SectionWrapper';
import { KeylineEndText, KeylineStart } from '@components/containers/keylines/Keylines';
import CarouselItem, { CarouselItemInterface } from '@components/molecules/carousel/CarouselItem';
import ArrowButton, { ArrowDirection } from '@components/atoms/ctas/button/ArrowButton';

import styles from './carouselSection.module.css';

const SLIDE_WIDTH = 260;
const SLIDE_PADDING = 40;

export enum carouselTypes {
  CONTENT = 'content',
  TIMELINE = 'timeline',
}

export type CarouselComponentProps = ComponentProps & {
  params: {
    backgroundType: backgroundTypes;
  };
  fields: {
    items: CarouselItemInterface[];
  };
};

export type CarouselSectionProps = CarouselComponentProps & {
  carouselType: carouselTypes;
};

export const CarouselSection = ({
  fields,
  params,
  rendering,
  carouselType,
}: CarouselSectionProps): JSX.Element | null => {
  const { backgroundType, endKeylineText } = params || {};
  const itemCount = fields.items.length;
  const placeholders = rendering?.placeholders || {};
  const placeholderName =
    carouselType === carouselTypes.CONTENT
      ? 'jss-ph-carousel-content-top-left'
      : 'jss-ph-carousel-timeline-top-left';

  const carouselRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [visibleSlideCount, setVisibleSlideCount] = useState<number>(0);

  const isPrevDisabled = activeIndex < 1;
  const isNextDisabled = activeIndex + visibleSlideCount > itemCount - 1;

  const calculateVisibleSlideCount = useDebouncedCallback(() => {
    const carouselWidth = carouselRef?.current?.offsetWidth;
    if (!carouselWidth) {
      return;
    }
    const maxVisibleSlides = Math.floor((carouselWidth + SLIDE_PADDING) / SLIDE_WIDTH);
    setVisibleSlideCount(Math.min(maxVisibleSlides, itemCount));
  }, 200);

  const navigate = (index: number) => {
    setActiveIndex(index);
    api.start({ x: snapPoints[index], immediate: false });
  };

  const handlePrev = () => navigate(Math.max(0, activeIndex - 1));
  const handleNext = () => navigate(Math.min(itemCount - 1, activeIndex + 1));

  // Determine the possible snap points after drag / swipe
  const snapPoints = fields.items.map((_, index) => -index * SLIDE_WIDTH);

  // Set up the animation spring for the carousel
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ last, down, movement: [mx], swipe: [swipeX] }) => {
    // Determine x position based on current progress and initial start point
    const x = mx + snapPoints[activeIndex];

    // If the drag is still in progress, track the x position.
    if (down && !last) {
      return api.start({ x, immediate: true });
    }

    // If drag is no longer in progress, smoothly snap to the closest slide at the point of release
    let projectedIndex = Math.round(-x / SLIDE_WIDTH);

    // Unless a quick swipe has been detected, in which case go straight to the next / previous slide
    if (!!swipeX) {
      projectedIndex = swipeX > 0 ? Math.floor(-x / SLIDE_WIDTH) : Math.ceil(-x / SLIDE_WIDTH);
    }

    // Ensure projected index does not leave us with dead space to the left or right of the slides
    const indexToSnap = Math.min(Math.max(projectedIndex, 0), itemCount - visibleSlideCount);

    // Start the animation spring and set active index to state
    api.start({ x: snapPoints[indexToSnap] });
    return setActiveIndex(indexToSnap);
  });

  useEffect(() => {
    calculateVisibleSlideCount();
    window.addEventListener('resize', calculateVisibleSlideCount);

    return () => {
      window.removeEventListener('resize', calculateVisibleSlideCount);
    };
  }, [calculateVisibleSlideCount]);

  useEffect(() => {
    calculateVisibleSlideCount();
  }, [itemCount, calculateVisibleSlideCount]);

  if (!itemCount) {
    return null;
  }

  return (
    <SectionWrapper className={styles.section} backgroundType={backgroundType} noBorder>
      <KeylineStart />
      <div className={styles.intro}>
        <div className={styles.introText}>
          {placeholders[placeholderName]?.length > 0 && (
            <Placeholder
              name={placeholderName}
              rendering={rendering}
              backgroundType={backgroundType as backgroundTypes}
            />
          )}
        </div>
        <div className={styles.nav}>
          <ArrowButton
            direction={ArrowDirection.PREV}
            handleClick={handlePrev}
            disabled={isPrevDisabled}
          />
          <ArrowButton
            direction={ArrowDirection.NEXT}
            handleClick={handleNext}
            disabled={isNextDisabled}
          />
        </div>
      </div>
      <div className={styles.main}>
        <div
          ref={carouselRef}
          className={styles.carouselContainer}
          data-carousel-type={carouselType}
        >
          <animated.div {...bind()} style={{ x }} className={styles.carousel}>
            <div className={styles.carouselItems}>
              {fields.items.map((props, index) => (
                <CarouselItem
                  className={styles.item}
                  key={props.id}
                  {...props}
                  faded={index > activeIndex && index >= visibleSlideCount + activeIndex}
                  carouselType={carouselType}
                />
              ))}
            </div>
          </animated.div>
        </div>
      </div>
      <KeylineEndText text={endKeylineText} backgroundType={backgroundType} />
    </SectionWrapper>
  );
};

export default CarouselSection;
