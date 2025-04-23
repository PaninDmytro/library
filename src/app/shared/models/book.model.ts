export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  totalCopies: number;
  availableCopies: number;
  description?: string;
}

export interface BookBorrow {
  bookId: string;
  memberId: string;
  borrowDate: Date;
  dueDate: Date;
  returned: boolean;
} 