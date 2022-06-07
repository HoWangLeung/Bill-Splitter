import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  margin: "10px 0px 10px 0px",
  width: "100%",
  height: "20px",
}));

export default function Result({ result, sum,mean }) {
  return (
    <Grid container item>
      <Grid container item>
        <Typography sx={{ fontWeight: "600" }}>
          Total Expenses: $ {sum}
        </Typography>
      </Grid>
      <Grid container item>
        <Typography sx={{ fontWeight: "600" }}>
          Mean: $ {mean}
        </Typography>
      </Grid>

      <Grid container item>
        {result.length > 0 &&
          result.map((r) => {
            console.log(r);
            return (
              <React.Fragment key={r.debtor}>
                <Item>
                  <Grid container direction="row">
                    <Typography sx={{ fontWeight: "600" }}>
                      {r.debtor}
                    </Typography>
                    <Typography> &nbsp;pays&nbsp;</Typography>
                    <Typography sx={{ fontWeight: "600" }}>
                      {" "}
                      $ {(Math.round(r.amount * 100) / 100).toFixed(2)}
                    </Typography>
                    <Typography>&nbsp;to&nbsp;</Typography>
                    <Typography sx={{ fontWeight: "600" }}>
                      {r.creditor}
                    </Typography>
                  </Grid>
                </Item>
              </React.Fragment>
            );
          })}
      </Grid>
    </Grid>
  );
}
