/*
 * Patron saga Messages
 *
 * This contains all the text for the Patron container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ReferencePage';

export default defineMessages({
  referenceAdded: {
    id: `${scope}.referenceAdded`,
    defaultMessage: 'Reference added',
  },
  referenceUpdate: {
    id: `${scope}.referenceUpdate`,
    defaultMessage: 'Reference updated',
  },
});