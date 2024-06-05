"use client";
import { getData } from "@/api/api";
import React, { useEffect } from "react";

const PreFetch = () => {
  useEffect(() => {
    const prefetchData = async () => {
      await getData("");
    };
    prefetchData();
  }, []);
  return <div style={{ display: "none" }}>PreFetch</div>;
};

export default PreFetch;
