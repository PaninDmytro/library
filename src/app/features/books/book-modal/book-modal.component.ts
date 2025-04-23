import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

import { Book } from "../../../shared/models/book.model";

@Component({
  selector: 'app-book-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.scss'
})
export class BookModalComponent implements OnChanges {
  @Input() book: Partial<Book> | null = null;
  @Output() save = new EventEmitter<Omit<Book, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      isbn: ['', Validators.required],
      availableCopies: [0, [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  ngOnChanges() {
    if (this.book) {
      this.form.patchValue(this.book);
    }
  }

  submit(): void {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

  close(): void {
    this.cancel.emit();
  }
}
