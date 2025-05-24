import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function start() {
  const app = await NestFactory.create(AppModule, {
    logger: ["debug", "error", "warn"],
  });
  const config = app.get(ConfigService);
  const API_PORT = config.get<number>("API_PORT") || 33333;
  app.setGlobalPrefix("api");
  await app.listen(API_PORT, () => {
    console.log(`Server started at: http://localhost:${API_PORT}`);
  });
}
start();
