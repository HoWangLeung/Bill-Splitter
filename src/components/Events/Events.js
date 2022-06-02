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

    target.items.push({
      id: target.items[target.items.length - 1].id + 1,
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

    if (target.items.length == 1) return;

    target.items = target.items.filter((e) => {
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

  const handleEventChange = (e, item, person) => {
    let currentPersonId = person.id;

    let newValue = e.target.value;

    let targetPerson = data.find((d) => d.id === currentPersonId);

    let type = e.target.name;

    targetPerson.items = targetPerson.items.map((d) => {
      console.log(d.id, item);
      if (d.id === item.id) {
        if (type === "name") {
          d.name = newValue;
        }
        if (type === "price") {
          d.price = newValue;
        }
      }
      return d;
    });

    let newData = data.map((d) => {
      let subTotal =0
      if (d.id === targetPerson.id) {
        d = targetPerson;
      }
      d.items.forEach(item=> subTotal+=parseInt(item.price))
      d.total=subTotal

      return d;
    });

    console.log(newData);

    
    setData([...newData]);
  };

  return data.map((person, i) => (
    <Card
      raised
      key={person.name}
      style={{ width: "600px", margin: "20px", padding: "20px" }}
    >
      <Typography>Person {i + 1}</Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        {person.items.map((item, eventIndex) => (
          <Stack key={item.id} direction="row" spacing={2}>
            <TextField
              required
              label="Required"
              name="name"
              onChange={(e) => handleEventChange(e, item, person)}
              value={item.name}
            />
            <TextField
              required
              label="Required"
              name="price"
              onChange={(e) => handleEventChange(e, item, person)}
              value={item.price===0?'':item.price}
            />
            <IconButton
              onClick={() => removeEvent(i, item.id)}
              aria-label="delete"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Stack>
        ))}
        <Typography>Total:{person.total}</Typography>
        <Button onClick={() => addEvent(i)} variant="contained">
          Add
        </Button>
        
        
      </Grid>
    </Card>
  ));
}
