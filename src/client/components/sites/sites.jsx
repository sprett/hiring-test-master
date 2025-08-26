import React, { useState, useMemo, useEffect } from 'react';
import {connect} from 'react-redux';
import {Button} from '@oliasoft-open-source/react-ui-library';
import {sitesLoaded, sitesReceived} from "store/entities/sites/sites";
import { SkeletonSitesGrid, SkeletonButton } from '../skeleton';
import styles from './sites.module.less';
import { useNavigate } from 'react-router-dom';

const Sites = ({list, loading, sitesLoaded, sitesReceived}) => {
  const [isReversed, setIsReversed] = useState(() => {
    // Load sort preference from localStorage on component mount
    const savedSort = localStorage.getItem('sitesSortReversed');
    return savedSort ? JSON.parse(savedSort) : false;
  });
  const [isRestoring, setIsRestoring] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const navigate = useNavigate();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSites = localStorage.getItem('sites');
    if (savedSites && list.length === 0) {
      try {
        setIsRestoring(true);
        const parsedSites = JSON.parse(savedSites);
        sitesReceived(parsedSites);
        setIsRestoring(false);
      } catch (error) {
        console.warn('Failed to parse saved sites from localStorage');
        setIsRestoring(false);
      }
    }
  }, []);

  // Save data to localStorage when received from API
  const handleSitesLoaded = () => {
    setShowSkeleton(true);
    sitesLoaded();
    
    // Ensure skeleton shows for at least 2 seconds
    setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);
  };

  // Save to localStorage whenever list changes (when API response comes back)
  useEffect(() => {
    if (list.length > 0) {
      localStorage.setItem('sites', JSON.stringify(list));
    }
  }, [list]);

  // useMemo here for state management
  const sortedSites = useMemo(() => [...list].sort((a, b) => 
    isReversed 
      ? b.name.localeCompare(a.name)
      : a.name.localeCompare(b.name)
  ), [list, isReversed]);

  const toggleSort = () => {
    const newSortState = !isReversed;
    setIsReversed(newSortState);
    // Save sort preference to localStorage
    localStorage.setItem('sitesSortReversed', JSON.stringify(newSortState));
  };

  const handleSiteClick = (siteId) => {
    navigate(`/site/${siteId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>List of oil sites</div>
      </div>

      {list.length > 0 && (
        <div className={styles.sortSection}>
          <Button
            label={`Sort ${isReversed ? 'Z-A' : 'A-Z'}`}
            onClick={toggleSort}
            variant="secondary"
            className={styles.sortButton}
          />
          {showSkeleton ? (
            <SkeletonButton />
          ) : (
            <Button
              label="Load sites"
              onClick={handleSitesLoaded}
              loading={loading}
              disabled={loading || showSkeleton}
              className={styles.loadButton}
            />
          )}
        </div>
      )}

      {list.length === 0 && (
        <div className={styles.sortSection}>
          {showSkeleton ? (
            <SkeletonButton />
          ) : (
            <Button
              label="Load sites"
              onClick={handleSitesLoaded}
              loading={loading}
              disabled={loading || showSkeleton}
              className={styles.loadButton}
            />
          )}
        </div>
      )}

      <div className={styles.sitesList}>
        {showSkeleton ? (
          <SkeletonSitesGrid count={6} />
        ) : list.length ? (
          <div className={styles.sitesGrid}>
            {sortedSites.map((site, i) => (
              <div key={i} className={styles.siteCard} onClick={() => handleSiteClick(site.id)}>
                <div className={styles.siteName}>{site.name}</div>
                <div className={styles.siteCountry}>{site.country}</div>
                <div className={styles.siteId}>Site ID: {site.id}</div>
                <div className={styles.siteRigs}>{site.oilRigs.length} Oil Rigs</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noSites}>None loaded</div>
        )}
      </div>
      <div className={styles.navigationLinks}>
        <div className={styles.oilRigsLink} onClick={() => navigate('/oil-rigs')}>View oil rigs</div>
        <div className={styles.oilRigsLink} onClick={() => navigate('/chart')}>View chart</div>
      </div>
    </div>
  );
}

const mapStateToProps = ({entities}) => {
  const {sites} = entities;
  return {
    loading: sites.loading,
    list: sites.list
  }
};

const mapDispatchToProps = {
  sitesLoaded,
  sitesReceived,
};

const ConnectedSites = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sites);
export {ConnectedSites as Sites};
