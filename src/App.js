import logo from "./logo.svg";
import "./App.css";
import { Box, Container } from "@mui/system";
import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Events from "./components/Events/Events";

function App(props) {
  const [numPeople, setNumPeople] = useState(3);

  const [data, setData] = useState([
    {
      id: 0,
      name: "Player 1",
      items: [{ id: 0, name: "Lunch", price: 0 }],
      total: 0,
    },
    {
      id: 1,
      name: "Player 2",
      items: [{ id: 0, name: "Dinner", price: 0 }],
      total: 0,
    },
    {
      id: 2,
      name: "Player 3",
      items: [{ id: 0, name: "Breakfast", price: 0 }],
      total: 0,
    },
  ]);

  const [displayText,setDisplayText] = useState([])

  useEffect(() => {
    let newData = [];
    Array.from(Array(numPeople).keys()).forEach((num) => {
      newData.push({
        id: num,
        name: `Person ${num + 1}`,
        items: [{ id: 0, name: "", price: 0 }],
      });
    });

    setData([...newData]);
  }, [numPeople]);

  const calculateResult = () => {
    let payments = {};
    data.map((person) => {
      payments[person.name]=person.total
    });

    splitPayments(payments)
  };

  const splitPayments = (payments) => {
    const people = Object.keys(payments);
    const valuesPaid = Object.values(payments);

    const sum = valuesPaid.reduce((acc, curr) => curr + acc);
    const mean = sum / people.length;

    const sortedPeople = people.sort(
      (personA, personB) => payments[personA] - payments[personB]
    );
    const sortedValuesPaid = sortedPeople.map(
      (person) => payments[person] - mean
    );

    let i = 0;
    let j = sortedPeople.length - 1;
    let debt;

    while (i < j) {
      debt = Math.min(-sortedValuesPaid[i], sortedValuesPaid[j]);
      sortedValuesPaid[i] += debt;
      sortedValuesPaid[j] -= debt;

      console.log(`${sortedPeople[i]} owes ${sortedPeople[j]} $${debt}`);

      if (sortedValuesPaid[i] === 0) {
        i++;
      }

      if (sortedValuesPaid[j] === 0) {
        j--;
      }
    }
  };

  return (
    <div className="App">
      <Container>
        <p>Number of people:</p>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Button
            onClick={() => setNumPeople(3)}
            variant={numPeople === 3 ? "contained" : "outlined"}
          >
            3
          </Button>
          <Button
            onClick={() => setNumPeople(4)}
            variant={numPeople === 4 ? "contained" : "outlined"}
          >
            4
          </Button>
          <Button
            onClick={() => setNumPeople(5)}
            variant={numPeople === 5 ? "contained" : "outlined"}
          >
            5
          </Button>
        </Stack>
      </Container>

      <Events data={data} setData={setData} />
      <Button variant="contained" onClick={calculateResult}>
        Calculate
      </Button>
    </div>
  );
}

export default App;
