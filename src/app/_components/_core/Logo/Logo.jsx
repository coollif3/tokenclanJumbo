import { Div } from '@jumbo/shared';
import Link from '@mui/material/Link';
import Image from 'next/image';
import PropTypes from 'prop-types';

const Logo = ({ mini = false, mode = 'light', sx }) => {
  return (
    <Div sx={{ display: 'inline-flex', ...sx }}>
      <Link href={'/'}>
        {!mini ? (
          <Image
            src={
              mode === 'light'
                ? `/assets/images/tc-logo.png`
                : `/assets/images/tc-logo.png`
            }
            alt='TokenClan'
            width={110}
            height={35}
            style={{ verticalAlign: 'middle' }}
          />
        ) : (
          <Image
            src={
              mode === 'light'
                ? `/assets/images/tc-logo-small.png`
                : `/assets/images/tc-logo-small.png`
            }
            alt='TokenClan'
            width={35}
            height={35}
            style={{ verticalAlign: 'middle' }}
          />
        )}
      </Link>
    </Div>
  );
};

export { Logo };

Logo.propTypes = {
  mini: PropTypes.bool,
  mode: PropTypes.oneOf(['light', 'semi-dark', 'dark']).isRequired,
  sx: PropTypes.object,
};
