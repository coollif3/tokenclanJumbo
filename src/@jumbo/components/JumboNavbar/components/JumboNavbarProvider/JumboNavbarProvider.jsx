import { useJumboTheme } from '@jumbo/components/JumboTheme/hooks';
import { isNavSection } from '@jumbo/utilities/helpers';
import { Box, Button, List, Modal } from '@mui/material';
import PropTypes from 'prop-types';
import { JumboNavIdentifier } from '..';
import { JumboNavbarContext } from './JumboNavbarContext';
import { JumboCard } from '@jumbo/components/JumboCard';
import React from 'react';
import { NewsLetterSubscription } from '@app/_components/widgets/NewsLetterSubscription';


function JumboNavbarProvider({
  items = {},
  mini = false,
  open = true,
  groupBehaviour = 'collapsible',
  theme,
}) {
  const miniAndClosed = !!mini && !open;
  const { theme: jumboTheme } = useJumboTheme();
  const contextValue = {
    items,
    miniAndClosed,
    theme: theme || jumboTheme,
    groupBehaviour,
    mini,
    open,
  };
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  let isFirstSection = true;
  return (
    <JumboNavbarContext.Provider value={contextValue}>
      <List
        disablePadding
        sx={{
          mr: miniAndClosed ? 0 : 2,
          pb: 2,
        }}
      >
        {items.menuItems.map((item, index) => {
          if (isNavSection(item) && isFirstSection === true) {
            isFirstSection = false;
            return (
              <JumboNavIdentifier
                item={item}
                key={index}
                isFirstSection={true}
              />
            );
          }
          return <JumboNavIdentifier item={item} key={index} />;
        })}
      </List>
      <Box sx={{ left:'50%',bottom:{xs:"-5%",sm:'10px',md:'10px',lg:'10px',xl:'10px'},transform:'translate(-50%)',position:{xs:'relative',sm: 'absolute',
              md: 'absolute',
              lg: 'absolute',
              xl: 'absolute',}}}>
        <JumboCard
          title="Lorem Ipsum"
          contentWrapper
          contentSx={{ pt: 0 }}
        >
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="primary" fullWidth  sx={{ borderRadius: 10 }} onClick={handleOpen}>
                Click
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
          <Box sx={{
            width: {
              xs: '90%',
              sm: '75%',
              md: '50%',
              lg: '40%',
              xl: '30%',
            },
            height: {
              xs: '90%'
            },
            maxHeight: '100%',
            overflowY: 'auto',
            maxWidth: '100%',
          }}>
            <NewsLetterSubscription title={items.widgets.title} subheader={items.widgets.subheader} /> 
          </Box>
      </Modal>
    </JumboNavbarContext.Provider>
  );
}

export { JumboNavbarProvider };

const NavbarItemPropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.string,
  target: PropTypes.string,
});

const NavbarGroupPropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, NavbarItemPropType])
  ).isRequired,
  collapsible: PropTypes.bool,
  icon: PropTypes.string,
});

const NavbarSectionPropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([NavbarGroupPropType, NavbarItemPropType])
  ).isRequired,
});

const MenuItemPropType = PropTypes.oneOfType([
  NavbarSectionPropType,
  NavbarGroupPropType,
  NavbarItemPropType,
]);

JumboNavbarProvider.propTypes = {
  items: PropTypes.arrayOf(MenuItemPropType).isRequired,
  mini: PropTypes.bool,
  open: PropTypes.bool,
  theme: PropTypes.object,
  groupBehaviour: PropTypes.oneOf(['collapsible', 'popover']),
};
