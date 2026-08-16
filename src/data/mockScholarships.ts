import { Scholarship } from '../types';

export const mockScholarships: Scholarship[] = [
  {
    id: 'sch-001',
    title: 'DAAD Helmut-Schmidt Programme (Master\'s in Public Policy and Good Governance)',
    slug: 'daad-helmut-schmidt-programme-germany',
    university: 'Selected German Universities (Passau, Duisburg-Essen, Erfurt, Osnabrück)',
    organization: 'German Academic Exchange Service (DAAD)',
    country: 'Germany',
    region: 'Europe',
    city: 'Bonn / Berlin / Munich',
    degreeLevels: ['Master'],
    fields: ['Public Policy', 'Good Governance', 'Political Science', 'Economics', 'International Relations', 'Public Administration'],
    category: 'scholarships',
    type: 'Government',
    fundingType: 'Fully Funded',
    fundingAmount: '€934/month stipend + €15,000 tuition coverage',
    tuitionCoverage: '100% Full Tuition Waiver',
    monthlyStipend: '€934 per month (~€11,208 annually)',
    accommodation: 'Subsidized University Student Dormitory Assistance',
    airfare: 'Round-trip International Travel Allowance Provided',
    healthInsurance: 'Comprehensive German Health and Accident Insurance Covered',
    visaSupport: 'Official German Embassy Priority Visa Support Letter Provided',
    researchSupport: 'Study and Research Grant of €460/year + 6-month free German language course',
    eligibleCountries: ['Developing Countries (DAC List of ODA Recipients)', 'Asia', 'Africa', 'Latin America'],
    eligibility: {
      nationalityRequirement: 'Citizens of developing and emerging countries (DAC list)',
      academicRequirement: 'First university degree (Bachelor or equivalent) with above-average grades (upper third)',
      minimumGpa: '3.0 / 4.0 or Upper Second Class equivalent',
      ageLimit: 'Degree obtained no more than 6 years prior to application',
      workExperience: 'Relevant professional or volunteer experience in public sector / NGO preferred',
      otherRequirements: ['Targeted at future leaders in politics, law, economics, and administration']
    },
    languageRequirements: {
      ieltsRequired: true,
      ieltsScore: '6.5 overall (no band below 6.0)',
      toeflScore: '88 iBT',
      englishProficiencyCertificateAccepted: false,
      notes: 'German language skills are beneficial but not mandatory as courses are taught in English.'
    },
    greRequired: false,
    applicationFee: 'Free',
    deadline: '2026-10-31',
    startDate: '2027-04-01',
    duration: '2 Years (Full-time Master)',
    numberOfAwards: 'Approx. 80 scholarships per year',
    studyMode: 'Full-time',
    description: 'The Helmut-Schmidt-Programme (known as PPGG) supports future leaders from developing countries who strive to promote democracy and social justice in their home countries.',
    fullOverview: 'The DAAD Helmut-Schmidt-Programme is one of the most prestigious government scholarships funded by the German Federal Foreign Office. Designed for committed graduates from developing and emerging countries, this programme offers fully-funded Master degrees in disciplines relevant to the social, political, and economic development of students\' home countries.\n\nScholars undergo an intensive preparatory 6-month German language course before commencing their Master’s degree in English at renowned German universities. The curriculum is deeply interdisciplinary, equipping participants with analytical methods, public leadership skills, and ethical governance principles.',
    aboutProvider: 'The DAAD (Deutscher Akademischer Austauschdienst) is the world’s largest funding organization for international exchange of students and researchers.',
    whyApply: [
      'Full financial freedom: complete tuition waiver and generous monthly living allowance in Germany',
      'Free 6-month intensive German language training in Germany prior to academic studies',
      'Exclusive networking seminars with German policy makers and international development agencies',
      'Lifelong membership in the prestigious global DAAD alumni network'
    ],
    benefits: [
      '100% Full Tuition Waiver at host German universities',
      'Monthly scholarship rate of €934 per month for living expenses',
      'Contributions to German health, accident, and personal liability insurance',
      'Round-trip travel allowance to and from Germany',
      'Study and research allowance (€460/year)',
      'Rent subsidies and family supplements where applicable',
      'Free 6-month German language course in Germany'
    ],
    requirements: [
      'Bachelor’s degree completed with above-average results within the past 6 years',
      'Citizenship of a developing/emerging country on the DAC list',
      'Strong political, social, or civic commitment demonstrated through community engagement',
      'Clear motivation letter outlining prospective career plan and contribution to home country development'
    ],
    documents: [
      'DAAD Application Form (signed and dated)',
      'Europass format Curriculum Vitae (CV) with signature',
      'Letter of Motivation (maximum 2 pages)',
      'Certified Bachelor Degree Certificate with grading scale',
      'Official Academic Transcripts (with official English/German translation)',
      'IELTS / TOEFL English Language Test Certificate',
      'Two Letters of Recommendation (academic and professional)',
      'Work / Internship Experience Certificates'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Select Up to Two Master Courses',
        description: 'Choose one or maximum two designated Master programs at participating German universities and prioritize your choices (1st and 2nd priority).'
      },
      {
        stepNumber: 2,
        title: 'Prepare Application Dossier',
        description: 'Download the official DAAD PPGG application form and compile all required certified documents and translation certificates into a single PDF.'
      },
      {
        stepNumber: 3,
        title: 'Submit Application Directly to Universities',
        description: 'Submit your complete application packet through the university admission portal or email between June 1 and July 31.'
      },
      {
        stepNumber: 4,
        title: 'DAAD Selection Committee Review',
        description: 'Selected candidates will be invited for online interviews and notified by late November/December.'
      }
    ],
    faq: [
      {
        question: 'Can I apply for more than two courses under Helmut Schmidt?',
        answer: 'No, you may apply for a maximum of two Master courses. If you apply for two, you must state your order of preference in the DAAD application form.'
      },
      {
        question: 'Is German language knowledge mandatory at the time of application?',
        answer: 'No, courses are taught in English. You only need to demonstrate English proficiency (IELTS 6.5+ or TOEFL 88+). A funded German course is provided.'
      },
      {
        question: 'Is there an application fee for the DAAD scholarship?',
        answer: 'No, the application process for the DAAD Helmut-Schmidt Programme is completely free of charge.'
      }
    ],
    applicationUrl: 'https://www.daad.de/en/information-services-for-higher-education-institutions/further-programmes/helmut-schmidt-programme/',
    officialWebsite: 'https://www.daad.de',
    sourceUrl: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
    image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['DAAD', 'Germany', 'Public Policy', 'Fully Funded', 'Master', 'Stipend', 'No Application Fee'],
    featured: true,
    popular: true,
    status: 'published',
    views: 14820,
    bookmarksCount: 3240,
    publishedAt: '2026-06-01',
    updatedAt: '2026-08-10',
    author: {
      name: 'Dr. Clara Meyer',
      role: 'International Admissions Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge Academic Verification Desk',
    verifiedAt: '2026-08-01',
    lastChecked: '2026-08-14',
    seoTitle: 'DAAD Helmut-Schmidt Master Scholarship Germany 2026/2027 Fully Funded',
    seoDescription: 'Apply for the fully funded DAAD Helmut-Schmidt Programme in Germany. 100% tuition coverage, €934 monthly stipend, free flights, and health insurance for international Master students.'
  },
  {
    id: 'sch-002',
    title: 'University of Melbourne Graduate Research Scholarship (MGRS)',
    slug: 'university-of-melbourne-graduate-research-scholarship-australia',
    university: 'University of Melbourne',
    organization: 'University of Melbourne & Australian Government',
    country: 'Australia',
    region: 'Australia & Oceania',
    city: 'Melbourne, Victoria',
    degreeLevels: ['Master', 'PhD', 'Research'],
    fields: ['Computer Science & AI', 'Biomedicine & Health', 'Engineering', 'Environmental Sciences', 'Commerce', 'Humanities'],
    category: 'scholarships',
    type: 'University',
    fundingType: 'Fully Funded',
    fundingAmount: 'AUD $37,000/yr living allowance + 100% tuition offset',
    tuitionCoverage: '100% Full Tuition Fee Offset (up to AUD $140,000 value)',
    monthlyStipend: 'AUD $3,083 per month (AUD $37,000 per year index-linked tax-free)',
    accommodation: 'Relocation grant up to AUD $3,000 for international students',
    airfare: 'Relocation allowance included',
    healthInsurance: 'Overseas Student Health Cover (OSHC) Single membership fully covered',
    visaSupport: 'Confirmation of Enrolment (CoE) provided for Australian Subclass 500 visa',
    researchSupport: 'Conference travel allowance & thesis allowance up to AUD $840',
    eligibleCountries: ['All Nationalities', 'Domestic & International Students'],
    eligibility: {
      nationalityRequirement: 'Open to all international and Australian citizens',
      academicRequirement: 'Four-year Bachelor degree with Honours Class 1 (H1) or equivalent Research Master degree',
      minimumGpa: '80% (H1 First Class Honours or 3.7+ / 4.0)',
      ageLimit: 'No age restrictions',
      workExperience: 'Research publications or prior academic research experience highly advantageous'
    },
    languageRequirements: {
      ieltsRequired: true,
      ieltsScore: '6.5 - 7.0 overall depending on graduate school',
      toeflScore: '79 - 94 iBT',
      englishProficiencyCertificateAccepted: false,
      notes: 'PTE Academic (65+) also accepted.'
    },
    greRequired: false,
    applicationFee: 'Paid',
    applicationFeeAmount: 'AUD $130 (Fee waivers available for specific partners)',
    deadline: '2026-10-31',
    startDate: '2027-02-01',
    duration: '2 Years (Master by Research) or 3.5 - 4 Years (PhD)',
    numberOfAwards: 'Approx. 600 scholarships awarded each year',
    studyMode: 'Full-time',
    description: 'Awarded to high-achieving domestic and international research students. Covers 100% tuition fees, living stipend of AUD $37,000 per year, and health insurance.',
    fullOverview: 'The Graduate Research Scholarships (GRS) at the University of Melbourne represent Australia’s most prestigious postgraduate research funding opportunity. Awarded purely on academic merit and research potential, the scholarship relieves researchers from financial burdens, allowing them to focus entirely on innovative research under top global supervisors.\n\nStudents admitted to a Master by Research or Doctor of Philosophy (PhD) program at Melbourne are automatically evaluated for these scholarships without requiring a separate funding application.',
    aboutProvider: 'The University of Melbourne is Australia\'s #1 ranked university (QS World Rankings #13) and a leading member of the Group of Eight research intensive universities.',
    whyApply: [
      'Ranked #1 in Australia and #13 in the world',
      'AUD $37,000 tax-free annual stipend plus full tuition waiver for up to 4 years',
      'Automatic consideration upon submitting your postgraduate research degree application',
      'Post-study work rights in Australia up to 4 years for PhD graduates'
    ],
    benefits: [
      'Full fee offset for up to two years for a Master by Research degree or up to four years for a PhD',
      'Living allowance of AUD $37,000 per year pro rata (tax-exempt for full-time candidates)',
      'Relocation grant of AUD $2,000 for students moving from outside Victoria or AUD $3,000 for international students',
      'Overseas Student Health Cover (OSHC) Single Membership for international students'
    ],
    requirements: [
      'Have applied for and meet the entry requirements for a graduate research degree at the University of Melbourne',
      'Hold a completed tertiary qualification equivalent to an Australian 4-year Honours degree with First Class results',
      'Demonstrated capacity to conduct independent research'
    ],
    documents: [
      'Complete Academic Transcripts and Graduation Certificates',
      'Detailed Research Proposal (1,500 - 2,500 words)',
      'Curriculum Vitae highlighting publications and awards',
      'Two Academic Referee Reports',
      'Evidence of Supervisor Endorsement / Pre-approval',
      'English Language Test Report (IELTS / TOEFL / PTE)'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Identify a Research Supervisor',
        description: 'Explore the "Find an Expert" portal at Melbourne University and contact prospective supervisors with your research proposal.'
      },
      {
        stepNumber: 2,
        title: 'Submit University Course Application',
        description: 'Submit your online graduate research degree application before the international scholarship closing date.'
      },
      {
        stepNumber: 3,
        title: 'Automatic Scholarship Assessment',
        description: 'You will automatically be considered for the Graduate Research Scholarship with no separate scholarship form needed.'
      }
    ],
    faq: [
      {
        question: 'Do I need to submit a separate scholarship application?',
        answer: 'No. All students who submit an application for a graduate research course by the deadline are automatically assessed for research scholarships.'
      },
      {
        question: 'Can I work part-time while on this scholarship?',
        answer: 'Yes, full-time research candidates are permitted to work up to a specified number of hours (usually 8-10 hours/week) provided it does not impede research progress.'
      }
    ],
    applicationUrl: 'https://scholarships.unimelb.edu.au/awards/graduate-research-scholarships',
    officialWebsite: 'https://www.unimelb.edu.au',
    sourceUrl: 'https://scholarships.unimelb.edu.au',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Australia', 'PhD', 'Master', 'University of Melbourne', 'Fully Funded', 'Research', 'Stipend'],
    featured: true,
    popular: true,
    status: 'published',
    views: 19450,
    bookmarksCount: 4120,
    publishedAt: '2026-05-15',
    updatedAt: '2026-08-12',
    author: {
      name: 'James Thornton',
      role: 'Postgraduate Fellow & Editor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge Verification Desk',
    verifiedAt: '2026-08-05',
    lastChecked: '2026-08-14',
    seoTitle: 'University of Melbourne Graduate Research Scholarship 2026/2027 Fully Funded',
    seoDescription: 'Apply for the University of Melbourne Graduate Research Scholarships in Australia. AUD $37,000 annual stipend, 100% tuition waiver, and health cover for Master and PhD.'
  },
  {
    id: 'sch-003',
    title: 'Japanese Government (MEXT) Embassy Recommendation Scholarship',
    slug: 'japanese-government-mext-scholarship-japan',
    university: 'All Top National Japanese Universities (UTokyo, Kyoto, Tohoku, Osaka, TIT)',
    organization: 'Ministry of Education, Culture, Sports, Science and Technology (MEXT), Japan',
    country: 'Japan',
    region: 'Asia',
    city: 'Tokyo / Kyoto / Osaka / Sendai',
    degreeLevels: ['Undergraduate', 'Bachelor', 'Master', 'PhD', 'Research'],
    fields: ['Robotics & AI', 'Mechanical & Electrical Engineering', 'Physics & Chemistry', 'Economics', 'Asian Studies', 'Biotechnology'],
    category: 'scholarships',
    type: 'Government',
    fundingType: 'Fully Funded',
    fundingAmount: '¥143,000 - ¥145,000/month stipend + 100% tuition + flights',
    tuitionCoverage: '100% Full Exemption from Examination, Admission, and Tuition Fees',
    monthlyStipend: '¥143,000 - ¥145,000 per month (approx. $1,000 - $1,100/mo)',
    accommodation: 'Subsidized Japanese National University International Student Dormitory',
    airfare: 'Round-trip International Economy Flight Tickets from Home Country to Japan',
    healthInsurance: 'National Health Insurance (NHI) premium subsidized in Japan',
    visaSupport: 'Direct Japanese Diplomatic Mission Student Visa Facilitation',
    researchSupport: 'Comprehensive research materials, library access, and 6-month intensive Japanese language training',
    eligibleCountries: ['Countries with Diplomatic Relations with Japan (Over 160 countries)'],
    eligibility: {
      nationalityRequirement: 'Citizens of countries with diplomatic ties with the Government of Japan',
      academicRequirement: 'High school diploma (for Undergraduate) or Bachelor/Master degree (for Postgraduate)',
      minimumGpa: 'Equivalent to 3.2+ on 4.0 scale or top 20% class rank',
      ageLimit: 'Undergraduate: under 25 years old; Postgraduate/Research: born on or after April 2, 1991',
      workExperience: 'Not strictly required for academic degrees'
    },
    languageRequirements: {
      ieltsRequired: false,
      ieltsScore: 'Optional (6.0+ recommended)',
      englishProficiencyCertificateAccepted: true,
      notes: 'No IELTS mandatory! English proficiency certificate from prior degree or Japanese language test (JLPT) accepted.'
    },
    greRequired: false,
    applicationFee: 'Free',
    deadline: '2026-09-30',
    startDate: '2027-04-01',
    duration: 'Undergraduate: 5 years (including 1-yr language) | Master: 2-3 years | PhD: 3-4 years',
    numberOfAwards: 'Over 9,000 international scholars currently supported in Japan',
    studyMode: 'Full-time',
    description: 'The premier Japanese government scholarship covering 100% tuition, monthly allowance of up to ¥145,000, free round-trip airfare, and Japanese language course.',
    fullOverview: 'The Monbukagakusho (MEXT) Scholarship is one of the most generous and prestigious government scholarships in the world. Administered by the Japanese Ministry of Education, it allows international students to enroll at world-renowned Japanese national and private universities without paying a single yen in tuition.\n\nThe scholarship is offered via two routes: Embassy Recommendation (through the Japanese Embassy in your home country) and University Recommendation (applied directly through a Japanese university professor).',
    aboutProvider: 'The Ministry of Education, Culture, Sports, Science and Technology (MEXT) is the executive ministry responsible for higher education and scientific innovation in Japan.',
    whyApply: [
      '100% Free Tuition at top Japanese national universities like UTokyo and Kyoto',
      'No IELTS mandatory if English medium of instruction certificate is provided',
      'Generous monthly living allowance (up to ¥145,000/month) and free roundtrip flights',
      'Free 6-month to 1-year Japanese language immersion course in Japan'
    ],
    benefits: [
      'Full exemption from university entrance exam fees, matriculation fees, and tuition fees',
      'Monthly allowance of ¥143,000 (for Master) or ¥145,000 (for PhD) per month',
      'Round-trip international flight ticket from the closest international airport to Japan',
      '6 months of paid intensive Japanese language training at host institution',
      'Assistance in finding subsidized university housing and dormitories'
    ],
    requirements: [
      'Hold the nationality of a country that has diplomatic relations with Japan',
      'Good physical and mental health verified by medical certificate',
      'Willingness to learn Japanese and adapt to living in Japan',
      'Must arrive in Japan in designated arrival window (April or October)'
    ],
    documents: [
      'MEXT Application Form with official photo',
      'Field of Study and Research Plan (for Research / Master / PhD)',
      'Certified Academic Transcripts for all years of study',
      'Graduation Certificate or Degree Diploma',
      'Recommendation Letter from Academic Dean or Supervising Professor',
      'Certificate of Health from an accredited medical physician',
      'Language Proficiency Certificate (English or Japanese)'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Check Embassy Announcement',
        description: 'Visit the website of the Embassy of Japan in your home country to download application guidelines and forms.'
      },
      {
        stepNumber: 2,
        title: 'Submit Application to Japanese Embassy',
        description: 'Submit your hardcopy dossier to the Japanese Embassy cultural section by the specified national deadline.'
      },
      {
        stepNumber: 3,
        title: 'Written Exam and Interview',
        description: 'Shortlisted candidates take standard written exams (English/Japanese/Maths) and an interview at the Embassy.'
      },
      {
        stepNumber: 4,
        title: 'Obtain Provisional Acceptance Letter',
        description: 'Passed candidates contact Japanese universities to request official Letters of Provisional Acceptance.'
      }
    ],
    faq: [
      {
        question: 'Is Japanese language ability required before applying?',
        answer: 'No. For science, engineering, and English-medium programs, you do not need prior Japanese knowledge. A 6-month preparatory Japanese language course is included.'
      },
      {
        question: 'Can I apply for MEXT if I do not have an IELTS test?',
        answer: 'Yes, an English Proficiency Certificate from your previous university stating that your degree was conducted in English is widely accepted.'
      }
    ],
    applicationUrl: 'https://www.studyinjapan.go.jp/en/planning/scholarship/mext-scholarship/',
    officialWebsite: 'https://www.mext.go.jp/en/',
    sourceUrl: 'https://www.studyinjapan.go.jp',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['MEXT', 'Japan', 'Government', 'Fully Funded', 'Bachelor', 'Master', 'PhD', 'No IELTS', 'Flights Included'],
    featured: true,
    popular: true,
    status: 'published',
    views: 28400,
    bookmarksCount: 6300,
    publishedAt: '2026-04-20',
    updatedAt: '2026-08-11',
    author: {
      name: 'Kenji Takahashi',
      role: 'East Asia Higher Education Advisor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge Tokyo Desk',
    verifiedAt: '2026-08-02',
    lastChecked: '2026-08-14',
    seoTitle: 'Japanese Government MEXT Scholarship 2026/2027 Fully Funded',
    seoDescription: 'Apply for the Japanese Government MEXT Scholarship 2026/2027. 100% tuition waiver, ¥145,000 monthly allowance, free flights, and no IELTS mandatory.'
  },
  {
    id: 'sch-004',
    title: 'Gates Cambridge Scholarship (Postgraduate Studies in Any Subject)',
    slug: 'gates-cambridge-scholarship-uk',
    university: 'University of Cambridge',
    organization: 'Bill and Melinda Gates Foundation & Cambridge Trust',
    country: 'United Kingdom',
    region: 'Europe',
    city: 'Cambridge',
    degreeLevels: ['Master', 'PhD'],
    fields: ['Natural Sciences', 'Computer Science', 'Medicine & Public Health', 'Engineering', 'Humanities & Social Sciences', 'Law'],
    category: 'scholarships',
    type: 'Private Foundation',
    fundingType: 'Fully Funded',
    fundingAmount: '£21,000/yr stipend + £35,000-£55,000 tuition + allowances',
    tuitionCoverage: '100% Full University Composition Fee (Tuition and College Fees)',
    monthlyStipend: '£1,750 per month (£21,000 per year maintenance allowance)',
    accommodation: 'Priority Cambridge College Accommodation Placement',
    airfare: 'One economy single airfare at both the beginning and end of the course',
    healthInsurance: 'Inbound visa costs & Immigration Health Surcharge (IHS) covered',
    visaSupport: 'Full UK Student Visa application fee and NHS surcharge reimbursed',
    researchSupport: 'Up to £2,000 for academic development funding + £10,000+ family allowance',
    eligibleCountries: ['All Citizens Outside the United Kingdom (USA and International)'],
    eligibility: {
      nationalityRequirement: 'A citizen of any country outside the United Kingdom',
      academicRequirement: 'Outstanding intellectual ability (First Class Honours or US GPA 3.8+)',
      minimumGpa: '3.8 / 4.0 or UK First Class Honours equivalent',
      ageLimit: 'No age restrictions',
      workExperience: 'Leadership experience and commitment to improving the lives of others'
    },
    languageRequirements: {
      ieltsRequired: true,
      ieltsScore: '7.5 overall (no band below 7.0)',
      toeflScore: '110 iBT (minimum 25 in all components)',
      englishProficiencyCertificateAccepted: false,
      notes: 'Strict adherence to University of Cambridge postgraduate English language requirements.'
    },
    greRequired: false,
    applicationFee: 'Paid',
    applicationFeeAmount: '£75 (Cambridge University Application Fee)',
    deadline: '2026-12-03',
    startDate: '2027-10-01',
    duration: '1 Year (Master) or 3 - 4 Years (PhD)',
    numberOfAwards: 'Approx. 80 full-cost scholarships awarded annually',
    studyMode: 'Full-time',
    description: 'One of the most prestigious international scholarships in the world. Covers the full cost of studying at Cambridge including tuition, maintenance stipend, and airfare.',
    fullOverview: 'The Gates Cambridge Scholarship program was established in October 2000 by a donation of US$210 million from the Bill and Melinda Gates Foundation to the University of Cambridge. It is the largest single donation to a UK university in history.\n\nGates Cambridge Scholars are selected based on outstanding intellectual ability, reasons for choice of course, commitment to improving the lives of others, and leadership potential. Scholars join a vibrant, international community of changemakers residing across Cambridge colleges.',
    aboutProvider: 'The University of Cambridge is one of the world’s oldest and most prestigious research universities, founded in 1209.',
    whyApply: [
      'One of the world\'s most renowned scholarship communities with 80 global scholars per year',
      '100% full financial coverage: £21,000/yr living allowance, full Cambridge tuition, flights, visa fees',
      'Discretionary funds for academic conferences, field research, and family/child support',
      'Lifelong alumni network of global policy leaders, scientists, and social innovators'
    ],
    benefits: [
      'University Composition Fee at the appropriate rate (Home or Overseas)',
      'Maintenance allowance for a single student (£21,000 for 12 months at the 2026-27 rate)',
      'One economy single airfare at both the beginning and end of the course',
      'Inbound visa costs & the cost of the UK Immigration Health Surcharge',
      'Academic development funding from £500 to £2,000 to attend conferences and courses',
      'Family allowance up to £11,600 for scholars with children'
    ],
    requirements: [
      'Outstanding academic track record (top 5% of graduating class)',
      'Admission to a full-time postgraduate course at the University of Cambridge',
      'Compelling personal statement illustrating a passion for improving the lives of others',
      'Proven leadership capacity and ability to take others along'
    ],
    documents: [
      'University of Cambridge Graduate Application',
      'Gates Cambridge Personal Statement (500 words)',
      'Research Proposal (mandatory for PhD applicants)',
      'Gates Cambridge Reference in addition to two academic references',
      'Official Academic Transcripts and Degree Certificates',
      'Curriculum Vitae / Resume'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Apply for Cambridge Course and Funding',
        description: 'Submit your application for admission to a course and a College along with the Gates Cambridge section via the Cambridge Applicant Portal.'
      },
      {
        stepNumber: 2,
        title: 'Departmental Ranking and Shortlisting',
        description: 'Academic departments rank candidates academically and forward the highest-ranked candidates to the Gates Cambridge Trust.'
      },
      {
        stepNumber: 3,
        title: 'Trust Shortlisting & Interview',
        description: 'Shortlisted applicants are invited to a 20-25 minute panel interview (held in Cambridge or via video conference).'
      }
    ],
    faq: [
      {
        question: 'Are there any course restrictions for Gates Cambridge?',
        answer: 'You can apply for any full-time postgraduate degree (PhD, MSc, MLitt, or 1-year postgraduate course) with very few exclusions (such as MBA or non-degree courses).'
      },
      {
        question: 'What is the difference between US and International deadlines?',
        answer: 'US citizens resident in the USA have an early deadline in October, while all other international applicants have a deadline in December or early January depending on the course.'
      }
    ],
    applicationUrl: 'https://www.gatescambridge.org/apply/',
    officialWebsite: 'https://www.gatescambridge.org',
    sourceUrl: 'https://www.postgraduate.study.cam.ac.uk/funding',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Gates Cambridge', 'UK', 'Cambridge', 'Fully Funded', 'Master', 'PhD', 'Leadership', 'Stipend'],
    featured: true,
    popular: true,
    status: 'published',
    views: 24100,
    bookmarksCount: 5400,
    publishedAt: '2026-06-10',
    updatedAt: '2026-08-13',
    author: {
      name: 'Eleanor Vance',
      role: 'UK & European Scholarship Strategist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge UK Team',
    verifiedAt: '2026-08-06',
    lastChecked: '2026-08-15',
    seoTitle: 'Gates Cambridge Scholarship 2027 Fully Funded University of Cambridge',
    seoDescription: 'Apply for the fully funded Gates Cambridge Scholarship 2027. Full tuition, £21,000 living stipend, airfare, and visa costs covered for international students.'
  },
  {
    id: 'sch-005',
    title: 'Global Korea Scholarship (GKS / KGSP) for International Students',
    slug: 'global-korea-scholarship-gks-south-korea',
    university: 'Selected Top Korean Universities (SNU, KAIST, Yonsei, Korea Univ, POSTECH)',
    organization: 'National Institute for International Education (NIIED), Ministry of Education, Korea',
    country: 'South Korea',
    region: 'Asia',
    city: 'Seoul / Daejeon / Busan',
    degreeLevels: ['Undergraduate', 'Bachelor', 'Master', 'PhD', 'Research'],
    fields: ['Semiconductor Engineering', 'Computer Science & AI', 'Business Administration', 'Biotechnology', 'International Relations', 'Korean Language & Culture'],
    category: 'scholarships',
    type: 'Government',
    fundingType: 'Fully Funded',
    fundingAmount: '₩1,000,000 - ₩1,500,000/month stipend + 100% tuition + flights',
    tuitionCoverage: '100% Full Tuition Coverage for Entire Degree Duration',
    monthlyStipend: '₩1,000,000/mo (Bachelor/Master) | ₩1,500,000/mo (PhD/Research)',
    accommodation: 'Settlement allowance of ₩200,000 upon arrival + university dorm support',
    airfare: 'Economy class roundtrip airfare from home country to South Korea',
    healthInsurance: 'National Health Insurance (NHIS) of Korea fully covered',
    visaSupport: 'D-2 Student Visa invitation letter & consular assistance provided',
    researchSupport: 'Research support fund (₩210,000 - ₩240,000/semester) + ₩100,000/month TOPIK 5+ bonus',
    eligibleCountries: ['All Partner Nations (Over 140 Countries)'],
    eligibility: {
      nationalityRequirement: 'Applicant and applicant’s parents must not hold Korean citizenship',
      academicRequirement: 'Cumulative GPA above 80% or ranking in top 20% of previous graduating class',
      minimumGpa: '2.64 / 4.0 or 80% on 100-point scale',
      ageLimit: 'Undergraduate: under 25 years old | Graduate: under 40 years old',
      workExperience: 'Not required'
    },
    languageRequirements: {
      ieltsRequired: false,
      ieltsScore: 'Optional (TOEFL / IELTS bonus points available)',
      englishProficiencyCertificateAccepted: true,
      notes: 'No IELTS or Korean language test mandatory to apply! 1-year mandatory Korean language course included.'
    },
    greRequired: false,
    applicationFee: 'Free',
    deadline: '2026-09-25',
    startDate: '2027-03-01',
    duration: 'Bachelor: 5 Yrs (1-yr Korean + 4-yr Degree) | Master: 3 Yrs | PhD: 4 Yrs',
    numberOfAwards: 'Approx. 2,200 international students selected every year',
    studyMode: 'Full-time',
    description: 'The premier South Korean government scholarship. Provides 100% tuition, monthly allowance, airfare, health insurance, settlement allowance, and 1-year Korean language training.',
    fullOverview: 'The Global Korea Scholarship (GKS), formerly known as the Korean Government Scholarship Program (KGSP), is designed to provide international students with opportunities to conduct advanced studies in undergraduate & graduate programs at higher educational institutions in the Republic of Korea.\n\nScholars spend their first year at a designated Korean language training institution. Those achieving TOPIK Level 3 or higher proceed directly to their degree program at top SKY universities, KAIST, or other premier Korean technological institutes.',
    aboutProvider: 'NIIED is an executive agency under the Ministry of Education of the Republic of Korea promoting international student exchange.',
    whyApply: [
      'Complete financial independence: 100% tuition waiver and up to ₩1.5M monthly stipend',
      'Free 1-year full-time Korean language immersion course with TOPIK certification',
      'High-tech research ecosystems with close internships at Samsung, LG, and Hyundai',
      'Extra ₩100,000 monthly bonus stipend for achieving TOPIK Level 5 or 6'
    ],
    benefits: [
      'Full tuition fee coverage for language institution and degree program',
      'Monthly stipend of ₩1,000,000 for Master and ₩1,500,000 for Doctoral scholars',
      'Roundtrip economy airfare',
      'Settlement allowance of ₩200,000 and degree completion grant of ₩100,000',
      'National Health Insurance coverage',
      'Korean Proficiency Grant of ₩100,000/month for TOPIK level 5 or 6 holders'
    ],
    requirements: [
      'Both applicant and parents must hold non-Korean citizenship',
      'Hold a Bachelor’s degree for Master program, or Master’s degree for Doctoral program',
      'Maintain a cumulative GPA of 80% or higher from prior degree',
      'Be in good health both physically and mentally'
    ],
    documents: [
      'GKS Application Form and Personal Statement',
      'Statement of Purpose (Study Plan)',
      'One Letter of Recommendation in sealed envelope',
      'GKS Applicant Agreement and Personal Medical Assessment',
      'Proof of Citizenship (Applicant and Parents’ Passports/Family Registry)',
      'Official Graduation Certificates and Academic Transcripts (Apostilled/Consular Verified)',
      'Optional: Valid TOPIK, IELTS, or TOEFL score report'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Choose Embassy Track or University Track',
        description: 'Decide whether to apply via the Embassy Track (apply to 3 universities through the Korean Embassy) or the University Track (apply to 1 designated university).'
      },
      {
        stepNumber: 2,
        title: 'Compile and Apostille Documents',
        description: 'Ensure all diplomas and transcripts have official apostille certificates or Korean Consular legalization.'
      },
      {
        stepNumber: 3,
        title: 'Submit Application & 1st Round Interview',
        description: 'Submit dossier before the deadline. Shortlisted candidates sit for an interview.'
      },
      {
        stepNumber: 4,
        title: 'NIIED Final Selection',
        description: 'NIIED evaluates 2nd and 3rd round candidates and announces official scholarship awardees.'
      }
    ],
    faq: [
      {
        question: 'What is the difference between Embassy Track and University Track?',
        answer: 'Embassy Track allows you to select up to 3 universities and has more quotas, while University Track allows you to apply directly to 1 specific university.'
      },
      {
        question: 'Do I have to know Korean before applying?',
        answer: 'No. The GKS includes a full 1-year Korean language training program in Korea before your degree starts.'
      }
    ],
    applicationUrl: 'https://www.studyinkorea.go.kr/en/sub/gks/allnew_gks.do',
    officialWebsite: 'https://www.studyinkorea.go.kr',
    sourceUrl: 'https://www.niied.go.kr',
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['GKS', 'KGSP', 'South Korea', 'Fully Funded', 'Bachelor', 'Master', 'PhD', 'No IELTS', 'Airfare Included'],
    featured: true,
    popular: true,
    status: 'published',
    views: 31200,
    bookmarksCount: 7800,
    publishedAt: '2026-02-15',
    updatedAt: '2026-08-10',
    author: {
      name: 'Min-jun Park',
      role: 'Seoul Education & GKS Counselor',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge Korea Desk',
    verifiedAt: '2026-08-01',
    lastChecked: '2026-08-14',
    seoTitle: 'Global Korea Scholarship GKS 2026/2027 Fully Funded NIIED',
    seoDescription: 'Complete guide to the Global Korea Scholarship (GKS/KGSP) 2026/2027. Full tuition, monthly stipend, flights, settlement grant, and 1-yr Korean language course.'
  },
  {
    id: 'sch-006',
    title: 'Schwarzman Scholars Program at Tsinghua University (Master in Global Affairs)',
    slug: 'schwarzman-scholars-program-tsinghua-university-china',
    university: 'Tsinghua University',
    organization: 'Schwarzman Scholars Trust & Stephen A. Schwarzman',
    country: 'China',
    region: 'Asia',
    city: 'Beijing',
    degreeLevels: ['Master'],
    fields: ['Global Affairs', 'Public Policy', 'International Relations', 'Economics & Business', 'Geopolitics', 'Technology Policy'],
    category: 'scholarships',
    type: 'Private Foundation',
    fundingType: 'Fully Funded',
    fundingAmount: '$80,000+ total value (tuition, room & board, stipend, study tour, flights)',
    tuitionCoverage: '100% Full Tuition Waiver for Master of Global Affairs',
    monthlyStipend: '$4,000 personal stipend over the academic year',
    accommodation: 'State-of-the-art private suite in Schwarzman College on Tsinghua campus',
    airfare: 'Round-trip business/economy travel from home country to Beijing',
    healthInsurance: 'Comprehensive international medical insurance provided',
    visaSupport: 'Expedited Chinese Student Visa (X1) processing and liaison support',
    researchSupport: 'Fully funded in-country study tours across China + laptop & smartphone allowance',
    eligibleCountries: ['All Nationalities (No citizenship restrictions)'],
    eligibility: {
      nationalityRequirement: 'Open to candidates of any nationality and country',
      academicRequirement: 'Undergraduate degree completed before matriculation',
      minimumGpa: 'Demonstrated academic excellence (typically 3.5+ / 4.0)',
      ageLimit: 'Must be at least 18 but not yet 29 years of age as of August 1 of their matriculation year',
      workExperience: 'Exceptional leadership track record in business, government, military, or civil society'
    },
    languageRequirements: {
      ieltsRequired: true,
      ieltsScore: '7.0 overall',
      toeflScore: '100 iBT',
      englishProficiencyCertificateAccepted: false,
      notes: 'Test waived if applicant completed undergraduate degree at an institution where primary language of instruction was English.'
    },
    greRequired: false,
    applicationFee: 'Free',
    deadline: '2026-09-12',
    startDate: '2027-08-15',
    duration: '1 Year (Intensive Master in Global Affairs)',
    numberOfAwards: 'Approx. 150 scholars selected globally each year',
    studyMode: 'Full-time',
    description: 'Premier 1-year fully funded Master degree in Global Affairs at Tsinghua University in Beijing, designed to prepare future global leaders to understand China and the world.',
    fullOverview: 'Inspired by the Rhodes Scholarship, Schwarzman Scholars is the first scholarship created to respond to the geopolitical landscape of the 21st century. Headquartered at Schwarzman College inside Tsinghua University in Beijing, the program brings together the world\'s most promising young leaders for an intensive year of study and cultural immersion.\n\nScholars complete a Master\'s degree in Global Affairs taught in English, engage in high-level mentorship with global executives and diplomats, and participate in curated study tours across urban and rural China.',
    aboutProvider: 'Tsinghua University is ranked among the top 15 universities in the world and is the preeminent research university in China.',
    whyApply: [
      'Unmatched prestige and networking with global leaders, heads of state, and CEOs',
      '100% fully funded: full tuition, luxury on-campus suite, $4,000 stipend, flights, study tours, books',
      'Custom curriculum taught in English by world-class faculty from Tsinghua, Harvard, Oxford, and Stanford',
      'Exclusive travel seminars and professional internships across Beijing and Shanghai'
    ],
    benefits: [
      'Full tuition and academic fees',
      'Room and board at the iconic Schwarzman College residential building',
      'Travel to and from Beijing at the beginning and end of the academic year',
      'An in-country study tour with all transport, hotel, and meal costs covered',
      'Required course books and supplies',
      'A Lenovo laptop and smartphone',
      'Comprehensive health insurance',
      'A personal stipend of $4,000'
    ],
    requirements: [
      'Demonstrated extraordinary leadership abilities and impact',
      'Completed Bachelor’s degree from an accredited university',
      'Between 18 and 28 years old at matriculation',
      'Fluent in English with exceptional written and spoken communication'
    ],
    documents: [
      'Online Application Form',
      'Current Resume / Curriculum Vitae (max 2 pages)',
      'Two Essays (Leadership Essay & Statement of Purpose)',
      'Three Letters of Recommendation (at least one academic and one leadership-focused)',
      'Official Academic Transcripts for all collegiate work',
      'Short 1-minute video introduction'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Submit Online Application',
        description: 'Complete the comprehensive online application including essays and video introduction by mid-September.'
      },
      {
        stepNumber: 2,
        title: 'Semifinalist Video Review',
        description: 'Applications undergo extensive multi-reader assessment by a global selection committee.'
      },
      {
        stepNumber: 3,
        title: 'Interview Day in London, NYC, Bangkok, or Beijing',
        description: 'Shortlisted candidates attend an intensive full-day panel interview with distinguished global leaders.'
      }
    ],
    faq: [
      {
        question: 'Do I need to speak Mandarin Chinese to apply?',
        answer: 'No. All academic courses are conducted in English. Mandarin language instruction is provided for all skill levels during the year.'
      },
      {
        question: 'What background do Schwarzman Scholars come from?',
        answer: 'Scholars come from diverse backgrounds: computer science, environmental engineering, finance, military service, law, journalism, and creative arts.'
      }
    ],
    applicationUrl: 'https://www.schwarzmanscholars.org/admissions/',
    officialWebsite: 'https://www.schwarzmanscholars.org',
    sourceUrl: 'https://www.tsinghua.edu.cn',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Schwarzman', 'China', 'Tsinghua', 'Fully Funded', 'Master', 'Leadership', 'Global Affairs', 'Stipend'],
    featured: true,
    popular: true,
    status: 'published',
    views: 34500,
    bookmarksCount: 8200,
    publishedAt: '2026-05-01',
    updatedAt: '2026-08-14',
    author: {
      name: 'Dr. Clara Meyer',
      role: 'International Admissions Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge Global Desk',
    verifiedAt: '2026-08-04',
    lastChecked: '2026-08-15',
    seoTitle: 'Schwarzman Scholars Tsinghua University China 2027 Fully Funded',
    seoDescription: 'Apply for Schwarzman Scholars 2027 at Tsinghua University. Fully funded 1-year Master in Global Affairs with tuition, private suite, $4,000 stipend, and study tours.'
  },
  {
    id: 'sch-007',
    title: 'Swedish Institute Scholarships for Global Professionals (SI Scholarship)',
    slug: 'swedish-institute-scholarship-global-professionals-sweden',
    university: 'All Leading Swedish Universities (KTH, Lund, Uppsala, Chalmers, Stockholm Univ)',
    organization: 'Swedish Institute (SI), Ministry for Foreign Affairs, Sweden',
    country: 'Sweden',
    region: 'Europe',
    city: 'Stockholm / Lund / Gothenburg / Uppsala',
    degreeLevels: ['Master'],
    fields: ['Sustainability & Climate', 'Renewable Energy', 'ICT & Software Engineering', 'Public Health', 'Human Rights & Law', 'Innovation Management'],
    category: 'scholarships',
    type: 'Government',
    fundingType: 'Fully Funded',
    fundingAmount: 'SEK 12,000/month stipend + 100% full tuition + SEK 15,000 travel',
    tuitionCoverage: '100% Full Tuition Directly Paid to Swedish Universities',
    monthlyStipend: 'SEK 12,000 per month for living expenses throughout the study period',
    accommodation: 'Priority assistance in booking student housing at host university',
    airfare: 'One-time travel grant of SEK 15,000 for international flights',
    healthInsurance: 'Comprehensive Swedish state health and personal injury insurance',
    visaSupport: 'Direct Swedish Migration Agency (Migrationsverket) fast-track certificate',
    researchSupport: 'Membership in the SI Network for Future Global Leaders (NFGL) and SI Alumni Network',
    eligibleCountries: ['41 Selected Developing & Emerging Countries (SI Country List)'],
    eligibility: {
      nationalityRequirement: 'Citizen of one of the 41 eligible countries on the SI scholarship list',
      academicRequirement: 'Hold an accredited Bachelor’s degree and gain admission to an eligible Swedish Master programme',
      minimumGpa: 'Equivalent to Swedish VG (Pass with Distinction) or 3.2+ / 4.0',
      ageLimit: 'No age limit',
      workExperience: 'Minimum of 3,000 hours of documented work experience (full-time or part-time / volunteering)'
    },
    languageRequirements: {
      ieltsRequired: true,
      ieltsScore: '6.5 overall (no band below 5.5)',
      toeflScore: '90 iBT',
      englishProficiencyCertificateAccepted: true,
      notes: 'Applicants whose prior university degree was taught in English may be exempt under Swedish university admissions rules.'
    },
    greRequired: false,
    applicationFee: 'Paid',
    applicationFeeAmount: 'SEK 900 (University Admissions Sweden Application Fee)',
    deadline: '2026-11-15',
    startDate: '2027-08-30',
    duration: '1 to 2 Years (Full-time Master\'s degree)',
    numberOfAwards: 'Approx. 350 scholarships awarded each academic year',
    studyMode: 'Full-time',
    description: 'Funded by the Swedish Ministry for Foreign Affairs. Covers 100% tuition, monthly living stipend of SEK 12,000, travel grant of SEK 15,000, and health insurance.',
    fullOverview: 'The Swedish Institute (SI) Scholarship for Global Professionals aims to develop future global leaders who will contribute to the United Nations 2030 Agenda for Sustainable Development.\n\nThe programme covers full tuition fees for more than 700 English-taught Master\'s programmes across Sweden, providing a monthly living allowance of SEK 12,000, travel grants, and exclusive membership in the SI Network for Future Global Leaders.',
    aboutProvider: 'The Swedish Institute is a public agency that builds interest and trust in Sweden around the world in education, culture, and sustainable innovation.',
    whyApply: [
      'Full coverage of Swedish tuition fees (up to SEK 300,000 value)',
      'Monthly living stipend of SEK 12,000 for the duration of the 1 or 2-year Master programme',
      'SEK 15,000 flight travel grant and comprehensive insurance',
      'Exclusive leadership workshops with Swedish corporate pioneers (Spotify, Ericsson, IKEA)'
    ],
    benefits: [
      'Full tuition fee coverage paid directly by SI to your Swedish university',
      'Monthly payment of SEK 12,000 to cover living expenses',
      'Insurance against illness and accident',
      'Travel grant of SEK 15,000 (one-time grant)',
      'Membership in the SI Network for Future Global Leaders (NFGL)'
    ],
    requirements: [
      'Citizenship of an SI-eligible country',
      'Minimum of 3,000 hours of documented work/leadership experience',
      'Admitted to an eligible Master’s programme via University Admissions Sweden',
      'Demonstrated leadership ambition aligned with UN Sustainable Development Goals'
    ],
    documents: [
      'SI Curriculum Vitae on the official SI template only',
      'Letters of Reference on official SI template (one work referee mandatory)',
      'Proof of Work and Leadership Experience on official SI template',
      'Copy of valid passport',
      'University Admissions Sweden Application Summary'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Apply for Master Programmes at University Admissions',
        description: 'Submit your application for up to 4 eligible Swedish Master’s programmes at universityadmissions.se.'
      },
      {
        stepNumber: 2,
        title: 'Prepare SI Template Documents',
        description: 'Download the strict SI official templates for CV, Proof of Work Experience, and Reference Letters.'
      },
      {
        stepNumber: 3,
        title: 'Apply for SI Scholarship in February Portal',
        description: 'Submit your online scholarship application through the SI application portal during the designated February window.'
      }
    ],
    faq: [
      {
        question: 'Can internships count toward the 3,000 hours of work experience?',
        answer: 'Yes, full-time and part-time employment, freelance work, and structured volunteering count toward the 3,000 hours requirement.'
      },
      {
        question: 'Must I use the official SI document templates?',
        answer: 'Yes. Any CV, reference letter, or work proof submitted on non-official templates will result in automatic disqualification.'
      }
    ],
    applicationUrl: 'https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/',
    officialWebsite: 'https://si.se/en/',
    sourceUrl: 'https://si.se',
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Sweden', 'SI Scholarship', 'Master', 'Fully Funded', 'Sustainability', 'Stipend', 'Travel Grant'],
    featured: false,
    popular: true,
    status: 'published',
    views: 18700,
    bookmarksCount: 3950,
    publishedAt: '2026-06-18',
    updatedAt: '2026-08-08',
    author: {
      name: 'Dr. Clara Meyer',
      role: 'International Admissions Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge Stockholm Desk',
    verifiedAt: '2026-08-03',
    lastChecked: '2026-08-14',
    seoTitle: 'Swedish Institute SI Scholarship 2027 Fully Funded Sweden',
    seoDescription: 'Apply for Swedish Institute SI Scholarships for Global Professionals 2027. 100% tuition, SEK 12,000 monthly stipend, and travel allowance for Master students.'
  },
  {
    id: 'sch-008',
    title: 'ETH Zurich Excellence Scholarship & Opportunity Programme (ESOP)',
    slug: 'eth-zurich-excellence-scholarship-esop-switzerland',
    university: 'ETH Zurich (Swiss Federal Institute of Technology)',
    organization: 'ETH Zurich Foundation',
    country: 'Switzerland',
    region: 'Europe',
    city: 'Zurich',
    degreeLevels: ['Master'],
    fields: ['Computer Science', 'Robotics & Mechanical Engineering', 'Quantum Physics', 'Biotechnology', 'Data Science', 'Civil Engineering'],
    category: 'scholarships',
    type: 'University',
    fundingType: 'Fully Funded',
    fundingAmount: 'CHF 12,000/semester living stipend + 100% tuition waiver',
    tuitionCoverage: '100% Full Tuition Fee Waiver at ETH Zurich',
    monthlyStipend: 'CHF 2,000 per month (CHF 12,000 per semester / CHF 24,000/year)',
    accommodation: 'Assistance in booking student housing in Zurich',
    airfare: 'Covered within general semester living allowance',
    healthInsurance: 'Comprehensive Swiss student health insurance subsidy',
    visaSupport: 'Official Swiss Federal Visa and Canton Zurich Residence Permit facilitation',
    researchSupport: 'Direct laboratory placement with world-renowned ETH professors and research teams',
    eligibleCountries: ['All Nationalities (Domestic & International Students)'],
    eligibility: {
      nationalityRequirement: 'Open to all international and Swiss students',
      academicRequirement: 'Outstanding results in Bachelor’s degree (top 10% of class / Grade A)',
      minimumGpa: 'Equivalent to Grade A / Top 10% class rank',
      ageLimit: 'No age restrictions',
      workExperience: 'Not required'
    },
    languageRequirements: {
      ieltsRequired: true,
      ieltsScore: '7.0 overall',
      toeflScore: '100 iBT',
      englishProficiencyCertificateAccepted: false,
      notes: 'Required for all Master programs taught in English at ETH Zurich.'
    },
    greRequired: true,
    applicationFee: 'Paid',
    applicationFeeAmount: 'CHF 150 (ETH Zurich Application Fee)',
    deadline: '2026-12-15',
    startDate: '2027-09-15',
    duration: '3 to 4 Semesters (Full Master Program)',
    numberOfAwards: 'Approx. 50 - 60 excellence scholarships per year',
    studyMode: 'Full-time',
    description: 'ETH Zurich supports outstanding students wishing to pursue a Master’s degree with full tuition waiver and CHF 24,000/year stipend.',
    fullOverview: 'ETH Zurich ranks consistently among the top 10 universities worldwide (QS World Rankings #7). The Excellence Scholarship & Opportunity Programme (ESOP) recognizes top-tier academic talent across the globe, providing full financial independence, special mentorship, and networking opportunities.\n\nScholars benefit from individual academic mentoring by ETH professors, priority admission to cutting-edge research groups, and regular network meetings organized by the ETH Foundation.',
    aboutProvider: 'ETH Zurich is one of the world\'s leading STEM institutions, boasting 22 Nobel Laureates including Albert Einstein.',
    whyApply: [
      'Ranked #7 in the world for engineering, computer science, and technology',
      'CHF 24,000 annual living stipend plus full tuition waiver in Zurich',
      'Personal mentorship from world-leading ETH faculty and industry partners',
      'Access to pioneering research labs in quantum physics, AI, and biotechnology'
    ],
    benefits: [
      'Living and study allowance of CHF 12,000 per semester (CHF 24,000 per year)',
      'Full tuition fee waiver for the entire standard period of the Master degree',
      'Supervision by a mentor professor from ETH Zurich',
      'Invitations to exclusive networking events and foundation dinners'
    ],
    requirements: [
      'Very good result in Bachelor’s degree program (top 10% of class = Grade A)',
      'Pre-proposal for Master’s thesis required as part of the application',
      'Strong academic reference letters from previous professors'
    ],
    documents: [
      'ETH Online Application for Master Degree',
      'ESOP Application Form',
      'Pre-proposal for your Master’s thesis (3-4 pages with methodology and references)',
      'Letter of Motivation (1-2 pages)',
      'Two Independent Letters of Recommendation',
      'Official Bachelor Transcripts and Degree Certificate',
      'GRE General Test Score Sheet (for non-Bologna degree holders)',
      'IELTS / TOEFL Language Certificate'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Select Your ETH Master Programme',
        description: 'Choose your desired Master programme at ETH Zurich and review the exact prerequisite course catalogue.'
      },
      {
        stepNumber: 2,
        title: 'Draft Master’s Thesis Pre-Proposal',
        description: 'Write an independent 3-4 page research pre-proposal outlining a potential thesis topic and research methodology.'
      },
      {
        stepNumber: 3,
        title: 'Submit via eApply Portal by December 15',
        description: 'Submit both your Master admission application and ESOP scholarship dossier in a single upload.'
      }
    ],
    faq: [
      {
        question: 'Is the thesis pre-proposal binding?',
        answer: 'No. The pre-proposal demonstrates your capacity for independent scientific formulation and is not locked in as your final thesis.'
      },
      {
        question: 'Can I apply for ESOP if I am already enrolled at ETH?',
        answer: 'ESOP is strictly for new students entering a Master’s program. Current ETH Master students cannot apply after beginning.'
      }
    ],
    applicationUrl: 'https://ethz.ch/students/en/studies/financial/scholarships/excellencescholarship.html',
    officialWebsite: 'https://ethz.ch/en.html',
    sourceUrl: 'https://ethz.ch',
    image: 'https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['ETH Zurich', 'Switzerland', 'STEM', 'Master', 'Fully Funded', 'Stipend', 'Research'],
    featured: false,
    popular: true,
    status: 'published',
    views: 16200,
    bookmarksCount: 3100,
    publishedAt: '2026-06-25',
    updatedAt: '2026-08-11',
    author: {
      name: 'James Thornton',
      role: 'Postgraduate Fellow & Editor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge Zurich Desk',
    verifiedAt: '2026-08-07',
    lastChecked: '2026-08-15',
    seoTitle: 'ETH Zurich ESOP Excellence Scholarship Switzerland 2027 Fully Funded',
    seoDescription: 'Apply for the ETH Zurich Excellence Scholarship & Opportunity Programme (ESOP) 2027. Full tuition waiver and CHF 24,000 yearly stipend in Switzerland.'
  },
  {
    id: 'sch-009',
    title: 'Italian Regional DSU Full Scholarships (Universities in Milan, Rome, Bologna, Turin)',
    slug: 'italian-regional-dsu-scholarships-italy',
    university: 'Politecnico di Milano, University of Bologna, Sapienza Rome, Univ of Florence',
    organization: 'Regional Governments of Italy (ANDISU / DSU / LAZIODISCO / ER.GO)',
    country: 'Italy',
    region: 'Europe',
    city: 'Milan / Bologna / Rome / Turin / Florence',
    degreeLevels: ['Bachelor', 'Master', 'PhD'],
    fields: ['Architecture & Civil Engineering', 'Fashion & Industrial Design', 'Computer Science', 'Medicine', 'Economics & Business', 'Humanities'],
    category: 'scholarships',
    type: 'Government',
    fundingType: 'Fully Funded',
    fundingAmount: '100% Tuition Waiver + Free Meals + Up to €7,500/year Cash Stipend',
    tuitionCoverage: '100% Full Exemption from University Tuition and Regional Taxes',
    monthlyStipend: '€550 - €650 per month (approx. €6,500 - €7,500 per year in cash)',
    accommodation: 'Free student residence room or housing reimbursement allowance',
    airfare: 'Not covered (self-arranged)',
    healthInsurance: 'Enrollment in the Italian National Health Service (SSN) at subsidized €150/yr student rate',
    visaSupport: 'Official Italian Regional Scholarship Declaration for Consular Visa issuance',
    researchSupport: 'Free access to university dining halls (mensa) for 1 or 2 meals daily',
    eligibleCountries: ['All Nationalities (Based on Family Economic Condition ISEE-U)'],
    eligibility: {
      nationalityRequirement: 'Open to all international and Italian students regardless of nationality',
      academicRequirement: 'Admitted to a recognized Italian public university degree program',
      minimumGpa: 'Admitted status (maintaining scholarship requires completing minimum CFU course credits each year)',
      ageLimit: 'No age limit',
      workExperience: 'Not required'
    },
    languageRequirements: {
      ieltsRequired: false,
      ieltsScore: 'Depends on university program (English B2 certificate or IELTS 6.0)',
      englishProficiencyCertificateAccepted: true,
      notes: 'No separate IELTS required for scholarship body; only prerequisite university admission language proof needed.'
    },
    greRequired: false,
    applicationFee: 'Free',
    deadline: '2026-09-05',
    startDate: '2026-10-01',
    duration: 'Bachelor (3 Yrs) | Master (2 Yrs) | PhD (3 Yrs)',
    numberOfAwards: 'Tens of thousands of grants awarded annually across Italian regions',
    studyMode: 'Full-time',
    description: 'Generous income-based government scholarships covering 100% tuition, free university residence housing, daily meals, and up to €7,500 annual cash stipend.',
    fullOverview: 'The Italian Diritto allo Studio Universitario (DSU) scholarships are regional government grants funded to guarantee higher education access for students from all economic backgrounds. Administered through regional entities like DSU Toscana, ER.GO Emilia Romagna, and LAZIODISCO Lazio, these grants are awarded based on family economic status (ISEE Parificato).\n\nNon-resident international students who meet the ISEE threshold receive 100% tuition exemption, free dormitory accommodation, free canteen meals, and a substantial annual cash stipend paid directly to their Italian bank accounts in two installments.',
    aboutProvider: 'ANDISU is the National Association of Italian Bodies for the Right to University Study.',
    whyApply: [
      'High award probability for international students meeting low/middle family income criteria',
      '100% zero tuition fees across famous Italian universities in Milan, Bologna, Rome, and Turin',
      'Free university accommodation and free daily hot meals at university cafeterias',
      'Generous cash stipend of up to €7,500/year paid directly to the student'
    ],
    benefits: [
      '100% exemption from university registration and tuition fees',
      'Free accommodation in university student residences (or rent allowance)',
      'Free meals every day at university canteens',
      'Annual cash stipend of up to €7,500 depending on distance category (out-of-town student)',
      'Discounted public transit passes and sports facility access'
    ],
    requirements: [
      'Enrolled or admitted to an Italian public university for the upcoming academic year',
      'Family financial documents certified by the Italian Embassy/Consulate in home country',
      'ISEE Parificato value under the regional threshold (typically under €25,000/year)'
    ],
    documents: [
      'Family Status Certificate (Certificate of Family Composition)',
      'Income Tax / Salary Certificates of all working family members for the previous year',
      'Property / Real Estate Ownership Certificate showing square meters of family home',
      'Bank Account Balance and Asset Statement as of December 31',
      'Consular Legalization and Official Italian Translation of all financial documents',
      'Italian Tax Code (Codice Fiscale) and Passport Copy'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Apply for University Admission via Universitaly',
        description: 'Secure admission to your desired degree in Italy and complete Universitaly pre-enrollment.'
      },
      {
        stepNumber: 2,
        title: 'Prepare Family Financial Documents and Legalize',
        description: 'Collect official family income and property certificates and obtain Italian consular legalization.'
      },
      {
        stepNumber: 3,
        title: 'Submit Online DSU Application by Regional Deadline',
        description: 'Submit the online application on the regional portal (e.g. DSU, ER.GO, EDiSU) before late August/early September.'
      }
    ],
    faq: [
      {
        question: 'What is ISEE Parificato and how is it calculated?',
        answer: 'ISEE Parificato is an official calculation of your household economic index based on your certified family income and real estate in your home country.'
      },
      {
        question: 'Can I apply for DSU before receiving my student visa?',
        answer: 'Yes! DSU applications open in June/July and must be submitted online before you arrive in Italy.'
      }
    ],
    applicationUrl: 'https://www.universitaly.it',
    officialWebsite: 'https://www.andisu.it',
    sourceUrl: 'https://www.universitaly.it',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Italy', 'DSU', 'Fully Funded', 'Bachelor', 'Master', 'PhD', 'Stipend', 'No IELTS', 'Free Meals'],
    featured: true,
    popular: true,
    status: 'published',
    views: 26800,
    bookmarksCount: 5900,
    publishedAt: '2026-06-05',
    updatedAt: '2026-08-12',
    author: {
      name: 'Kenji Takahashi',
      role: 'International Advisor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge Italy Desk',
    verifiedAt: '2026-08-08',
    lastChecked: '2026-08-15',
    seoTitle: 'Italian Regional DSU Scholarships 2026/2027 Fully Funded with Stipend',
    seoDescription: 'Guide to Italian DSU Regional Scholarships 2026/2027. 100% tuition waiver, free dormitory, free meals, and up to €7,500/year cash stipend in Italy.'
  },
  {
    id: 'sch-010',
    title: 'CERN Junior Fellowship & Administrative Internship Programme',
    slug: 'cern-junior-fellowship-administrative-internship-switzerland',
    university: 'CERN (European Organization for Nuclear Research)',
    organization: 'CERN',
    country: 'Switzerland',
    region: 'Europe',
    city: 'Geneva',
    degreeLevels: ['Internship', 'Fellowship', 'Bachelor', 'Master'],
    fields: ['Applied Physics', 'Software & Cloud Computing', 'Mechanical & Electrical Engineering', 'Cybersecurity', 'Finance & Administration', 'Translation & HR'],
    category: 'fellowships',
    type: 'International Organization',
    fundingType: 'Fully Funded',
    fundingAmount: 'CHF 3,400 - CHF 5,300/month stipend + travel + health cover',
    tuitionCoverage: 'Not Applicable (Paid Fellowship / Internship Contract)',
    monthlyStipend: 'CHF 3,450 to CHF 5,300 per month (tax-exempt in Switzerland)',
    accommodation: 'Assistance in finding housing in Geneva / surrounding France',
    airfare: 'Return travel expenses reimbursed between home location and Geneva',
    healthInsurance: 'Comprehensive CERN Health Insurance Scheme covered for fellow and family',
    visaSupport: 'Swiss and French Special Diplomatic Residence Cards (Carte de Légitimation) provided',
    researchSupport: 'World-class supercomputing resources, Large Hadron Collider experimental access, and professional training',
    eligibleCountries: ['All CERN Member, Associate Member, and Non-Member States'],
    eligibility: {
      nationalityRequirement: 'Open to nationals of CERN Member and Associate Member states (plus specific international student quotas)',
      academicRequirement: 'Enrolled in or graduated from Technical Diploma, Bachelor, or Master degree',
      minimumGpa: 'High academic standing',
      ageLimit: 'No strict age limit; targeted at early career professionals and students',
      workExperience: '0 to 4 years of relevant post-graduation experience'
    },
    languageRequirements: {
      ieltsRequired: false,
      ieltsScore: 'Not mandatory; fluent English or French required',
      englishProficiencyCertificateAccepted: true,
      notes: 'Ability to communicate effectively in English or French in an international laboratory.'
    },
    greRequired: false,
    applicationFee: 'Free',
    deadline: '2026-10-18',
    startDate: '2027-02-01',
    duration: '6 Months to 3 Years',
    numberOfAwards: 'Approx. 200 fellows and administrative students selected annually',
    studyMode: 'Full-time',
    description: 'Work at the world\'s leading particle physics laboratory in Geneva. Tax-free monthly stipend of CHF 3,450 - CHF 5,300, travel reimbursement, and international insurance.',
    fullOverview: 'CERN\'s Fellowship and Administrative Student programmes offer unmatched international experience at the frontiers of science, software development, advanced engineering, and international administration. Located on the Swiss-French border near Geneva, CERN operates the world’s largest and most complex scientific apparatus.\n\nFellows and interns work on hands-on cutting-edge projects alongside world-renowned physicists and computer scientists, while enjoying generous tax-free Swiss compensation and social benefits.',
    aboutProvider: 'CERN is the premier European Organization for Nuclear Research, birthplace of the World Wide Web and discovery of the Higgs Boson.',
    whyApply: [
      'Direct hands-on experience at the world\'s premier scientific laboratory',
      'Tax-exempt monthly salary of CHF 3,450 to CHF 5,300 in Switzerland',
      'Full roundtrip travel reimbursement and comprehensive health coverage',
      'High-impact career springboard into global tech giants (Google, IBM, ESA) and academic institutes'
    ],
    benefits: [
      'A monthly tax-free living stipend ranging from CHF 3,450 to CHF 5,300 per month',
      'Coverage by CERN\'s comprehensive social insurance scheme (health, accident, disability)',
      'Travel expenses between home country and Geneva for the start and end of contract',
      'Installation allowance and family/child allowance where applicable',
      '2.5 days of paid leave per month'
    ],
    requirements: [
      'Technical or administrative background in Engineering, Computing, Physics, Finance, or Law',
      'Good knowledge of English or French',
      'Motivated to work in a multicultural, multi-national scientific team'
    ],
    documents: [
      'Curriculum Vitae (CV) in English or French',
      'Copy of most recent academic transcript',
      'One mandatory Reference Letter from an academic professor or previous employer',
      'Proof of enrollment or highest degree certificate'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Apply through CERN SmartRecruiters Portal',
        description: 'Complete the online application form and upload your CV and transcripts before the selection cutoff.'
      },
      {
        stepNumber: 2,
        title: 'Video Interview (Sonru / HireVue)',
        description: 'Complete an automated 15-minute video interview demonstrating your motivation and technical background.'
      },
      {
        stepNumber: 3,
        title: 'CERN Selection Committee Review',
        description: 'CERN department supervisors review matching candidates and extend formal contract offers.'
      }
    ],
    faq: [
      {
        question: 'Do I have to pay taxes on the CERN stipend in Switzerland?',
        answer: 'No. Allowances paid by CERN are exempt from Swiss and French national income taxation under international organization treaties.'
      },
      {
        question: 'Are students from non-member states eligible?',
        answer: 'Yes, CERN maintains specific dedicated quotas and programs for non-member state students in physics and engineering.'
      }
    ],
    applicationUrl: 'https://careers.cern/fellowships',
    officialWebsite: 'https://home.cern',
    sourceUrl: 'https://careers.cern',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['CERN', 'Switzerland', 'Internship', 'Fellowship', 'Fully Funded', 'Physics', 'Computing', 'Stipend'],
    featured: false,
    popular: true,
    status: 'published',
    views: 21300,
    bookmarksCount: 4800,
    publishedAt: '2026-07-01',
    updatedAt: '2026-08-13',
    author: {
      name: 'James Thornton',
      role: 'Postgraduate Fellow & Editor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge Geneva Desk',
    verifiedAt: '2026-08-09',
    lastChecked: '2026-08-15',
    seoTitle: 'CERN Junior Fellowship & Internship Geneva Switzerland 2027 Paid',
    seoDescription: 'Apply for CERN Fellowships and Administrative Internships in Geneva. CHF 3,450 - CHF 5,300 monthly tax-free stipend, flights, and medical cover.'
  },
  {
    id: 'sch-011',
    title: 'University of Toronto Lester B. Pearson International Scholarship',
    slug: 'lester-b-pearson-international-scholarship-university-of-toronto-canada',
    university: 'University of Toronto',
    organization: 'University of Toronto',
    country: 'Canada',
    region: 'North America',
    city: 'Toronto, Ontario',
    degreeLevels: ['Undergraduate', 'Bachelor'],
    fields: ['Computer Science', 'Commerce & Rotman Management', 'Life Sciences', 'Engineering', 'Architecture', 'Social Sciences'],
    category: 'scholarships',
    type: 'University',
    fundingType: 'Fully Funded',
    fundingAmount: 'CAD $75,000/year (100% tuition, full residence room & board, books, incidental fees)',
    tuitionCoverage: '100% Full Undergraduate Tuition Coverage for 4 Years (value over CAD $250,000)',
    monthlyStipend: 'Full residence room and board covered + book stipend',
    accommodation: 'Guaranteed 4-Year Full Residence and Meal Plan on U of T Campus',
    airfare: 'Not included (settlement support provided)',
    healthInsurance: 'University Health Insurance Plan (UHIP) covered for 4 years',
    visaSupport: 'Official Letter of Acceptance (LOA) & Provincial Attestation Letter (PAL) provided',
    researchSupport: 'Access to undergraduate research initiatives, leadership summits, and alumni network',
    eligibleCountries: ['All International Students (Non-Canadian citizens completing secondary school)'],
    eligibility: {
      nationalityRequirement: 'An international student (non-Canadian requiring a study permit)',
      academicRequirement: 'Currently in final year of secondary school or graduated no earlier than June 2026',
      minimumGpa: 'Demonstrated exceptional academic achievement (Top 1-2% of high school class)',
      ageLimit: 'Undergraduate entry age',
      workExperience: 'Exceptional record of creative community leadership and extracurricular impact'
    },
    languageRequirements: {
      ieltsRequired: true,
      ieltsScore: '6.5 overall (no band below 6.0)',
      toeflScore: '100 iBT (minimum 22 on writing)',
      englishProficiencyCertificateAccepted: false,
      notes: 'Duolingo English Test (120+) also accepted by University of Toronto.'
    },
    greRequired: false,
    applicationFee: 'Paid',
    applicationFeeAmount: 'CAD $180 (OUAC 105 / U of T International Application Fee)',
    deadline: '2026-11-30',
    startDate: '2027-09-01',
    duration: '4 Years (Full Undergraduate Bachelor Degree)',
    numberOfAwards: 'Approx. 37 international scholars selected each year',
    studyMode: 'Full-time',
    description: 'U of T’s most prestigious undergraduate scholarship. Covers 100% tuition, books, incidental fees, and full residence room and board for four years.',
    fullOverview: 'The Lester B. Pearson International Scholarship Program at the University of Toronto is intended to recognize international students who demonstrate exceptional academic achievement and creativity and who are recognized as leaders within their school and community.\n\nNamed after Nobel Peace Prize laureate and former Canadian Prime Minister Lester B. Pearson, this is U of T\'s flagship undergraduate award covering all tuition, living, and incidental expenses across four years of study.',
    aboutProvider: 'The University of Toronto is consistently ranked Canada\'s #1 university and #21 in global rankings.',
    whyApply: [
      'Canada’s #1 university with world-renowned faculties in computer science and business',
      '100% fully funded undergraduate degree: covers 4 years of tuition, on-campus housing, and food plan',
      'Live in vibrant downtown Toronto with 3-year Canadian Post-Graduation Work Permit (PGWP)',
      'Lifelong cohort of passionate international changemakers and future leaders'
    ],
    benefits: [
      'Full tuition for four years',
      'Books and incidental course fees',
      'Full residence support including dining hall meal plans',
      'University Health Insurance Plan (UHIP) for four years'
    ],
    requirements: [
      'Nominated by your high school (each secondary school can nominate only ONE student)',
      'Applying to an undergraduate degree program at the University of Toronto for entry in Fall 2027',
      'First-entry undergraduate applicant who has not previously attended post-secondary education'
    ],
    documents: [
      'Official High School Nomination Form submitted by School Principal / Guidance Counselor',
      'University of Toronto International Undergraduate Application (OUAC)',
      'Lester B. Pearson Scholarship Online Application with personal essays',
      'Official Secondary School Academic Transcripts and Predicted Grades',
      'Two Letters of Recommendation'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'High School Nomination',
        description: 'Ask your high school guidance counselor or principal to submit an official nomination for you by late November.'
      },
      {
        stepNumber: 2,
        title: 'Apply for Admission to U of T',
        description: 'Submit your undergraduate application to the University of Toronto via the Ontario Universities Application Centre (OUAC).'
      },
      {
        stepNumber: 3,
        title: 'Complete Pearson Scholarship Application',
        description: 'Upon receiving your nomination and U of T applicant ID, complete the personalized online Pearson Scholarship application before January 15.'
      }
    ],
    faq: [
      {
        question: 'Can my high school nominate more than one student?',
        answer: 'No. Each secondary school worldwide may submit only one student nomination per year.'
      },
      {
        question: 'Can I apply for the Pearson scholarship if I have already attended university?',
        answer: 'No. The scholarship is strictly for first-time entering undergraduate students.'
      }
    ],
    applicationUrl: 'https://future.utoronto.ca/pearson/about/',
    officialWebsite: 'https://www.utoronto.ca',
    sourceUrl: 'https://future.utoronto.ca',
    image: 'https://images.unsplash.com/photo-1517935703635-2717090c2210?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Canada', 'University of Toronto', 'Bachelor', 'Undergraduate', 'Fully Funded', 'Room and Board'],
    featured: true,
    popular: true,
    status: 'published',
    views: 29800,
    bookmarksCount: 6900,
    publishedAt: '2026-06-15',
    updatedAt: '2026-08-14',
    author: {
      name: 'Eleanor Vance',
      role: 'UK & European Scholarship Strategist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge Canada Desk',
    verifiedAt: '2026-08-10',
    lastChecked: '2026-08-15',
    seoTitle: 'Lester B. Pearson Scholarship University of Toronto Canada 2027 Fully Funded',
    seoDescription: 'Apply for the Lester B. Pearson International Scholarship 2027 at University of Toronto. 100% full 4-year tuition, residence housing, and meal plan for undergraduate students.'
  },
  {
    id: 'sch-012',
    title: 'KAIST International Undergraduate & Graduate Scholarships (Full Tuition + Stipend)',
    slug: 'kaist-international-scholarship-south-korea',
    university: 'KAIST (Korea Advanced Institute of Science and Technology)',
    organization: 'KAIST',
    country: 'South Korea',
    region: 'Asia',
    city: 'Daejeon',
    degreeLevels: ['Undergraduate', 'Bachelor', 'Master', 'PhD'],
    fields: ['Computer Science & AI', 'Electrical & Robotics Engineering', 'Semiconductor Technology', 'Mechanical Engineering', 'Bio & Brain Engineering', 'Physics & Chemistry'],
    category: 'scholarships',
    type: 'University',
    fundingType: 'Fully Funded',
    fundingAmount: '100% Tuition Waiver + ₩350,000 - ₩400,000/mo stipend + National Health Insurance',
    tuitionCoverage: '100% Full Tuition Exemption for 8 Semesters (BSc) or 4-8 Semesters (MSc/PhD)',
    monthlyStipend: '₩350,000 per month (Bachelor) | ₩400,000 - ₩1,200,000+ per month (Graduate Research Assistantship)',
    accommodation: 'Guaranteed on-campus dormitory at subsidized rate (~₩150,000/month)',
    airfare: 'Not included (settlement subsidy available)',
    healthInsurance: 'National Health Insurance premium subsidized by KAIST',
    visaSupport: 'Standard Korean D-2 Student Visa sponsorship with fast-track processing',
    researchSupport: 'Top laboratory research grants, supercomputing facilities, and patent filing support',
    eligibleCountries: ['All International Students (Non-Korean citizens)'],
    eligibility: {
      nationalityRequirement: 'Applicants must not be citizens of South Korea',
      academicRequirement: 'High school graduation with exceptional grades in Math & Sciences (BSc) or Bachelor/Master degree (Graduates)',
      minimumGpa: 'Equivalent to 3.5+ / 4.0 or top 10% class ranking',
      ageLimit: 'No age limit',
      workExperience: 'Not required'
    },
    languageRequirements: {
      ieltsRequired: true,
      ieltsScore: '6.5 overall',
      toeflScore: '83 iBT',
      englishProficiencyCertificateAccepted: true,
      notes: '100% of all lectures and exams at KAIST are conducted in English.'
    },
    greRequired: false,
    applicationFee: 'Paid',
    applicationFeeAmount: 'USD $80 / ₩80,000',
    deadline: '2026-10-20',
    startDate: '2027-03-01',
    duration: '4 Years (Bachelor) | 2 Years (Master) | 4 Years (PhD)',
    numberOfAwards: 'All admitted international undergraduate and research graduate students receive full funding',
    studyMode: 'Full-time',
    description: 'All admitted international students to KAIST receive a full tuition waiver, monthly living allowance, and comprehensive health insurance. 100% taught in English.',
    fullOverview: 'KAIST is South Korea\'s foremost national research university, frequently dubbed the "MIT of Asia". Located in the high-tech hub of Daedeok Innopolis in Daejeon, KAIST delivers 100% of its undergraduate and graduate curricula in English.\n\nRemarkably, every international student admitted to KAIST is automatically awarded the KAIST International Student Scholarship, which covers 100% of tuition fees and provides a monthly living stipend, conditioned only upon maintaining satisfactory academic standing (GPA 2.7+ / 4.3).',
    aboutProvider: 'Established by the Korean government in 1971, KAIST is the powerhouse behind South Korea’s miraculous high-tech and semiconductor industrial revolution.',
    whyApply: [
      'Automatic full scholarship for every admitted international student (no separate scholarship form!)',
      '100% of courses and research conducted in English',
      'World-leading research labs in artificial intelligence, semiconductors, robotics, and aerospace',
      'Close recruiting and research partnerships with Samsung Electronics, SK Hynix, and Hyundai Motors'
    ],
    benefits: [
      'Full tuition fee exemption for 8 semesters (undergraduate) or entire graduate duration',
      'Monthly living allowance of ₩350,000/month for undergraduate students',
      'Monthly Graduate Research Assistantship (₩400,000 - ₩1,200,000+/month) for Master and PhD students',
      'National Health Insurance coverage subsidized by the university'
    ],
    requirements: [
      'Hold non-Korean citizenship',
      'Strong academic track record in mathematics, physics, and science disciplines',
      'Maintain cumulative GPA of 2.7 / 4.3 or higher at KAIST to renew scholarship each semester'
    ],
    documents: [
      'Online KAIST Application Form',
      'Recommendation Letter from Math or Science Teacher / Professor',
      'High School Profile and Official Academic Transcripts',
      'Standardized Test Score Reports (SAT / ACT / AP / IB / Olympiad Certificates if available)',
      'English Proficiency Test Report (IELTS / TOEFL / Duolingo / English Medium Certificate)',
      'Copy of Applicant and Parents’ Passports'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Complete Online KAIST Application',
        description: 'Fill out the online application via the KAIST International Admissions website and upload all academic documents.'
      },
      {
        stepNumber: 2,
        title: 'Referee Submits Recommendation Online',
        description: 'Your teacher or professor submits their confidential recommendation directly through the KAIST referee portal.'
      },
      {
        stepNumber: 3,
        title: 'Document Evaluation & Interview',
        description: 'KAIST Admissions reviews dossiers and conducts online video interviews for shortlisted candidates.'
      }
    ],
    faq: [
      {
        question: 'Do I need to submit a separate scholarship application for KAIST?',
        answer: 'No. All admitted international undergraduate and graduate students automatically receive the KAIST International Scholarship.'
      },
      {
        question: 'Is Korean language required for coursework at KAIST?',
        answer: 'No. 100% of all lectures, assignments, and exams at KAIST are taught entirely in English.'
      }
    ],
    applicationUrl: 'https://admission.kaist.ac.kr/intl-undergraduate/',
    officialWebsite: 'https://www.kaist.ac.kr/en/',
    sourceUrl: 'https://admission.kaist.ac.kr',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['KAIST', 'South Korea', 'STEM', 'Bachelor', 'Master', 'PhD', 'Fully Funded', 'English Taught', 'Stipend'],
    featured: false,
    popular: true,
    status: 'published',
    views: 22400,
    bookmarksCount: 4600,
    publishedAt: '2026-07-10',
    updatedAt: '2026-08-14',
    author: {
      name: 'Min-jun Park',
      role: 'Seoul Education & GKS Counselor',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge Korea Desk',
    verifiedAt: '2026-08-11',
    lastChecked: '2026-08-15',
    seoTitle: 'KAIST International Student Scholarship 2027 Fully Funded South Korea',
    seoDescription: 'Apply for KAIST International Scholarships 2027. 100% full tuition waiver, monthly living allowance, and health insurance for Bachelor, Master, and PhD.'
  },
  {
    id: 'sch-013',
    title: 'Eiffel Excellence Scholarship Programme (Bourses Eiffel France)',
    slug: 'eiffel-excellence-scholarship-france',
    university: 'Top French Universities & Grandes Écoles (Sorbonne, PSL, École Polytechnique, HEC Paris)',
    organization: 'French Ministry for Europe and Foreign Affairs (MEAE)',
    country: 'France',
    region: 'Europe',
    city: 'Paris / Lyon / Toulouse / Marseille',
    degreeLevels: ['Master', 'PhD'],
    fields: ['Mathematics & Physics', 'Computer Science & AI', 'Engineering Sciences', 'Law & Political Science', 'Economics & Management', 'Ecological Transition'],
    category: 'scholarships',
    type: 'Government',
    fundingType: 'Fully Funded',
    fundingAmount: '€1,181/mo (Master) | €1,800/mo (PhD) + flights + CAF housing priority',
    tuitionCoverage: 'Tuition fees covered by host institution / standard French university rates',
    monthlyStipend: '€1,181 per month (Master) | €1,800 per month (PhD)',
    accommodation: 'Priority booking in CROUS student residences + French CAF housing subsidy',
    airfare: 'International round-trip flight from home country to France included',
    healthInsurance: 'Campus France comprehensive complementary health insurance covered',
    visaSupport: 'Priority VLS-TS French Student Visa facilitation via Campus France',
    researchSupport: 'Cultural activities allowance, regional trips, and train travel within France',
    eligibleCountries: ['All Developing & Emerging Nations (Foreign nationals only)'],
    eligibility: {
      nationalityRequirement: 'Applicants must hold foreign nationality (dual French citizens not eligible)',
      academicRequirement: 'Outstanding academic record with exceptional honors or class ranking',
      minimumGpa: 'Upper 10% of class',
      ageLimit: 'Master level: 25 years old maximum | PhD level: 30 years old maximum at the time of campaign',
      workExperience: 'Not strictly required'
    },
    languageRequirements: {
      ieltsRequired: false,
      ieltsScore: 'Required only if degree is taught in English (IELTS 6.5+ or TOEFL 90+)',
      englishProficiencyCertificateAccepted: true,
      notes: 'No French test required if enrolled in an English-taught Master programme.'
    },
    greRequired: false,
    applicationFee: 'Free',
    deadline: '2026-11-20',
    startDate: '2027-09-01',
    duration: 'Master: 12 - 36 Months | PhD: 6 - 36 Months (Cotutelle or joint supervision)',
    numberOfAwards: 'Approx. 350 awards distributed across top French institutions',
    studyMode: 'Full-time',
    description: 'Flagship French government scholarship offering monthly stipends up to €1,800, return airfare, cultural activities, and subsidized housing for Master and PhD scholars.',
    fullOverview: 'The Eiffel Excellence Scholarship Programme was established by the French Ministry for Europe and Foreign Affairs to enable French higher education institutions to attract top foreign students to enrol in their master\'s and doctoral programmes.\n\nApplications cannot be submitted directly by individual students: candidates must be nominated and endorsed by an accredited French higher education institution.',
    aboutProvider: 'Campus France is the French national agency for the promotion of higher education, international student services, and global mobility.',
    whyApply: [
      'Generous monthly allowance (€1,181 for Master, €1,800 for PhD) in France',
      'Free return international airfare and domestic train transfers within France',
      'Priority access to CROUS subsidized student housing plus CAF rent rebates',
      'Study at world-class French institutions in aerospace, mathematics, AI, and luxury management'
    ],
    benefits: [
      'Monthly stipend of €1,181 (Master) or €1,800 (Doctoral level)',
      'Direct round-trip international flight ticket from country of origin to France',
      'National train travel reimbursement from arrival airport to study city',
      'Supplemental health insurance coverage and mutual fund',
      'Cultural excursions and social integration activities'
    ],
    requirements: [
      'Foreign nationality (candidates with French dual nationality are ineligible)',
      'Nominated exclusively by a recognized French higher education institution',
      'Must not have previously received an Eiffel scholarship at the same level'
    ],
    documents: [
      'Detailed Curriculum Vitae (CV) in French or English',
      'Professional Career and Motivation Project (Statement of Purpose)',
      'Complete Academic Transcripts from all higher education years',
      'Degree Certificates / Diplomas and Official Translations',
      'Letters of Recommendation from academic and professional referees',
      'Official Language Test Certificate (French DELF/DALF or English IELTS/TOEFL)'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Contact French University Department',
        description: 'Contact the international relations or admissions office of the French university or Grande École offering your desired course.'
      },
      {
        stepNumber: 2,
        title: 'University Approves Your Candidacy',
        description: 'The French institution assesses your academic file and agrees to support and nominate your Eiffel scholarship application.'
      },
      {
        stepNumber: 3,
        title: 'Institution Submits File to Campus France',
        description: 'The university submits your complete application to the Campus France Eiffel portal before the national deadline in early January.'
      }
    ],
    faq: [
      {
        question: 'Can I apply for the Eiffel scholarship directly on Campus France myself?',
        answer: 'No. Eiffel applications must be submitted exclusively by a French higher education institution on your behalf after they accept your academic profile.'
      },
      {
        question: 'Is French language fluency mandatory for Eiffel scholars?',
        answer: 'No. If the Master or PhD program you are admitted to is taught in English, you do not need French language test scores.'
      }
    ],
    applicationUrl: 'https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence',
    officialWebsite: 'https://www.campusfrance.org/en',
    sourceUrl: 'https://www.campusfrance.org',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Eiffel', 'France', 'Campus France', 'Fully Funded', 'Master', 'PhD', 'Stipend', 'Flights Included'],
    featured: false,
    popular: true,
    status: 'published',
    views: 20100,
    bookmarksCount: 4200,
    publishedAt: '2026-06-20',
    updatedAt: '2026-08-10',
    author: {
      name: 'Dr. Clara Meyer',
      role: 'International Admissions Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge Paris Desk',
    verifiedAt: '2026-08-05',
    lastChecked: '2026-08-15',
    seoTitle: 'Eiffel Excellence Scholarship France 2027 Fully Funded Campus France',
    seoDescription: 'Apply for the French Eiffel Excellence Scholarship 2027. €1,181 to €1,800 monthly living allowance, free roundtrip flights, and housing support.'
  },
  {
    id: 'sch-014',
    title: 'Fulbright Foreign Student Program for USA Master & PhD Degrees',
    slug: 'fulbright-foreign-student-program-usa',
    university: 'Top US Universities (Columbia, Harvard, Stanford, Berkeley, NYU, Chicago)',
    organization: 'U.S. Department of State & Fulbright Foreign Scholarship Board',
    country: 'United States',
    region: 'North America',
    city: 'Washington DC / New York / Boston / San Francisco',
    degreeLevels: ['Master', 'PhD'],
    fields: ['Public Policy', 'Environmental Science', 'Journalism & Media', 'Data Science & STEM', 'Economics & Business', 'Humanities & Social Sciences'],
    category: 'scholarships',
    type: 'Government',
    fundingType: 'Fully Funded',
    fundingAmount: '$35,000 - $65,000/year (100% full tuition, monthly stipend, flights, health plan)',
    tuitionCoverage: '100% Full Tuition and University Fees Covered',
    monthlyStipend: '$1,800 - $2,800 per month (depending on US host city cost of living)',
    accommodation: 'Assistance and allowance for off-campus apartment or campus graduate housing',
    airfare: 'Round-trip international airfare between home country and US host institution',
    healthInsurance: 'Accident and Sickness Program for Exchanges (ASPE) health benefit plan',
    visaSupport: 'J-1 Exchange Visitor Visa sponsorship and DS-2019 issuance',
    researchSupport: 'Enrichment seminars, professional development workshops across US cities, and book allowance',
    eligibleCountries: ['Over 160 Countries worldwide with active Fulbright Commissions or US Embassies'],
    eligibility: {
      nationalityRequirement: 'Citizens of participating Fulbright countries (U.S. citizens/permanent residents not eligible)',
      academicRequirement: 'Completed undergraduate education with equivalent of Bachelor degree',
      minimumGpa: 'Equivalent to 3.5+ / 4.0 or Upper Second / First Class Honors',
      ageLimit: 'No strict age limit',
      workExperience: '2+ years of professional work experience preferred in chosen field'
    },
    languageRequirements: {
      ieltsRequired: true,
      ieltsScore: '7.0 overall',
      toeflScore: '90 - 100 iBT',
      englishProficiencyCertificateAccepted: false,
      notes: 'Fulbright commissions often provide free TOEFL iBT / GRE testing vouchers to shortlisted candidates.'
    },
    greRequired: true,
    applicationFee: 'Free',
    deadline: '2026-10-15',
    startDate: '2027-08-20',
    duration: '1 to 2 Years (Master) or up to 3 Years (PhD funding components)',
    numberOfAwards: 'Approx. 4,000 foreign students receive Fulbright scholarships annually',
    studyMode: 'Full-time',
    description: 'The flagship international educational exchange program sponsored by the U.S. government. Covers full tuition, monthly living stipend, airfare, health insurance, and J-1 visa.',
    fullOverview: 'The Fulbright Foreign Student Program enables graduate students, young professionals, and artists from abroad to study and conduct research in the United States. Operating in more than 160 countries worldwide, Fulbright is the premier cultural diplomacy exchange initiative of the US government.\n\nFulbright scholars are placed at prestigious American universities with full funding, participate in leadership enrichment seminars in major US cities, and join a distinguished global alumni network including 62 Nobel Prize laureates and 89 Pulitzer Prize winners.',
    aboutProvider: 'The Bureau of Educational and Cultural Affairs (ECA) of the U.S. Department of State fosters mutual understanding between the people of the United States and the people of other countries.',
    whyApply: [
      'The most globally respected international fellowship in the United States',
      '100% full financial security: covers full US university tuition, monthly stipend, flights, books',
      'Free placement services at top-tier US universities managed by IIE (Institute of International Education)',
      'Lifelong alumni network of global heads of state, diplomats, scientists, and university presidents'
    ],
    benefits: [
      'Full tuition and required academic fees at the host US university',
      'Monthly living stipend adjusted to the cost of living in the host US city ($1,800 - $2,800/mo)',
      'Round-trip international air travel',
      'Health benefit plan meeting US exchange visitor standards (ASPE)',
      'Settlement and book allowances',
      'Participation in exclusive Fulbright enrichment seminars across the US'
    ],
    requirements: [
      'Hold a completed Bachelor\'s degree or equivalent with superior academic achievement',
      'High level of English language proficiency (TOEFL / IELTS)',
      'Commitment to return to home country upon completion of the program to contribute to local society (2-year home country physical presence requirement)'
    ],
    documents: [
      'Fulbright Online Application via official Embark / Slate portal',
      'Statement of Purpose (Study / Research Objective)',
      'Personal Statement essay',
      'Three Letters of Recommendation from academic and professional referees',
      'Certified University Transcripts and Degree Certificates with official English translations',
      'Valid Passport copy',
      'Valid TOEFL / IELTS score reports (or willingness to sit for subsidized test)'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Check Country-Specific Fulbright Commission / Embassy Page',
        description: 'Visit the US Embassy or Binational Fulbright Commission website in your home country for local guidelines and deadlines.'
      },
      {
        stepNumber: 2,
        title: 'Submit Online Fulbright Application',
        description: 'Complete the online application, upload essays, transcripts, and assign three recommenders.'
      },
      {
        stepNumber: 3,
        title: 'National Interview & US Placement',
        description: 'Selected candidates attend an in-person interview. Finalists are paired with prospective US universities by the Institute of International Education (IIE).'
      }
    ],
    faq: [
      {
        question: 'Do I need to secure admission to a US university before applying for Fulbright?',
        answer: 'No! You do not need US university admission prior to applying. The Fulbright placement team (IIE) applies to and places you at suitable US universities.'
      },
      {
        question: 'What is the two-year home residency requirement?',
        answer: 'Under the J-1 exchange visa rules, Fulbright scholars agree to return to their home country for at least two years after completing their degree to share their knowledge.'
      }
    ],
    applicationUrl: 'https://foreign.fulbrightonline.org/',
    officialWebsite: 'https://fulbrightprogram.org',
    sourceUrl: 'https://eca.state.gov/fulbright',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Fulbright', 'USA', 'Government', 'Fully Funded', 'Master', 'PhD', 'Leadership', 'J-1 Visa', 'Stipend'],
    featured: true,
    popular: true,
    status: 'published',
    views: 38900,
    bookmarksCount: 9400,
    publishedAt: '2026-03-01',
    updatedAt: '2026-08-14',
    author: {
      name: 'Eleanor Vance',
      role: 'UK & European Scholarship Strategist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge Washington Desk',
    verifiedAt: '2026-08-01',
    lastChecked: '2026-08-15',
    seoTitle: 'Fulbright Foreign Student Program USA 2027 Fully Funded Master & PhD',
    seoDescription: 'Complete application guide for the Fulbright Foreign Student Program USA 2027. Full tuition, monthly living stipend, roundtrip flights, and J-1 visa.'
  },
  {
    id: 'sch-015',
    title: 'University of Amsterdam (UvA) Amsterdam Excellence Scholarship (AES)',
    slug: 'amsterdam-excellence-scholarship-uva-netherlands',
    university: 'University of Amsterdam (UvA)',
    organization: 'University of Amsterdam',
    country: 'Netherlands',
    region: 'Europe',
    city: 'Amsterdam',
    degreeLevels: ['Master'],
    fields: ['Artificial Intelligence', 'Data Science', 'Economics & Econometrics', 'Communication Science', 'Law & Human Rights', 'Psychology'],
    category: 'scholarships',
    type: 'University',
    fundingType: 'Fully Funded',
    fundingAmount: '€25,000 full scholarship (covers full tuition + living stipend)',
    tuitionCoverage: '100% Full Tuition Coverage for English-Taught Master Program',
    monthlyStipend: 'Living allowance included in the €25,000 total annual award',
    accommodation: 'Assistance in booking international student housing in Amsterdam',
    airfare: 'Covered within the €25,000 grant award',
    healthInsurance: 'Health insurance subsidy provided',
    visaSupport: 'University applies for Dutch Residence Permit (VVR) and Entry Visa (MVV)',
    researchSupport: 'Mentoring by senior faculty and access to Amsterdam AI Innovation Center',
    eligibleCountries: ['Non-EU / Non-EEA International Students'],
    eligibility: {
      nationalityRequirement: 'Hold non-EU/EEA passport',
      academicRequirement: 'Graduated in top 10% of Bachelor’s degree class',
      minimumGpa: 'Equivalent to Dutch Grade 8.0/10 or GPA 3.7+ / 4.0',
      ageLimit: 'No age limit',
      workExperience: 'Relevant extracurricular leadership or academic research experience'
    },
    languageRequirements: {
      ieltsRequired: true,
      ieltsScore: '7.0 overall (minimum 6.5 in each section)',
      toeflScore: '100 iBT (minimum 24 in each band)',
      englishProficiencyCertificateAccepted: false,
      notes: 'Required for non-native English speakers.'
    },
    greRequired: false,
    applicationFee: 'Paid',
    applicationFeeAmount: '€100 (UvA Master Application Fee)',
    deadline: '2026-11-15',
    startDate: '2027-09-01',
    duration: '1 to 2 Years (Master\'s degree)',
    numberOfAwards: 'Approx. 25 - 30 highly prestigious grants per year',
    studyMode: 'Full-time',
    description: 'A full scholarship of €25,000 covering tuition and living expenses for exceptionally talented non-EU Master students at the University of Amsterdam.',
    fullOverview: 'The Amsterdam Excellence Scholarship (AES) is a prestigious grant awarded to exceptionally talented students from outside Europe. The University of Amsterdam is ranked #53 in the world and is located in the vibrant, canal-lined cultural and tech capital of the Netherlands.\n\nAES scholars become members of a select group of international scholars and are offered individual academic mentoring and networking events with prominent Dutch multinational leaders.',
    aboutProvider: 'The University of Amsterdam (UvA), established in 1632, is the largest university in the Netherlands by enrollment and research output.',
    whyApply: [
      'Ranked #1 in the Netherlands and #53 in the world',
      '€25,000 per year full scholarship package covering tuition and living expenses',
      'Study in vibrant Amsterdam with 1-Year "Zoekjaar" post-study work visa upon graduation',
      'Small, selective cohort with personal academic mentoring and executive networking'
    ],
    benefits: [
      'A full scholarship of €25,000 per academic year',
      'Coverage of tuition fees and a substantial contribution towards living expenses',
      'Opportunity to join the AES alumni circle and academic conferences',
      'Full visa processing and Dutch residence permit support by UvA Central Student Service Desk'
    ],
    requirements: [
      'Hold a non-EU/EEA passport and not be eligible for Dutch statutory tuition rates',
      'Belong to the top 10% of your graduating class (GPA 3.7+ / Dutch 8.0+)',
      'Admitted to an English-taught Master\'s program at the University of Amsterdam'
    ],
    documents: [
      'Curriculum Vitae (CV) outlining academic honors and extracurriculars',
      'Letter of Motivation (maximum 500 words explaining why you should be awarded AES)',
      'Official Proof of Class Ranking (Dean’s statement verifying top 10%)',
      'Certified Bachelor’s Transcripts and Degree Certificate',
      'English Language Test Certificate (IELTS / TOEFL)',
      'Two Academic Letters of Recommendation'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Apply for UvA Master Programme via Studielink',
        description: 'Register in the Dutch national database Studielink and submit your Master application through MyInfo portal.'
      },
      {
        stepNumber: 2,
        title: 'Check AES Box in MyInfo',
        description: 'Indicate in your online application that you wish to be considered for the Amsterdam Excellence Scholarship.'
      },
      {
        stepNumber: 3,
        title: 'Upload AES Supporting Documents',
        description: 'Upload your top 10% class rank verification and dedicated AES motivation letter before January 15.'
      }
    ],
    faq: [
      {
        question: 'Can EU/EEA citizens apply for the AES scholarship?',
        answer: 'No, AES is strictly reserved for non-EU/EEA international students who pay the higher institutional tuition rate.'
      },
      {
        question: 'Is the AES renewable for 2-year Master programs?',
        answer: 'Yes. For 2-year Master programmes, the scholarship is renewed for the second year provided satisfactory academic progress is maintained.'
      }
    ],
    applicationUrl: 'https://www.uva.nl/en/education/master-s/scholarships--tuition/scholarships-and-loans/amsterdam-excellence-scholarship/amsterdam-excellence-scholarship.html',
    officialWebsite: 'https://www.uva.nl/en',
    sourceUrl: 'https://www.uva.nl',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Netherlands', 'University of Amsterdam', 'Master', 'Fully Funded', 'Stipend', 'Non-EU', 'AI'],
    featured: false,
    popular: true,
    status: 'published',
    views: 17300,
    bookmarksCount: 3700,
    publishedAt: '2026-07-15',
    updatedAt: '2026-08-12',
    author: {
      name: 'Dr. Clara Meyer',
      role: 'International Admissions Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge Amsterdam Desk',
    verifiedAt: '2026-08-06',
    lastChecked: '2026-08-15',
    seoTitle: 'Amsterdam Excellence Scholarship UvA Netherlands 2027 Fully Funded',
    seoDescription: 'Apply for the Amsterdam Excellence Scholarship (AES) 2027 at University of Amsterdam. €25,000 full scholarship for top non-EU Master students.'
  },
  {
    id: 'sch-016',
    title: 'UK Chevening Scholarships for International Master Students',
    slug: 'uk-chevening-scholarship-master-degrees',
    university: 'Any UK University (Oxford, Cambridge, LSE, Imperial, UCL, Edinburgh, Manchester)',
    organization: 'Foreign, Commonwealth & Development Office (FCDO), UK Government',
    country: 'United Kingdom',
    region: 'Europe',
    city: 'London / Edinburgh / Manchester / Oxford',
    degreeLevels: ['Master'],
    fields: ['International Relations & Diplomacy', 'Economics & Development', 'Law & Human Rights', 'Media & Journalism', 'Climate Change & Sustainability', 'Public Policy'],
    category: 'scholarships',
    type: 'Government',
    fundingType: 'Fully Funded',
    fundingAmount: '£30,000 - £45,000 total package (full tuition, living allowance, return flights)',
    tuitionCoverage: '100% Full University Tuition Fees (fee cap applies only to specialist MBAs)',
    monthlyStipend: '£1,100 - £1,400 per month maintenance allowance (London / non-London rate)',
    accommodation: 'Assistance in booking UK university campus housing or private student halls',
    airfare: 'Economy class return flights from home country to the UK',
    healthInsurance: 'UK Immigration Health Surcharge (IHS) fully reimbursed',
    visaSupport: 'Official Chevening British High Commission / Embassy Visa Endorsement',
    researchSupport: 'Exclusive access to UK Foreign Office networking events, parliamentary tours, and Chevening summits',
    eligibleCountries: ['160+ Chevening-eligible countries and territories'],
    eligibility: {
      nationalityRequirement: 'Citizen of a Chevening-eligible country or territory',
      academicRequirement: 'Undergraduate degree equivalent to an upper second-class 2:1 honours degree in the UK',
      minimumGpa: 'Equivalent to UK 2:1 (GPA 3.2+ / 4.0)',
      ageLimit: 'No age limit',
      workExperience: 'At least two years of documented work experience (minimum 2,800 hours)'
    },
    languageRequirements: {
      ieltsRequired: false,
      ieltsScore: 'Required by host UK university after unconditional offer (typically IELTS 6.5+)',
      englishProficiencyCertificateAccepted: false,
      notes: 'Chevening no longer has its own English test requirement; applicants must meet their chosen UK universities\' requirements.'
    },
    greRequired: false,
    applicationFee: 'Free',
    deadline: '2026-11-05',
    startDate: '2027-09-15',
    duration: '1 Year (Intensive UK Master\'s Degree)',
    numberOfAwards: 'Approx. 1,500 scholars selected globally each year',
    studyMode: 'Full-time',
    description: 'The UK government\'s global scholarship programme. Fully funded 1-year Master’s degrees at any UK university with tuition, monthly stipend, flights, and networking.',
    fullOverview: 'Chevening is the UK Government’s international awards programme aimed at developing global leaders. Funded by the Foreign, Commonwealth and Development Office (FCDO) and partner organisations, Chevening offers future influencers, decision-makers, and thought leaders from all over the world the unique opportunity to develop professionally and academically.\n\nScholars can study any eligible one-year taught master\'s course at any UK university, experiencing rich British culture and expanding their global perspective.',
    aboutProvider: 'The UK Foreign, Commonwealth and Development Office supports diplomacy, education, and international development cooperation worldwide.',
    whyApply: [
      'Study any 1-year taught master’s degree at any accredited UK university of your choice',
      '100% full financial funding: tuition, monthly stipend, flights, visa fees, arrival grant',
      'High-profile networking with British ministers, diplomats, and industry leaders',
      'Prestigious global network of over 55,000 alumni including 20 current and former heads of state'
    ],
    benefits: [
      'University tuition fees paid in full',
      'A monthly living stipend to cover accommodation and living expenses',
      'Economy class travel to and from your home country to the UK',
      'An arrival allowance and departure allowance',
      'The cost of one visa application and travel grant to attend Chevening events in the UK'
    ],
    requirements: [
      'Be a citizen of a Chevening-eligible country',
      'Return to your country of citizenship for a minimum of two years after your scholarship has ended',
      'Have completed all components of an undergraduate degree by the application deadline',
      'Have at least two years (equivalent to 2,800 hours) of work experience'
    ],
    documents: [
      'Online Chevening Application Form',
      'Four Essays (Leadership & Influence, Relationship Building/Networking, Study in the UK, Career Plan)',
      'Two Valid Reference Letters from professional and academic referees',
      'Official Bachelor Transcripts and Degree Certificate',
      'Three Eligible UK Master Course Choices'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Submit Online Application by November',
        description: 'Complete the comprehensive online Chevening application form with four 500-word essays.'
      },
      {
        stepNumber: 2,
        title: 'Apply to Three UK Master Courses',
        description: 'Apply separately to three different eligible UK university master courses.'
      },
      {
        stepNumber: 3,
        title: 'Attend In-Person Interview at British Embassy',
        description: 'Shortlisted candidates attend a rigorous 30-minute panel interview at the local British Embassy/High Commission.'
      },
      {
        stepNumber: 4,
        title: 'Receive Unconditional Offer',
        description: 'Secure at least one unconditional UK university offer by July to confirm your award.'
      }
    ],
    faq: [
      {
        question: 'Can I apply for a 2-year Master program under Chevening?',
        answer: 'No. Chevening only funds one-year full-time taught master’s courses.'
      },
      {
        question: 'Does freelance or internship work count towards work experience?',
        answer: 'Yes! Full-time employment, part-time employment, freelance work, and structured volunteering count towards the 2,800 hours.'
      }
    ],
    applicationUrl: 'https://www.chevening.org/scholarships/',
    officialWebsite: 'https://www.chevening.org',
    sourceUrl: 'https://www.gov.uk',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Chevening', 'UK', 'Government', 'Master', 'Fully Funded', 'Leadership', 'Flights Included', 'Stipend'],
    featured: true,
    popular: true,
    status: 'published',
    views: 45200,
    bookmarksCount: 11200,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-15',
    author: {
      name: 'Eleanor Vance',
      role: 'UK & European Scholarship Strategist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge London Desk',
    verifiedAt: '2026-08-01',
    lastChecked: '2026-08-15',
    seoTitle: 'UK Chevening Scholarships 2027/2028 Fully Funded Master UK',
    seoDescription: 'Apply for the UK Chevening Scholarship 2027/2028. Fully funded 1-year Master’s degree at any UK university with tuition, monthly stipend, and flights.'
  },
  {
    id: 'sch-017',
    title: 'Vanier Canada Graduate Scholarships (Vanier CGS Doctoral Award)',
    slug: 'vanier-canada-graduate-scholarship-doctoral-canada',
    university: 'Top Canadian Universities (U of T, UBC, McGill, Waterloo, Alberta, Montreal)',
    organization: 'Government of Canada (CIHR, NSERC, SSHRC)',
    country: 'Canada',
    region: 'North America',
    city: 'Ottawa / Toronto / Vancouver / Montreal',
    degreeLevels: ['PhD', 'Research'],
    fields: ['Health Research', 'Natural Sciences & Engineering', 'Artificial Intelligence', 'Social Sciences & Humanities', 'Biomedical Engineering'],
    category: 'scholarships',
    type: 'Government',
    fundingType: 'Fully Funded',
    fundingAmount: 'CAD $50,000 per year for 3 years (CAD $150,000 total)',
    tuitionCoverage: 'Combined with Host Canadian University Tuition Exemption',
    monthlyStipend: 'CAD $4,166 per month (CAD $50,000 annual tax-free stipend)',
    accommodation: 'Assistance with campus graduate student housing',
    airfare: 'Self-covered from generous annual stipend',
    healthInsurance: 'Provincial and University Health Insurance covered by host institution',
    visaSupport: 'Expedited Canadian Study Permit and PAL facilitation',
    researchSupport: 'Direct laboratory funding and priority Canadian tri-agency grant access',
    eligibleCountries: ['All Nationalities (Canadian Citizens, Permanent Residents, and International Students)'],
    eligibility: {
      nationalityRequirement: 'Canadian citizens, permanent residents, and foreign citizens',
      academicRequirement: 'First-class academic average in each of the last two years of full-time study',
      minimumGpa: 'First-class average (typically A- / 3.7+ / 4.0)',
      ageLimit: 'No age limit',
      workExperience: 'Demonstrated exceptional leadership potential and research output'
    },
    languageRequirements: {
      ieltsRequired: true,
      ieltsScore: '7.0 overall',
      toeflScore: '100 iBT',
      englishProficiencyCertificateAccepted: false,
      notes: 'Must satisfy university doctoral admissions requirements in English or French.'
    },
    greRequired: false,
    applicationFee: 'Paid',
    applicationFeeAmount: 'CAD $125 (Canadian University Graduate Application Fee)',
    deadline: '2026-11-01',
    startDate: '2027-05-01',
    duration: '3 Years (Non-renewable)',
    numberOfAwards: 'Approx. 166 scholarships awarded annually across Canada',
    studyMode: 'Full-time',
    description: 'Canada’s premier doctoral award providing CAD $50,000 per year for three years to world-class PhD candidates demonstrating academic excellence and leadership.',
    fullOverview: 'The Vanier Canada Graduate Scholarships (Vanier CGS) program was created to attract and retain world-class doctoral students and establish Canada as a global centre of excellence in research and higher learning.\n\nNamed in honour of Major-General Georges P. Vanier, the first francophone Governor General of Canada, the scholarships are valued at $50,000 per year for three years during doctoral studies.',
    aboutProvider: 'The Vanier CGS program is administered by Canada\'s three federal granting agencies: CIHR, NSERC, and SSHRC.',
    whyApply: [
      'Canada’s most prestigious and highest-paying doctoral award (CAD $50,000/year)',
      'Direct pathway to permanent residency via Canadian Express Entry and Provincial Nominee Programs',
      'Conduct world-class doctoral research with top researchers in AI, quantum computing, and medicine',
      'Join an elite cohort of global scientists and academic innovators'
    ],
    benefits: [
      'CAD $50,000 per year for up to three years of doctoral study',
      'Prestigious national title and recognition as a Vanier Scholar',
      'Access to international research partnerships and conference travel funds'
    ],
    requirements: [
      'Nominated by only one Canadian institution which received a Vanier CGS quota',
      'Pursuing their first doctoral degree (including joint MD/PhD, DVM/PhD)',
      'Demonstrate significant leadership skills and superior research capacity'
    ],
    documents: [
      'Vanier CGS Application via ResearchNet portal',
      'CCV (Canadian Common CV)',
      'Detailed Research Proposal (max 2 pages)',
      'Project References and Bibliography',
      'Leadership Statement (max 2 pages)',
      'Two Letters of Reference assessing research potential',
      'One Leadership Reference Letter'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Contact Canadian Host University Department',
        description: 'Contact a prospective supervisor at an eligible Canadian university and secure institutional nomination endorsement.'
      },
      {
        stepNumber: 2,
        title: 'Complete ResearchNet Application',
        description: 'Create and submit your Vanier CGS application and CCV through the federal ResearchNet portal.'
      },
      {
        stepNumber: 3,
        title: 'Institutional Quota Forwarding',
        description: 'The Canadian university evaluates internal candidates and forwards its allocated quota to the federal Vanier selection board.'
      }
    ],
    faq: [
      {
        question: 'Can I apply directly without a university nomination?',
        answer: 'No. Candidates must be nominated by the Canadian institution where they intend to pursue their doctoral studies.'
      },
      {
        question: 'Is the CAD $50,000 stipend subject to Canadian income tax?',
        answer: 'Under Canadian federal tax laws, post-secondary scholarship income for full-time students is generally non-taxable.'
      }
    ],
    applicationUrl: 'https://vanier.gc.ca/en/home-accueil.html',
    officialWebsite: 'https://vanier.gc.ca',
    sourceUrl: 'https://www.canada.ca',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517935703635-2717090c2210?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Vanier', 'Canada', 'PhD', 'Doctoral', 'Research', 'Fully Funded', 'Leadership', 'CAD $50000'],
    featured: false,
    popular: true,
    status: 'published',
    views: 19600,
    bookmarksCount: 4300,
    publishedAt: '2026-06-15',
    updatedAt: '2026-08-11',
    author: {
      name: 'James Thornton',
      role: 'Postgraduate Fellow & Editor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge Canada Desk',
    verifiedAt: '2026-08-04',
    lastChecked: '2026-08-15',
    seoTitle: 'Vanier Canada Graduate Scholarship 2027 Fully Funded PhD Canada',
    seoDescription: 'Apply for the Vanier Canada Graduate Scholarships (Vanier CGS) 2027. CAD $50,000 per year for 3 years of doctoral research in Canada.'
  },
  {
    id: 'sch-018',
    title: 'Max Planck Institute Summer Research Internship (Germany)',
    slug: 'max-planck-institute-summer-research-internship-germany',
    university: 'Max Planck Institutes (Munich, Dresden, Heidelberg, Göttingen, Berlin)',
    organization: 'Max Planck Society (Max-Planck-Gesellschaft)',
    country: 'Germany',
    region: 'Europe',
    city: 'Munich / Heidelberg / Dresden',
    degreeLevels: ['Internship', 'Research', 'Bachelor', 'Master'],
    fields: ['Computer Science & Machine Learning', 'Quantum Optics', 'Neuroscience & Biochemistry', 'Astrophysics', 'Molecular Cell Biology', 'Materials Science'],
    category: 'internships',
    type: 'Corporate',
    fundingType: 'Fully Funded',
    fundingAmount: '€1,000 - €1,200/month stipend + free housing + travel reimbursement',
    tuitionCoverage: 'Not Applicable (Fully Paid Summer Research Internship)',
    monthlyStipend: '€1,000 - €1,200 per month net living allowance',
    accommodation: 'Free fully furnished student housing or full accommodation reimbursement',
    airfare: 'Round-trip travel expenses between home university and Germany covered',
    healthInsurance: 'Comprehensive German health and accident insurance covered by Max Planck',
    visaSupport: 'Official German Research Host Agreement and Embassy Visa Support Letter',
    researchSupport: 'Direct laboratory bench fee coverage and access to world-class scientific equipment',
    eligibleCountries: ['All International Students (Undergraduate and Master students worldwide)'],
    eligibility: {
      nationalityRequirement: 'Open to students of all nationalities worldwide',
      academicRequirement: 'Enrolled in a Bachelor’s (year 2+) or Master’s degree in STEM fields',
      minimumGpa: 'Top 10-15% of class in computer science, physics, biology, or chemistry',
      ageLimit: 'No age limit',
      workExperience: 'Prior laboratory research experience or open-source projects highly valued'
    },
    languageRequirements: {
      ieltsRequired: false,
      ieltsScore: 'Not required; working proficiency in English required',
      englishProficiencyCertificateAccepted: true,
      notes: 'Working language in all Max Planck research laboratories is 100% English.'
    },
    greRequired: false,
    applicationFee: 'Free',
    deadline: '2026-11-01',
    startDate: '2027-06-15',
    duration: '10 to 12 Weeks (Summer Period)',
    numberOfAwards: 'Approx. 80 fully funded summer research interns selected globally',
    studyMode: 'Full-time',
    description: 'Fully funded 10-week summer research internship at premier Max Planck Institutes across Germany. Includes €1,100/mo stipend, free accommodation, flights, and social events.',
    fullOverview: 'The Max Planck Summer Research Internship Program offers undergraduate and early master\'s students in natural sciences, computer science, and engineering the opportunity to spend 10-12 weeks conducting innovative research at one of Germany\'s world-renowned Max Planck Institutes.\n\nInterns work under the direct supervision of leading faculty members, engage in lab retreats, present their findings at an institute symposium, and participate in weekend excursions across the Bavarian Alps and European cities.',
    aboutProvider: 'The Max Planck Society is Germany’s most successful research organization, with 38 Nobel Laureates among its scientists.',
    whyApply: [
      'Conduct hands-on cutting-edge research at the world\'s leading basic research institution',
      '100% fully funded: monthly stipend, free furnished housing, roundtrip airfare, and insurance',
      'Direct springboard to fully funded PhD fellowships across Europe and North America',
      'Vibrant social program: hiking trips in the Alps, castle tours, and international student community'
    ],
    benefits: [
      'Monthly stipend of approx. €1,100 to cover living costs and meals',
      'Free furnished student accommodation arranged by the institute',
      'Full reimbursement of international round-trip travel costs',
      'Health, accident, and liability insurance in Germany'
    ],
    requirements: [
      'Enrolled as a Bachelor or Master student in a relevant scientific or engineering discipline',
      'Completed at least two years of university education by summer 2027',
      'High enthusiasm for scientific inquiry and research'
    ],
    documents: [
      'Curriculum Vitae (CV) highlighting technical skills and laboratory experience',
      'Official University Transcripts with grading key',
      'Letter of Motivation (1 page stating your research interests and preferred MPI labs)',
      'One or Two Academic Letters of Recommendation from professors'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Review Participating Max Planck Labs',
        description: 'Browse the open research projects across Munich, Heidelberg, and Dresden and select top 3 lab preferences.'
      },
      {
        stepNumber: 2,
        title: 'Submit Online Application Dossier',
        description: 'Upload your CV, transcripts, motivation letter, and recommender contact information before the deadline.'
      },
      {
        stepNumber: 3,
        title: 'Faculty Interviews & Matching',
        description: 'Shortlisted applicants participate in 20-minute Zoom interviews with lab principal investigators (PIs).'
      }
    ],
    faq: [
      {
        question: 'Do I need to speak German to participate?',
        answer: 'No. The entire internship and all lab communications are conducted in English.'
      },
      {
        question: 'Can graduating seniors in their final semester apply?',
        answer: 'Students must be enrolled at a university during the internship period or be transitioning directly into a Master’s degree.'
      }
    ],
    applicationUrl: 'https://www.imprs-ls.de/summer-internship',
    officialWebsite: 'https://www.mpg.de/en',
    sourceUrl: 'https://www.mpg.de',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Max Planck', 'Germany', 'Internship', 'Research', 'STEM', 'Fully Funded', 'Summer School', 'No IELTS'],
    featured: false,
    popular: true,
    status: 'published',
    views: 23100,
    bookmarksCount: 5100,
    publishedAt: '2026-07-20',
    updatedAt: '2026-08-14',
    author: {
      name: 'Dr. Clara Meyer',
      role: 'International Admissions Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge Munich Desk',
    verifiedAt: '2026-08-08',
    lastChecked: '2026-08-15',
    seoTitle: 'Max Planck Summer Research Internship Germany 2027 Fully Funded',
    seoDescription: 'Apply for the Max Planck Institute Summer Research Internship 2027 in Germany. €1,100 monthly stipend, free housing, and flights for international STEM students.'
  },
  {
    id: 'sch-019',
    title: 'MIT Open Learning & Harvard Free Online Verified MicroMasters Courses',
    slug: 'mit-harvard-free-online-micromasters-courses',
    university: 'Massachusetts Institute of Technology & Harvard University',
    organization: 'MIT Open Learning & edX Global Consortium',
    country: 'United States',
    region: 'North America',
    city: 'Cambridge, MA (Online / Distance Learning)',
    degreeLevels: ['Online Course', 'Non-Degree', 'Diploma'],
    fields: ['Computer Science & AI', 'Data Science & Statistics', 'Supply Chain Management', 'Finance & Financial Engineering', 'Public Policy & Economics'],
    category: 'online-courses',
    type: 'University',
    fundingType: 'Tuition Waiver',
    fundingAmount: '100% Free Audit + Up to 90% Financial Assistance for Verified Certificates',
    tuitionCoverage: '100% Free Course Material Access (Audit Track)',
    monthlyStipend: 'Not Applicable (Online Remote Learning)',
    accommodation: 'Not Applicable',
    airfare: 'Not Applicable',
    healthInsurance: 'Not Applicable',
    visaSupport: 'Not Applicable',
    researchSupport: 'Direct pathway to accelerate on-campus Master degrees at MIT and partner universities',
    eligibleCountries: ['All Nationalities Worldwide (Open to anyone with an internet connection)'],
    eligibility: {
      nationalityRequirement: 'Open to learners worldwide with no citizenship constraints',
      academicRequirement: 'High school graduation or equivalent foundational knowledge recommended for advanced tracks',
      minimumGpa: 'No GPA requirement for enrollment',
      ageLimit: 'No age limit',
      workExperience: 'Self-paced professional study'
    },
    languageRequirements: {
      ieltsRequired: false,
      ieltsScore: 'No test required; courses taught in English with multilingual subtitles',
      englishProficiencyCertificateAccepted: true,
      notes: 'English comprehension necessary to follow video lectures and assignments.'
    },
    greRequired: false,
    applicationFee: 'Free',
    deadline: '2026-12-31',
    startDate: '2026-09-01',
    duration: 'Self-paced / 6 to 12 Weeks per course module',
    numberOfAwards: 'Unlimited international enrollment open worldwide',
    studyMode: 'Online',
    description: 'Learn directly from world-class MIT and Harvard professors for free. Access advanced online curricula in Data Science, AI, and Supply Chain with financial aid waivers.',
    fullOverview: 'MIT and Harvard University provide world-class online courses and MicroMasters programs available to anyone, anywhere in the world. Learners can audit courses entirely for free to gain cutting-edge expertise in Computer Science, Machine Learning, Data Science, and Public Policy.\n\nStudents who complete the verified credential tracks can apply their credits towards accelerated on-campus Master\'s degree programs at MIT and over 40 global partner universities.',
    aboutProvider: 'MIT Open Learning and Harvard Online pioneer accessible, high-quality digital education for millions of global learners.',
    whyApply: [
      'Learn from world-leading MIT and Harvard faculty without leaving your home country',
      '100% free access to video lectures, problem sets, and interactive coding labs',
      'Earn official MicroMasters credentials eligible for academic transfer credits',
      'Up to 90% financial aid fee discounts available for verified certificates'
    ],
    benefits: [
      'Free full access to all course lecture videos, readings, and discussion forums',
      'Financial aid available (up to 90% off certificate costs for eligible learners)',
      'Flexible self-paced schedule tailored for working professionals and students',
      'Pathway to fast-track on-campus Master’s programs at MIT and top universities'
    ],
    requirements: [
      'Reliable internet connection and modern web browser',
      'Commitment of approximately 8-12 hours per week per module',
      'Desire to master cutting-edge technologies and theoretical fundamentals'
    ],
    documents: [
      'Online edX / MITx Registration Profile',
      'Financial Assistance Application (if requesting verified certificate fee waiver)'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Create Free Account on MITx / edX',
        description: 'Sign up with your email address and select your desired subject or MicroMasters program.'
      },
      {
        stepNumber: 2,
        title: 'Enroll in Free Audit Track',
        description: 'Choose the "Free Audit" option to immediately begin learning without paying any fees.'
      },
      {
        stepNumber: 3,
        title: 'Apply for Financial Assistance (Optional)',
        description: 'If you desire a verified certificate, submit a 5-minute financial assistance application to receive up to 90% discount.'
      }
    ],
    faq: [
      {
        question: 'Are the course materials truly 100% free to access?',
        answer: 'Yes! The audit track gives you free access to all video lectures, syllabus materials, and ungraded problem sets.'
      },
      {
        question: 'Can these online courses help my scholarship applications?',
        answer: 'Yes! Completing rigorous MIT/Harvard courses demonstrates proven academic dedication and strengthens university admissions profiles.'
      }
    ],
    applicationUrl: 'https://openlearning.mit.edu/courses-programs/micromasters-programs',
    officialWebsite: 'https://openlearning.mit.edu',
    sourceUrl: 'https://openlearning.mit.edu',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['MIT', 'Harvard', 'Online Course', 'Free', 'Data Science', 'AI', 'No IELTS', 'Self-Paced'],
    featured: false,
    popular: true,
    status: 'published',
    views: 33400,
    bookmarksCount: 8800,
    publishedAt: '2026-05-10',
    updatedAt: '2026-08-15',
    author: {
      name: 'James Thornton',
      role: 'Postgraduate Fellow & Editor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    verified: true,
    verifiedBy: 'ScholarBridge EdTech Team',
    verifiedAt: '2026-08-10',
    lastChecked: '2026-08-15',
    seoTitle: 'MIT Harvard Free Online MicroMasters Courses 2026/2027',
    seoDescription: 'Discover free online courses and MicroMasters programs from MIT and Harvard. Free audit track in AI, Data Science, and Supply Chain with financial aid.'
  }
];
