import React, { useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { generateVideo } from "../api";
import VideoPlayer from "../components/VideoPlayer";

const Home = () => {
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const generatedVideoUrl = await generateVideo(url);
      setVideoUrl(generatedVideoUrl);
    } catch (error) {
      alert("Failed to generate video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Generate Marketing Reels
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter Product URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Video"}
          </Button>
        </form>
        <VideoPlayer videoUrl={videoUrl} />
      </Box>
    </Container>
  );
};

export default Home;