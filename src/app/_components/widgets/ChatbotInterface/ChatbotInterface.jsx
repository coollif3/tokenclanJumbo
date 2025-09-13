"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_CHATBOT_WEBHOOK_URL || "https://api.example.com/webhook/chat";

const suggestedQuestions = [
  "What is Bitcoin",
  "How do I analyze DeFi protocols?",
  "What are the key blockchain metrics?",
  "Explain market cap to TVL ratio",
];

export default function ChatbotInterface() {
  const { theme } = useJumboTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your crypto knowledge assistant. Ask me anything about cryptocurrency, blockchain, DeFi, or market analysis.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          timestamp: new Date().toISOString(),
          sessionId: `session_${Date.now()}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.response || "I'm sorry, I couldn't process your request at the moment. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm currently experiencing technical difficulties. Please try again later or contact support if the issue persists.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleSuggestedQuestion = (question) => {
    sendMessage(question);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      {/* Chat Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: "flex",
              justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            {message.sender === "bot" && (
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 32,
                  height: 32,
                }}
              >
                <SmartToyIcon sx={{ fontSize: 18 }} />
              </Avatar>
            )}
            
            <Paper
              elevation={1}
              sx={{
                p: 2,
                maxWidth: "70%",
                bgcolor: message.sender === "user" 
                  ? theme.palette.primary.main 
                  : theme.palette.background.paper,
                color: message.sender === "user" 
                  ? theme.palette.primary.contrastText 
                  : theme.palette.text.primary,
                borderRadius: 2,
                borderTopLeftRadius: message.sender === "bot" ? 0 : 2,
                borderTopRightRadius: message.sender === "user" ? 0 : 2,
              }}
            >
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                {message.text}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 1,
                  opacity: 0.7,
                  fontSize: "0.75rem",
                }}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Paper>

            {message.sender === "user" && (
              <Avatar
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  width: 32,
                  height: 32,
                }}
              >
                <PersonIcon sx={{ fontSize: 18 }} />
              </Avatar>
            )}
          </Box>
        ))}

        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                width: 32,
                height: 32,
              }}
            >
              <SmartToyIcon sx={{ fontSize: 18 }} />
            </Avatar>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
                borderTopLeftRadius: 0,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={16} />
                <Typography variant="body2" color="text.secondary">
                  AI is thinking...
                </Typography>
              </Box>
            </Paper>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <Box sx={{ p: 2, pt: 0 }}>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Try asking:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {suggestedQuestions.map((question, index) => (
              <Chip
                key={index}
                label={question}
                variant="outlined"
                size="small"
                onClick={() => handleSuggestedQuestion(question)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Input Area */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about crypto..."
            variant="outlined"
            size="small"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />
          <IconButton
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
              "&:disabled": {
                bgcolor: theme.palette.action.disabledBackground,
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}