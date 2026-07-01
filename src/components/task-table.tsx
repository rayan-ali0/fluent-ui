import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Button,
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
  Badge
} from "@fluentui/react-components";

import { Trash2, Eye } from "lucide-react";
import { useState } from "react";

interface ITask {
  id: string;
  name: string;
  dateModified: string;
  modifiedBy: string;
  status: string;
}

const mockItems: ITask[] = [
  {
    id: "1",
    name: "Review contract",
    dateModified: "2024-06-01",
    modifiedBy: "Rayan",
    status: "In Progress",
  },
  {
    id: "2",
    name: "File court documents",
    dateModified: "2024-06-05",
    modifiedBy: "Sara",
    status: "Pending",
  },
  {
    id: "3",
    name: "Client meeting prep",
    dateModified: "2024-06-10",
    modifiedBy: "Rayan",
    status: "Done",
  },
];

export const TaskTable = () => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  return (
    <>
      {/* TABLE */}
      <Table aria-label="Tasks table">
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Date Modified</TableHeaderCell>
            <TableHeaderCell>Modified By</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {mockItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.dateModified}</TableCell>
              <TableCell>{item.modifiedBy}</TableCell>
              <TableCell>
                <Badge>{item.status}</Badge>
              </TableCell>

              <TableCell>
                <div className="flex flex-row gap-2">

                  <Trash2
                    style={{ cursor: "pointer" }}
                    onClick={() => setDeleteOpen(true)}
                    className="w-5 h-5"
                  />
                  <Eye
                    style={{ cursor: "pointer" }}
                    onClick={() => setViewOpen(true)}
                    className="w-5 h-5"

                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* DELETE DIALOG */}
      <Dialog
        open={deleteOpen}
        onOpenChange={(_, data) => setDeleteOpen(data.open)}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Delete Task</DialogTitle>

            <DialogContent>
              Are you sure you want to delete this task? This action cannot be undone.
            </DialogContent>

            <DialogActions>
              <Button appearance="primary" onClick={() => setDeleteOpen(false)}>
                Delete
              </Button>
              <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      {/* VIEW DRAWER (Panel replacement) */}
      <Drawer
        open={viewOpen}
        onOpenChange={(_, data) => setViewOpen(data.open)}
      >
        <div style={{ padding: 20, width: 320 }}>
          <h3>Task Details</h3>

          <p>
            This is the task details panel. You can show full task info here.
          </p>

          <Button onClick={() => setViewOpen(false)}>Close</Button>
        </div>
      </Drawer>
    </>
  );
};