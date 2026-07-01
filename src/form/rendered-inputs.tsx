import React, { useEffect, useMemo, useState } from "react";
import { CustomInputType } from "./types";
import {
  Button,
  Checkbox,
  Dropdown,
  Field,
  Input,
  Option,
  Radio,
  RadioGroup,
  Textarea,
} from "@fluentui/react-components";
import { Upload } from "lucide-react";

export interface RendererInputProps {
  type: CustomInputType;
  name: string;
  label?: string;
  value?: any;
  placeholder?: string;
  required?: boolean;
  isDisabled?: boolean;
  errorMessage?: string;
  className?: string;
  isArabic?: boolean;
  onChange?: (e: React.ChangeEvent<any>) => void;
  minDate?: string | Date;
  maxDate?: string | Date;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  maxFileSize?: number;
  maxFilesCount?: number;
  accept?: string;
  hintText?: string;
  onDownload?: (attachmentId: string) => void | Promise<void>;
  options?: any[];
  dropdownOptions?: Array<{ key?: string | number; text?: string; value?: string | number; disabled?: boolean }>;
  multiple?: boolean;
  values?: Array<string | number>;
  searchPlaceholder?: string;
  isDropdownSearchable?: boolean;
  onBlur?: (e: React.FocusEvent<any>) => void;
}

