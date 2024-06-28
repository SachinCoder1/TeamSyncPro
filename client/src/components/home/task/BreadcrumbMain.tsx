import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

type Props = {
  params: {
    workspace: string;
    project: string;
    task?: string;
  };
};
const BreadcrumbMain = ({ params }: Props) => {
  return (
    <div className="my-4 ml-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {params?.task ? (
              <Link href={`/home/${params?.workspace}/${params?.project}`}>
                project
              </Link>
            ) : (
              <BreadcrumbPage>Project</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {
            params?.task && 
          <BreadcrumbItem>
            <BreadcrumbPage>Task</BreadcrumbPage>
          </BreadcrumbItem>
          }
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbMain;
