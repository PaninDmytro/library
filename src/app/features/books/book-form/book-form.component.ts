import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Book } from '../../../shared/models/book.model';
import { BOOK_FORM_FIELDS } from "./constants/book-form.constants";

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  @Input() book?: Book;
  @Output() save = new EventEmitter<Omit<Book, 'id' | 'availableCopies'>>();
  @Output() cancel = new EventEmitter<void>();

  protected readonly formFields = BOOK_FORM_FIELDS;
  protected readonly bookForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    author: ['', [Validators.required]],
    isbn: ['', [Validators.required]],
    genre: ['', [Validators.required]],
    totalCopies: [1, [Validators.required, Validators.min(1)]],
    description: ['']
  });

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    if (this.book) {
      this.bookForm.patchValue({
        title: this.book.title,
        author: this.book.author,
        isbn: this.book.isbn,
        genre: this.book.genre,
        totalCopies: this.book.totalCopies,
        description: this.book.description
      });
    }
  }

  protected onSubmit(): void {
    if (this.bookForm.valid) {
      this.save.emit(this.bookForm.value);
    }
  }

  protected onCancel(): void {
    this.cancel.emit();
  }
}
