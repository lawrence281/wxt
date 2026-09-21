import LegalPage from './LegalPage'
import { termsAndConditions } from '../data/legal/termsAndConditions'

function TermsAndConditionsPage() {
  return <LegalPage doc={termsAndConditions} />
}

export default TermsAndConditionsPage
