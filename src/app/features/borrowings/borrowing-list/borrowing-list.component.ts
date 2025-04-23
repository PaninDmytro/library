import { ChangeDetectionStrategy, Component, inject, DestroyRef } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { BookService } from '../../../core/services/book.service';
import { BorrowingRecord } from '../models/borrowing-record.interface';

@Component({
  selector: 'app-borrowing-list',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './borrowing-list.component.html',
  styleUrls: ['./borrowing-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BorrowingListComponent {
  private readonly bookService = inject(BookService);
  private readonly toastr = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly borrowings$: Observable<BorrowingRecord[]> = this.bookService.getBorrows()
    .pipe(takeUntilDestroyed(this.destroyRef));

  protected trackByFn(index: number, item: BorrowingRecord): string {
    return `${item.book.id}-${item.member.id}`;
  }

  protected returnBook(bookId: string, memberId: string): void {
    this.bookService.returnBook(bookId, memberId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastr.success('Book returned successfully');
        },
        error: (error) => {
          this.toastr.error('Failed to return book');
        }
      });
  }

  protected isOverdue(dueDate: Date): boolean {
    return new Date() > new Date(dueDate);
  }
} 