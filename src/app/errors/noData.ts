import { Request, Response } from 'express';


const noData = (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'No Data Found!',
    data: [],
  });
};

export default noData;
