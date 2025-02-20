import { useEffect, useState } from "react"

import "@measured/puck/puck.css";
import { Data } from "@measured/puck";

import { Editor } from "./Editor"
import { Page } from "./Page"

import { Props } from "./puck.config";
import { data as initialData } from "./initial-data";

function App() {
  const [data, setData] = useState<Partial<Data<Props>>>(initialData)
  const [route, setRoute] = useState<"editor" | "page">("editor")

  useEffect(() => {
    window.onbeforeunload = function (e) {
      const message = "Your changes will not be persisted."
      e = e || window.event;
  
      // For IE and Firefox prior to version 4
      if (e) {
          e.returnValue = message;
      }
  
      // For Safari
      return message;
    };
  }, [])

  const toggleRoute = () => {
    setRoute(p => p === 'editor' ? 'page' : 'editor')
  }

  const save = (_data: Partial<Data<Props>>) => {
    setData(_data)
  };

  return (
    <>
      {route === 'editor'
        ? <Editor initialData={data} toggleRoute={toggleRoute} save={save}/>
        : <Page data={data} toggleRoute={toggleRoute} />
      }
    </>
  )
}

export default App
