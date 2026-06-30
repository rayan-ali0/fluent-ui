import { type CSSProperties, type ChangeEvent } from "react";

// ─── Enum ────────────────────────────────────────────────────────────────────
export enum CustomInputType {
  Text = "text",
  TextOnly = "text-only",
  Number = "number",
  Email = "email",
  Password = "password",
  Date = "date",
  DateTime = "datetime-local",
  Time = "time",
  Textarea = "textarea",
  Checkbox = "checkbox",
  Radio = "radio",
  File = "file",
  // IBAN = "iban",
  Dropdown = "dropdown",
}

// ─── Common base ─────────────────────────────────────────────────────────────
/**
 * Every input component extends this interface.
 * Shadcn's Field / FieldLabel / FieldDescription / Input are used internally.
 */

export interface FilterOption {
  label: string
  value: string | number
}
export interface FilterDef {
  id: string
  label: string
  options: FilterOption[]
  icon?: React.ReactNode
  disabled?: boolean
  loading?: boolean
}
export interface BaseInputProps<
  T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement
> {
  id?: string;
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  isDisabled?: boolean;
  errorMessage?: string;
  labelStyle?: CSSProperties;
  className?: string;
  isArabic?: boolean;
  maxLength?: number;
  minLength?: number;
  onChange?: (e: ChangeEvent<T>) => void;
  regex?: Regex;
}

// ─── Specialised extensions ───────────────────────────────────────────────────
export interface TextInputProps extends BaseInputProps {
  value?: string;
  textOnly?: boolean
}

export interface NumberInputProps extends BaseInputProps {
  value?: number | string;
  min?: number;
  max?: number;
  step?: number;
}

export interface EmailInputProps extends BaseInputProps {
  value?: string;
}

export interface PasswordInputProps extends BaseInputProps {
  value?: string;
}

export interface DateInputProps extends BaseInputProps {
  value?: string;
  min?: string | Date | undefined;
  max?: string | Date | undefined;
}

export interface DateTimeInputProps extends BaseInputProps {
  value?: string;
  min?: string | Date | undefined;
  max?: string | Date | undefined;
}

export interface TextareaInputProps extends BaseInputProps<HTMLTextAreaElement> {
  value?: string;
  rows?: number;
  cols?: number;
}
export interface CheckboxInputProps extends BaseInputProps {
  checked?: boolean;
}

export interface RadioInputProps extends BaseInputProps {
  checked?: boolean;
  value?: string | number;
}

export interface FileInputProps extends BaseInputProps {
  accept?: string;
  multiple?: boolean;
  maxFileSize?: number;
  maxFilesCount?: number;
  hintText?: string;
//   filesOnRead?: IAttachment | IAttachment[] | null;
  filesOnRead?:  null;
  onDownload?: (attachmentId: string) => void | Promise<void>;
}
export interface IBANInputProps extends BaseInputProps {
  value?: string;
}

export interface DropdownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface DropdownInputProps extends BaseInputProps {
  dropdownOptions: DropdownOption[];
  searchPlaceholder?: string;
  isDropdownSearchable?: boolean
  /** Single selected value */
  value?: string | number;
  /** Multi selected values */
  values?: (string | number)[];
  multiple?: boolean;
  placeholder?: string;
  onChange?: (e: ChangeEvent<any>) => void;
  onRemove?: (value: string | number) => void;
}

export enum Regex {
  Arabic = 1,
  English = 2,
  AlphaNumberic = 3
}


export interface FormInputData {
  name: string;
  title: string;
  regex?: Regex;
  placeholder: string;
  value: Date | string | number | Array<string | number> | boolean | undefined | null ;
//   value: Date | string | number | Array<string | number> | boolean | undefined | null | IAttachment | IAttachment[];
  required: boolean;
  type: CustomInputType;
  fieldType?: CustomInputType;
  isDisabled: boolean;
  width: string;
  dropdownOptions?: DropdownOption[];
//   options?: RadioOption[];
  options?: any[];
  hidden?: boolean;
  minDate?: Date | string | undefined;
  maxDate?: Date | string | undefined;
  maxNumber?: number;
  minNumber?: number;
  inputClassName?: string;
  maxLength?: number;
  minLength?: number;
  isMulti?: boolean;
  accept?: string;
  maxFilesCount?: number;
  maxFileSize?: number;
  hintText?: string;
  maxAllowedFiles?: number;
  isArabic?: boolean;
  searchPlaceholder?: string;
  isDropdownSearchable?: boolean
  onDownload?: (attachmentId: string) => void | Promise<void>;
//   filesOnRead?: IAttachment | IAttachment[] | null;
  filesOnRead?:   null;
}

