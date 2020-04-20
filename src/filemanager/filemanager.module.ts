import { Module } from "@nestjs/common";
import { FileManagerController } from "./filemanager.controller"

@Module({
    imports: [],
    controllers: [FileManagerController],
    providers: [],
})
export class FileManagerModule{}