import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Member } from '../../../shared/models/member.model';

@Component({
  selector: 'app-member-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  protected readonly memberForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['']
  });

  @Input() member?: Member;
  @Output() save = new EventEmitter<Omit<Member, 'id' | 'borrowedBooks'>>();
  @Output() cancel = new EventEmitter<void>();


  ngOnInit(): void {
    this.initializeForm();
  }

  protected initializeForm(): void {
    if (this.member) {
      this.memberForm.patchValue({
        fullName: this.member.fullName,
        email: this.member.email,
        phoneNumber: this.member.phoneNumber
      });
    }
  }

  protected onSubmit(): void {
    if (this.memberForm.valid) {
      this.save.emit(this.memberForm.value);
    }
  }

  protected onCancel(): void {
    this.cancel.emit();
  }
} 