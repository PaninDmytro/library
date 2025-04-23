import { Book } from "../../../shared/models/book.model";
import { Member } from "../../../shared/models/member.model";

export interface BorrowingRecord {
  book: Book;
  member: Member;
  borrowDate: Date;
  dueDate: Date;
  returned: boolean;
}