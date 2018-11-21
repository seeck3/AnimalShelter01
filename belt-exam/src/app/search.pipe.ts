import { Pipe, PipeTransform } from '@angular/core';
import { Pet } from './models';

@Pipe({
  name: 'filter',
})
export class SearchPipe implements PipeTransform {
  transform(value: Array<Pet>, searchEngine: string): Array<Pet> {
    return value.filter(pet => {
      return pet.type.toLowerCase().includes(searchEngine.toLowerCase());
    });
  }
}
