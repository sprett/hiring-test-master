import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@oliasoft-open-source/react-ui-library';
import { useNavigate } from 'react-router-dom';
import { oilRigsLoaded } from "store/entities/oil-rigs/oil-rigs";
import { Sites } from 'client/components/sites/sites';
import styles from './sites-view.module.less';

export const SitesView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const sites = useSelector(({ entities }) => entities.sites.list);
  const oilRigs = useSelector(({ entities }) => entities.oilRigs.list);

  // Load oil rigs if not already loaded
  useEffect(() => {
    if (!oilRigs.length) {
      dispatch(oilRigsLoaded());
    }
  }, [dispatch, oilRigs.length]);

  const totalOilRigs = oilRigs.length;
  const totalSites = sites.length;
  const countries = [...new Set(sites.map(site => site.country))];

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.mainTitle}>Hiring Challenge</div>
      </div>

      {/* Statistics Section - Plain Text */}
      <div className={styles.statsSection}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>TOTAL SITES</span>
          <span className={styles.statNumber}> {totalSites}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>TOTAL OIL RIGS</span>
          <span className={styles.statNumber}> {totalOilRigs}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>COUNTRIES</span>
          <span className={styles.statNumber}> {countries.length}</span>
        </div>
      </div>

      {/* Sites Section */}
      <div className={styles.sitesSection}>
        <Sites />
      </div>
    </div>
  );
};
