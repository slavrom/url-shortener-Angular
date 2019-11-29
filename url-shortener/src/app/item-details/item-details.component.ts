import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Shortening } from '../models/shortening-response.interface';
import { StorageService } from "../storage.service";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  id: string = '';
  shortenings: Shortening[] = [];
  details: object;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      res => this.id = res.id
    )
      
    this.shortenings = JSON.parse(localStorage.getItem('shortenings'));

    this.details = this.shortenings.find(item => item.code == this.id);
  }

  onDelete() {
    this.storageService.delete(this.id);
    this.router.navigateByUrl('/shortener');
  }
}
