import { Button, Data, Render } from "@measured/puck";
import { config, Props } from "./puck.config";
import styled from "styled-components";

type PageProps = {
  toggleRoute: () => void,
  data: Partial<Data<Props>>
}

export function Page({ toggleRoute, data }: PageProps) {
  return (
    <>
      <TopBar>
        <Button
          onClick={toggleRoute}
          variant="secondary"
        >
          View editor
        </Button>
      </TopBar>
      <Render config={config} data={data} />
    </>
  );
}

const TopBar = styled.div`
  border-bottom: 1px solid #D0D5DD;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-content: center;
`