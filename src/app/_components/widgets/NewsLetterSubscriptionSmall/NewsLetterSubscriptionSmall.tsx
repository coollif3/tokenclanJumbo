"use client";
import { isValidEmail } from "@app/_utilities/helpers";
import { JumboCard } from "@jumbo/components";
import { Button, Collapse, TextField, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { addSubscriber } from "@app/_lib/sendfox";

interface NewsLetterSubscriptionProps {
  title: React.ReactNode;
  subheader: React.ReactNode;
}

export function NewsLetterSubscriptionSmall({
  title,
  subheader,
}: NewsLetterSubscriptionProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async () => {
    setErrorMessage("");
    if (isValidEmail(email) || firstName !== "") {
      setIsEmailValid(true);
      const res = await addSubscriber(email, firstName);
      
      if (res.error || !res.id) {
        return setErrorMessage(res.error || res.email);
      }
      setSubscribed(true);
    } else {
      setIsEmailValid(false);
      setSubscribed(false);
    }
  };

  return (
    <JumboCard
      title={title}
      subheader={subheader}
      contentWrapper
      contentSx={{ pt: 0 }}
    >
      <Collapse in={!subscribed}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!isEmailValid}
          helperText={!isEmailValid && "Please enter a valid email address"}
          fullWidth
          margin="normal"
        />
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubscribe}>
            Subscribe
          </Button>
        </Box>
      </Collapse>
      <Collapse in={subscribed}>
        <Typography variant="h5" color="success.main">
          Please check your email/spam folder to confirm your subscription.
        </Typography>
      </Collapse>
      <Collapse in={!!errorMessage}>
        <Typography variant="body2" color="error.main">
          {errorMessage}
        </Typography>
      </Collapse>
    </JumboCard>
  );
}
export default NewsLetterSubscriptionSmall;