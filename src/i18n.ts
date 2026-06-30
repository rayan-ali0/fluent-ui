const translations: Record<string, string> = {
  "Form.Validation.Required": "is required",
};

const i18n = {
  t: (key: string, _options?: Record<string, unknown>) => translations[key] ?? key,
};

export default i18n;
