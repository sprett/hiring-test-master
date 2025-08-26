import React from 'react';
import {Heading, Page, Spacer} from '@oliasoft-open-source/react-ui-library';
import {Sites} from 'client/components/sites/sites';

export const Main = ({}) => {
  return (
    <Page left={0}>
      <Heading top>Hiring Challenge</Heading>
      <Sites/>
    </Page>
  );
};
