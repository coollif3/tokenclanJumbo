"use client";
import { isValidEmail } from "@app/_utilities/helpers";
import { MailingListJumboCard } from "@app/_components/widgets/NewsLetterSubscription/MailingListJumboCard";
import { Button, Collapse, TextField, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { addSubscriber } from "@app/_lib/sendfox";
import Image from "next/image";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";

interface NewsLetterSubscriptionProps {
  title: string;
  subheader: string;
}

export function NewsLetterSubscription({
  title,
  subheader,
}: NewsLetterSubscriptionProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { theme } = useJumboTheme();

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
    <MailingListJumboCard
      avatar={null}
      bgimage={null}
      textColor="common.white"
      bgcolor={["primary.main"]}
      title={title}
      action={null}
      subheader={subheader}
      contentWrapper
      contentSx={{ pt: 0 }}
    >
      <div style={{ position: "relative", width: "100%", height: "320px" }}>
        <Image
          src="/assets/images/mailingListIllustration.png" // Adjust the path to your image
          alt="Newsletter Subscription"
          fill // Makes the image responsive
          quality={100} // Ensures the best quality
          style={{ objectFit: "cover" }} // Adjust the object fit as needed
        />
      </div>

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
          <Button
            variant="contained"
            sx={{
              bgcolor: theme.palette.text.link,
              "&:hover": { bgcolor: theme.palette.primary.main },
            }}
            onClick={handleSubscribe}
          >
            Subscribe
          </Button>
        </Box>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontStyle: "italic", textAlign: "center" }}
          m={2}
        >
          {`Your email is safe with us, we don't spam.`}
        </Typography>
      </Collapse>
      <Collapse in={subscribed}>
        <Typography
          variant="h6"
          color="success.main"
          sx={{ textAlign: "center", m: 2 }}
        >
          Please check your email/spam folder to confirm your subscription.
        </Typography>
      </Collapse>
      <Collapse in={!!errorMessage}>
        <Typography variant="body2" color="error.main">
          {errorMessage}
        </Typography>
      </Collapse>
    </MailingListJumboCard>
  );
}
