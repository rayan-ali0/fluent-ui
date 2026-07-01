import { useState } from "react";

import { TaskTable } from "../../components/task-table";
import { Button, Tab, TabList, makeStyles, tokens } from "@fluentui/react-components";
import AddTaskExample from "../../components/add-task";
import { TaskModal } from "../../components/task-modal";
import FAQ from "../../components/faq";

const useTaskPageStyles = makeStyles({
  page: {
    padding: "2.5rem",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    width: "100%",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: tokens.spacingVerticalL,
    borderRadius: tokens.borderRadiusLarge,
    borderLeft: `4px solid ${tokens.colorBrandStroke1}`,
    backgroundColor: tokens.colorBrandBackground2,
    boxShadow: tokens.shadow8,
    color: tokens.colorNeutralForeground1,
  },
  title: {
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  subtitle: {
    color: tokens.colorNeutralForeground2,
  },
});


export const TaskPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("myTasks");
  const styles = useTaskPageStyles();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="flex flex-col gap-5">
          <h1 className={styles.title}>Task Management</h1>
          <p className={styles.subtitle}>tasks assigned to you</p>
        </div>

        <Button
          appearance="primary"
          onClick={() => setIsDialogOpen(true)}
          className="h-10"
        >
          Add New Task
        </Button>
      </header>

        <TabList
        selectedValue={selectedValue}
        onTabSelect={(_, data) => setSelectedValue(data.value as string)}
        style={{ display: "flex", width: "100%", gap: 4 }}
      >
        <Tab value="myTasks" style={{ flex: 1, textAlign: "center" }}>
          My Tasks
        </Tab>

        <Tab value="teamTasks" style={{ flex: 1, textAlign: "center" }}>
          Team Tasks
        </Tab>
      </TabList>
      <TaskTable />
      <AddTaskExample/>
      <FAQ/>
      
      <TaskModal isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </div>
  );
};