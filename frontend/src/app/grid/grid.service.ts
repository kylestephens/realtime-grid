import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {}

  public get(gridId: number) {
    return this.http.get(`${this.apiUrl}/grid/${gridId}`);
  }

}
