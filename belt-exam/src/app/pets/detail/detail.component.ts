import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

import { WebsocketService } from '../../services/websocket.service';
import { Pet } from '../../models';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  @Input()
  pet: Pet;
  pets: Pet[] = [];
  likes: any = 0;
  isDisabled: boolean;

  constructor(
    private readonly httpSerivce: HttpService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(params => params.get('pet_id')),
        switchMap(petId => this.httpSerivce.getPet(petId))
      )
      .subscribe(pet => (this.pet = pet));
  }
  // liked() {
  //   this.likes++;
  // }
  onLike(pet_id, liked) {
    console.log(pet_id);
    // console.log('liking liking~');
    this.httpSerivce.likePet(pet_id, liked).subscribe(() => {
      this.pet.likes++;
      this.likes++;
      console.log(this.likes);
      this.isDisabled = this.likes === 1;
    });
  }
  onDelete(id: number) {
    console.log('Deleting pet');
    this.httpSerivce.deletePet(id).subscribe(deletedPet => {
      console.log('zzzzzzzzzzz', deletedPet);
      this.pets = this.pets.filter(pet => pet._id !== deletedPet._id);
      this.router.navigateByUrl('/');
    });
  }
}
