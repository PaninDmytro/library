import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Book } from '../../shared/models/book.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/books`;

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  searchBooks(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/search`, { params: { query } });
  }

  createBook(book: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(id: string, book: Partial<Book>): Observable<Book> {
    return this.http.patch<Book>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  borrowBook(bookId: string, memberId: string): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/${bookId}/borrow`, { memberId });
  }

  returnBook(bookId: string, memberId: string): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/${bookId}/return`, { memberId });
  }

  getBorrows(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/borrows/all`);
  }
} 