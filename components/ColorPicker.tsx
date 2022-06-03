/*
Make this application dynamic to change color on slider movement.
Small boxes will fill colors red, green, blue [top to bottom]
Big box will show the combined color in RGB(red, green, blue)
*/
import { useState } from "react";
import { Box, Slider, Typography, Stack, Paper } from "@mui/material";

export default function () {
    const [colorPallets, setcolorPallets] = useState({
        red:30,
        green:30,
        blue:30
    });
    const getVal = (e: Event, val: number | number[]) =>{
        let name = (e.target as HTMLInputElement).name;
        setcolorPallets({...colorPallets, [name]:val});
    }
    const {red, green, blue} = colorPallets;

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
                        name="red"
                        orientation="vertical"
                        defaultValue={30}
                        valueLabelDisplay="on"
                        onChange={getVal}
                        min={0}
                        max={255}
                    />
                    <Typography gutterBottom>Green</Typography>
                    <Slider
                        name="green"
                        orientation="vertical"
                        defaultValue={30}
                        valueLabelDisplay="on"
                        onChange={getVal}
                        min={0}
                        max={255}
                    />
                    <Typography gutterBottom>Blue</Typography>
                    <Slider
                        name="blue"
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
                        <Paper variant="outlined" sx={{ bgcolor: `rgb(${red},0,0)` }} />
                        <Paper variant="outlined" sx={{ bgcolor: `rgb(0,${green},0)` }} />
                        <Paper variant="outlined" sx={{ bgcolor: `rgb(0,0,${blue})` }} />
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
                    backgroundColor: `rgb(${red},${green},${blue})`
                }}
            />
        </>
    );
}
