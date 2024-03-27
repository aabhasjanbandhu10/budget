// src/BudgetTracker.js
import React, { useState } from 'react';
import { Table, InputGroup, FormControl, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function BudgetTracker() {
  const [expenses, setExpenses] = useState([]);
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [totalBudget, setTotalBudget] = useState(1000); // Default total budget is ₹1000
  const [newBudget, setNewBudget] = useState(totalBudget); // For editing total budget

  const addExpense = () => {
    const newExpense = {
      item,
      quantity,
      cost: parseFloat(cost), // Parse the cost as float
      date,
      notes
    };
    setExpenses([...expenses, newExpense]);
    setItem('');
    setQuantity(0);
    setCost(0);
    setDate('');
    setNotes('');
  };

  const handleBudgetChange = (e) => {
    setNewBudget(parseFloat(e.target.value)); // Parse the new budget as float
  };

  const updateBudget = () => {
    setTotalBudget(newBudget);
  };

  const calculateBudget = () => {
    const totalCost = expenses.reduce((acc, expense) => acc + expense.cost * expense.quantity, 0); // Include quantity in the calculation
    return totalCost;
  };

  const remainingBudget = totalBudget - calculateBudget();

  return (
    <div className="container">
      <Row className="my-4">
        <Col>
          <h2>Budget Tracker</h2>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <h5>Total Budget: ₹
            <input
              type="number"
              value={newBudget}
              onChange={handleBudgetChange}
            />
            <Button variant="primary" onClick={updateBudget}>Update</Button>
          </h5>
        </Col>
        <Col>
          <h5>Remaining Budget: ₹{remainingBudget}</h5>
        </Col>
        <Col>
          <h5>Spent: ₹{calculateBudget()}</h5>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <FormControl
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <FormControl
              type="number"
              placeholder="Cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
            <FormControl
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <FormControl
              type="text"
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <Button variant="primary" onClick={addExpense}>Add Expense</Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Cost (₹)</th>
                <th>Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{expense.item}</td>
                  <td>{expense.quantity}</td>
                  <td>{expense.cost * expense.quantity} ₹</td> {/* Include quantity in the display */}
                  <td>{expense.date}</td>
                  <td>{expense.notes}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default BudgetTracker;
