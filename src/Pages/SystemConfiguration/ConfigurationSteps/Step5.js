import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Step5() {
  const { status, config } = useSelector((state) => state.config);
  const dispatch = useDispatch();

  return <>step5</>;
}

export default Step5;
