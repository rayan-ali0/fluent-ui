import {
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
} from "@fluentui/react-components";
import AddTaskExample from "./add-task";

// const users: IDropdownOption[] = [
//     { key: "1", text: "John Doe" },
//     { key: "2", text: "Jane Smith" },
//     { key: "3", text: "Alice Brown" },
// ];

type TaskModalProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
};

export const TaskModal = ({
    isOpen,
    setIsOpen,
}: TaskModalProps) => {
    // const [taskName, setTaskName] = useState("");
    // const [description, setDescription] = useState("");
    // const [dueDate, setDueDate] = useState<Date | null | undefined>(undefined);
    // const [sendTo, setSendTo] = useState<string | number>();

    // const handleSave = () => {
    //     console.log({
    //         taskName,
    //         description,
    //         dueDate,
    //         sendTo,
    //     });

    //     setIsOpen(false);
    // };

    // const options: IChoiceGroupOption[] = [
    //     { key: 'A', text: 'Option A' },
    //     { key: 'B', text: 'Option B' },
    //     { key: 'C', text: 'Option C' },
    // ]

    return (
        <Dialog open={isOpen} onOpenChange={(_, data) => setIsOpen(data.open)}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Create task</DialogTitle>
                    <DialogContent>
                        <AddTaskExample />
                    </DialogContent>
                    <DialogActions>
                        <Button appearance="secondary" onClick={() => setIsOpen(false)}>
                            Close
                        </Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};