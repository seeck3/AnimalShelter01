import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { HttpService } from '../../services/http.service';
import { Pet } from 'src/app/models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @Output()
  editPet = new EventEmitter<any>();
  @Input()
  editedPet;
  pet: Pet;

  errors = [];
  constructor(
    private readonly httpService: HttpService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(params => params.get('pet_id')),
        switchMap(petId => this.httpService.getPet(petId))
      )
      .subscribe(
        pet => ((this.pet = pet), console.log('thiszzzzzzz', this.pet))
      );
  }
  onSubmit(pet_id, form) {
    console.log('pet_id', pet_id);
    console.log('form_value', form.value);
    this.httpService.editPet(pet_id, form.value).subscribe(() => {
      this.editPet.emit(form.value);
      this.pet = this.pet;
      console.log('this.editedPet', this.pet);
      this.router.navigateByUrl('/');
    });
  }
}
