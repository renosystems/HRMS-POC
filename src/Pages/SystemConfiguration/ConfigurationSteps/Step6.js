import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Step6() {
  const { status, config } = useSelector((state) => state.config);
  const dispatch = useDispatch();

  return <>step6</>;
}

export default Step6;
