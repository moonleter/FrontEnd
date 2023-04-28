import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function Home() {
  return (
    <div className="main-content">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={8}>
            <Card className="mt-5 text-center">
              <Card.Body>
                <Card.Title>
                  <h1>Welcome to the Todo List App!</h1>
                </Card.Title>
                <Card.Text>
                  This application will help you manage your tasks and stay
                  organized. Click on the navigation links to view your tasks
                  and categories.
                </Card.Text>
                <Card.Footer className="text-muted">
                  Authors: Šimon Kunz, Ondřej Ritzka
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
