import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
// import chevron from "./chevron-down.svg";

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */
const AccordionItem = ({ header, ...rest }: { children: string; header: string; initialEntered?: true; }) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        <p>{header}</p>
        
        {/* <img
          className={`ml-auto transition-transform duration-200 ease-out ${
            isEnter && "rotate-180"
          }`}
          src={chevron}
          alt="Chevron"
        /> */}
        <span className={`material-icons ${isEnter && "rotate-180"}`}>arrow_drop_down</span>
      </>
    )}
    className="border-b"
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full p-4 text-left hover:bg-slate-100 ${
          isEnter && "bg-slate-200"
        }`
    }}
    contentProps={{
      className: "transition-height duration-200 ease-out"
    }}
    panelProps={{ className: "p-4" }}
  />
);

export default function MyAccordian() {
  return (
    <div className="mx-2 my-4 border-t">
      {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
      <Accordion transition transitionTimeout={200}>
        <AccordionItem header="What is Lorem Ipsum?" initialEntered>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </AccordionItem>

        <AccordionItem header="Where does it come from?">
          Quisque eget luctus mi, vehicula mollis lorem. Proin fringilla vel
          erat quis sodales. Nam ex enim, eleifend venenatis lectus vitae.
        </AccordionItem>

        <AccordionItem header="Why do we use it?">
          Suspendisse massa risus, pretium id interdum in, dictum sit amet ante.
          Fusce vulputate purus sed tempus feugiat.
        </AccordionItem>
      </Accordion>
    </div>
  );
}
