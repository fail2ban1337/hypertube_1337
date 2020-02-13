import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { t } from '../../i18n';


const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/fail2ban1337/hypertube_1337"
      >
        HyperTube
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        {t("footer.made_with")}{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        {t("footer.in_1337")}
      </Typography>
      <Copyright />
    </footer>
  );
};

export default Footer;
