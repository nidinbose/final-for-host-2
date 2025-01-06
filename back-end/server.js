import express from 'express';
import connection from './connection.js';
import env from 'dotenv';
import router from './router.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

env.config();
const app = express();

const distPath = path.join(
    'C:',
    'Users',
    'nidin',
    'OneDrive',
    'Desktop',
    'FINAL WEBPAGES',
    'Website-edu',
    'my-project',
    'dist'
);

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api', router);
app.use(express.static(distPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

connection()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running at http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
    });
