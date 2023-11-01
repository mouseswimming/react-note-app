import { Card, Col } from "react-bootstrap";
import { Note } from "../types";
import { Link } from "react-router-dom";

import styles from "./NoteCard.module.css";
import TagGroups from "./TagGroups";
import ReactMarkdown from "react-markdown";

export default function NoteCard({ id, title, tags, markdown }: Note) {
  return (
    <Col>
      <Card
        as={Link}
        to={`/${id}`}
        className={`h-100 text-reset text-decoration-none ${styles.card} bg-white`}
      >
        <Card.Body>
          <Card.Title className="text-capitalize text-primary">
            {title}
          </Card.Title>
          <Card.Text className={`${styles.preview}`}>
            {/* {markdown} */}
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <TagGroups tags={tags} />
        </Card.Footer>
      </Card>
    </Col>
  );
}
