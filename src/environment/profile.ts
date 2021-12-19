type ProfileTypes = "development" | "test" | "production";

let env = process.env.NODE_ENV;
env = (env) ? env.trim() as ProfileTypes : env;

const development = (env === "development");
const test = (env === "test");
const production = (env === "production");

export { development, test, production, env as Env };
