import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {}

  public create(numberOfRows: number) {
    return this.http.post(`${this.apiUrl}/grid`, { numberOfRows });
  }

  public update(gridId: number, numberOfRows: number, operation: string) {
    return this.http.patch(`${this.apiUrl}/grid/${gridId}`, { numberOfRows, operation });
  }

}
