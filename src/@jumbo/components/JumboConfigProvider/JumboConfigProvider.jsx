'use client';
import PropTypes from 'prop-types';
import { JumboConfigContext } from './JumboConfigContext';

function JumboConfigProvider({ children, ...props }) {
  return (
    <JumboConfigContext.Provider value={{ ...props }}>
      {children}
    </JumboConfigContext.Provider>
  );
}

export { JumboConfigProvider };

JumboConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
  LinkComponent: PropTypes.any, // You can replace `any` with a more specific prop type
  translator: PropTypes.func, // Assuming translator is a function
};
