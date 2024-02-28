import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix("api");
    app.enableCors({ credentials: true });

    const config = new DocumentBuilder().setTitle("Web-Admin-Backend").build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("swagger", app, document);

    app.use(cookieParser());

    await app.listen(3001);
}
bootstrap();
