import { ComponentConfig } from "@measured/puck"

export type HeadingBlockProps = { title: string, resolvedTitle?: string }

export const HeadingBlock: ComponentConfig<HeadingBlockProps> = {
  fields: {
    title: { type: "text" },
  },
  defaultProps: {
    title: "Heading",
  },
  resolveData: async ({ props }) => {
    return {
      props: { resolvedTitle: props.title },
      readOnly: { resolvedTitle: true },
    };
  },
  render: ({ resolvedTitle }) => <h1>Resolved {resolvedTitle}</h1>,
}