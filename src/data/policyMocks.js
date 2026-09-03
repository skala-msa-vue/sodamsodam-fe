export const policyMocks = [
  {
    id: 'policy-001',
    title: '소상공인 경영안정자금',
    agency: '중소벤처기업부',
    category: 'FINANCE',
    region: '전국',
    summary: '경영 여건이 어려운 소상공인의 운영자금 부담을 낮추기 위한 금융지원 사업입니다.',
    support: '최대 7,000만원',
    deadline: '예산 소진 시까지',
    tags: ['운영자금', '저금리', '소상공인'],
    eligibility: {
      regions: ['전국'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 6,
      maxAnnualRevenue: 100000,
      maxEmployees: 10
    }
  },
  {
    id: 'policy-002',
    title: '서울시 소상공인 안심통장',
    agency: '서울특별시',
    category: 'FINANCE',
    region: '서울',
    summary: '서울 소재 소상공인의 단기 자금 공백을 지원하는 마이너스 통장 방식의 사업입니다.',
    support: '최대 1,000만원',
    deadline: '2026. 12. 31.',
    tags: ['서울', '긴급자금', '보증'],
    eligibility: {
      regions: ['서울'],
      businessTypes: ['INDIVIDUAL'],
      minBusinessMonths: 12,
      maxAnnualRevenue: 50000,
      maxEmployees: 5
    }
  },
  {
    id: 'policy-003',
    title: '온라인 판로개척 지원사업',
    agency: '소상공인시장진흥공단',
    category: 'MARKETING',
    region: '전국',
    summary: '온라인 판매 채널 진출에 필요한 콘텐츠 제작과 입점 비용을 지원합니다.',
    support: '최대 500만원',
    deadline: '2026. 10. 30.',
    tags: ['온라인', '판로', '콘텐츠'],
    eligibility: {
      regions: ['전국'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 3,
      maxAnnualRevenue: 30000,
      maxEmployees: 10
    }
  },
  {
    id: 'policy-004',
    title: '희망리턴패키지 재기지원',
    agency: '소상공인시장진흥공단',
    category: 'RECOVERY',
    region: '전국',
    summary: '경영위기 또는 폐업 예정 소상공인의 경영개선과 재취업·재창업 준비를 지원합니다.',
    support: '교육·컨설팅 지원',
    deadline: '상시 접수',
    tags: ['재기지원', '컨설팅', '교육'],
    eligibility: {
      regions: ['전국'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 1,
      maxAnnualRevenue: 100000,
      maxEmployees: 10
    }
  },
  {
    id: 'policy-005',
    title: '부산 소상공인 디지털 전환 지원',
    agency: '부산광역시',
    category: 'DIGITAL',
    region: '부산',
    summary: '부산 지역 사업장의 스마트 주문·고객관리 시스템 도입 비용을 지원합니다.',
    support: '최대 300만원',
    deadline: '2026. 11. 15.',
    tags: ['부산', '디지털', '스마트상점'],
    eligibility: {
      regions: ['부산'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 6,
      maxAnnualRevenue: 50000,
      maxEmployees: 5
    }
  },
  {
    id: 'policy-006',
    title: '채무조정 연계 경영회복 지원',
    agency: '신용회복위원회',
    category: 'DEBT',
    region: '전국',
    summary: '채무 부담을 겪는 소상공인에게 상담과 채무조정 연계 절차를 제공합니다.',
    support: '맞춤형 채무조정',
    deadline: '상시 접수',
    tags: ['채무조정', '상담', '경영회복'],
    eligibility: {
      regions: ['전국'],
      businessTypes: ['INDIVIDUAL'],
      minBusinessMonths: 6,
      maxAnnualRevenue: 100000,
      maxEmployees: 10
    }
  }
]

export const categoryLabels = {
  FINANCE: '금융지원',
  MARKETING: '판로지원',
  RECOVERY: '재기지원',
  DIGITAL: '디지털 전환',
  DEBT: '채무조정'
}

export const businessTypeLabels = {
  INDIVIDUAL: '개인사업자',
  CORPORATION: '법인사업자'
}

export function findMockPolicy(id) {
  return policyMocks.find((policy) => policy.id === id)
}

export function formatBusinessTypes(types) {
  return types.map((type) => businessTypeLabels[type]).filter(Boolean).join('·')
}

export function evaluateEligibility(policy, form) {
  const rules = policy.eligibility
  const items = [
    {
      label: `대상 지역: ${rules.regions.join(', ')}`,
      passed: rules.regions.includes('전국') || rules.regions.includes(form.region)
    },
    {
      label: `사업자 유형: ${formatBusinessTypes(rules.businessTypes)}`,
      passed: rules.businessTypes.includes(form.businessType)
    },
    {
      label: `업력 ${rules.minBusinessMonths}개월 이상`,
      passed: Number(form.businessMonths) >= rules.minBusinessMonths
    },
    {
      label: `연 매출액 ${rules.maxAnnualRevenue.toLocaleString('ko-KR')}만원 이하`,
      passed: Number(form.annualRevenue) <= rules.maxAnnualRevenue
    },
    {
      label: `상시근로자 ${rules.maxEmployees}명 이하`,
      passed: Number(form.employees) <= rules.maxEmployees
    }
  ]

  return {
    eligible: items.every((item) => item.passed),
    items
  }
}