export function RendererInput({
  type,
  name,
  label,
  value,
  placeholder,
  required,
  isDisabled,
  errorMessage,
  className,
  isArabic,
  onChange,
  minDate,
  maxDate,
  min,
  max,
  hintText,
  options = [],
  dropdownOptions = [],
  multiple,
  maxLength,
  onBlur,
  accept
}: RendererInputProps) {
  const emitValue = (nextValue: unknown) => {
    onChange?.({
      target: {
        name,
        value: nextValue,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const selectedOptionValues = useMemo(() => {
    if (Array.isArray(value)) {
      return value.map((item) => String(item));
    }

    if (value != null && value !== "") {
      return [String(value)];
    }

    return [];
  }, [value]);

  const [selectedValues, setSelectedValues] = useState<string[]>(selectedOptionValues);

  useEffect(() => {
    setSelectedValues(selectedOptionValues);
  }, [selectedOptionValues]);

  const buildDropdownOptions = (providedOptions: any[] = []) =>
    providedOptions.map((option, index) => ({
      key: option?.key ?? option?.value ?? index,
      text: option?.text ?? option?.label ?? option?.value ?? String(index),
      value: option?.value ?? option?.key ?? index,
      disabled: option?.disabled,
    }));

  const commonFieldProps = {
    label,
    hint: hintText,
    validationMessage: errorMessage,
    validationState: errorMessage ? ("error" as const) : ("none" as const),
    required,
    className,
    dir: isArabic ? ("rtl" as const) : ("ltr" as const),
  };

  const renderField = (children: React.ReactNode) => <Field {...commonFieldProps}>{children}</Field>;

  switch (type) {
    case CustomInputType.Text:
      return renderField(
        <Input
          name={name}
          placeholder={placeholder}
          disabled={isDisabled}
          value={value ?? ""}
          type="text"
          maxLength={maxLength}
          onChange={(_, data) => emitValue(data.value ?? "")}
        />,
      );

    case CustomInputType.Number:
      return renderField(
        <Input
          name={name}
          placeholder={placeholder}
          disabled={isDisabled}
          value={value ?? ""}
          min={min}
          type="number"
          max={max}
          onChange={(_, data) => emitValue(data.value ?? "")}
        />,
      );

    case CustomInputType.Email:
      return renderField(
        <Input
          name={name}
          placeholder={placeholder}
          disabled={isDisabled}
          value={value ?? ""}
          type="email"
          onChange={(_, data) => emitValue(data.value ?? "")}
          appearance="outline"
        />,
      );

    case CustomInputType.Password:
      return renderField(
        <Input
          name={name}
          placeholder={placeholder}
          disabled={isDisabled}
          value={value ?? ""}
          type="password"
          onChange={(_, data) => emitValue(data.value ?? "")}
        />,
      );

    case CustomInputType.Date:
      return renderField(
        <Input
          name={name}
          placeholder={placeholder}
          disabled={isDisabled}
          value={value ? String(value) : ""}
          type="date"
          min={minDate ? String(minDate) : undefined}
          max={maxDate ? String(maxDate) : undefined}
          onChange={(_, data) => emitValue(data.value ?? "")}
        />,
      );

    case CustomInputType.DateTime:
      return renderField(
        <Input
          name={name}
          placeholder={placeholder}
          disabled={isDisabled}
          value={value ?? ""}
          type="datetime-local"
          onChange={(_, data) => emitValue(data.value ?? "")}
        />,
      );

    case CustomInputType.Time:
      return renderField(
        <Input
          name={name}
          placeholder={placeholder}
          disabled={isDisabled}
          value={value ?? ""}
          type="time"
          onChange={(_, data) => emitValue(data.value ?? "")}
          appearance="outline"
        />,
      );

    case CustomInputType.File:
      return renderField(
        <>

          <Button
            appearance="outline"
            icon={<Upload className="w-4 h-4"/>}
            disabled={isDisabled}
            onClick={() => document.getElementById(`file-${name}`)?.click()}
            style={{
              borderColor: errorMessage ? "#d13438" : undefined,
              justifyContent: "flex-start",
              gap: "2px",
              width: "100%",
            }}
          >
            {value?.length ? `${value.length} file(s)` : placeholder ?? "Select File/s"}
          </Button>
          <input
            id={`file-${name}`}
            type="file"
            name={name}
            disabled={isDisabled}
            accept={accept}
            multiple={multiple}
            onChange={(e) => emitValue(Array.from(e.target.files ?? []))}
            style={{ display: "none" }}

          />
        </>
      );
    case CustomInputType.Textarea:
      return renderField(
        <Textarea
          name={name}
          placeholder={placeholder}
          disabled={isDisabled}
          value={value ?? ""}
          maxLength={maxLength}
          onChange={(_, data) => emitValue(data.value ?? "")}
        />,
      );

    case CustomInputType.Checkbox:
      return renderField(
        <Checkbox
          label={label}
          checked={!!value}
          disabled={isDisabled}
          className={className}
          onChange={(_, data) => emitValue(data.checked)}
        />
      );
    case CustomInputType.Radio:
      return renderField(
        <RadioGroup
          value={value != null ? String(value) : undefined}
          onChange={(_, data) => emitValue(data.value)}
          layout="horizontal"
          onBlur={onBlur} aria-invalid={!!errorMessage}

        >
          {(dropdownOptions.length ? dropdownOptions : buildDropdownOptions(options)).map((option) => (
            <Radio key={String(option.key)} value={String(option.value ?? option.key)} label={String(option.text ?? option.value ?? option.key)} />
          ))}
        </RadioGroup>,
      );
    case CustomInputType.Dropdown:
      return renderField(

        <Dropdown
          name={name}
          placeholder={placeholder}
          disabled={isDisabled}
          multiselect={Boolean(multiple)}
          appearance="outline"
          aria-invalid={!!errorMessage}
          selectedOptions={selectedValues}
          onOptionSelect={(_, data) => {
            const selectedOptions = data.selectedOptions ?? [];
            const nextValue = multiple ? selectedOptions : selectedOptions[0] ?? "";

            setSelectedValues(selectedOptions);
            emitValue(nextValue);
          }}
          // onBlur={onBlur}
          style={{ width: "100%" }}
        >
          {(dropdownOptions.length ? dropdownOptions : buildDropdownOptions(options)).map((option) => (
            <Option
              key={String(option.key)}
              value={String(option.value ?? option.key)}
              disabled={option.disabled}
            >
              {String(option.text ?? option.value ?? option.key)}
            </Option>
          ))}
        </Dropdown>
      );

    default:
      return null;
  }
}