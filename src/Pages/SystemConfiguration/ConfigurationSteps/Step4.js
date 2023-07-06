import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Step4() {
  const { status, config } = useSelector((state) => state.config);
  const dispatch = useDispatch();

  return <>step4</>;
}

export default Step4;
