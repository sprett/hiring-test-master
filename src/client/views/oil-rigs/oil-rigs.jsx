import React from 'react';
import {Heading, Page} from '@oliasoft-open-source/react-ui-library';
import {OilRigs} from 'client/components/oil-rigs/oil-rigs';

export const OilRigsView = ({}) => {
  return (
    <Page left={0}>
      <Heading top>Oil Rigs</Heading>
      <OilRigs/>
    </Page>
  );
};
