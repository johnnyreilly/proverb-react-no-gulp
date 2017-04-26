import { Dispatcher } from "flux";
import { Action } from "./domain/action";

const dispatcherInstance = new Dispatcher<Action>();

// Log actions to console when debugging
if (process.env.NODE_ENV !== "production") {
   dispatcherInstance.register(payload => {
      // tslint:disable-next-line:no-console
      console.info("dispatching", payload);
   });
}

export default dispatcherInstance;
