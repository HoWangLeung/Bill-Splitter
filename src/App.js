import logo from "./logo.svg";
import "./App.css";
import { Box, Container } from "@mui/system";
import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

function App() {
  const [numPeople, setNumPeople] = useState(3);

  const [data, setData] = useState([
    {
      name: "Player 1",
      events: [
        { name: "Lunch", price: 123 },
        { name: "Football", price: 100 },
      ],
    },
    {
      name: "Player 2",
      events: [{ name: "Dinner", price: 456 }],
    },
    {
      name: "Player 3",
      events: [{ name: "Breakfast", price: 789 }],
    },
  ]);

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

      {data.map((person, i) => (
        <Card key={person.name}>
          <Typography>Person {i + 1}</Typography>
          <div>
            {person.events.map((e) => (
              <div>
                <TextField
                  key={e.name}
                  required
                  id="outlined-required"
                  label="Required"
                  defaultValue="Event"
                />
         
                <TextField
                  key={e.name}
                  required
                  id="outlined-required"
                  label="Required"
                  defaultValue="Amount"
                />
              
              </div>
            ))}
          </div>
          <Button variant="contained">Add</Button>
        </Card>
      ))}
    </div>
  );
}

export default App;
