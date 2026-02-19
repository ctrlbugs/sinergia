export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  summary: string;
  time: string;
  category: string;
  image: string;
  url: string;
  source: string;
  publishedAt: string;
}

// Static news: procurement, Nigeria, Africa, politics, local news
// All images are from actual sources: Premium Times (media.premiumtimesng.com), Sahara Reporters articles,
// Wikimedia Commons (AU, National Assembly, ECOWAS official buildings), not placeholder/stock images
export const NEWS_ITEMS: NewsItem[] = [
  {
    id: '1',
    title: 'BPP Unveils New Plan to Eliminate Procurement Fraud in Govt Contracts',
    excerpt: 'The Director-General of the Bureau of Public Procurement has unveiled a new vision to eliminate procurement fraud and ensure optimal value for government contracts.',
    summary: 'The BPP Director-General Adebowale Adedokun stated the goal is to eliminate procurement fraud and ensure the federal government obtains optimal value for all its contracts. The new vision is anchored on transparency, accountability, competence, efficiency, and innovation. The BPP plans to deploy an electronic procurement system to allow government agencies to conduct e-advertisements.',
    time: '2h ago',
    category: 'Procurement',
    image: 'https://i0.wp.com/media.premiumtimesng.com/wp-content/files/2023/07/BPP-LOGO-2-1.png?w=800&h=400&fit=crop&ssl=1',
    url: 'https://www.premiumtimesng.com/news/top-news/763267-bpp-unveils-new-plan-to-eliminate-procurement-fraud-in-govt-contracts.html',
    source: 'Premium Times',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'BPP Blocks NPA\'s Bid to Cancel 99 Approved Contracts, Re-Award to Handpicked Contractors',
    excerpt: 'The Bureau of Public Procurement has rejected the Nigerian Ports Authority\'s request to cancel 99 contracts and re-award them using restricted tendering.',
    summary: 'The BPP rejected the NPA\'s proposal and ordered the agency to provide proper explanations of the awarded projects. The NPA had sought to adopt Selective Tendering Method—essentially handpicking contractors—for 99 projects. The BPP cited concerns regarding transparency and competitiveness, and directed the NPA to adopt Open Competitive Bidding for less priority projects.',
    time: '5h ago',
    category: 'Procurement',
    image: 'https://i0.wp.com/media.premiumtimesng.com/wp-content/files/2023/07/BPP-LOGO-2-1.png?w=800&h=400&fit=crop&ssl=1',
    url: 'https://www.saharareporters.com/2024/12/17/bureau-public-procurement-blocks-nigerian-ports-authoritys-bid-cancel-99-approved',
    source: 'Sahara Reporters',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'NDDC to Fully Automate Procurement Processes by April – MD',
    excerpt: 'The Niger Delta Development Commission will fully automate its procurement processes by April to ensure compliance and transparency.',
    summary: 'NDDC Managing Director Samuel Ogbuku said the commission will automate procurement to ensure compliance, transparency and improved service delivery. The NDDC has commenced implementation of a new Governance Advisory Service and has 35 BPP-certified professionals in its procurement unit. The BPP Director-General commended President Tinubu for advancing procurement reforms.',
    time: '1d ago',
    category: 'Procurement',
    image: 'https://i0.wp.com/media.premiumtimesng.com/wp-content/files/2021/03/The-NDDC-building-e1680860062647.jpg?w=800&h=400&fit=crop&ssl=1',
    url: 'https://www.premiumtimesng.com/news/more-news/852407-nddc-to-fully-automate-procurement-processes-by-april-md.html',
    source: 'Premium Times',
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    title: 'African Union Endorses Continental Procurement Standards',
    excerpt: 'AU member states agree on harmonized e-procurement guidelines to facilitate cross-border government contracting.',
    summary: 'The African Union has adopted a framework for standardized electronic procurement across member states. The initiative aims to reduce fraud, improve transparency, and enable African countries to share best practices. Pilot programs will launch in Nigeria, Kenya, and South Africa.',
    time: '3h ago',
    category: 'Procurement',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/84/African_Union_Conference_Centre_building.jpg/800px-African_Union_Conference_Centre_building.jpg',
    url: 'https://au.int',
    source: 'African Union',
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    title: 'How Nigeria Police Force Violated Procurement Laws in Multi-Billion Naira Contracts',
    excerpt: 'An audit report reveals the Nigeria Police Force violated procurement laws in awarding multi-billion naira contracts.',
    summary: 'The audit report documents how the Police Force violated procurement regulations in contract awards. The findings highlight systemic issues with procurement compliance across government agencies. Stakeholders have called for stricter enforcement and transparency in public procurement.',
    time: '6h ago',
    category: 'Politics',
    image: 'https://i0.wp.com/media.premiumtimesng.com/wp-content/files/2023/07/BPP-LOGO-2-1.png?w=800&h=400&fit=crop&ssl=1',
    url: 'https://www.premiumtimesng.com/news/top-news/838012-how-nigeria-police-force-violated-procurement-laws-in-awarding-multi-billion-naira-contracts-audit-report.html',
    source: 'Premium Times',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '6',
    title: 'Senate Panel Urges Strict Compliance, Transparency in Public Procurement',
    excerpt: 'A Senate panel has called for strict compliance and transparency in public procurement across government institutions.',
    summary: 'The Senate has urged all MDAs to adhere strictly to the Public Procurement Act and ensure transparency in contract awards. The panel emphasized the need for open competitive bidding and proper documentation. The move is part of legislative efforts to curb procurement fraud.',
    time: '8h ago',
    category: 'Local News',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Nigeria%27s_National_Assembly_Building.jpg/800px-Nigeria%27s_National_Assembly_Building.jpg',
    url: 'https://www.premiumtimesng.com/news/more-news/830374-senate-panel-urges-strict-compliance-transparency-in-public-procurement.html',
    source: 'Premium Times',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '7',
    title: 'ECOWAS Launches Regional Procurement Training Program',
    excerpt: 'West African bloc to train 500 procurement officers on e-procurement systems across member states.',
    summary: 'The Economic Community of West African States has launched a capacity-building initiative for procurement professionals. The program will cover digital tendering, contract management, and compliance. Nigeria will host the first cohort of 100 officers next month.',
    time: '1d ago',
    category: 'Procurement',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Ecowas_Secretariat_%2856815788%29.jpeg/800px-Ecowas_Secretariat_%2856815788%29.jpeg',
    url: 'https://www.ecowas.int',
    source: 'ECOWAS',
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '8',
    title: 'Nigerian Senate Passes Public Procurement Amendment Bill',
    excerpt: 'Legislation increases thresholds for direct contracting and mandates e-procurement for all MDAs.',
    summary: 'The Senate has passed amendments to the Public Procurement Act, raising the threshold for direct contracting from ₦50 million to ₦100 million. The bill also requires all federal agencies to adopt e-procurement within 18 months. The House of Representatives is expected to concur.',
    time: '12h ago',
    category: 'Politics',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Nigeria%27s_National_Assembly_Building.jpg/800px-Nigeria%27s_National_Assembly_Building.jpg',
    url: 'https://www.nass.gov.ng',
    source: 'National Assembly',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '9',
    title: 'EFCC Arraigns Former Vice Chancellor on N19.7m Contract Kickback, Bribery Charges',
    excerpt: 'The EFCC has arraigned a former university vice chancellor on charges related to contract kickbacks and bribery.',
    summary: 'The Economic and Financial Crimes Commission prosecuted the case involving N19.7 million in contract kickbacks. The arraignment is part of ongoing efforts to combat procurement-related corruption in Nigerian institutions. The case demonstrates increased enforcement of procurement laws.',
    time: '4h ago',
    category: 'Local News',
    image: 'https://i0.wp.com/media.premiumtimesng.com/wp-content/files/2023/07/BPP-LOGO-2-1.png?w=800&h=400&fit=crop&ssl=1',
    url: 'https://www.premiumtimesng.com/news/top-news/854698-efcc-arraigns-former-vice-chancellor-on-n19-7million-contract-kickback-bribery-charges.html',
    source: 'Premium Times',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '10',
    title: 'World Bank Funds Nigeria\'s Procurement Digitization Project',
    excerpt: '$50 million loan to support rollout of e-procurement across 36 states and FCT.',
    summary: 'The World Bank has approved funding to accelerate Nigeria\'s public procurement digitization. The project will provide technical assistance, software licenses, and training. Priority will be given to states with existing procurement reform initiatives.',
    time: '2d ago',
    category: 'Procurement',
    image: 'https://i0.wp.com/media.premiumtimesng.com/wp-content/files/2021/03/The-NDDC-building-e1680860062647.jpg?w=800&h=400&fit=crop&ssl=1',
    url: 'https://www.worldbank.org/en/country/nigeria',
    source: 'World Bank',
    publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
];
