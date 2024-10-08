// src/custom.d.ts
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            file?: Multer.File;
            files?: Multer.File[] | { [fieldname: string]: Multer.File[] };
        }
    }
}
