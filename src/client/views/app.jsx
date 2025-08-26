import React from "react";
import { Routes, Route } from "react-router-dom";
import { TopBar } from "@oliasoft-open-source/react-ui-library";
import Logo from "client/views/images/logo.svg";

import { Main } from "client/views/main/main";
import { OilRigsView } from "client/views/oil-rigs/oil-rigs";
import { SiteDetails } from "client/views/site-details/site-details";

export const App = () => {
  return (
    <>
      <TopBar
        title={{
          logo: <img src={Logo} alt="logo" style={{ height: 28 }} />,
        }}
      />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/oil-rigs" element={<OilRigsView />} />
        <Route path="/site/:siteId" element={<SiteDetails />} />
      </Routes>
    </>
  );
};
