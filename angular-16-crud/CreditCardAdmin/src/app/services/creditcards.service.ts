import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreditCard } from '../models/credit-card';
import { map, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditcardsService {

  private apiUrl = "http://localhost:3000/creditcards";

  constructor(private httpClient: HttpClient) { }

  // CRUD functionality

  // Create New Credit Card
  createCreditCard(creditCard: CreditCard): Observable<CreditCard> {
    return this.getLastCreditCardId().pipe(
      mergeMap(lastId => {
        const nextId = (parseInt(lastId.toString(), 10) + 1).toString();
        creditCard.id = nextId;
        return this.httpClient.post<CreditCard>(this.apiUrl, creditCard);
      })
    );
  }

  // Get Last Credit Card ID
  getLastCreditCardId(): Observable<number> {
    return this.httpClient.get<CreditCard[]>(this.apiUrl).pipe(
      map(creditCards => {
        return creditCards.reduce((maxId, card) => Math.max(maxId, parseInt(card.id ?? '0', 10)), 0);
      })
    );
  }

  // Get All Credit Cards
  getCreditCards(): Observable<CreditCard[]>{
    return this.httpClient.get<CreditCard[]>(this.apiUrl);
  }

  //Get Specific Credit Card
  getCreditCardById(id: Number): Observable<CreditCard> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<CreditCard>(url);
  }

  // Update Functinality
  updateCreditCard(creditCard: CreditCard): Observable<CreditCard> {
    const url = `${this.apiUrl}/${creditCard.id}`;
    return this.httpClient.put<CreditCard>(url, creditCard);
  }

  // Delete Functionality
  deleteCreditCard(id: Number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
