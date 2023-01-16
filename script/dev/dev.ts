interface DevTools {
  [ENABLED: string]: boolean;
  ONE_PUNCH: boolean;
  NO_CD: boolean;
  FREE_CAST: boolean;
  GOD: boolean;
}

const DEVTOOLS: DevTools = {
  ENABLED: false,
  ONE_PUNCH: false,
  NO_CD: false,
  FREE_CAST: false,
  GOD: false,
};

if (localStorage.getItem("devtools") === "true") DEVTOOLS.ENABLED = true;
