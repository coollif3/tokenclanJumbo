import PropTypes from 'prop-types';
import { LangContext } from './LangContext';

function LangProvider({ dictionary, children }) {
  return (
    <LangContext.Provider value={dictionary}>{children}</LangContext.Provider>
  );
}

export { LangProvider };

LangProvider.propTypes = {
  children: PropTypes.node.isRequired,
  dictionary: PropTypes.any.isRequired,
};
