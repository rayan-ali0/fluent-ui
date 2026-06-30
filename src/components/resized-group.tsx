import { ResizeGroup } from "@fluentui/react/lib/ResizeGroup";

const initialItems = [
  { key: "new", name: "New" },
  { key: "edit", name: "Edit" },
  { key: "delete", name: "Delete" },
  { key: "share", name: "Share" },
];

export const MyResizeGroup = () => {
  const onRenderContent = (props: any) => {
    return (
      <div style={{ display: "flex", gap: 8 }}>
        {props.items.map((item: any) => (
          <button key={item.key}>{item.name}</button>
        ))}
      </div>
    );
  };

  const onReduceData = (props: any) => {
    // removes last item when space is tight
    if (props.items.length > 1) {
      const newItems = props.items.slice(0, -1);

      return {
        ...props,
        items: newItems,
      };
    }

    return props;
  };

  return (
    <ResizeGroup
      data={{ items: initialItems }}
      onRenderContent={onRenderContent}
      onReduceData={onReduceData}
    />
  );
};