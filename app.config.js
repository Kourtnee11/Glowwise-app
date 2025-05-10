module.exports = {
  expo: {
    name: "GlowWise App",
    slug: "glowwise-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
      bundleIdentifier: "com.glowwise.app",
      backgroundColor: "#ffffff",
      config: {
        ios: {
          bundleIdentifier: "com.glowwise.app",
        },
        android: {
          package: "com.glowwise.app",
        },
      },
    },
    scheme: "glowwise",
    host: {
      lan: {
        ip: "0.0.0.0",
        port: 19000
      }
    }
  },
};
