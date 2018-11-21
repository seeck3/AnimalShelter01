import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Pet } from '../../models';

import { HttpService } from '../../services/http.service';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  pet = new Pet();
  errors: string[] = [];
  @Output()
  createPet = new EventEmitter<Pet>();
  constructor(
    private readonly httpService: HttpService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    console.log('submitting form', form.value);

    // this.books.push(form.value);
    this.httpService.createPet(form.value).subscribe(
      () => {
        this.createPet.emit(form.value);
        this.pet = new Pet();
        form.reset();
        this.router.navigateByUrl('/');
      },
      error => {
        console.log(error);
        this.errors.push(error);
      }
    );
  }
}
