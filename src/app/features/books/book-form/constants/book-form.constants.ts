import { FormField } from '../models/form-field.model';

export const BOOK_FORM_FIELDS: FormField[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    required: true,
    placeholder: 'Enter book title'
  },
  {
    name: 'author',
    label: 'Author',
    type: 'text',
    required: true,
    placeholder: 'Enter author name'
  },
  {
    name: 'isbn',
    label: 'ISBN',
    type: 'text',
    required: true,
    placeholder: 'Enter ISBN'
  },
  {
    name: 'publicationYear',
    label: 'Publication Year',
    type: 'number',
    required: true,
    placeholder: 'Enter publication year'
  },
  {
    name: 'quantity',
    label: 'Quantity',
    type: 'number',
    required: true,
    placeholder: 'Enter quantity'
  }
]; 