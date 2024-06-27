import { addTag } from "@/app/actions/task";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactTags } from "react-tag-autocomplete";

const countries = [
  "Afghanistan",
  "Albania",
  "Andorra",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
];
function isValid(value: any) {
  return /^[a-z]{4,12}$/i.test(value);
}

const suggestions = countries.map((name, index) => ({
  value: index,
  label: name,
}));

type Props = {
  taskId: string;
  workspaceId: string;
};
export default function TagsSelector({ taskId, workspaceId }: Props) {
  console.log("workspaceId: ", workspaceId)
  const [toggleEditor, setToggleEditor] = useState(false);
  const [selected, setSelected] = useState<any>([
    suggestions[0],
    suggestions[10],
  ]);
  const api = useRef<any>(null);
  const focus = useCallback(() => {
    // if (!api || !api.current) return;
    console.log("focusing...");
    api.current.input.focus();
  }, [api]);

  const onAdd = useCallback(
    async (newTag:any) => {
      setSelected([...selected, newTag]);
      console.log("added tag:", newTag, "workspaceId: ", workspaceId);
      await addTag({
        name: newTag?.value || newTag?.label,
        taskId: taskId,
        workspaceId: workspaceId,
      });
    },
    [selected]
  );

  const onDelete = useCallback(
    (tagIndex: any) => {
      setSelected(selected.filter((_: any, i: any) => i !== tagIndex));
      console.log("removing:", tagIndex);
    },
    [selected]
  );

  const onValidate = useCallback((value: any) => isValid(value), []);

  useEffect(() => {
    if (toggleEditor === true && api.current) {
      focus();
    }
  }, [toggleEditor, api]);

  return (
    <div>
      {toggleEditor === false && (
        <div
          onClick={() => {
            setToggleEditor(true);
          }}
          className="flex flex-wrap gap-2"
        >
          {selected.map((item: any, index: any) => (
            <Card
              key={`${item.value}:${index}`}
              className="cursor-pointer px-2 py-1 text-xs"
            >
              <Link
                onClick={(e) => e.stopPropagation()}
                href={`/tags/${item.value}`}
                className="hover:text-primary"
              >
                {item.label}
              </Link>
            </Card>
          ))}
        </div>
      )}

      {toggleEditor === true && (
        <ReactTags
          labelText="Select countries"
          selected={selected}
          suggestions={suggestions}
          ref={api}
          onAdd={onAdd}
          onDelete={onDelete}
          noOptionsText="No matching countries"
          allowNew
          ariaDescribedBy="custom-tags-description"
          // collapseOnSelect
          id="custom-tags-demo"
          onValidate={onValidate}
          activateFirstOption={true}
          allowBackspace={true}
          onCollapse={() => setToggleEditor(false)}
        />
      )}
    </div>
  );
}
