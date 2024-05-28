import { Form } from "@remix-run/react";
import { Button } from "~/ui/button";

export function Teste(){
    return (
        <Form
          method="post"
        >
          <div>
            <label className="flex w-full flex-col gap-1">
              <span>Title: </span>
              <input
    type="hidden"
    value="hidden demais"
                name="title"
                className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
    
              />
            </label>
    
          </div>
    
          <div>
            <label className="flex w-full flex-col gap-1">
              <span>Body: </span>
              <textarea
    
                name="body"
                rows={8}
                className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
    
              />
            </label>
    
    
          </div>
    
          <div className="text-right">
            <Button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Save
            </Button>
          </div>
        </Form>
      );
}