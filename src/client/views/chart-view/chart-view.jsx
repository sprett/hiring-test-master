import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart } from 'client/components/chart/chart';
import { Button, Page } from '@oliasoft-open-source/react-ui-library';

export const ChartView = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <Page left={0}>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px', marginLeft: '20px' }}>
        <Button onClick={handleBackClick} label="Back" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Chart />
      </div>
    </Page>
  );
};
