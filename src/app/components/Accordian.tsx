import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default function Accordian(){
    return <div>
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-b-2 border-black">
                <AccordionTrigger className="font-semibold"> {'>'} what it is? and How it is working</AccordionTrigger>
                <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b-2 border-black">
                <AccordionTrigger className="font-semibold"> {'>'} what tech stack is used here?</AccordionTrigger>
                <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b-2 border-black">
                <AccordionTrigger className="font-semibold"> {'>'} on what type of streaming it is working?</AccordionTrigger>
                <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
}