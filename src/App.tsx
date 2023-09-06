import { useEffect, useMemo, useRef, useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  Table,
  Card,
  Modal
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useDispatch } from "react-redux";

// Redux
import { AppDispatch } from "./store";
import {} from "./reducers/transaction";

type Transaction = {
  id: string;
  category: string;
  description?: string | null;
  amount: number;
  timestamp: number;
};

const CATEGORIES = ["One", "Two", "Three"];

export default function App() {
  const amountRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  // Redux
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // amountRef.current?.focus();
  }, []);

  const [transactions, setTransactions] = useState<Record<
    string,
    Transaction[]
  > | null>(null);

  const CURRENT_DATE = useMemo(() => moment().format("YYYY-MM-DD"), []);
  const [CURSOR_DATE, setCursorDate] = useState<string>(CURRENT_DATE);

  const handleSave = () => {
    const transaction: Transaction = {
      id: uuidv4(),
      category: categoryRef.current?.value || " - No Category - ",
      description: descriptionRef.current?.value || "",
      amount: Number(amountRef.current?.value) ?? 0,
      timestamp: new Date(CURSOR_DATE).valueOf()
    };

    setTransactions((prev_txns) => {
      const txns = { ...prev_txns };

      if (CURSOR_DATE in txns) {
        const current_day_txns = txns[CURSOR_DATE];
        txns[CURSOR_DATE] = [...current_day_txns, transaction];
      } else {
        txns[CURSOR_DATE] = [transaction];
      }

      return txns;
    });

    if (amountRef.current) amountRef.current.value = "";
    if (categoryRef.current) categoryRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
  };

  // Handlers
  const handleChangeDay = (subtract = 0) => {
    let date: moment.Moment | string = moment(new Date(CURSOR_DATE));
    if (subtract) {
      date = date.subtract(1, "day").format("YYYY-MM-DD");
    } else {
      date = date.add(1, "day").format("YYYY-MM-DD");
    }
    setCursorDate(date);
  };

  const handleEditTxn = (id: string) => {
    console.log("id", id);
  };

  // Calculations
  const cursor_date_records = useMemo(
    () =>
      transactions
        ? Object.entries(transactions)
            .filter(([date]) => date === CURSOR_DATE)
            .map(([date, records], index) => records)
        : [],
    [transactions, CURSOR_DATE]
  );

  const cursor_total = useMemo(
    () =>
      cursor_date_records.length
        ? cursor_date_records[0].reduce((acc, curr) => {
            acc += Number(curr?.amount!) ?? 0;
            return acc;
          }, 0)
        : 0,
    [cursor_date_records]
  );

  return (
    <Provider>
      <div className="App">
        {/* {true && (
        <Modal show={true} centered>
          <Modal.Body>
            <Form.Group>
              <Form.Select ref={categoryRef}>
                <option value={""}>Select Category</option>
                {CATEGORIES.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Control
                as="textarea"
                placeholder="Description"
                type="text"
                name="description"
                ref={descriptionRef}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Control
                placeholder="Amount"
                type="text"
                name="amount"
                ref={amountRef}
              />
            </Form.Group>

            <Button className="my-3" variant="secondary" onClick={handleSave}>
              Create
            </Button>
          </Modal.Body>
        </Modal>
      )} */}

        <Container className="my-4">
          <Form.Group>
            <Form.Select ref={categoryRef}>
              <option value={""}>Select Category</option>
              {CATEGORIES.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Control
              as="textarea"
              placeholder="Description"
              type="text"
              name="description"
              ref={descriptionRef}
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Control
              placeholder="Amount"
              type="text"
              name="amount"
              ref={amountRef}
            />
          </Form.Group>

          <Button className="my-3" variant="secondary" onClick={handleSave}>
            Create
          </Button>
        </Container>

        <Row className="d-flex justify-content-center align-items-center text-center">
          <Col>
            <Button variant="light" onClick={() => handleChangeDay(1)}>
              Previous
            </Button>
          </Col>
          <Col>
            <b> {CURSOR_DATE}</b>
          </Col>
          <Col>
            <Button
              variant="light"
              disabled={CURSOR_DATE === CURRENT_DATE}
              onClick={() => handleChangeDay()}
            >
              Next
            </Button>
          </Col>
        </Row>

        <Container>
          {transactions &&
            Object.entries(transactions)
              .filter(([date]) => date === CURSOR_DATE)
              .map(([date, records], index) => (
                <div key={index}>
                  <Table className="table-striped">
                    <thead>
                      <tr>
                        <th> Amount</th>
                        <th> Category </th>
                        <th> Description</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map(
                        ({ category, amount, description, id }, txn_index) => (
                          <tr key={txn_index}>
                            <td>{amount}</td>
                            <td>{category}</td>
                            <td>{description}</td>
                            <td>
                              <Button
                                variant="secondary"
                                onClick={() => handleEditTxn(id)}
                              >
                                {" "}
                                Edit{" "}
                              </Button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </div>
              ))}

          <Card className="mt-3">
            <Card.Header>Summary </Card.Header>
            <Card.Body>Total - {cursor_total}</Card.Body>
          </Card>
        </Container>
      </div>
    </Provider>
  );
}
