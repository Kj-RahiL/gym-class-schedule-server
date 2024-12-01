import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';


const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({origin:"http://localhost:3000",credentials:true}));

app.use('/api', router);


app.get('/', (req: Request, res: Response) => {
  res.send(`
      <html>
        <head>
          <title>Gym Class Schedule Management</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .content {
              text-align: justify;
              font-size: 36px;
              width: 80%; 
            }
          </style>
        </head>
        <body>
          <div class="content">
            Boom Boom 💥💥!! Gym Class Schedule and Management Server App is running...
          </div>
        </body>
      </html>
    `);
});

app.use(globalErrorHandler);

// not found route error
app.use(notFound);

export default app;
