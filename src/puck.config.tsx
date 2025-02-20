import type { Config } from "@measured/puck";
import { type FormProps } from "./components/form/types";
import { Form } from "./components/form/form";
import { HeadingBlock, type HeadingBlockProps } from "./components/heading-block/heading-block";

export type Props = {
  HeadingBlock: HeadingBlockProps;
  Form: FormProps;
};

export const config: Config<Props> = {
  components: {
    HeadingBlock,
    Form
  },
};
