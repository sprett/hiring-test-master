import React, { useState, useMemo, useEffect } from 'react';
import {connect} from 'react-redux';
import {Button, Card, Heading, Column, Row, Text} from '@oliasoft-open-source/react-ui-library';
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
      // Save to localStorage after successful load
      if (list.length > 0) {
        localStorage.setItem('oilRigs', JSON.stringify(list));
      }
    }, 2000);
  };

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
    <Card
      heading={
        <Heading>List of oil rigs</Heading>
      }
    >
      <Row>
        <Column width={200}>
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
            <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
              Restoring from cache...
            </div>
          )}
        </Column>
        <Column>
          {list.length > 0 && (
            <Button
              label={`Sort ${isReversed ? 'Z-A' : 'A-Z'}`}
              onClick={toggleSort}
              variant="secondary"
              style={{ marginBottom: '16px' }}
            />
          )}
          <div className={styles.oilRigsList}>
            {showSkeleton ? (
              <SkeletonOilRigsGrid count={8} />
            ) : list.length ? (
              <div className={styles.oilRigsGrid}>
                {sortedOilRigs.map((oilRig, i) => (
                  <div key={i} className={styles.oilRigCard}>
                    <div className={styles.oilRigHeader}>
                      <Text>{oilRig.name}</Text>
                      <Text>{oilRig.manufacturer}</Text>
                    </div>
                    <div className={styles.oilRigDetails}>
                      <Text>ID: {oilRig.id}</Text>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <em>None loaded</em>
            )}
          </div>
        </Column>
      </Row>
    </Card>
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
