import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Button } from '@oliasoft-open-source/react-ui-library';
import { OilRigs } from 'client/components/oil-rigs/oil-rigs';
import styles from './oil-rigs.module.less';

export const OilRigsView = ({}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <Page left={0}>
      <div className={styles.container}>
        <Button onClick={handleBackClick} label="Back"  />
        
        <div className={styles.pageInfo}>
          <div className={styles.pageTitle}>Oil Rigs</div>
          <div className={styles.pageDescription}>All available oil rigs in the system</div>
        </div>
        
        <div className={styles.oilRigsSection}>
          <OilRigs />
        </div>
      </div>
    </Page>
  );
};
