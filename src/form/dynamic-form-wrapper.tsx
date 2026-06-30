import { type FC, useMemo } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomInputType, Regex, type FormInputData } from "./types";
import i18n from "../i18n";

const CoreInitializerProvider = ({
  children,
}: {
  children?: React.ReactNode;
  isArabic?: boolean;
  containerId?: string;
}) => <>{children}</>;
const globalFormatDate = (value: Date | string, _format: string) =>
  value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
const IBAN_VALIDATION = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/i;
export interface IDynamicFormWrapperProps {
  data: FormInputData[];
  children?: any;
  handleOnSubmitValues: (items: object) => any;
  enableReinitialize?: boolean;
  formName?: string;
  isArabic: boolean;
}

export const DynamicFormWrapper: FC<IDynamicFormWrapperProps> = ({
  data,
  children,
  handleOnSubmitValues,
  enableReinitialize = false,
  formName,
  isArabic,
}) => {
  return (
    <CoreInitializerProvider isArabic={isArabic} containerId="dynamic-form-renderer">
      <DynamicFormContent
        data={data}
        children={children}
        formName={formName}
        handleOnSubmitValues={handleOnSubmitValues}
        enableReinitialize={enableReinitialize}
      />
    </CoreInitializerProvider>
  );
};

// Internal component that contains the original logic
const DynamicFormContent: FC<Omit<IDynamicFormWrapperProps, "isArabic">> = ({
  data,
  children,
  handleOnSubmitValues,
  enableReinitialize = false,
  formName,
}) => {
  const initialValues = useMemo(() => {
    return data.reduce((acc, field) => {
      let value: any = field.value;
      if (field.type === CustomInputType.File) {
        if (Array.isArray(value)) {
        } else if (value != null && typeof value === "object") {
          value = [value];
        } else {
          value = [];
        }
      }
      return { ...acc, [field.name]: value };
    }, {} as Record<string, unknown>);
  }, [data]);

  const validationSchema = useMemo(() => {
    return data.reduce((schema: any, field) => {
    let yupType;

    const getValidationMessage = (defaultMessage: string) => {
      return defaultMessage;
    };

    const isTextOrNumberInput =
      field.type === CustomInputType.Text ||
      field.type === CustomInputType.Textarea ||
      field.type === CustomInputType.Number;

    switch (field.type) {
      case CustomInputType.Email:
        yupType = Yup.string()
          .email(getValidationMessage(i18n.t("Form.Validation.InvalidEmail")))
          .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, getValidationMessage(i18n.t("Form.Validation.InvalidEmail")));
        break;

      case CustomInputType.Number:
        yupType = Yup.number();

        if (field.minNumber !== undefined && field.minNumber !== null) {
          yupType = yupType.min(
            field.minNumber,
            getValidationMessage(i18n.t("Form.Validation.MinNumber", { minNumber: field.minNumber })),
          );
        }

        if (field.maxNumber !== undefined && field.maxNumber !== null) {
          yupType = yupType.max(
            field.maxNumber,
            getValidationMessage(i18n.t("Form.Validation.MaxNumber", { maxNumber: field.maxNumber })),
          );
        }
        break;

      case CustomInputType.Date:
      case CustomInputType.DateTime:
        const MIN_ALLOWED_DATE = new Date("1860-01-01");
        const MAX_ALLOWED_DATE = new Date("4000-12-31");

        yupType = Yup.date()
          .typeError(i18n.t("Form.Validation.InvalidDate"))
          .test(
            "valid-year-range",
            i18n.t("Form.Validation.InvalidYearRange", {
              minYear: 1860,
              maxYear: 4000,
            }),
            (value: any) => {
              if (!value) return true;
              const year = value.getFullYear();
              return year >= 1860 && year <= 4000;
            },
          );

        const effectiveMin =
          field.minDate && new Date(field.minDate) > MIN_ALLOWED_DATE ? field.minDate : MIN_ALLOWED_DATE;

        const effectiveMax =
          field.maxDate && new Date(field.maxDate) < MAX_ALLOWED_DATE ? field.maxDate : MAX_ALLOWED_DATE;

        yupType = yupType
          .min(
            effectiveMin,
            getValidationMessage(
              i18n.t("Form.Validation.MinDate", {
                minDate: globalFormatDate(effectiveMin as Date, "DD/MM/YYYY"),
                interpolation: { escapeValue: false },
              }),
            ),
          )
          .max(
            effectiveMax,
            getValidationMessage(
              i18n.t("Form.Validation.MaxDate", {
                maxDate: globalFormatDate(effectiveMax as Date, "DD/MM/YYYY"),
                interpolation: { escapeValue: false },
              }),
            ),
          );
        break;

      case CustomInputType.Checkbox:
        yupType = Yup.boolean();
        break;

      case CustomInputType.Dropdown:
        if (field.isMulti) {
          // yupType = Yup.array();
            yupType = Yup.array()
    .min(1, getValidationMessage(i18n.t("Form.Validation.Required")))
    .required(getValidationMessage(i18n.t("Form.Validation.Required")));
        } else if (field?.fieldType === CustomInputType.Number) {
          yupType = Yup.number().required(getValidationMessage(i18n.t("Form.Validation.Required")));
        } else {
          yupType = Yup.string().required(getValidationMessage(i18n.t("Form.Validation.Required")));
        }
        break;

      // case CustomInputType.IBAN:
      //   yupType = Yup.string()
      //     .required(getValidationMessage(i18n.t("Form.Validation.Required")))
      //     .test(
      //       "is-valid-iban",
      //       getValidationMessage(i18n.t("Form.Validation.InvalidIban")),
      //       (value: string) => !value || IBAN_VALIDATION.test(value),
      //     );
      //   break;
      case CustomInputType.Radio:
        yupType = Yup.string().required(getValidationMessage(i18n.t("Form.Validation.Required")));
        break;

      case CustomInputType.Text:
      case CustomInputType.Textarea:
        const regexType = field.regex || undefined;

        if (regexType === Regex.Arabic) {
          yupType = Yup.string().test(
            "is-valid-arabic",
            getValidationMessage(i18n.t("Form.Validation.ArabicOnly")),
            (value): boolean => {
              if (!value) return true;
              if (value.trim().length === 0) return false;

              const noEnglishRegex = /^[^\u0000-\u007F]*$|^[^a-zA-Z]*$/;
              return noEnglishRegex.test(value);
            },
          );
        } else if (regexType === Regex.English) {
          yupType = Yup.string().test(
            "is-valid-english",
            getValidationMessage(i18n.t("Form.Validation.EnglishOnly")),
            (value): boolean => {
              if (!value) return true;
              if (value.trim().length === 0) return false;

              const noArabicRegex = /^[^\u0600-\u06FF]*$/;
              return noArabicRegex.test(value);
            },
          );
        } else if (regexType === Regex.AlphaNumberic) {
          yupType = Yup.string().test(
            "is-valid-alphanumeric",
            getValidationMessage(i18n.t("Form.Validation.AlphaNumericOnly")),
            (value): boolean => {
              if (!value) return true;
              if (value.trim().length === 0) return false;

              const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
              return alphaNumericRegex.test(value);
            },
          );
        } else {
          yupType = Yup.string().test(
            "is-not-blank",
            getValidationMessage(i18n.t("Form.Validation.EmptyField")),
            (value): boolean => {
              if (field.required === false || !field.required) return true;
              return value !== undefined && value !== null && value.trim().length > 0;
            },
          );
        }
        break;

      case CustomInputType.File:
        yupType = Yup.array().of(Yup.mixed().nullable());
        if (field.required) {
          yupType = (yupType as any).min(
            1,
            getValidationMessage(`${field.title} ${i18n.t("Form.Validation.Required")}`),
          );
        }
        break;


      default:
        yupType = Yup.string();
        break;
    }

    if (isTextOrNumberInput) {
      if (field.minLength !== undefined && field.minLength !== null && field.minLength > 1) {
        if (field.type === CustomInputType.Number) {
          yupType = (yupType as any).test(
            "min-digits",
            getValidationMessage(i18n.t("Form.Validation.MinDigits", { minLength: field.minLength })),
            (value: any) => {
              if (!value) return true;
              return value.toString().length >= field.minLength!;
            },
          );
        } else {
          yupType = (yupType as any).min(
            field.minLength,
            getValidationMessage(i18n.t("Form.Validation.MinLength", { minLength: field.minLength })),
          );
        }
      }

      if (field.maxLength !== undefined && field.maxLength !== null && field.maxLength > 1) {
        if (field.type === CustomInputType.Number) {
          yupType = (yupType as any).test(
            "max-digits",
            getValidationMessage(i18n.t("Form.Validation.MaxDigits", { maxLength: field.maxLength })),
            (value: any) => {
              if (!value) return true;
              return value.toString().length <= field.maxLength!;
            },
          );
        } else {
          yupType = (yupType as any).max(
            field.maxLength,
            getValidationMessage(i18n.t("Form.Validation.MaxLength", { maxLength: field.maxLength })),
          );
        }
      }
    }
    if (field.required === false || !field.required) {
      schema[field.name] = yupType.optional().nullable();
    } else {
      schema[field.name] = yupType.required(
        getValidationMessage(`${field.title} ${i18n.t("Form.Validation.Required")}`),
      );
    }



    return schema;
    }, {});
  }, [data]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(validationSchema)}
      onSubmit={(values) => {
        handleOnSubmitValues(values);
      }}
      enableReinitialize={enableReinitialize}
    >
      {(formikProps) => (
        <Form id={formName} name={formName}>
          {children && children(formikProps)}
        </Form>
      )}
    </Formik>
  );
};
