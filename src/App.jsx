import {
  Box,
  Card,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CheckIcon from "@mui/icons-material/Check";

function App() {
  const [endpoint, setEndPoint] = useState("");
  const [finalEndPoint, setFinalEndpoint] = useState("");
  const [container, setContainer] = useState([]);

  //Render the data from API everytime user submits new input
  useEffect(() => {
    fetchData();
  }, [finalEndPoint]);

  //Fetch data from API based on textfield
  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${endpoint}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjk3OGY5YjI1OWIyMzQzMzRmYzQ1YzBkMDYwYWM2MiIsInN1YiI6IjY1NGJlYWI5NWE1ZWQwMDExZTA1OGIxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YKiTBEV2qCws4uS_2LhQqsQGDwJz4IYirZ8SwpEYOAY",
      },
    };

    await fetch(url, options)
      .then((res) => res.json())
      .then((json) => setContainer(json.results))
      .catch((err) => console.error("error:" + err));
  };

  const handleChange = (event) => {
    setEndPoint(event.target.value);
  };

  //On submit assign the new endpoint to finalEndpoint, which will trigger useEffect
  const handleSubmit = (event) => {
    event.preventDefault();
    setFinalEndpoint(endpoint);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography variant="h1">The Movie DataBase</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <TextField
            sx={{ width: "30%", label: { fontSize: "20px" } }}
            label="Search for a film..."
            value={endpoint}
            focused
            color="primary"
            onChange={handleChange}
            variant="standard"
          />
          <IconButton
            size="large"
            variant="contained"
            color="success"
            type="submit"
          >
            <CheckIcon />
          </IconButton>
        </Box>
      </form>

      <Grid container spacing={2}>
        {container.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2}
            key={index}
            sx={{ marginTop: "50px" }}
          >
            <Card elevation={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h4">{item.original_title}</Typography>
              </Box>
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                alt={item.original_title}
                style={{ width: "100%" }}
              />
              {<Typography variant="subtitle1">{item.overview}</Typography>}
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default App;
