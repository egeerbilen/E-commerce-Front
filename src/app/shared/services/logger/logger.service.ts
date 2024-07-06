import { Injectable } from '@angular/core';

/**
 *
 */
@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  /**
   * Log.
   * @param message Message.
   */
  public log(message: string): void {
    console.log(`Log: ${message}`);
  }

  /**
   * Warn.
   *
   * @param message Message.
   */
  public warn(message: string): void {
    console.warn(`Warning: ${message}`);
  }

  /**
   * Error.
   * @param message Message.
   */
  public error(message: string): void {
    console.error(`Error: ${message}`);
  }
}
