import React, { ReactNode } from 'react';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import styles from './Feature.module.css';

type FeatureProps = {
    image: string,
    title: string,
    description: string,
    caption?: string,
    children: ReactNode,
    reverse?: boolean,
    onImageLoad?: any,
    imageProps?: any,
}

const Feature = ({
    image,
    title,
    description,
    caption,
    children,
    onImageLoad,
    reverse = false,
    imageProps,
}: FeatureProps) => {
    const laptop = useMediaQuery({ query: '(max-width: 991.98px)' });
    
    return (
        <div className={`grow ${styles.feature} ${reverse ? styles.reverse : ''}`}>
            <div className={styles.featureImage}>
                <Image
                    layout="responsive"
                    height={laptop ? 472 : 630}
                    width={630}
                    alt={title}
                    src={image}
                    objectFit="cover"
                    onLoad={onImageLoad}
                    quality={100}
                    {...imageProps}
                />
            </div>
            <div className={styles.featureInfoContainer}>
                <div className={styles.featureInfo}>
                    <h2 className="heading-5">{title}</h2>
                    {!!caption && (
                        <small className={styles.caption}>{caption}</small>
                    )}
                    <p>{description}</p>
                    <div className={styles.actions}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feature;