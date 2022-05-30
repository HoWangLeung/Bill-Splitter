import {
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export default function Events(props) {
  const { data, setData } = props;
  console.log(props);

  const addEvent = (i) => {
    console.log(i);
    let target = data.find((d) => d.id === i);

    target.events.push({
      id: target.events[target.events.length - 1].id + 1,
      name: "",
      price: 0,
    });

    data.map((d) => {
      // console.log(d.id,target.id);
      if (d.id === target.id) {
        d = target;
      }
      return d;
    });

    console.log(data);

    setData([...data]);
  };

  const removeEvent = (i, eventId) => {
    let target = data.find((d) => d.id === i);

    if (target.events.length == 1) return;

    target.events = target.events.filter((e) => {
      console.log(e.id, eventId);
      return e.id !== eventId;
    });

    console.log(target);
    data.map((d) => {
      // console.log(d.id,target.id);
      if (d.id === target.id) {
        d = target;
      }
      return d;
    });

    console.log(data);

    setData([...data]);
  };

  return props.data.map((person, i) => (
    <Card raised key={person.name} style={{width:"600px",margin:"20px",padding:"20px"}} >
      <Typography>Person {i + 1}</Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        {person.events.map((e, eventIndex) => (
          <Stack key={e.id} direction="row" spacing={2}>
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Event"
            />
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Amount"
            />
            <IconButton
              onClick={() => removeEvent(i, e.id)}
              aria-label="delete"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Stack>
        ))}
        <Button onClick={() => addEvent(i)} variant="contained">
          Add
        </Button>
      </Grid>
    </Card>
  ));
}
