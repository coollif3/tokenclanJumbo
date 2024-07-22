import { Div } from '@jumbo/shared';
import PropTypes from 'prop-types';

function DivWithBackground({ sx, bgimage, children }) {
  return (
    <Div
      sx={{
        p: 0,
        ...(bgimage
          ? {
              background: `url(${bgimage}) no-repeat center`,
              backgroundSize: 'cover',
            }
          : {}),
        ...sx,
        position: 'relative',
      }}
    >
      {children}
    </Div>
  );
}

export { DivWithBackground };

DivWithBackground.propTypes = {
  bgimage: PropTypes.string,
  sx: PropTypes.object,
  children: PropTypes.number,
};
