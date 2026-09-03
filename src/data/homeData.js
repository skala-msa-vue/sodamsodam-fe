export const heroSlides = [
  { eyebrow: '나와 가족을 위한 정책', title: '나와 내 가족의 보조금 혜택 정보를\n지금, 한 번에 확인해 보세요.', description: '나와 내 가족의 보조금 혜택 정보를 지금, 한 번에 확인해 보세요.', icon: 'benefit' },
  { eyebrow: '국민이 체감하는 변화', title: '더 나은 일상을 만드는\n정부의 새로운 정책을 만나요.', description: '생활에 꼭 필요한 정책과 서비스를 쉽고 빠르게 알려드립니다.', icon: 'policy' },
  { eyebrow: '한 곳에서 편리하게', title: '복잡한 민원 서비스를\n온라인으로 간편하게 이용하세요.', description: '필요한 민원과 증명서를 언제 어디서나 신청할 수 있습니다.', icon: 'document' },
  { eyebrow: '모두를 위한 디지털 정부', title: '국민과 함께 만드는\n더 안전하고 편리한 대한민국', description: '국민의 목소리를 듣고 더 좋은 디지털 서비스를 만들어 갑니다.', icon: 'people' }
]

export const quickMenus = [
  ['briefcase', '사업자등록 증명'], ['wallet', '혜택 찾기'], ['map', '지방세 납세증명'], ['printer', '자동차등록원부'],
  ['building', '여권재발급'], ['cloud', '건축물대장'], ['note', '토지이용 확인'], ['heart', '건강보험']
].map(([icon, title], id) => ({ id, icon, title }))

export const complexContents = [
  { title: '기초연금', description: '노인에게 기초연금을 지급하여 안정적인 소득기반을 제공해요.', icon: 'pension', tone: 'violet' },
  { title: '청년 저축 계좌', description: '청년의 자립과 목돈마련을 지원하는 정부의 대표 자산형성 사업이에요.', icon: 'savings', tone: 'blue' },
  { title: '소상공인 지원', description: '소상공인 역량 및 경쟁력 강화, 특례보증 등 다양한 정책을 안내해요.', icon: 'store', tone: 'mint' }
]

export const policies = [
  { badge: '복지', title: '생활지원카드', description: '다자녀가정에 다양한 생활문화활동 혜택 지원을 위한 다둥이 행복카드를 발급하여 지원합니다.', icon: 'card' },
  { badge: '복지', title: '에너지 효율 1등급 환급', description: '일정 규모 이상의 사업 시행 전에 에너지 수급 및 이용 효율 향상 계획을 확인하여 지원합니다.', icon: 'energy' },
  { badge: '복지', title: '에코머니', description: '에너지 절약 카드인 에코머니로 친환경 활동 시 경제적 혜택을 돌려드리는 포인트 리워드입니다.', icon: 'eco' }
]

export const newsItems = [
  {
    category: '공지사항',
    title: '청년 자산형성 지원사업 참여자 모집 안내',
    description: '근로 청년의 안정적인 자산 형성을 돕기 위한 정부 매칭 지원사업의 신청 대상과 접수 일정을 안내합니다.'
  },
  {
    category: '자료실',
    title: '소상공인 정책자금 지원 대상 및 신청 절차 안내',
    description: '경영 안정과 재도약을 준비하는 소상공인이 이용할 수 있는 정책자금의 지원 조건과 신청 방법을 확인하세요.'
  },
  {
    category: '연구보고서',
    title: '서민금융 지원정책 이용 현황과 개선 방향',
    description: '정책금융상품 이용 현황을 분석하고 금융 취약계층의 접근성을 높이기 위한 개선 방향을 소개합니다.'
  },
  {
    category: '자주묻는 질문',
    title: '주택금융 지원제도, 어떤 상품을 선택해야 하나요?',
    description: '정책모기지와 전세자금 보증 등 주요 주택금융 지원제도의 대상, 한도와 이용 조건을 알기 쉽게 정리했습니다.'
  }
]

export const civilServices = [
  { badge: '복지', title: '주민등록표 등본 발급', description: '주민등록표 등본 또는 주민등록표 초본을 발급받기 위한 민원입니다.' },
  { badge: '복지', title: '코로나19 격리해제 사실 확인서', description: '코로나19 확진 후 격리를 완료한 자에 대한 격리해제 사실확인서 발급' },
  { badge: '교육', title: '교통 범칙금 과태료 미납 내역 조회', description: '최근 무인단속내역 조회, 미납 범칙금 및 과태료 내역을 조회합니다.' }
]

export const newsTabs = ['전체', '공지사항', '자료실', '연구보고서', '자주묻는 질문']
export const relatedSites = ['소속기관(지청 및 위원회)', '업무별 누리집', '산하기관 및 관련단체', '정부기관']
