import { debounce } from "./debounce";
const DEBOUNCE_TIME = 3 * 1000; // 5 second

export const syncWithDB = debounce(async (data) => {
  console.log("syncing with DB", data);
}, DEBOUNCE_TIME);
