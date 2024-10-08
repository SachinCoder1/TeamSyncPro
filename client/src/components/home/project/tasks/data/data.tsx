import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  ChevronUpIcon,
  ChevronsDownIcon,
  ChevronsUpIcon,
  CircleIcon,
  CrossIcon,
  Equal,
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
    icon: ChevronsDownIcon,
    color: "#85C1E9" // Light Blue for Low priority
  },
  {
    label: "Medium",
    value: "MEDIUM",
    icon: Equal,
    color: "#F7DC6F" // Yellow for Medium priority
  },
  {
    label: "High",
    value: "HIGH",
    icon: ChevronUpIcon,
    color: "#E74C3C" // Red for High priority
  },
  {
    label: "Highest",
    value: "HIGHEST",
    icon: ChevronsUpIcon,
    color: "#C0392B" // Dark Red for Highest priority
  },
]

