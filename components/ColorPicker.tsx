import React, { useState, FC, SyntheticEvent } from "react";
import { Box, Slider, Typography, Stack, Paper } from "@mui/material";

type RGB = {
  r: number;
  g: number;
  b: number;
}
const ColorPicker: FC = () => {
  const defaultRGB: RGB = {
    r: 30,
    g: 30,
    b: 30
  }
  const [rgb, setRGB] = useState(defaultRGB);
  const { r, g, b } = rgb;
  const getVal = (event: Event, val: number | number[]) => {
    setRGB((prev) => ({ ...prev, [(event.target as HTMLInputElement).name]: val as number }));
  };
  return (
    <>
      <Box
        sx={{
          boxShadow: 5,
          borderRadius: 2,
          p: 2,
          mt: 2,
          width: 400
        }}
      >
        <Stack sx={{ height: 200 }} spacing={1} direction="row">
          <Typography gutterBottom>Red</Typography>
          <Slider
            name="r"
            orientation="vertical"
            defaultValue={30}
            valueLabelDisplay="on"
            onChange={getVal}
            min={0}
            max={255}
          />
          <Typography gutterBottom>Green</Typography>
          <Slider
            name="g"
            orientation="vertical"
            defaultValue={30}
            valueLabelDisplay="on"
            onChange={getVal}
            min={0}
            max={255}
          />
          <Typography gutterBottom>Blue</Typography>
          <Slider
            name="b"
            orientation="vertical"
            defaultValue={30}
            valueLabelDisplay="on"
            onChange={getVal}
            min={0}
            max={255}
          />
          <Box
            sx={{
              width: 200,
              p: 1,
              display: "grid",
              gap: 1
            }}
          >
            <Paper variant="outlined" sx={{ bgcolor: `rgb(${r},0,0)` }} />
            <Paper variant="outlined" sx={{ bgcolor: `rgb(0,${g},0)` }} />
            <Paper variant="outlined" sx={{ bgcolor: `rgb(0,0,${b})` }} />
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          boxShadow: 5,
          borderRadius: 2,
          p: 2,
          mt: 2,
          height: 100,
          width: 400,
          backgroundColor: `rgb(${r},${g},${b})`
        }}
      />
    </>
  );
}

export default ColorPicker;
