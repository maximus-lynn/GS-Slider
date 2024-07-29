import React from 'react';
import cx from 'classnames';
import { Field, ImageField, LinkField, Link, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import Arrow from '@components/atoms/icons/Arrow';
import { carouselTypes } from './CarouselSection';
import styles from './carouselItem.module.css';

export interface CarouselItemInterface {
  id: string;
  fields: {
    title: Field<string>;
    text: Field<string>;
    link: LinkField;
    image: ImageField;
    subtitle?: Field<string>;
  };
}

export interface CarouselItemProps extends CarouselItemInterface {
  faded: boolean;
  carouselType: carouselTypes;
  className?: string;
}

export const CarouselItem = ({
  fields,
  faded,
  carouselType,
  className,
}: CarouselItemProps): JSX.Element | null => {
  const { title, subtitle, text, link, image } = fields || {};

  if (!title) return null;

  return (
    <div
      className={cx(className, styles.carouselItem)}
      data-faded={faded}
      data-carousel-type={carouselType}
    >
      <div className={styles.image}>
        <img alt={title.value} src={image.value?.src} width={220} height={220} />
      </div>
      {subtitle && (
        <div className={styles.subtitle}>
          <Text field={subtitle} />
        </div>
      )}
      <h3 className={styles.title}>
        <Link field={link} editable={false}>
          <Text field={title} />
        </Link>
      </h3>

      <p className={styles.text}>
        <Text field={text} />
      </p>
      <Link field={link} editable={false}>
        <Arrow solidIcon={true} className={styles.arrow} />
      </Link>
    </div>
  );
};

export default CarouselItem;
