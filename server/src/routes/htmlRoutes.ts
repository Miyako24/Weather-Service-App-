import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router, Request, Response } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// DONE: Define route to serve index.html
router.get('*', (_req: Request, res: Response) => { 
    res.sendFile(path.resolve(__dirname, '../../../client/dist', 'index.html'));
  });

export default router;
