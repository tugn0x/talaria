/*
 * References Form
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.ReferencesList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'References list',
  },
  createNewReference: {
    id: `${scope}.createNewReference`,
    defaultMessage: 'Create new reference',
  },
});
