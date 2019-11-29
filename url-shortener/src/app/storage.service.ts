import { Injectable } from '@angular/core';
import { Shortening } from './models/shortening-response.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  shortenings: Shortening[] = [];

  constructor() {
    this.shortenings = this.getShortenings();
  }

  saveShortening(shortening: Shortening): void {
    this.shortenings.push(shortening);
    this.updateStorage(this.shortenings);
  }

  getShortenings(): Shortening[] {
    const shorteningsString = localStorage.getItem('shortenings');

    if (!shorteningsString) {
      return [];
    }

    try {
      return JSON.parse(shorteningsString);
    } catch {
      return [];
    }
  }

  updateStorage(shortenings: Shortening[]): void {
    localStorage.setItem('shortenings', JSON.stringify(shortenings));
  }

  delete(code: string): void {
    this.shortenings = this.shortenings.filter(item => item.code !== code);
    this.updateStorage(this.shortenings);
  }
}
