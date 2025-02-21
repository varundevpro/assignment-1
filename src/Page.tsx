import { Button, Data, Render } from "@measured/puck";
import { config, Props } from "./puck.config";

type PageProps = {
  toggleRoute: () => void,
  data: Partial<Data<Props>>
}

export function Page({ toggleRoute, data }: PageProps) {
  return (
    <>
      <div className="top-bar">
        <Button
          onClick={toggleRoute}
          variant="secondary"
        >
          View editor
        </Button>
      </div>
      <Render config={config} data={data} />
    </>
  );
}
