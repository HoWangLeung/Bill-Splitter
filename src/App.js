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
      events: [
        { id: 0, name: "Lunch", price: 123 },
      ],
    },
    {
      id: 1,
      name: "Player 2",
      events: [{ id: 0, name: "Dinner", price: 456 }],
    },
    {
      id: 2,
      name: "Player 3",
      events: [{ id: 0, name: "Breakfast", price: 789 }],
    },
  ]);

 useEffect(() => {
  console.log(data);
 
   return () => {
    
   }
 }, [data])
 

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
    </div>
  );
}

export default App;
