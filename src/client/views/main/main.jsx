import React from 'react';
import { Page } from '@oliasoft-open-source/react-ui-library';
import { SitesView } from './sites-view';

export const Main = ({}) => {
  return (
    <Page left={0}>
      <SitesView />
    </Page>
  );
};
