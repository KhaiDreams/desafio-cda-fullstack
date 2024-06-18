const productionConfig = {
  API: process.env.API,
  SECRET: process.env.SECRET,
};

const developmentConfig = {
  API: process.env.API || "http://localhost:8080",
  SECRET: process.env.SECRET || "WIOJNWUNWEFEF3FEFM3PWEMDE",
};

const getConfig = () => {
  if (process.env.NODE_ENV === "production") {
    return productionConfig;
  } else {
    return developmentConfig;
  }
};

export default getConfig();
