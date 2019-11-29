import { Component, OnInit } from '@angular/core';
import { ShortenerApiService } from '../shortener-api.service';
import { StorageService } from '../storage.service';
import { Shortening } from '../models/shortening-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shortener',
  templateUrl: './shortener.component.html',
  styleUrls: ['./shortener.component.css']
})
export class ShortenerComponent implements OnInit {
  public url = '';
  public shortenings: Shortening[] = [];
  public name = '';

  constructor(
    private shortAPI: ShortenerApiService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit():void {
    this.updateShortenings();
    console.log(this.url)
  }

  onSubmit() {
    if (!this.url) {
      return;
    }

    this.shortAPI.shortenUrl(this.url).subscribe((res) => {
      res.result.name = this.name;
      this.storageService.saveShortening(res.result);
      this.updateShortenings();
    });
  }

  updateShortenings():void {
    this.shortenings = this.storageService.getShortenings();
  }

  goToDetails(code):void {
    this.router.navigate(['shortener/item-details', code])
  }

  onDelete(code) {
    this.storageService.delete(code);
    this.updateShortenings();
  }
}
