const { createTheme } = require("@mui/material");

export default createTheme({
  components: {
    // Name of the component
    MuiDialog: {
      styleOverrides: {
        // Name of the slot
        paper: {
          // Some CSS
          background:
            "linear-gradient(192.04deg, #181818 19.27%, #1C1C1C 65.1%, #3A3A3A 100%)",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#c1f4ff",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            color: "#c1f4ff",
          },
          "& .MuiInputLabel-root": {
            color: "#c1f4ff",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          position: "absolute",
          bottom: 0,
          right: 0,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          top: "-4px!important",
        },
        shrink: {
          top: "0px!important",
        },

        root: {
          top: "-10px",
          color: "white",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: "#c1f4ff",
          paddingLeft: "15px",
          paddingTop: "12px",
          "& ~ svg": {
            fill: "#c1f4ff",
          },
          "& ~ fieldset": {
            borderColor: "#c1f4ff!important",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          width: "100%",
          "&.MuiButtonBase-root": {
            justifyContent: "flex-start",
            padding: "6px 16px",
          },
        },
      },
    },
  },
});
