import React from 'react';
import {connect} from 'react-redux';
import {Button, Card, Heading, Column, Row} from '@oliasoft-open-source/react-ui-library';
import {oilRigsLoaded} from "store/entities/oil-rigs/oil-rigs";
import styles from './oil-rigs.module.less';

const OilRigs = ({list, loading, oilRigsLoaded}) => {
  return (
    <Card
      heading={
        <Heading>List of oil rigs</Heading>
      }
    >
      <Row>
        <Column width={200}>
          <Button
            label="Load oil rigs"
            onClick={oilRigsLoaded}
            loading={loading}
            disabled={loading}
          />
        </Column>
        <Column>
          <div className={styles.oilRigsList}>
            {list.length ? (
              <ul>
                {list.map((oilRig, i) => (
                  <li key={i}>
                    {oilRig.id}
                  </li>
                ))}
              </ul>
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
};

const ConnectedOilRigs = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OilRigs);
export {ConnectedOilRigs as OilRigs};
