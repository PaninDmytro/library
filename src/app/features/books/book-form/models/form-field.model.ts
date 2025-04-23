export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'date';
  required: boolean;
  placeholder: string;
} 