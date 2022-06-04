import logo from "./logo.svg";
import "./App.css";
import { Box, Container } from "@mui/system";
import {
  Button,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Events from "./components/Events/Events";
import Result from "./components/Result";

function App(props) {
  const [numPeople, setNumPeople] = useState(3);

  const [data, setData] = useState([
    {
      id: 0,
      name: "Person One",
      items: [{ id: 0, name: "Lunch", price: 1110 }],
      total: 1110,
    },
    {
      id: 1,
      name: "Person Two",
      items: [{ id: 0, name: "Dinner", price: 210 }],
      total: 210,
    },
    {
      id: 2,
      name: "Person Three",
      items: [{ id: 0, name: "Breakfast", price: 310 }],
      total: 310,
    },
  ]);

  const [result, setResult] = useState([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    let newData = [];
    Array.from(Array(numPeople).keys()).forEach((num) => {
      console.log(num);
      newData.push({
        id: num,
        name: `Person_${num + 1}`,
        items: [{ id: 0, name: `Item_${num + 1}`, price: (num + 1) * 100 }],
        total: (num + 1) * 100,
      });
    });
    console.log(newData);
    setData([...newData]);
  }, [numPeople]);

  useEffect(() => {
    console.log(result);
  }, [result]);

  const calculateResult = (e) => {
    setResult([]);
    let payments = {};
    data.map((person) => {
      console.log("person:", person);
      payments[person.name] = person.total;
    });
    console.log("payments:", payments);
    splitPayments(payments);
  };

  function splitPayments(payments) {
    const people = Object.keys(payments);
    const valuesPaid = Object.values(payments);

    const sum = valuesPaid.reduce((acc, curr) => curr + acc);
    setSum(sum);
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
    let count = 0;
    while ((i < j) & (count < 10)) {
      debt = Math.min(-sortedValuesPaid[i], sortedValuesPaid[j]);
      sortedValuesPaid[i] += debt;
      sortedValuesPaid[j] -= debt;

      console.log(`${sortedPeople[i]} owes ${sortedPeople[j]} $${debt}`);

      let finalResult = {
        debtor: sortedPeople[i],
        creditor: sortedPeople[j],
        amount: debt,
      };

      setResult((state) => [...state, finalResult]);

      if (sortedValuesPaid[i] === 0) {
        i++;
      }

      if (sortedValuesPaid[j] === 0) {
        j--;
      }
      if (count === 999) {
        alert("something wrong");
      }
      count += 1;
    }
  }

  return (
    <div className="App">
      <Container maxWidth="xl" >
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4" sx={{fontWeight:"900",margin:"30px"}}>Bill Splitter</Typography>
        </Grid>

        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: "600", fontSize: "110%" }}
          >
            Number of people:&nbsp;{" "}
          </Typography>
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
        </Grid>

        <Grid container>
          <Grid
            container
            item
            md={6}
            sx={{
              maxHeight: "800px",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "0.5rem",
                height: "0px",
              },
            }}
          >
            <Events data={data} setData={setData} />
          </Grid>
          <Grid
            container
            item
            md={6}
            alignItems="center"
            justifyContent="center"
          >
            {result.length > 0 && <Result result={result} sum={sum} />}

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {result.length == 0 && (
                <img
                  style={{ borderRadius: "10px" }}
                  alt="split"
                  src="/split.png"
                />
              )}
              <Box sx={{ margin: "10px" }}>
                <Button variant="contained" onClick={calculateResult}>
                  Calculate
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{ width: "100%", position: "absolute", bottom: "-3px", zIndex: "-999",margin:"0px"}}
      >
      <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stop-color="#002bdc88"></stop><stop offset="95%" stop-color="#32ded488"></stop></linearGradient></defs><path d="M 0,600 C 0,600 0,200 0,200 C 94.35406698564594,215.17703349282297 188.7081339712919,230.35406698564594 275,248 C 361.2918660287081,265.64593301435406 439.52153110047834,285.7607655502393 545,262 C 650.4784688995217,238.23923444976072 783.2057416267943,170.60287081339712 900,169 C 1016.7942583732057,167.39712918660288 1117.6555023923445,231.8277511961723 1205,248 C 1292.3444976076555,264.1722488038277 1366.1722488038276,232.08612440191385 1440,200 C 1440,200 1440,600 1440,600 Z" stroke="none" stroke-width="0" fill="url(#gradient)" class="transition-all duration-300 ease-in-out delay-150 path-0"></path><defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stop-color="#002bdcff"></stop><stop offset="95%" stop-color="#32ded4ff"></stop></linearGradient></defs><path d="M 0,600 C 0,600 0,400 0,400 C 72.43062200956936,364.04784688995215 144.86124401913872,328.0956937799043 246,325 C 347.1387559808613,321.9043062200957 476.98564593301444,351.6650717703349 581,374 C 685.0143540669856,396.3349282296651 763.1961722488038,411.244019138756 843,413 C 922.8038277511962,414.755980861244 1004.2296650717703,403.35885167464113 1104,399 C 1203.7703349282297,394.64114832535887 1321.8851674641148,397.32057416267946 1440,400 C 1440,400 1440,600 1440,600 Z" stroke="none" stroke-width="0" fill="url(#gradient)" class="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg>
      </Box>
    </div>
  );
}

export default App;
