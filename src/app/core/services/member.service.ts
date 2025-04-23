import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Member } from '../../shared/models/member.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/members`;

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  getMember(id: string): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/${id}`);
  }

  createMember(member: Omit<Member, 'id'>): Observable<Member> {
    return this.http.post<Member>(this.apiUrl, member);
  }

  updateMember(id: string, member: Partial<Member>): Observable<Member> {
    return this.http.patch<Member>(`${this.apiUrl}/${id}`, member);
  }

  deleteMember(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addBorrowedBook(memberId: string, bookId: string): Observable<Member> {
    return this.http.post<Member>(`${this.apiUrl}/${memberId}/borrow/${bookId}`, {});
  }

  removeBorrowedBook(memberId: string, bookId: string): Observable<Member> {
    return this.http.post<Member>(`${this.apiUrl}/${memberId}/return/${bookId}`, {});
  }
} 