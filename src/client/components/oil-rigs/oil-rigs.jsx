import React, { useState, useMemo, useEffect } from 'react';
import {connect} from 'react-redux';
import {Button, Heading, Text} from '@oliasoft-open-source/react-ui-library';
import {oilRigsLoaded, oilRigsReceived} from "store/entities/oil-rigs/oil-rigs";
import { SkeletonOilRigsGrid, SkeletonButton } from '../skeleton';
import styles from './oil-rigs.module.less';

const OilRigs = ({list, loading, oilRigsLoaded, oilRigsReceived}) => {
  const [isReversed, setIsReversed] = useState(() => {
    // Load sort preference from localStorage on component mount
    const savedSort = localStorage.getItem('oilRigsSortReversed');
    return savedSort ? JSON.parse(savedSort) : false;
  });
  const [isRestoring, setIsRestoring] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedOilRigs = localStorage.getItem('oilRigs');
    if (savedOilRigs && list.length === 0) {
      try {
        setIsRestoring(true);
        const parsedOilRigs = JSON.parse(savedOilRigs);
        oilRigsReceived(parsedOilRigs);
        setIsRestoring(false);
      } catch (error) {
        console.warn('Failed to parse saved oil rigs from localStorage');
        setIsRestoring(false);
      }
    }
  }, []);

  // Save data to localStorage when received from API
  const handleOilRigsLoaded = () => {
    setShowSkeleton(true);
    oilRigsLoaded();
    
    // Ensure skeleton shows for at least 2 seconds
    setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);
  };

  // Save to localStorage whenever list changes (when API response comes back)
  useEffect(() => {
    if (list.length > 0) {
      localStorage.setItem('oilRigs', JSON.stringify(list));
    }
  }, [list]);

  const sortedOilRigs = [...list].sort((a, b) => 
    isReversed 
      ? b.name.localeCompare(a.name)
      : a.name.localeCompare(b.name)
  );

  const toggleSort = () => {
    const newSortState = !isReversed;
    setIsReversed(newSortState);
    // Save sort preference to localStorage
    localStorage.setItem('oilRigsSortReversed', JSON.stringify(newSortState));
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.loadSection}>
          {showSkeleton ? (
            <SkeletonButton />
          ) : (
            <Button
              label="Load oil rigs"
              onClick={handleOilRigsLoaded}
              loading={loading}
              disabled={loading || showSkeleton}
            />
          )}
          {isRestoring && (
            <div className={styles.restoringMessage}>
              Restoring oil rigs...
            </div>
          )}
        </div>
        
        {list.length > 0 && (
          <Button
            label={`Sort ${isReversed ? 'Z-A' : 'A-Z'}`}
            onClick={toggleSort}
            variant="secondary"
            className={styles.sortButton}
          />
        )}
      </div>
      
      <div className={styles.content}>
        {showSkeleton ? (
          <SkeletonOilRigsGrid count={8} />
        ) : list.length ? (
          <>
            <Heading className={styles.sectionTitle}>Available Oil Rigs</Heading>
            <div className={styles.oilRigsGrid}>
              {sortedOilRigs.map((oilRig, i) => (
                <div key={i} className={styles.oilRigCard}>
                  <div className={styles.rigName}>{oilRig.name}</div>
                  <div className={styles.rigManufacturer}>{oilRig.manufacturer}</div>
                  <div className={styles.rigId}>ID: {oilRig.id}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.noRigs}>
            <Text>No oil rigs loaded yet. Click "Load oil rigs" to get started.</Text>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({entities}) => {
  const {oilRigs} = entities;
  return {
    loading: oilRigs.loading,
    list: oilRigs.list
  }
};

const mapDispatchToProps = {
  oilRigsLoaded,
  oilRigsReceived,
};

const ConnectedOilRigs = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OilRigs);
export {ConnectedOilRigs as OilRigs};
