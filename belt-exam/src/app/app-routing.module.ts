import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromPets from './pets';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pets',
    pathMatch: 'full',
  },
  {
    path: 'pets',
    children: [
      {
        path: '',
        component: fromPets.PetsComponent,
      },
      {
        path: 'new',
        component: fromPets.NewComponent,
      },
      {
        path: 'edit/:pet_id',
        component: fromPets.EditComponent,
      },
      // {
      //   path: 'like/:pet_id',
      //   component: fromPets.DetailComponent,
      //   // redirectTo: ':pet_id',
      //   // pathMatch: 'full',
      // },
      {
        path: ':pet_id',
        component: fromPets.DetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
