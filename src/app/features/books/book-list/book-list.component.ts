import { ChangeDetectionStrategy, Component, inject, DestroyRef, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../shared/models/book.model';
import { BookFormComponent } from "../book-form/book-form.component";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, DatePipe, BookFormComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit {
  public books$: Observable<Book[]> = new Observable<Book[]>();
  public isFormOpen = false;
  public selectedBook: Book | null = null;

  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchQuery$ = new Subject<string>();

  protected readonly searchedBooks$: Observable<Book[]> = this.searchQuery$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((query: string) => this.bookService.searchBooks(query)),
    takeUntilDestroyed(this.destroyRef)
  );

  ngOnInit(): void {
    this.getAllBooks();
  }

  protected getAllBooks(): void {
    this.books$ = this.bookService.getBooks();
  }

  protected trackByFn(index: number, item: Book): string {
    return item.id;
  }

  protected searchBooks(query: string): void {
    this.searchQuery$.next(query);
  }

  protected createBook(book: Omit<Book, 'id'>): void {
    this.bookService.createBook(book)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (createdBook) => {
          this.toastr.success('Book created successfully');
        },
        error: (error) => {
          this.toastr.error('Failed to create book');
        }
      });
  }

  protected updateBook(id: string, book: Partial<Book>): void {
    this.bookService.updateBook(id, book)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updatedBook) => {
          this.toastr.success('Book updated successfully');
        },
        error: (error) => {
          this.toastr.error('Failed to update book');
        }
      });
  }

  protected deleteBook(id: string): void {
    this.bookService.deleteBook(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastr.success('Book deleted successfully');
        },
        error: (error) => {
          this.toastr.error('Failed to delete book');
        }
      });
  }

  protected borrowBook(bookId: string, memberId: string): void {
    this.bookService.borrowBook(bookId, memberId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (book) => {
          this.toastr.success('Book borrowed successfully');
        },
        error: (error) => {
          this.toastr.error('Failed to borrow book');
        }
      });
  }

  protected returnBook(bookId: string, memberId: string): void {
    this.bookService.returnBook(bookId, memberId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (book) => {
          this.toastr.success('Book returned successfully');
        },
        error: (error) => {
          this.toastr.error('Failed to return book');
        }
      });
  }

  protected getBorrows(): void {
    this.bookService.getBorrows()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (borrows) => {
          this.toastr.success(`Found ${borrows.length} borrows`);
        },
        error: (error) => {
          this.toastr.error('Failed to get borrows');
        }
      });
  }

  openAddForm(): void {
    this.selectedBook = null;
    this.isFormOpen = true;
  }

  openEditForm(book: Book): void {
    this.selectedBook = book;
    this.isFormOpen = true;
  }

  closeForm(): void {
    this.isFormOpen = false;
    this.selectedBook = null;
  }

  onSaveBook(bookData: Partial<Book>): void {
    if (this.selectedBook) {
      this.updateBook(this.selectedBook.id, bookData);
    } else {
      this.createBook(bookData as Omit<Book, 'id'>);
    }
    this.closeForm();
  }
}
