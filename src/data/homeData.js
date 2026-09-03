export const heroSlides = [
  {
    eyebrow: '맞춤 정책 찾기',
    title: '나에게 맞는 지원정책을\n한 번에 찾아보세요',
    description: '지역과 사업자 정보를 바탕으로 신청 가능한 정부 지원정책을 안내해 드립니다.',
    buttonText: '맞춤 정책 찾기',
    href: '/policies',
    icon: 'benefit'
  },
  {
    eyebrow: '신청 자격 확인',
    title: '복잡한 지원 조건,\n간편하게 확인하세요',
    description: '몇 가지 정보만 입력하면 정책별 신청 가능 여부와 필요한 조건을 확인할 수 있습니다.',
    buttonText: '지원정책 확인하기',
    href: '/policies',
    icon: 'policy'
  },
  {
    eyebrow: '민원 서비스 안내',
    title: '자주 찾는 민원 서비스도\n빠르게 이용하세요',
    description: '등본, 토지대장, 여권 재발급 등 주요 정부24 서비스를 한곳에서 확인할 수 있습니다.',
    buttonText: '민원 서비스 보기',
    href: '#civil-dashboard-title',
    icon: 'document'
  }
]

export const complexContents = [
  { title: '기초연금', description: '노인에게 기초연금을 지급하여 안정적인 소득기반을 제공해요.', icon: 'pension', tone: 'violet' },
  { title: '청년 저축 계좌', description: '청년의 자립과 목돈마련을 지원하는 정부의 대표 자산형성 사업이에요.', icon: 'savings', tone: 'blue' },
  { title: '소상공인 지원', description: '소상공인 역량 및 경쟁력 강화, 특례보증 등 다양한 정책을 안내해요.', icon: 'store', tone: 'mint' }
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
  {
    badge: '토지',
    title: '토지(임야)대장 등본 발급·열람',
    description: '토지의 소재, 지번, 지목, 면적, 소유자 등의 정보를 확인하는 민원 서비스입니다. 인터넷 발급·열람은 무료입니다.',
    href: 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=13100000026&HighCtgCD=A09005&tp_seq=01',
    external: true
  },
  {
    badge: '주민등록',
    title: '주민등록표 등본(초본) 발급',
    description: '주민등록등본 또는 주민등록초본을 온라인으로 발급받는 민원 서비스입니다. 인터넷 발급은 무료입니다.',
    href: 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=13100000015&HighCtgCD=A01010',
    external: true
  },
  {
    badge: '자동차',
    title: '자동차 등록원부 등본(초본) 발급·열람',
    description: '차량 등록번호, 소유자, 저당 관련 사항 등을 확인할 수 있는 민원 서비스입니다. 인터넷 발급·열람은 무료입니다.',
    href: 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=15000000334&HighCtgCD=A03007',
    external: true
  },
  {
    badge: '건축물',
    title: '건축물대장 등본(초본) 발급·열람',
    description: '건물의 용도, 면적, 구조 등 건축물 정보를 확인할 수 있는 민원 서비스입니다. 인터넷 발급·열람은 무료입니다.',
    href: 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=15000000098',
    external: true
  },
  {
    badge: '가족',
    title: '가족관계증명서',
    description: '가족관계, 혼인, 출생 등의 관계를 증명하는 서류입니다. 인터넷 발급은 무료입니다.',
    href: 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=97400000004',
    external: true
  },
  {
    badge: '여권',
    title: '여권 재발급',
    description: '기존 전자여권 발급 이력이 있는 경우 온라인으로 여권 재발급을 신청할 수 있습니다.',
    href: 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=12600000001',
    external: true
  },
  {
    badge: '지방세',
    title: '지방세 납세증명',
    description: '지방세 체납 사실이 없음을 증명하는 서류입니다. 인터넷 발급 수수료는 무료입니다.',
    href: 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=13100000056',
    external: true
  },
  {
    badge: '국세',
    title: '납세증명서',
    description: '국세 체납 사실이 없음을 증명하는 서류로, 지방세 납세증명과는 다른 민원 서비스입니다.',
    href: 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=12100000011',
    external: true
  }
]

export const newsTabs = ['전체', '공지사항', '자료실', '연구보고서', '자주묻는 질문']
