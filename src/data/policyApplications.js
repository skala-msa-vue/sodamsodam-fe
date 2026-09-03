const STORAGE_KEY = 'sodam_policy_applications'

function readAll() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return []
  }
}

export function getPolicyApplications(userId) {
  const applications = readAll()
  if (userId == null) return applications
  return applications.filter((item) => String(item.userId) === String(userId))
}

export function findPolicyApplication(policyId, userId) {
  return getPolicyApplications(userId).find((item) => item.policyId === policyId) || null
}

export function createPolicyApplication({ policy, user, applicantNote }) {
  const applications = readAll()
  const existing = applications.find(
    (item) => item.policyId === policy.id && String(item.userId) === String(user.id)
  )

  if (existing) return existing

  const application = {
    id: `POL-${Date.now().toString(36).toUpperCase()}`,
    policyId: policy.id,
    policyTitle: policy.title,
    agency: policy.agency,
    category: policy.category,
    support: policy.support,
    deadline: policy.deadline,
    userId: user.id,
    applicantName: user.name || '',
    applicantEmail: user.email || '',
    applicantNote: applicantNote.trim(),
    status: 'RECEIVED',
    appliedAt: new Date().toISOString()
  }

  applications.unshift(application)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
  return application
}

export const applicationStatusLabels = {
  RECEIVED: '접수 완료',
  REVIEWING: '자격 심사 중',
  APPROVED: '승인',
  REJECTED: '보완 필요'
}
