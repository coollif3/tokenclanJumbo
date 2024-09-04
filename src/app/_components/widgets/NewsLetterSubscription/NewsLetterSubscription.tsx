"use client";
import { isValidEmail } from "@app/_utilities/helpers";
import { JumboCard } from "@jumbo/components";
import { ErrorOutlineSharp } from "@mui/icons-material";
import { Button, Collapse, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface NewsLetterSubscriptionProps {
  title: React.ReactNode;
  subheader: React.ReactNode;
}

export function NewsLetterSubscription({
  title,
  subheader,
}: NewsLetterSubscriptionProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (isValidEmail(email)) {
      setIsEmailValid(true);
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
      <Button variant="contained" color="primary" onClick={handleSubscribe}>
        Subscribe
      </Button>
      <Collapse in={subscribed}>
        <Typography variant="body2" color="success.main">
          Thank you for subscribing!
        </Typography>
      </Collapse>
    </JumboCard>
  );
}
