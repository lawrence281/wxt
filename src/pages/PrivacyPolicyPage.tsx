import LegalPage from './LegalPage'
import { privacyPolicy } from '../data/legal/privacyPolicy'

function PrivacyPolicyPage() {
  return <LegalPage doc={privacyPolicy} />
}

export default PrivacyPolicyPage
