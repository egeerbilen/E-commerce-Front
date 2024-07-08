import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLocalStoregeFavoritesService {
  private _storageKey = 'favoriListesi';

  /**
   * Get all items.
   * @returns An array of items.
   */
  public getItems(): number[] {
    const items = localStorage.getItem(this._storageKey);
    return items ? JSON.parse(items) : [];
  }

  /**
   * Add an item.
   * @param value Value to add.
   */
  public addItem(value: number): void {
    const items = this.getItems();
    if (!items.includes(value)) {
      items.push(value);
      localStorage.setItem(this._storageKey, JSON.stringify(items));
    }
  }

  /**
   * Remove an item.
   * @param value Value to remove.
   */
  public removeItem(value: number): void {
    let items = this.getItems();
    items = items.filter((item) => item !== value);
    localStorage.setItem(this._storageKey, JSON.stringify(items));
  }
}
