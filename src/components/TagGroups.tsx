import { Badge, Stack } from "react-bootstrap";
import { Tag } from "../types";

type TagGroupsProps = {
  tags: Tag[];
  alignLeft?: boolean;
};

export default function TagGroups({ tags, alignLeft = false }: TagGroupsProps) {
  return (
    <>
      {tags.length === 0 && <small className="text-muted">no tag</small>}
      {tags.length > 0 && (
        <Stack
          direction="horizontal"
          gap={1}
          className={`flex-wrap ${
            alignLeft ? "justify-content-start" : "justify-content-end"
          }`}
        >
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              className="text-truncate fw-normal pt-1 px-3"
              style={{ paddingBottom: "6px" }}
              pill
              bg="secondary"
            >
              {tag.label}
            </Badge>
          ))}
        </Stack>
      )}
    </>
  );
}
