import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {};

const Why = (props: Props) => {
  const whyShouldIHostData = [
    {
      value: "item-1",
      question: "What are the benefits of renting out my court?",
      answer:
        "Renting out your court or turf allows you to earn extra income while supporting local sports and fitness enthusiasts.",
    },
    {
      value: "item-2",
      question: "Is hosting flexible?",
      answer:
        "Yes! You have full control over your schedule. You can decide when your court is available for booking and set the rates accordingly.",
    },
    {
      value: "item-3",
      question: "Will I receive support as a host?",
      answer:
        "Absolutely! Our platform offers resources, guidance, and support to ensure your hosting experience is seamless and rewarding.",
    },
    {
      value: "item-4",
      question: "How can hosting benefit my community?",
      answer:
        "Hosting helps promote sports and fitness in your local area by providing affordable and accessible spaces for activities.",
    },
    {
      value: "item-5",
      question: "Can hosting help me reach financial goals?",
      answer:
        "Yes. Many hosts use their earnings to maintain their facilities, invest in improvements, or achieve their personal financial objectives.",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
        Why Should I Rent Out My Court?
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full md:w-[80%] flex flex-col gap-3 px-5 md:px-0"
      >
        {whyShouldIHostData.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            className="border px-2 rounded-xl"
          >
            <AccordionTrigger className="font-bold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Why;
