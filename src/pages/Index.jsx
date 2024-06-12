import React, { useEffect, useState } from "react";
import {
  Container,
  Text,
  VStack,
  Box,
  Heading,
  Switch,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import Parser from "rss-parser";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [filter, setFilter] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      const parser = new Parser();
      const feed = await parser.parseURL("https://news.ycombinator.com/rss");
      setStories(feed.items);
      setFilteredStories(feed.items);
    };

    fetchStories();
  }, []);

  useEffect(() => {
    if (filter) {
      setFilteredStories(
        stories.filter((story) =>
          story.title.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setFilteredStories(stories);
    }
  }, [filter, stories]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Container
      centerContent
      maxW="container.md"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg={isDarkMode ? "gray.800" : "white"}
      color={isDarkMode ? "white" : "black"}
    >
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" textAlign="center">
          Hacker News Top Stories
        </Heading>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark-mode" mb="0">
            Dark Mode
          </FormLabel>
          <Switch
            id="dark-mode"
            isChecked={isDarkMode}
            onChange={handleDarkModeToggle}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="filter">Filter by Subject</FormLabel>
          <Select id="filter" onChange={handleFilterChange} placeholder="All">
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="psychology">Psychology</option>
          </Select>
        </FormControl>
        <VStack spacing={4} width="100%">
          {filteredStories.map((story) => (
            <Box
              key={story.guid}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              width="100%"
              bg={isDarkMode ? "gray.700" : "gray.100"}
            >
              <Heading as="h2" size="md">
                <a href={story.link} target="_blank" rel="noopener noreferrer">
                  {story.title}
                </a>
              </Heading>
              <Text mt={2}>{story.contentSnippet}</Text>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;