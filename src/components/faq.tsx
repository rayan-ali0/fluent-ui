import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, Text } from "@fluentui/react-components";

const faqs = [
  {
    question: "What is this app for?",
    answer: "This demo app showcases Fluent UI components and a dynamic form experience.",
  },
  {
    question: "Can I customize the content?",
    answer: "Yes, you can update the questions and answers in this component to fit your own content.",
  },
  {
    question: "Is the accordion expandable?",
    answer: "Yes, users can open and close each section independently.",
  },
];

const FAQ = () => {
  return (
    <div style={{ maxWidth: 800, margin: "24px auto", padding: 24 }}>
      <Text weight="semibold" size={600}>
        Frequently asked questions
      </Text>

      <Accordion multiple defaultOpenItems={["0"]} style={{ marginTop: 16 }}>
        {faqs.map((item, index) => (
          <AccordionItem value={String(index)} key={item.question}>
            <AccordionHeader>{item.question}</AccordionHeader>
            <AccordionPanel>
              <Text>{item.answer}</Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
