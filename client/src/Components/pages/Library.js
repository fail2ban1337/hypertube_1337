import React from "react";
import Image from "material-ui-image";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({});

const Thumb = () => {
  const classes = useStyle();
  return (
    <div className={classes.thumb - container}>
      <Image
        src="https://specials-images.forbesimg.com/imageserve/5ddc5d83ef7cd600067ba728/960x0.jpg"
        aspectRatio={50}
        imageStyle={{ width: "10%", marginLeft: "45%" }}
      />
      <div className={classes.overlay}>
        <p>Title</p>
        <p>Year</p>
        <p>IMDb</p>
      </div>
    </div>
  );
};

export const Library = () => {
  return <div></div>;
};
