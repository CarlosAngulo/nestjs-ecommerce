import {
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-uploading.utils';

@Controller('files')
export class FileManagerController {

    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        })
    )
    async uploadedFile( @UploadedFile() file ) {
        console.log('.....', file)
        const response = await {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }

    @Post('multiple')
    @UseInterceptors( FilesInterceptor('images', 20, {
        storage: diskStorage({
            destination: './files',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async uploadMultipleFiles( @UploadedFiles() files ) {
        const response = [];
        await files.forEach( file => {
            const fileReponse = {
                originalname: file.originalname,
                filename: file.filename,
            };
            response.push(fileReponse);
        });
        return response;
    }

    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: './files' });
    }
}