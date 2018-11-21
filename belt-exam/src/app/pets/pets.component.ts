import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pet } from '../models';

import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
})
export class PetsComponent implements OnInit {
  @Input() selPet: Pet;
  pets: Pet[] = [];
  selectedPet: Pet;
  constructor(
    private readonly httpService: HttpService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    // console.log(this.httpService);
    // getting all book database from service
    this.httpService.getPets().subscribe(pets => {
      console.log('pets from observable', pets);
      this.pets = pets;
    });
  }

  // onSelect(pet: Pet): void {
  //   console.log('Selecting.....', pet);
  //   // this is simple version of if statement        true : false
  //   this.selectedPet = this.selectedPet === pet ? null : pet;
  // }

  onCreate(pet: Pet): void {
    console.log('creating pet', pet);
    this.httpService.createPet(pet).subscribe(createdPet => {
      // this.books.push(createdBook);

      this.pets = [...this.pets, createdPet];
    });
    // this.books.push(pet);
  }
  onEdit(id: number) {
    console.log('editing pet');
  }

  // onDelete(id: number) {
  //   console.log('Deleting pet');
  //   this.httpService.deletePet(id).subscribe(deletedPet => {
  //     this.pets = this.pets.filter(pet => pet._id !== deletedPet._id);
  //   });
  // }
  onEvent(event: Event) {
    console.log('Eventing.............');

    event.stopPropagation();
  }
}
