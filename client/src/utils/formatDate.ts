// formatDate.js
import { formatDistanceToNow, format } from "date-fns";

export const formatRelativeDate = (dateString: Date) => {
  if (!dateString) return "";
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};

export const formatFullDate = (dateString: Date) => {
  if (!dateString) return "";
  return format(new Date(dateString), "MMMM d, yyyy 'at' h:mm a");
};
