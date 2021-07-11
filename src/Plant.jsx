import React, { useState } from "react";
import { IMAGE_SRC } from "./plantImages/MapNameToImage";
import Youtube from "react-youtube";
import AddLocation from "@material-ui/icons/AddLocation";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import ErrorIcon from "@material-ui/icons/Error";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  red: {
    color: theme.palette.getContrastText(red[900]),
    backgroundColor: red[900],
    "& > *": {
      margin: theme.spacing(1),
    },
    fontSize: "0.4rem",
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
}));

export const Plant = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("#7A1DC9");
  const buttonStyles = {
    color: `${color}`,
  };
  const classes = useStyles();
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return open ? (
    <>
      <Youtube videoId={data.videoId} opts={opts} />
    </>
  ) : (
    <>
      <img src={IMAGE_SRC[data.name]} width="140px" alt="plant_image" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: "Avenir",
              fontSize: "0.6rem",
              color: "#7A1DC9",
            }}
          >
            {data.city}
          </span>
          <Tooltip title="Locación" arrow>
            <AddLocation style={{ color: "#7A1DC9" }} />
          </Tooltip>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              color: "#7A1DC9",
              fontFamily: "Avenir",
              fontSize: "0.6rem",
            }}
          >
            {data.name}
          </p>
          <Tooltip title="Categoría de UICN" arrow>
            <Avatar className={classes.red}>{data.iucnDegree}</Avatar>
          </Tooltip>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: "Avenir",
              fontSize: "0.6rem",
              color: "#7A1DC9",
            }}
          >
            {data.year}
          </span>
          <CalendarTodayIcon fontSize="small" style={{ color: "#7A1DC9" }} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "Avenir",
              fontSize: "0.6rem",
              color: "#7A1DC9",
            }}
          >
            {data.reason}
          </span>
          <Tooltip title="Razon de extinción" arrow>
            <ErrorIcon fontSize="small" style={{ color: "#7A1DC9" }} />
          </Tooltip>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <YouTubeIcon
            onClick={() => setOpen(true)}
            onMouseEnter={() => {
              setColor("#c83f49");
            }}
            onMouseLeave={() => {
              setColor("#7A1DC9");
            }}
            fontSize="large"
            style={buttonStyles}
          />
        </div>
      </div>
    </>
  );
};
