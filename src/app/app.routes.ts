import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'books',
    loadComponent: () => import('./features/books/book-list/book-list.component').then(m => m.BookListComponent)
  },
  {
    path: 'members',
    loadComponent: () => import('./features/members/member-list/member-list.component').then(m => m.MemberListComponent)
  },
  {
    path: 'borrowings',
    loadComponent: () => import('./features/borrowings/borrowing-list/borrowing-list.component').then(m => m.BorrowingListComponent)
  },
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  }
];
