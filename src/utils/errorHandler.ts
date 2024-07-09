import { Request, Response, NextFunction } from "express";


export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
   console.error(err.stack);
   handleInternalError(res); 
 }

export function handleError(res: Response, status: number, message: string): void {
   res.status(status).json({ success: false, error: message });
 }
 
export function handleNotFound(res: Response): void {
  res.status(404).json({ success: false, error: "Not found" });
}

export function handleInternalError(res: Response): void {
  res.status(500).json({ success: false, error: "Internal server error" });
}
