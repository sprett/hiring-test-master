import React from 'react';
import {Heading, Page, Spacer} from '@oliasoft-open-source/react-ui-library';
import {Sites} from 'client/components/sites/sites';
import {OilRigs} from 'client/components/oil-rigs/oil-rigs';

export const Main = ({}) => {
  return (
    <Page left={0}>
      <Heading top>Hiring Challenge</Heading>
      <Sites/>
      <Spacer />
      <OilRigs/>
    </Page>
  );
};
