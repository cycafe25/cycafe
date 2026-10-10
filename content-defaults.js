// Shared built-in notices used by both public website and admin.
(function(){
    const JOB_NOTICES = [
        {
            id: 'job-ssc-gd-2026',
            title: 'SSC GD Constable 2026 Recruitment',
            org: 'Staff Selection Commission (SSC)',
            category: 'central',
            badge: 'Applying Now',
            badgeColor: 'emerald',
            vacancies: '39,481 Posts',
            qualification: '10th (Matriculation) Pass',
            ageLimit: '18 - 23 Years (Age relaxation applicable)',
            dates: {
                start: '05 Sep 2026',
                last: '14 Oct 2026',
                exam: 'Jan - Feb 2027'
            },
            fee: 'General/OBC: ₹100 | SC/ST/Female: ₹0',
            desc: 'Constable (GD) in Central Armed Police Forces (BSF, CISF, CRPF, SSB, ITBP, AR, SSF) and Rifleman (GD) in Assam Rifles Examination.',
            officialUrl: 'https://ssc.gov.in',
            isHot: true
        },
        {
            id: 'job-rrb-alp-tech',
            title: 'Railway RRB ALP & Technician Exam Notice',
            org: 'Railway Recruitment Boards (RRB)',
            category: 'railway',
            badge: 'Exam Dates Announced',
            badgeColor: 'blue',
            vacancies: '18,799 Posts',
            qualification: '10th + ITI / Diploma / Engineering',
            ageLimit: '18 - 30 Years',
            dates: {
                start: 'Completed',
                last: 'City Slip Out',
                exam: 'Nov - Dec 2026'
            },
            fee: 'UR/OBC: ₹500 (Refundable on CBT) | SC/ST/Ex-Servicemen: ₹250',
            desc: 'Computer Based Test (CBT-1) schedule released. Examination city intimation slip and mock test links are now live on zonal RRB websites.',
            officialUrl: 'https://indianrailways.gov.in',
            isHot: true
        },
        {
            id: 'job-wbp-constable',
            title: 'WB Police Constable & Lady Constable 2026',
            org: 'West Bengal Police Recruitment Board (WBPRB)',
            category: 'state',
            badge: 'PMT / PET Schedule',
            badgeColor: 'purple',
            vacancies: '11,749 Posts',
            qualification: 'Madhyamik (10th) from WBBSE',
            ageLimit: '18 - 30 Years (SC/ST: 5 Yrs, OBC: 3 Yrs)',
            dates: {
                start: 'Application Done',
                last: 'Admit Card Live',
                exam: 'Physical Test Oct-Nov 2026'
            },
            fee: 'All categories: ₹170 | SC/ST of WB: ₹20',
            desc: 'West Bengal Police Constable recruitment Physical Measurement Test (PMT) and Physical Efficiency Test (PET) admit cards downloadable.',
            officialUrl: 'https://prb.wb.gov.in',
            isHot: true
        },
        {
            id: 'job-india-post-gds',
            title: 'India Post GDS (Gramin Dak Sevak) Merit Phase',
            org: 'Department of Posts, Ministry of Communications',
            category: 'postal',
            badge: 'Merit List Released',
            badgeColor: 'amber',
            vacancies: '44,228 Posts',
            qualification: '10th Pass with Maths, English & Local Language',
            ageLimit: '18 - 40 Years',
            dates: {
                start: 'Phase Active',
                last: 'Document Verification',
                exam: 'No Exam (10th Marks Merit)'
            },
            fee: 'UR/OBC/EWS Male: ₹100 | Female/SC/ST/PwD: ₹0',
            desc: 'Direct recruitment based on 10th standard board marks merit list. Shortlisted candidates must report for document verification at divisional head posts.',
            officialUrl: 'https://indiapostgdsonline.gov.in',
            isHot: false
        },
        {
            id: 'job-sbi-clerk-2026',
            title: 'State Bank of India (SBI) Junior Associates Clerk',
            org: 'State Bank of India (SBI)',
            category: 'banking',
            badge: 'Applying Now',
            badgeColor: 'indigo',
            vacancies: '8,283+ Posts',
            qualification: 'Graduation in any discipline from recognized university',
            ageLimit: '20 - 28 Years',
            dates: {
                start: 'Application Open',
                last: 'Closing Soon',
                exam: 'Prelims Dec 2026'
            },
            fee: 'General/OBC/EWS: ₹750 | SC/ST/PwD: ₹0',
            desc: 'Recruitment of Junior Associates (Customer Support & Sales) in clerical cadre in State Bank of India branches across India.',
            officialUrl: 'https://sbi.co.in/careers',
            isHot: true
        },
        {
            id: 'job-army-agniveer',
            title: 'Indian Army Agniveer Rally Recruitment 2026',
            org: 'Headquarters Recruiting Zone, Indian Army',
            category: 'defence',
            badge: 'Rally Registration',
            badgeColor: 'rose',
            vacancies: 'Open All India Rallies',
            qualification: '8th / 10th / 12th Pass (As per Trade)',
            ageLimit: '17.5 - 21 Years',
            dates: {
                start: 'Open Cycle',
                last: 'Zonal Deadlines',
                exam: 'CEE + Physical Rally'
            },
            fee: 'Exam Fee: ₹250 + GST',
            desc: 'Recruitment for Agniveer (General Duty, Technical, Clerk/Store Keeper, Tradesmen 10th & 8th). Online registration on Join Indian Army portal.',
            officialUrl: 'https://joinindianarmy.nic.in',
            isHot: false
        },
        {
            id: 'job-ssc-chsl',
            title: 'SSC Combined Higher Secondary Level (CHSL 10+2)',
            org: 'Staff Selection Commission (SSC)',
            category: 'central',
            badge: 'Tier-2 Notice',
            badgeColor: 'teal',
            vacancies: '3,712+ Posts',
            qualification: '12th (Higher Secondary) Pass',
            ageLimit: '18 - 27 Years',
            dates: {
                start: 'Tier-1 Completed',
                last: 'Tier-2 Exam Nov 2026',
                exam: 'Descriptive & Typing Test'
            },
            fee: '₹100 (Women & SC/ST exempt)',
            desc: 'Recruitment for Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operator (DEO) in Central Ministries.',
            officialUrl: 'https://ssc.gov.in',
            isHot: false
        },
        {
            id: 'job-wbpsc-misc',
            title: 'WBPSC Miscellaneous Services Recruitment Exam',
            org: 'Public Service Commission, West Bengal',
            category: 'state',
            badge: 'Exam Schedule',
            badgeColor: 'violet',
            vacancies: 'Various Officer Posts',
            qualification: 'Bachelor\'s Degree in any discipline',
            ageLimit: '20 - 39 Years',
            dates: {
                start: 'Admit Card Live',
                last: 'Examination Date',
                exam: 'Prelims Coming Soon'
            },
            fee: '₹160 + Service Charge (SC/ST of WB Exempt)',
            desc: 'West Bengal state government recruitment for Assistant Agricultural Marketing Officer, Revenue Inspector, Block Youth Officer, Consumer Welfare Officers.',
            officialUrl: 'https://psc.wb.gov.in',
            isHot: false
        }
    ];

    // 2. Data Store: Government Welfare Schemes & Daily News Updates
    const SCHEME_UPDATES = [
        {
            id: 'scheme-pm-kisan-18th',
            title: 'PM Kisan Samman Nidhi - 18th Installment & e-KYC',
            authority: 'Ministry of Agriculture & Farmers Welfare, Govt of India',
            category: 'farmer',
            badge: 'e-KYC Mandatory',
            badgeColor: 'amber',
            benefit: '₹2,000 Direct Bank Transfer (₹6,000 / Year)',
            targetAudience: 'Small and Marginal Landholding Farmer Families',
            keyUpdate: '18th Installment DBT rollout live. Government mandates completion of Aadhaar-OTP or Biometric e-KYC & NPCI bank account seeding.',
            requiredDocs: 'Aadhaar Card, Land Record (Khatian/RoR), Active Bank Account linked with Aadhaar, Mobile Number.',
            dates: {
                effective: 'Daily Live DBT',
                deadline: 'Immediate for Pending Beneficiaries'
            },
            officialUrl: 'https://pmkisan.gov.in',
            isHot: true
        },
        {
            id: 'scheme-lakshmir-bhandar',
            title: 'Lakshmir Bhandar (लक्ष्मी भंडार) - Monthly DBT Support',
            authority: 'Women & Child Development Dept, Govt of West Bengal',
            category: 'women',
            badge: 'Active Monthly DBT',
            badgeColor: 'purple',
            benefit: '₹1,000/Month (General) | ₹1,200/Month (SC/ST)',
            targetAudience: 'Women of West Bengal aged 25 to 60 years',
            keyUpdate: 'Monthly financial assistance directly credited to single bank accounts. Ensure Aadhaar Seeding (NPCI Mapping) is active at the bank counter.',
            requiredDocs: 'Swasthya Sathi Card, Aadhaar Card, SC/ST Certificate (if applicable), Bank Passbook with IFSC.',
            dates: {
                effective: '1st Week of Every Month',
                deadline: 'Ongoing through Duare Sarkar'
            },
            officialUrl: 'https://wb.gov.in',
            isHot: true
        },
        {
            id: 'scheme-swasthya-sathi',
            title: 'Swasthya Sathi Scheme - Card Renewal & Member Addition',
            authority: 'Department of Health & Family Welfare, West Bengal',
            category: 'health',
            badge: 'Form B & C Open',
            badgeColor: 'emerald',
            benefit: '₹5,00,000 / Year / Family Cashless Hospitalization',
            targetAudience: 'All Permanent Resident Families of West Bengal',
            keyUpdate: 'Form B for new family member addition and Form C for card corrections or splitting now accepted at BDO/Municipality cyber counters.',
            requiredDocs: 'Existing Swasthya Sathi Smart Card, Aadhaar of new members, Ration Card, Marriage Certificate (for new brides).',
            dates: {
                effective: 'Live Portal Acceptance',
                deadline: 'Continuous at CSC / Duare Sarkar'
            },
            officialUrl: 'https://swasthyasathi.gov.in',
            isHot: true
        },
        {
            id: 'scheme-pmay-g',
            title: 'Pradhan Mantri Awas Yojana (PMAY-G / Banglar Awas)',
            authority: 'Ministry of Rural Development / Panchayats Dept WB',
            category: 'housing',
            badge: 'Survey & Geo-Tagging',
            badgeColor: 'blue',
            benefit: '₹1,20,000 Financial Grant for Pucca House Construction',
            targetAudience: 'Homeless & Kutcha House Families in Rural/Gramin areas',
            keyUpdate: 'Awas Plus beneficiary list survey verification and stage-wise geo-tagging photo uploads ongoing. Beneficiaries can check eligibility status.',
            requiredDocs: 'Aadhaar Card, MGNREGA Job Card, Bank Account Details, Land Possession Document, Photo of Existing Kutcha House.',
            dates: {
                effective: 'Survey Phase 2026',
                deadline: 'Notice by Local Gram Panchayat'
            },
            officialUrl: 'https://pmayg.nic.in',
            isHot: false
        },
        {
            id: 'scheme-krishak-bandhu',
            title: 'Krishak Bandhu (কৃষক বন্ধু) Assured Financial & Life Cover',
            authority: 'Department of Agriculture, Govt of West Bengal',
            category: 'farmer',
            badge: 'Kharif DBT Status Live',
            badgeColor: 'teal',
            benefit: '₹10,000/Year (Min ₹4,000) + ₹2,00,000 Death Compensation',
            targetAudience: 'Farmers and Recorded Bhagchasis (Sharecroppers)',
            keyUpdate: 'Kharif crop season financial grant status and Krishak Bandhu ID verification live. Claim portal active for accidental death cover (18-60 yrs).',
            requiredDocs: 'Voter ID (EPIC), Aadhaar Card, Recent RoR (Porcha/Parcha), Bank Passbook copy, Mobile Number.',
            dates: {
                effective: 'Kharif & Rabi Cycles',
                deadline: 'Year-Round Registration'
            },
            officialUrl: 'https://krishakbandhu.wb.gov.in',
            isHot: false
        },
        {
            id: 'scheme-svmcm-scholarship',
            title: 'Swami Vivekananda Merit-cum-Means Scholarship (SVMCM)',
            authority: 'Higher Education Department, Govt of West Bengal',
            category: 'scholarship',
            badge: 'Fresh & Renewal Open',
            badgeColor: 'indigo',
            benefit: '₹12,000 to ₹60,000 / Year (₹1,000 - ₹5,000 / Month)',
            targetAudience: 'Class 11, 12, ITI, Polytechnic, UG, PG & Medical Students',
            keyUpdate: 'Academic Year 2026 online application and renewal window open. Requires minimum 60% aggregate marks in previous board examination.',
            requiredDocs: 'Previous Marksheet, Family Income Certificate (Below ₹2.5 Lakh/yr), Admission Receipt, Bank Passbook, Aadhaar.',
            dates: {
                effective: 'Application Window Open',
                deadline: 'Closing Soon as per Institute Verification'
            },
            officialUrl: 'https://svmcm.wbhed.gov.in',
            isHot: true
        },
        {
            id: 'scheme-pm-surya-ghar',
            title: 'PM Surya Ghar: Muft Bijli Yojana (Rooftop Solar)',
            authority: 'Ministry of New and Renewable Energy (MNRE), Govt of India',
            category: 'solar',
            badge: 'Subsidy up to ₹78,000',
            badgeColor: 'amber',
            benefit: 'Direct Central Subsidy ₹30,000 to ₹78,000 + 300 Units Free Power',
            targetAudience: 'Residential Households with Grid-Connected Power',
            keyUpdate: 'Consumers can apply for rooftop solar installation via CSC portal. National subsidy credited directly to consumer bank account within 30 days.',
            requiredDocs: 'Latest Electricity Bill, Consumer ID, Aadhaar Card, Bank Cancelled Cheque / Passbook, Roof Photograph.',
            dates: {
                effective: 'National Portal Open',
                deadline: 'First Come, First Served Subsidy Allocation'
            },
            officialUrl: 'https://pmsuryaghar.gov.in',
            isHot: false
        },
        {
            id: 'scheme-ration-card-ekyc',
            title: 'Digital Ration Card Biometric e-KYC & Aadhaar Linking',
            authority: 'Food & Supplies Department, West Bengal / NFSA',
            category: 'health',
            badge: 'Mandatory e-KYC',
            badgeColor: 'rose',
            benefit: 'Uninterrupted Free Monthly Food Grains & One Nation One Ration',
            targetAudience: 'All AAY, SPHH, PHH, RKSY-I, and RKSY-II Ration Card Holders',
            keyUpdate: 'Biometric fingerprint or Aadhaar-OTP e-KYC is strictly mandatory for all family members. Unlinked cards risk temporary suspension.',
            requiredDocs: 'Active Digital Ration Card, Aadhaar Card of every family member, Aadhaar-linked Mobile Phone.',
            dates: {
                effective: 'Mandatory Active Camp',
                deadline: 'Complete Promptly at Cycafe'
            },
            officialUrl: 'https://food.wb.gov.in',
            isHot: true
        },
        {
            id: 'scheme-yuvasree',
            title: 'Yuvasree Scheme (যুবশ্রী) - Unemployment Financial Assistance',
            authority: 'Labour Department, Govt of West Bengal (Employment Bank)',
            category: 'scholarship',
            badge: 'Annexure-III Live',
            badgeColor: 'slate',
            benefit: '₹1,500 / Month Financial Assistance for Enrolled Jobseekers',
            targetAudience: 'Registered Jobseekers on West Bengal Employment Bank (18-45 Yrs)',
            keyUpdate: 'Candidates enrolled in the beneficiary waiting list must submit Annexure-III self-declaration online to continue monthly stipend.',
            requiredDocs: 'Employment Bank Enrolment Slip (EB-No), Madhyamik Admit Card, Bank Account Details, Highest Qualification Certificate.',
            dates: {
                effective: 'Quarterly Cycle',
                deadline: 'As per Employment Bank Gazette'
            },
            officialUrl: 'https://employmentbankwb.gov.in',
            isHot: false
        }
    ];


window.CYCAFE_BASE_NOTICES = [...JOB_NOTICES.map(n=>({...n,type:'notice'})),...SCHEME_UPDATES.map(n=>({...n,type:'scheme'}))];
})();
window.CYCAFE_INLINE_SERVICES = [
  {
    "id": "base-inline-0",
    "name": "PAN Card",
    "desc": "New PAN application, photo correction, name update, and e-PAN printout.",
    "category": "identity govt",
    "url": "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
    "icon": "fa-solid fa-address-card",
    "badge": "Service",
    "defaultFee": 200
  },
  {
    "id": "base-inline-1",
    "name": "Voter ID / EPIC Service",
    "desc": "New voter registration (Form 6), correction & shifting (Form 8), e-EPIC card download, and tracking via official ECI portal.",
    "category": "identity govt",
    "url": "https://voters.eci.gov.in/",
    "icon": "fa-solid fa-check-to-slot",
    "badge": "Service",
    "defaultFee": 50
  },
  {
    "id": "base-inline-2",
    "name": "PM Kisan Samman Nidhi",
    "desc": "New farmer registration, OTP/biometric e-KYC, check beneficiary & installment status, and land seeding details.",
    "category": "agriculture govt",
    "url": "https://pmkisan.gov.in/",
    "icon": "fa-solid fa-seedling",
    "badge": "Service",
    "defaultFee": 50
  },
  {
    "id": "base-inline-3",
    "name": "ABHA Health Card",
    "desc": "Instant 14-digit ABHA ID registration via Aadhaar OTP, link digital medical records, and color card printout.",
    "category": "health govt",
    "url": "https://abha.abdm.gov.in/abha/v3/register",
    "icon": "fa-solid fa-heart-pulse",
    "badge": "Service",
    "defaultFee": 30
  },
  {
    "id": "base-inline-4",
    "name": "PMJAY Ayushman Card",
    "desc": "Check beneficiary eligibility, submit e-KYC for Ayushman Golden Card (₹5 Lakh free medical cover), and download card.",
    "category": "health govt",
    "url": "https://beneficiary.nha.gov.in/",
    "icon": "fa-solid fa-hospital-user",
    "badge": "Service",
    "defaultFee": 50
  },
  {
    "id": "base-inline-5",
    "name": "Photo Editing & Studio",
    "desc": "Instant passport size photo set (8/16/32 copies), background change, photo cleaning.",
    "category": "print",
    "url": "#/photo-studio",
    "icon": "fa-solid fa-image",
    "badge": "Service",
    "defaultFee": 50
  }
];

