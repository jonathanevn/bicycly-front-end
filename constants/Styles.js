import { StyleSheet } from "react-native";

/* --- BUTTONS ---- */

const button = StyleSheet.create({
  primary: {
    height: 50,
    width: 240,
    backgroundColor: "#ffc200",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50
  },

  secondary: {
    height: 50,
    width: 240,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#ffc200",
    borderWidth: 1
  }
});

/* --- TEXTS ---- */

const text = StyleSheet.create({
  company: {
    fontFamily: "Karla-Regular",
    fontSize: 60,
    color: "#262626"
  },
  accroche: {
    fontFamily: "Karla-Regular",
    fontSize: 18,
    color: "#262626",
    lineHeight: 25
  },
  h1: {
    fontFamily: "Karla-Bold",
    fontSize: 20,
    color: "#262626"
  },
  h2: {
    fontFamily: "Karla-Bold",
    fontSize: 18,
    color: "#262626"
  },
  h3: {
    fontFamily: "Karla-Bold",
    fontSize: 15,
    color: "#262626"
  },
  p: {
    fontFamily: "Karla-Regular",
    fontSize: 14,
    color: "#585858",
    lineHeight: 18
  },
  p2: {
    fontFamily: "Karla-Regular",
    fontSize: 16,
    color: "#262626"
  },
  textButton: {
    fontFamily: "Karla-Regular",
    fontSize: 18,
    color: "#262626"
  },

  bikeCategory: {
    fontFamily: "Karla-Regular",
    fontSize: 14,
    color: "#ffc200"
  },
  localisation: {
    fontFamily: "Karla-Regular",
    fontSize: 14,
    color: "#c2c2c2"
  },
  rate: {
    fontFamily: "Karla-Regular",
    fontSize: 14,
    color: "#c2c2c2"
  },
  placeholder: {
    fontFamily: "Karla-Regular",
    fontSize: 15,
    color: "#c2c2c2",
    justifyContent: "flex-start"
  },
  inputCompleted: {
    fontFamily: "Karla-Regular",
    fontSize: 15,
    color: "#262626"
  },
  fullPrice: {
    fontFamily: "Karla-Bold",
    fontSize: 18,
    color: "#262626",
    justifyContent: "center"
  },
  pricePerDay: {
    fontFamily: "Karla-Italic",
    fontSize: 13,
    color: "#c2c2c2",
    justifyContent: "center"
  },
  cgvText: {
    fontFamily: "Karla-Regular",
    fontSize: 12,
    color: "#262626",
    justifyContent: "center"
  }
});

/* --- AVATARS ---- */

const avatar = StyleSheet.create({
  big: {
    width: 122,
    height: 122,
    borderRadius: 122 / 2
  },
  medium: {
    width: 66,
    height: 66,
    borderRadius: 66 / 2
  },
  small: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2
  }
});

/* --- BackgroundColor--- */

const background = StyleSheet.create({
  background: {
    backgroundColor: "#f8f8f8"
  }
});

export { button, text, avatar, background };
