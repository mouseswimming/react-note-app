import { FormEvent, useRef, useState } from "react";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { NoteData, Tag } from "../types";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export default function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [noteTags, setNoteTags] = useState<Tag[]>(tags);

  const navigate = useNavigate();

  function handleSumbit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: noteTags,
    });

    navigate("..");
  }
  return (
    <Form onSubmit={handleSumbit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                ref={titleRef}
                defaultValue={title}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableSelect
                isMulti
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                value={noteTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(tags) => {
                  setNoteTags(
                    tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  );
                }}
                onCreateOption={(label) => {
                  const newTag = { label, id: crypto.randomUUID() };
                  onAddTag(newTag);
                  setNoteTags((prevTags) => {
                    return [...prevTags, newTag];
                  });
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group controlId="markdown">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={15}
              ref={markdownRef}
              defaultValue={markdown}
            />
          </Form.Group>
        </Row>
        <Row>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Link to="..">
              <Button type="button" variant="outline-secondary">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Row>
      </Stack>
    </Form>
  );
}
