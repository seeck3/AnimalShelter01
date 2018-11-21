import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { WebsocketService } from '../services/websocket.service';

import { Pet } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // private readonly base = 'http://59498bce6d49df0011102cfc.mockapi.io/books';
  private readonly base = '/api/pets';
  constructor(
    private readonly http: HttpClient,
    private readonly websocketService: WebsocketService
  ) {}

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.base);
  }

  getPet(id: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.base}/${id}`);
  }
  // getPet1(id: string): Observable<Pet> {
  //   return this.http.get<Pet>(`${this.base}/${id}`);
  // }
  // editPet(pet, cb) {
  //   this.http.put(this.base + pet._id, pet).subscribe(data => cb(data));
  // }
  editPet(id: number, callback): Observable<Pet> {
    return this.http.put<Pet>(`${this.base}/${id}`, callback);
  }

  createPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.base, pet);
  }

  deletePet(id: number): Observable<Pet> {
    return this.http.delete<Pet>(`${this.base}/${id}`);
  }

  likePet(id: number, callback): Observable<Pet> {
    return this.http.put<Pet>(`${this.base}/${id}/like`, callback);
  }
}
