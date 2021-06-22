import moment from "moment";
// services
import { deletePost } from "./api-services";

export const date = (date) => {
  let createdAt = new moment(date);
  if (
    createdAt.fromNow().includes("seconds") ||
    createdAt.fromNow().includes("hour") ||
    createdAt.fromNow().includes("hours") ||
    createdAt.fromNow().includes("minutes") ||
    createdAt.fromNow().includes("minute")
  ) {
    return createdAt.format("LT");
  } else if (createdAt.fromNow().includes("a day")) {
    return "yesterday";
  } else {
    return createdAt.format("MMMM Do");
  }
};

export async function handleRemove(id, array, setCallback) {
  await deletePost(id);
  const newList = array.filter((item) => item._id !== id);
  setCallback(newList);
}
