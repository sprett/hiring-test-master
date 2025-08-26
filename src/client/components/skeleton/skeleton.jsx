import React from 'react';
import styles from './skeleton.module.less';

const Skeleton = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  className = '',
  style = {}
}) => {
  return (
    <div 
      className={`${styles.skeleton} ${className}`}
      style={{ 
        width, 
        height, 
        borderRadius,
        ...style 
      }}
    />
  );
};

// Predefined skeleton components for common use cases
export const SkeletonCard = ({ className = '' }) => (
  <div className={`${styles.skeletonCard} ${className}`}>
    <Skeleton  className={styles.skeletonTitle} />
    <Skeleton  className={styles.skeletonLine} />
    <Skeleton  className={styles.skeletonLine} />
    <Skeleton  className={styles.skeletonLine} />
  </div>
);

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`${styles.skeletonText} ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton 
        key={index}
        
        className={index === lines - 1 ? styles.skeletonLastLine : styles.skeletonLine}
      />
    ))}
  </div>
);

export const SkeletonButton = ({ className = '' }) => (
  <Skeleton 
    height="36px" 
    width="120px" 
    borderRadius="6px"
    className={className}
  />
);

export const SkeletonSitesGrid = ({ count = 6, className = '' }) => (
  <div className={`${styles.skeletonSitesGrid} ${className}`}>
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className={styles.skeletonSiteCard}>
        <Skeleton 
          height="24px" 
          width="80%" 
          className={styles.skeletonSiteName} 
        />
        <Skeleton 
          height="16px" 
          width="60%" 
          className={styles.skeletonSiteCountry} 
        />
        <Skeleton 
          height="12px" 
          width="90%" 
          className={styles.skeletonSiteId} 
        />
        <Skeleton 
          height="14px" 
          width="40%" 
          className={styles.skeletonSiteRigs} 
        />
      </div>
    ))}
  </div>
);

export const SkeletonOilRigsGrid = ({ count = 8, className = '' }) => (
  <div className={`${styles.skeletonOilRigsGrid} ${className}`}>
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className={styles.skeletonOilRigCard}>
        <div className={styles.skeletonOilRigHeader}>
          <Skeleton  className={styles.skeletonOilRigName} />
          <Skeleton  className={styles.skeletonOilRigManufacturer} />
        </div>
        <div className={styles.skeletonOilRigDetails}>
          <Skeleton  className={styles.skeletonOilRigId} />
        </div>
      </div>
    ))}
  </div>
 );

export default Skeleton;
