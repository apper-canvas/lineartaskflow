import { format, isToday, isTomorrow, isYesterday, isPast, parseISO } from "date-fns";

export const formatDate = (dateString) => {
  if (!dateString) return "";
  
  const date = parseISO(dateString);
  
  if (isToday(date)) {
    return "Today";
  } else if (isTomorrow(date)) {
    return "Tomorrow";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return format(date, "MMM dd, yyyy");
  }
};

export const formatDateInput = (dateString) => {
  if (!dateString) return "";
  return format(parseISO(dateString), "yyyy-MM-dd");
};

export const isOverdue = (dateString) => {
  if (!dateString) return false;
  const date = parseISO(dateString);
  return isPast(date) && !isToday(date);
};

export const getDueDateStatus = (dateString) => {
  if (!dateString) return "none";
  
  const date = parseISO(dateString);
  
  if (isOverdue(dateString)) {
    return "overdue";
  } else if (isToday(date)) {
    return "today";
  } else if (isTomorrow(date)) {
    return "tomorrow";
  } else {
    return "upcoming";
  }
};