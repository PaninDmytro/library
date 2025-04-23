import { ChangeDetectionStrategy, Component, inject, DestroyRef } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from "@angular/common";
import { ToastrService } from 'ngx-toastr';

import { MemberService } from '../../../core/services/member.service';
import { Member } from '../../../shared/models/member.model';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberListComponent {
  private readonly memberService = inject(MemberService);
  private readonly toastr = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly members$: Observable<Member[]> = this.memberService.getMembers()
    .pipe(takeUntilDestroyed(this.destroyRef));

  protected trackByFn(index: number, item: Member): string {
    return item.id;
  }

  protected createMember(member: Omit<Member, 'id'>): void {
    this.memberService.createMember(member)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (createdMember) => {
          this.toastr.success('Member created successfully');
        },
        error: (error) => {
          this.toastr.error('Failed to create member');
        }
      });
  }

  protected updateMember(id: string, member: Partial<Member>): void {
    this.memberService.updateMember(id, member)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updatedMember) => {
          this.toastr.success('Member updated successfully');
        },
        error: (error) => {
          this.toastr.error('Failed to update member');
        }
      });
  }

  protected deleteMember(id: string): void {
    this.memberService.deleteMember(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastr.success('Member deleted successfully');
        },
        error: (error) => {
          this.toastr.error('Failed to delete member');
        }
      });
  }

  protected addBorrowedBook(memberId: string, bookId: string): void {
    this.memberService.addBorrowedBook(memberId, bookId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (member) => {
          this.toastr.success('Book added to borrowed books');
        },
        error: (error) => {
          this.toastr.error('Failed to add book to borrowed books');
        }
      });
  }

  protected removeBorrowedBook(memberId: string, bookId: string): void {
    this.memberService.removeBorrowedBook(memberId, bookId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (member) => {
          this.toastr.success('Book removed from borrowed books');
        },
        error: (error) => {
          this.toastr.error('Failed to remove book from borrowed books');
        }
      });
  }
}
