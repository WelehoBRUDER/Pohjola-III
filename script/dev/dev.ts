const DEVTOOLS = {
  ENABLED: false,
  ONE_PUNCH: false,
  NO_CD: false,
  FREE_CAST: false,
  GOD: false,
};

if (localStorage.getItem("devtools") === "true") DEVTOOLS.ENABLED = true;
