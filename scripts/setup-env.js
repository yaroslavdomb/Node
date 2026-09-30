import fs from "node:fs";

const envs = ["local", "cloud"];
const examplePath = "src/config/.env.example";

envs.forEach((env) => {
  const target = `src/config/.env.${env}`;
  try {
    if (!fs.existsSync(target)) {
      fs.copyFileSync(examplePath, target);
      console.log(`Created ${target}`);
    }
  } catch (err) {
    console.warn(`Could not create ${target}: ${err.message}`);
  }
});
