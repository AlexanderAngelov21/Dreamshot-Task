import { Slot } from "./slot";
import configuration from "./configuration";

const slot = new Slot(configuration);

const result = slot.spin();

console.log(result);
