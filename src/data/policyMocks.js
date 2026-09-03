export const policyMocks = [
  // =========================
  // 금융지원 FINANCE - 5개
  // =========================
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
    title: '청년 소상공인 창업자금',
    agency: '중소벤처기업부',
    category: 'FINANCE',
    region: '전국',
    summary: '초기 자금 확보가 어려운 청년 소상공인의 창업 및 사업 운영을 지원합니다.',
    support: '최대 5,000만원',
    deadline: '2026. 11. 30.',
    tags: ['청년', '창업자금', '저금리'],
    eligibility: {
      regions: ['전국'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 3,
      maxAnnualRevenue: 50000,
      maxEmployees: 10
    }
  },
  {
    id: 'policy-004',
    title: '경기도 소상공인 특별보증',
    agency: '경기도',
    category: 'FINANCE',
    region: '경기',
    summary: '경기도 소재 소상공인의 금융 접근성을 높이기 위해 대출 보증을 지원합니다.',
    support: '최대 3,000만원',
    deadline: '예산 소진 시까지',
    tags: ['경기', '특별보증', '운영자금'],
    eligibility: {
      regions: ['경기'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 6,
      maxAnnualRevenue: 80000,
      maxEmployees: 10
    }
  },
  {
    id: 'policy-005',
    title: '인천 소상공인 이자지원 사업',
    agency: '인천광역시',
    category: 'FINANCE',
    region: '인천',
    summary: '인천지역 소상공인의 대출 이자 부담을 줄이기 위해 일부 이자를 지원합니다.',
    support: '대출이자 최대 2%',
    deadline: '2026. 10. 31.',
    tags: ['인천', '이자지원', '금융'],
    eligibility: {
      regions: ['인천'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 6,
      maxAnnualRevenue: 70000,
      maxEmployees: 10
    }
  },

  // =========================
  // 판로지원 MARKETING - 5개
  // =========================
  {
    id: 'policy-006',
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
    id: 'policy-007',
    title: '소상공인 라이브커머스 지원',
    agency: '소상공인시장진흥공단',
    category: 'MARKETING',
    region: '전국',
    summary: '라이브커머스를 활용한 상품 홍보와 온라인 판매 방송 제작을 지원합니다.',
    support: '방송 제작비 지원',
    deadline: '2026. 11. 15.',
    tags: ['라이브커머스', '온라인판매', '홍보'],
    eligibility: {
      regions: ['전국'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 6,
      maxAnnualRevenue: 50000,
      maxEmployees: 10
    }
  },
  {
    id: 'policy-008',
    title: '서울 소상공인 브랜드 홍보 지원',
    agency: '서울특별시',
    category: 'MARKETING',
    region: '서울',
    summary: '서울 소재 소상공인의 브랜드 인지도 향상을 위한 광고 및 홍보 비용을 지원합니다.',
    support: '최대 300만원',
    deadline: '2026. 09. 30.',
    tags: ['서울', '브랜드', '광고'],
    eligibility: {
      regions: ['서울'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 6,
      maxAnnualRevenue: 40000,
      maxEmployees: 5
    }
  },
  {
    id: 'policy-009',
    title: '지역 우수상품 온라인몰 입점 지원',
    agency: '경기도시장상권진흥원',
    category: 'MARKETING',
    region: '경기',
    summary: '경기도 내 우수 소상공인 상품의 온라인 쇼핑몰 입점과 판매 촉진을 지원합니다.',
    support: '입점비 및 광고비 지원',
    deadline: '2026. 12. 15.',
    tags: ['경기', '온라인몰', '입점'],
    eligibility: {
      regions: ['경기'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 3,
      maxAnnualRevenue: 60000,
      maxEmployees: 10
    }
  },
  {
    id: 'policy-010',
    title: '부산 소상공인 공동마케팅 지원',
    agency: '부산광역시',
    category: 'MARKETING',
    region: '부산',
    summary: '지역 상권 활성화를 위해 공동 광고와 프로모션 운영 비용을 지원합니다.',
    support: '최대 400만원',
    deadline: '2026. 10. 20.',
    tags: ['부산', '공동마케팅', '상권'],
    eligibility: {
      regions: ['부산'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 6,
      maxAnnualRevenue: 50000,
      maxEmployees: 10
    }
  },

  // =========================
  // 재기지원 RECOVERY - 5개
  // =========================
  {
    id: 'policy-011',
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
    id: 'policy-012',
    title: '폐업 소상공인 재창업 교육',
    agency: '소상공인시장진흥공단',
    category: 'RECOVERY',
    region: '전국',
    summary: '폐업 경험이 있는 소상공인의 재창업을 위해 교육과 사업계획 컨설팅을 제공합니다.',
    support: '교육비 전액 지원',
    deadline: '2026. 12. 31.',
    tags: ['폐업', '재창업', '교육'],
    eligibility: {
      regions: ['전국'],
      businessTypes: ['INDIVIDUAL'],
      minBusinessMonths: 1,
      maxAnnualRevenue: 100000,
      maxEmployees: 10
    }
  },
  {
    id: 'policy-013',
    title: '서울 소상공인 경영개선 컨설팅',
    agency: '서울신용보증재단',
    category: 'RECOVERY',
    region: '서울',
    summary: '경영에 어려움을 겪는 서울 소상공인에게 분야별 전문가 컨설팅을 지원합니다.',
    support: '전문가 컨설팅 5회',
    deadline: '상시 접수',
    tags: ['서울', '경영개선', '컨설팅'],
    eligibility: {
      regions: ['서울'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 6,
      maxAnnualRevenue: 50000,
      maxEmployees: 5
    }
  },
  {
    id: 'policy-014',
    title: '재도전 소상공인 사업화 지원',
    agency: '중소벤처기업부',
    category: 'RECOVERY',
    region: '전국',
    summary: '폐업 후 다시 사업을 시작하는 소상공인의 사업화 비용을 지원합니다.',
    support: '최대 1,500만원',
    deadline: '2026. 10. 15.',
    tags: ['재도전', '사업화', '재창업'],
    eligibility: {
      regions: ['전국'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 1,
      maxAnnualRevenue: 50000,
      maxEmployees: 10
    }
  },
  {
    id: 'policy-015',
    title: '경영위기 소상공인 회복 프로그램',
    agency: '경기도',
    category: 'RECOVERY',
    region: '경기',
    summary: '매출 감소 등 경영위기를 겪는 소상공인의 사업 정상화를 지원합니다.',
    support: '최대 500만원',
    deadline: '2026. 11. 30.',
    tags: ['경기', '경영위기', '회복'],
    eligibility: {
      regions: ['경기'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 12,
      maxAnnualRevenue: 70000,
      maxEmployees: 10
    }
  },

  // =========================
  // 디지털 전환 DIGITAL - 5개
  // =========================
  {
    id: 'policy-016',
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
    id: 'policy-017',
    title: '스마트상점 기술보급 사업',
    agency: '소상공인시장진흥공단',
    category: 'DIGITAL',
    region: '전국',
    summary: '키오스크, 스마트오더 등 디지털 기술을 도입하는 소상공인을 지원합니다.',
    support: '최대 500만원',
    deadline: '2026. 10. 31.',
    tags: ['스마트상점', '키오스크', '자동화'],
    eligibility: {
      regions: ['전국'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 6,
      maxAnnualRevenue: 80000,
      maxEmployees: 10
    }
  },
  {
    id: 'policy-018',
    title: '소상공인 온라인 예약 시스템 지원',
    agency: '서울특별시',
    category: 'DIGITAL',
    region: '서울',
    summary: '예약 기반 사업장의 온라인 예약 및 고객관리 시스템 구축 비용을 지원합니다.',
    support: '최대 250만원',
    deadline: '2026. 09. 30.',
    tags: ['서울', '온라인예약', '고객관리'],
    eligibility: {
      regions: ['서울'],
      businessTypes: ['INDIVIDUAL'],
      minBusinessMonths: 3,
      maxAnnualRevenue: 40000,
      maxEmployees: 5
    }
  },
  {
    id: 'policy-019',
    title: 'AI 활용 소상공인 업무혁신 지원',
    agency: '중소벤처기업부',
    category: 'DIGITAL',
    region: '전국',
    summary: 'AI 기반 고객응대, 상품추천 등 디지털 기술 도입을 지원합니다.',
    support: '최대 700만원',
    deadline: '2026. 12. 10.',
    tags: ['AI', '자동화', '디지털전환'],
    eligibility: {
      regions: ['전국'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 12,
      maxAnnualRevenue: 100000,
      maxEmployees: 10
    }
  },
  {
    id: 'policy-020',
    title: '경기도 스마트 매장 구축 지원',
    agency: '경기도',
    category: 'DIGITAL',
    region: '경기',
    summary: '경기도 소상공인을 대상으로 POS, 키오스크 등 스마트 매장 구축을 지원합니다.',
    support: '최대 400만원',
    deadline: '2026. 11. 20.',
    tags: ['경기', '스마트매장', 'POS'],
    eligibility: {
      regions: ['경기'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 6,
      maxAnnualRevenue: 60000,
      maxEmployees: 10
    }
  },

  // =========================
  // 채무조정 DEBT - 5개
  // =========================
  {
    id: 'policy-021',
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
  },
  {
    id: 'policy-022',
    title: '소상공인 채무상담 지원',
    agency: '신용회복위원회',
    category: 'DEBT',
    region: '전국',
    summary: '대출 상환에 어려움을 겪는 소상공인을 대상으로 전문 채무상담을 제공합니다.',
    support: '무료 채무상담',
    deadline: '상시 접수',
    tags: ['채무', '상환', '상담'],
    eligibility: {
      regions: ['전국'],
      businessTypes: ['INDIVIDUAL'],
      minBusinessMonths: 3,
      maxAnnualRevenue: 80000,
      maxEmployees: 10
    }
  },
  {
    id: 'policy-023',
    title: '연체 소상공인 상환유예 지원',
    agency: '서민금융진흥원',
    category: 'DEBT',
    region: '전국',
    summary: '일시적인 자금난으로 대출 상환이 어려운 소상공인에게 상환유예 상담을 지원합니다.',
    support: '상환기간 조정',
    deadline: '상시 접수',
    tags: ['연체', '상환유예', '금융상담'],
    eligibility: {
      regions: ['전국'],
      businessTypes: ['INDIVIDUAL'],
      minBusinessMonths: 6,
      maxAnnualRevenue: 70000,
      maxEmployees: 10
    }
  },
  {
    id: 'policy-024',
    title: '서울 소상공인 부채관리 컨설팅',
    agency: '서울신용보증재단',
    category: 'DEBT',
    region: '서울',
    summary: '서울 지역 소상공인의 금융 부채 현황을 진단하고 상환 계획 수립을 지원합니다.',
    support: '전문 컨설팅 지원',
    deadline: '2026. 12. 31.',
    tags: ['서울', '부채관리', '컨설팅'],
    eligibility: {
      regions: ['서울'],
      businessTypes: ['INDIVIDUAL', 'CORPORATION'],
      minBusinessMonths: 12,
      maxAnnualRevenue: 60000,
      maxEmployees: 5
    }
  },
  {
    id: 'policy-025',
    title: '재기 소상공인 채무조정 지원',
    agency: '신용회복위원회',
    category: 'DEBT',
    region: '전국',
    summary: '폐업 또는 재창업 과정에서 채무 부담을 겪는 소상공인의 채무조정을 지원합니다.',
    support: '상환기간 및 금리 조정',
    deadline: '상시 접수',
    tags: ['재기', '채무조정', '재창업'],
    eligibility: {
      regions: ['전국'],
      businessTypes: ['INDIVIDUAL'],
      minBusinessMonths: 1,
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
