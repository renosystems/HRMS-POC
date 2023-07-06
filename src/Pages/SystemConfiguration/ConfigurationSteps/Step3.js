import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Step3() {
  const { status, config } = useSelector((state) => state.config);
  const dispatch = useDispatch();

  return <>step3</>;
}

export default Step3;
