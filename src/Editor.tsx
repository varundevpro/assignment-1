import { Button, Data, Puck } from "@measured/puck";
import { config, Props } from "./puck.config";

type EditorProps = {
  save: (data: Data<Props>) => void,
  toggleRoute: () => void,
  initialData: Partial<Data<Props>>
}

export function Editor({ toggleRoute, initialData, save }: EditorProps) {
  return <Puck config={config} data={initialData} onPublish={save} overrides={{
    headerActions: ({ children }) => (
      <>
        <div>
          <Button
            onClick={() => {
              alert("FYI, Please publish to save your changes.")
              toggleRoute()
            }}
            variant="secondary"
          >
            View page
          </Button>
        </div>

        {children}
      </>
    ),
  }}
  />
}