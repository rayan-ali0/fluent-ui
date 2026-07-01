import { useState, type FC } from "react";
import { Button, Spinner, Text } from "@fluentui/react-components";
import { DynamicFormWrapper } from "../form/dynamic-form-wrapper";
import { DynamicFormRenderer } from "../form/dynamic-form-renderer";
import { CustomInputType, type FormInputData } from "../form/types";
import {
    Toaster,
    useId,
    useToastController,
    Toast,
    ToastTitle,
} from "@fluentui/react-components";
const isArabic = false;
const exampleFields: FormInputData[] = [
    {
        name: "title",
        title: "Task title",
        placeholder: "Enter task title",
        value: "",
        required: true,
        type: CustomInputType.Text,
        isDisabled: false,
        width: "w-full",
        isArabic
    },
    {
        name: "description",
        title: "Description",
        placeholder: "Write details",
        value: "",
        required: true,
        type: CustomInputType.Textarea,
        isDisabled: false,
        width: "w-1/2",
        maxLength: 250,
        isArabic
    },
    {
        name: "Email",
        title: "Email",
        placeholder: "@gmail.com",
        value: "",
        required: true,
        type: CustomInputType.Email,
        isDisabled: false,
        width: "w-1/2",
        isArabic
    },
    {
        name: "Password",
        title: "Password",
        placeholder: "...",
        value: "",
        required: true,
        type: CustomInputType.Password,
        isDisabled: false,
        width: "w-1/2",
        isArabic
    },
    {
        name: "dueDate",
        title: "dueDate",
        placeholder: "select Date",
        value: "",
        required: true,
        type: CustomInputType.Date,
        isDisabled: false,
        width: "w-1/2",
        isArabic,
    },
    {
        name: "time",
        title: "time",
        placeholder: "select Date",
        value: "",
        required: true,
        type: CustomInputType.Time,
        isDisabled: false,
        width: "w-1/2",
        isArabic,
    },
    {
        name: "File",
        title: "File",
        placeholder: "Select File/s",
        value: "",
        required: true,
        type: CustomInputType.File,
        isDisabled: false,
        width: "w-1/2",
        isArabic,
        isMulti: true
    },
    {
        name: "priority",
        title: "Priority",
        placeholder: "Select priority",
        value: "",
        required: true,
        type: CustomInputType.Dropdown,
        isDisabled: false,
        width: "w-1/2",
        isArabic,
        options: [
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" },
        ],
    },
    {
        name: "status",
        title: "Status",
        placeholder: "Select satts",
        value: "",
        required: true,
        type: CustomInputType.Radio,
        isDisabled: false,
        width: "w-full",
        options: [
            { label: "Draft", value: "Draft" },
            { label: "Completed", value: "Completed" },
            { label: "Pending", value: "Pending" },
        ],
        isArabic
    },
    {
        name: "isDone",
        title: "Completed",
        placeholder: "",
        value: false,
        required: false,
        type: CustomInputType.Checkbox,
        isDisabled: false,
        width: "w-full",
        isArabic
    },
];

const AddTaskExample: FC = () => {
    const toasterId = useId("task-toaster");
    const { dispatchToast } = useToastController(toasterId);
    const [loading, setLoading] = useState(false);


    return (
        <div style={{ minWidth: 500, padding: 24 }}>
            <Text size={600}>Add task example</Text>
            <DynamicFormWrapper
                data={exampleFields}
                formName="add-task-example"
                handleOnSubmitValues={(values) => {
                    console.log("submitted values", values);
                    dispatchToast(
                        <Toast>
                            <ToastTitle>Data saved successfully!</ToastTitle>
                        </Toast>,
                        {
                            intent: "success",
                            timeout: 3000,

                        }
                    );
                }}
                isArabic={isArabic}
            >
                {(formikProps: any) => {
                    const { values, submitForm } = formikProps;

                    return (
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
                            <DynamicFormRenderer
                                data={exampleFields}
                                values={values}
                                handleChange={(event) => {
                                    const target = event.target as { name?: string; value?: unknown };
                                    if (target.name) {
                                        formikProps.setFieldValue(target.name, target.value);
                                    }
                                }}
                                isArabic={isArabic}
                            />

                            <Button appearance="primary" onClick={() => submitForm()}  style={{ width: 120 }}>
                                  {loading ? <Spinner size="tiny" /> : "Save task"}

                            </Button>
                        </div>
                    );
                }}
            </DynamicFormWrapper>
            <Toaster toasterId={toasterId} />

        </div>
    );
};

export default AddTaskExample;
