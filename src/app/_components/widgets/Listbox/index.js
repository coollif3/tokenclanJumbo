import React from "react";
import { Box, Button, Modal } from "@mui/material";
import { JumboCard } from "@jumbo/components/JumboCard";
import { NewsLetterSubscription } from "@app/_components/widgets/NewsLetterSubscription";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";

const Listbox = ({ items }) => {
  const { theme } = useJumboTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          left: "50%",
          bottom: { xs: "-5%", sm: "10px", md: "10px", lg: "10px", xl: "10px" },
          transform: "translate(-50%)",
          width: "100%",
          position: {
            xs: "relative",
            sm: "absolute",
            md: "absolute",
            lg: "absolute",
            xl: "absolute",
          },
        }}
      >
        <JumboCard
          title="Stay Updated With Our Newsletter!"
          contentWrapper
          contentSx={{ pt: 0 }}
        >
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                bgcolor: theme.palette.text.link,
                "&:hover": {
                  bgcolor: theme.palette.primary.main, // Change this to your desired hover color
                },
                borderRadius: 10,
              }}
              onClick={handleOpen}
            >
              Subscribe
            </Button>
          </Box>
        </JumboCard>
      </Box>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: {
              xs: "90%",
              sm: "75%",
              md: "50%",
              lg: "40%",
              xl: "30%",
            },
            height: {
              xs: "90%",
            },
            maxHeight: "100%",
            overflowY: "auto",
            maxWidth: "100%",
          }}
        >
          <NewsLetterSubscription
            title={items.widgets.title}
            subheader={items.widgets.subheader}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Listbox;
