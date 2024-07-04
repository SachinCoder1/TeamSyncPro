"use client";

import { addTag, removeTag } from "@/app/actions/task";
import { getTags } from "@/app/actions/workspace";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TagType } from "@/types/project";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactTags } from "react-tag-autocomplete";
import useSWR from "swr";

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
  tags: string[] | undefined;
  suggestions: any;
};
export default function TagsSelector({
  taskId,
  workspaceId,
  tags,
  suggestions,
}: Props) {
  // const { data, isLoading } = useSWR(
  //   workspaceId ? `/status/${workspaceId}` : null,
  //   () => getTags()
  // );
  // const suggestions = data?.data?.map((item) => ({
  //   label: item.name,
  //   value: item._id,
  // }));
  // const suggestions = data?.data?.map((item) => ({
  //   label: item.name,
  //   value: item._id,
  // }));
  // const preSelected = suggestions?.filter((suggestion) =>
  //   tags?.includes(suggestion.value)
  // );
  const [toggleEditor, setToggleEditor] = useState(false);
  const [selected, setSelected] = useState<any>(
    suggestions?.filter((suggestion: any) => tags?.includes(suggestion.value))
  );

  const api = useRef<any>(null);
  const focus = useCallback(() => {
    // if (!api || !api.current) return;
    api.current.input.focus();
  }, [api]);

  const onAdd = useCallback(
    async (newTag: any) => {
      setSelected([...selected, newTag]);
      await addTag({
        name: newTag?.label || newTag?.value,
        taskId: taskId,
        workspaceId: workspaceId,
      });
    },
    [selected]
  );

  const onDelete = useCallback(
    async (tagIndex: any) => {
      const tagToRemove = selected[tagIndex];
      setSelected(selected.filter((_: any, i: any) => i !== tagIndex));
      await removeTag(tagToRemove.value, taskId);

    },
    [selected]
  );

  const onValidate = useCallback((value: any) => isValid(value), []);

  useEffect(() => {
    if (toggleEditor === true && api.current) {
      focus();
    }
  }, [toggleEditor, api]);

  // useEffect(() => {
  //   if (data?.success) {
  //     const preSelected = data?.data?.filter((suggestion) =>
  //       tags?.includes(suggestion._id)
  //     );
  //     if (preSelected) {
  //       setSelected([...preSelected]);
  //     }
  //   }
  // }, [data, isLoading]);

  // if (isLoading) return <>loading...</>;

  return (
    <div>
      {toggleEditor === false && (
        <div
          onClick={() => {
            setToggleEditor(true);
          }}
          className="flex flex-wrap gap-2"
        >
          {selected?.length > 0 ? (
            selected.map((item: any, index: any) => (
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
            ))
          ) : (
            <Badge variant={"secondary"}>None</Badge>
          )}
        </div>
      )}

      {toggleEditor === true && (
        <ReactTags
          labelText="Select countries"
          selected={selected || []}
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
