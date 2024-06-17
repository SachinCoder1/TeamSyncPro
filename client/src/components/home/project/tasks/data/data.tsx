import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  CircleIcon,
  CrossIcon,
  // CrossCircledIcon,
  FileQuestion,
  FileQuestionIcon,
  Watch,
  WatchIcon,
} from "lucide-react"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: FileQuestionIcon,
  },
  {
    value: "To Do",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "In Progress",
    label: "In Progress",
    icon: WatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircleIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossIcon,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "LOW",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "MEDIUM",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "HIGH",
    icon: ArrowUpIcon,
  },
  {
    label: "Highest",
    value: "HIGHEST",
    icon: ArrowUpIcon,
  },
]
