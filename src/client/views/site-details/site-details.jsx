import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Page, Heading, Text, Button } from '@oliasoft-open-source/react-ui-library';
import { useParams, useNavigate } from 'react-router-dom';
import { oilRigsLoaded } from "store/entities/oil-rigs/oil-rigs";
import { sitesLoaded } from "store/entities/sites/sites";
import styles from './site-details.module.less';
import { FiMapPin } from 'react-icons/fi';

const SiteDetails = () => {
  const { siteId } = useParams();
  const [site, setSite] = useState(null);
  const [siteOilRigs, setSiteOilRigs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const sites = useSelector(({ entities }) => entities.sites.list);
  const oilRigs = useSelector(({ entities }) => entities.oilRigs.list);

  useEffect(() => {
    // Load oil rigs if not already loaded
    if (!oilRigs.length) {
      dispatch(oilRigsLoaded());
    }
    // Load sites if not already loaded
    if (!sites.length) {
      dispatch(sitesLoaded());
    }
  }, [dispatch, oilRigs.length, sites.length]);

  useEffect(() => {
    if (sites.length && oilRigs.length) {
      const currentSite = sites.find(s => s.id === siteId);
      if (currentSite) {
        setSite(currentSite);
        // Find oil rigs associated with this site
        const rigs = oilRigs.filter(rig => 
          currentSite.oilRigs.includes(rig.id)
        );
        setSiteOilRigs(rigs);
      }
    }
  }, [siteId, sites, oilRigs]);

  if (!site) {
    return <Page left={0}>Loading...</Page>;
  }

  return (
    <Page left={0}>
      <div className={styles.container}>
        <Button label="Back" onClick={() => navigate('/')} className={styles.backButton} />
        
        <div className={styles.siteInfo}>
          <div className={styles.siteId}>Site ID: {site.id}</div>
          <div className={styles.siteName}>{site.name}</div>
          <div className={styles.location}>
            <FiMapPin className={styles.locationIcon} />
            {site.country}
          </div>
        </div>
        
        <div className={styles.oilRigsSection}>
          <Heading className={styles.sectionTitle}>Oil Rigs at site</Heading>
          {siteOilRigs.length > 0 ? (
            <div className={styles.oilRigsGrid}>
              {siteOilRigs.map((rig) => (
                <div key={rig.id} className={styles.oilRigCard}>
                  <div className={styles.rigName}>{rig.name}</div>
                  <div className={styles.rigManufacturer}>{rig.manufacturer}</div>
                  <div className={styles.rigId}>ID: {rig.id}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noRigs}>
              <Text>No oil rigs associated with this site.</Text>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export { SiteDetails };