import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { sitesLoaded } from 'client/store/entities/sites/sites';
import styles from './chart.module.less';

export const Chart = () => {
  const dispatch = useDispatch();
  const sites = useSelector((state) => state.entities.sites.list);
  const loading = useSelector((state) => state.entities.sites.loading);

  useEffect(() => {
    dispatch(sitesLoaded());
  }, [dispatch]);

  // Transform data for the chart
  const chartData = sites.map(site => ({
    name: site.name,
    oilRigs: site.oilRigs.length,
    country: site.country
  }));

  if (loading) {
    return (
      <div className={styles.chartContainer}>
        <div className={styles.chartContent}>
          <h2 className={styles.chartTitle}>Oil Rigs by Site</h2>
          <div className={styles.chartArea}>
            <p className={styles.loadingText}>Loading chart data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartContent}>
        <h2 className={styles.chartTitle}>Oil Rigs by Site</h2>
        <div className={styles.chartArea}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 60, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="name" 
                textAnchor="middle"
                height={80}
                interval={0}
                tick={{ fill: '#000000', fontSize: 12 }}
                axisLine={{ stroke: '#e0e0e0' }}
              />
              <YAxis 
                label={{ value: 'Number of Oil Rigs', angle: -90, position: 'outsideLeft', fill: '#000000'}}
                tick={{ fill: '#000000', fontSize: 12 }}
                axisLine={{ stroke: '#e0e0e0' }}
              />
              <Tooltip 
                formatter={(value, name) => [value, 'Oil Rigs']}
                labelFormatter={(label) => `Site: ${label}`}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  color: '#000000'
                }}
              />
              <Bar 
                dataKey="oilRigs" 
                fill="#666666" 
                name="Oil Rigs"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
