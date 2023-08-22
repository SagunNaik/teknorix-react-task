import React from "react";
import "./App.scss";
import Layout from "./component/UI/layout";
import CareerSearch from "./component/career/career-search.layout";
import { Routes, Route } from "react-router-dom";
import CareerDetailPage from "./component/career/careerDetail/career-detail";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path={"/"} element={<CareerSearch />} />

          <Route path={"/job-detail/"}>
            <Route path={":jobId"} element={<CareerDetailPage />} />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
