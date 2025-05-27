import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

async function start() {
  const app = await NestFactory.create(AppModule, {
    logger: ["debug", "error", "warn"],
  });
  const config = app.get(ConfigService);
  const API_PORT = config.get<number>("API_PORT") || 33333;
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix("api");
  await app.listen(API_PORT, () => {
    console.log(`Server started at: http://localhost:${API_PORT}`);
  });
}
start();
