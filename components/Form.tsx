"use client";

import { Typography } from "@mui/material";
import useStyles from "./Form.style";

const Trustpilot = ({ text }: any) => {
  const {
    classes: { root },
  } = useStyles();
  return <Typography className={root}>{text}</Typography>;
};

export default Trustpilot;
