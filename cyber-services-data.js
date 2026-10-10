// Comprehensive Indian Government & Cyber Cafe Digital Services Catalog
(function() {
    const GOVT_SERVICES_CATALOG = [
  {
    "name": "National Portal of India",
    "url": "https://www.india.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for National Portal of India services and citizen applications.",
    "keywords": "national portal of india govt official digital portal for national portal of india services and citizen applications."
  },
  {
    "name": "Integrated Government Online Directory",
    "url": "https://igod.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Integrated Government Online Directory services and citizen applications.",
    "keywords": "integrated government online directory govt official digital portal for integrated government online directory services and citizen applications."
  },
  {
    "name": "Government Services Portal",
    "url": "https://services.india.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Government Services Portal services and citizen applications.",
    "keywords": "government services portal govt official digital portal for government services portal services and citizen applications."
  },
  {
    "name": "President of India",
    "url": "https://presidentofindia.nic.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for President of India services and citizen applications.",
    "keywords": "president of india govt official digital portal for president of india services and citizen applications."
  },
  {
    "name": "Vice President of India",
    "url": "https://vicepresidentofindia.nic.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Vice President of India services and citizen applications.",
    "keywords": "vice president of india govt official digital portal for vice president of india services and citizen applications."
  },
  {
    "name": "Prime Minister's Office",
    "url": "https://www.pmindia.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Prime Minister's Office services and citizen applications.",
    "keywords": "prime minister's office govt official digital portal for prime minister's office services and citizen applications."
  },
  {
    "name": "MyGov India",
    "url": "https://www.mygov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for MyGov India services and citizen applications.",
    "keywords": "mygov india govt official digital portal for mygov india services and citizen applications."
  },
  {
    "name": "Digital India",
    "url": "https://www.digitalindia.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Digital India services and citizen applications.",
    "keywords": "digital india govt official digital portal for digital india services and citizen applications."
  },
  {
    "name": "National Informatics Centre",
    "url": "https://www.nic.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for National Informatics Centre services and citizen applications.",
    "keywords": "national informatics centre govt official digital portal for national informatics centre services and citizen applications."
  },
  {
    "name": "India Code",
    "url": "https://www.indiacode.nic.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for India Code services and citizen applications.",
    "keywords": "india code govt official digital portal for india code services and citizen applications."
  },
  {
    "name": "Parliament of India",
    "url": "https://sansad.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Parliament of India services and citizen applications.",
    "keywords": "parliament of india govt official digital portal for parliament of india services and citizen applications."
  },
  {
    "name": "Lok Sabha",
    "url": "https://sansad.in/ls",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Lok Sabha services and citizen applications.",
    "keywords": "lok sabha govt official digital portal for lok sabha services and citizen applications."
  },
  {
    "name": "Rajya Sabha",
    "url": "https://sansad.in/rs",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Rajya Sabha services and citizen applications.",
    "keywords": "rajya sabha govt official digital portal for rajya sabha services and citizen applications."
  },
  {
    "name": "Supreme Court of India",
    "url": "https://www.sci.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "supreme court of india legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "e-Courts",
    "url": "https://ecourts.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "e-courts legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "National Judicial Data Grid",
    "url": "https://njdg.ecourts.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-gavel",
    "color": "red",
    "desc": "Court case status by CNR number, cause lists, daily orders, and certified judgements.",
    "keywords": "national judicial data grid legal court case status by cnr number, cause lists, daily orders, and certified judgements."
  },
  {
    "name": "National Legal Services Authority",
    "url": "https://nalsa.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "national legal services authority legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "Law Commission of India",
    "url": "https://lawcommissionofindia.nic.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "law commission of india legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "Legislative Department",
    "url": "https://legislative.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Legislative Department services and citizen applications.",
    "keywords": "legislative department govt official digital portal for legislative department services and citizen applications."
  },
  {
    "name": "Department of Legal Affairs",
    "url": "https://legalaffairs.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "department of legal affairs legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "Election Commission of India",
    "url": "https://www.eci.gov.in/",
    "category": "identity",
    "badge": "Identity & Docs",
    "icon": "fa-solid fa-check-to-slot",
    "color": "blue",
    "desc": "Voter registration, EPIC card download, constituency search, and electoral verification.",
    "keywords": "election commission of india identity voter registration, epic card download, constituency search, and electoral verification."
  },
  {
    "name": "Chief Electoral Officer – West Bengal",
    "url": "https://ceowestbengal.nic.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Chief Electoral Officer – West Bengal services and citizen applications.",
    "keywords": "chief electoral officer – west bengal govt official digital portal for chief electoral officer – west bengal services and citizen applications."
  },
  {
    "name": "Central Information Commission",
    "url": "https://cic.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Central Information Commission services and citizen applications.",
    "keywords": "central information commission govt official digital portal for central information commission services and citizen applications."
  },
  {
    "name": "RTI Online",
    "url": "https://rtionline.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-file-lines",
    "color": "red",
    "desc": "File Right to Information (RTI) online applications, track reply status, and submit appeals.",
    "keywords": "rti online legal file right to information (rti) online applications, track reply status, and submit appeals."
  },
  {
    "name": "Central Vigilance Commission",
    "url": "https://www.cvc.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "central vigilance commission legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "Lokpal of India",
    "url": "https://lokpal.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "lokpal of india legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "CPGRAMS – Public Grievance",
    "url": "https://pgportal.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-bullhorn",
    "color": "red",
    "desc": "Lodge public grievances against central/state departments and track resolution progress.",
    "keywords": "cpgrams – public grievance legal lodge public grievances against central/state departments and track resolution progress."
  },
  {
    "name": "National Human Rights Commission",
    "url": "https://nhrc.nic.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "national human rights commission legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "UIDAI / Aadhaar",
    "url": "https://uidai.gov.in/",
    "category": "identity",
    "badge": "Identity & Docs",
    "icon": "fa-solid fa-id-card",
    "color": "blue",
    "desc": "Aadhaar update, address correction, PVC card order, and biometric lock/unlock.",
    "keywords": "uidai / aadhaar identity aadhaar update, address correction, pvc card order, and biometric lock/unlock."
  },
  {
    "name": "MyAadhaar",
    "url": "https://myaadhaar.uidai.gov.in/",
    "category": "identity",
    "badge": "Identity & Docs",
    "icon": "fa-solid fa-id-card",
    "color": "blue",
    "desc": "Aadhaar update, address correction, PVC card order, and biometric lock/unlock.",
    "keywords": "myaadhaar identity aadhaar update, address correction, pvc card order, and biometric lock/unlock."
  },
  {
    "name": "DigiLocker",
    "url": "https://www.digilocker.gov.in/",
    "category": "identity",
    "badge": "Identity & Docs",
    "icon": "fa-solid fa-folder-open",
    "color": "blue",
    "desc": "Access digital verified documents, certificates, and unified citizen e-services.",
    "keywords": "digilocker identity access digital verified documents, certificates, and unified citizen e-services."
  },
  {
    "name": "UMANG",
    "url": "https://www.umang.gov.in/",
    "category": "identity",
    "badge": "Identity & Docs",
    "icon": "fa-solid fa-folder-open",
    "color": "blue",
    "desc": "Access digital verified documents, certificates, and unified citizen e-services.",
    "keywords": "umang identity access digital verified documents, certificates, and unified citizen e-services."
  },
  {
    "name": "Income Tax Department",
    "url": "https://www.incometax.gov.in/",
    "category": "business",
    "badge": "Tax & Business",
    "icon": "fa-solid fa-file-invoice-dollar",
    "color": "violet",
    "desc": "ITR filing, PAN-Aadhaar linking, refund tracking, and AIS/TIS inspection.",
    "keywords": "income tax department business itr filing, pan-aadhaar linking, refund tracking, and ais/tis inspection."
  },
  {
    "name": "Protean / NSDL",
    "url": "https://www.protean-tinpan.com/",
    "category": "identity",
    "badge": "Identity & Docs",
    "icon": "fa-solid fa-address-card",
    "color": "blue",
    "desc": "New PAN card application, e-PAN download, correction, and TIN facilitation.",
    "keywords": "protean / nsdl identity new pan card application, e-pan download, correction, and tin facilitation."
  },
  {
    "name": "Census of India",
    "url": "https://censusindia.gov.in/",
    "category": "identity",
    "badge": "Identity & Docs",
    "icon": "fa-solid fa-landmark",
    "color": "blue",
    "desc": "Official digital portal for Census of India services and citizen applications.",
    "keywords": "census of india identity official digital portal for census of india services and citizen applications."
  },
  {
    "name": "Digital India Corporation",
    "url": "https://dic.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Digital India Corporation services and citizen applications.",
    "keywords": "digital india corporation govt official digital portal for digital india corporation services and citizen applications."
  },
  {
    "name": "CSC e-Governance",
    "url": "https://www.csc.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for CSC e-Governance services and citizen applications.",
    "keywords": "csc e-governance govt official digital portal for csc e-governance services and citizen applications."
  },
  {
    "name": "Ministry of Finance",
    "url": "https://www.finmin.gov.in/",
    "category": "business",
    "badge": "Tax & Business",
    "icon": "fa-solid fa-briefcase",
    "color": "violet",
    "desc": "Official enterprise portal for Ministry of Finance business compliance and services.",
    "keywords": "ministry of finance business official enterprise portal for ministry of finance business compliance and services."
  },
  {
    "name": "Department of Revenue",
    "url": "https://dor.gov.in/",
    "category": "business",
    "badge": "Tax & Business",
    "icon": "fa-solid fa-briefcase",
    "color": "violet",
    "desc": "Official enterprise portal for Department of Revenue business compliance and services.",
    "keywords": "department of revenue business official enterprise portal for department of revenue business compliance and services."
  },
  {
    "name": "GST Portal",
    "url": "https://www.gst.gov.in/",
    "category": "business",
    "badge": "Tax & Business",
    "icon": "fa-solid fa-receipt",
    "color": "violet",
    "desc": "GST registration, monthly/quarterly return filing, challan payment, and refund status.",
    "keywords": "gst portal business gst registration, monthly/quarterly return filing, challan payment, and refund status."
  },
  {
    "name": "Central Board of Direct Taxes",
    "url": "https://www.incometaxindia.gov.in/",
    "category": "business",
    "badge": "Tax & Business",
    "icon": "fa-solid fa-file-invoice-dollar",
    "color": "violet",
    "desc": "ITR filing, PAN-Aadhaar linking, refund tracking, and AIS/TIS inspection.",
    "keywords": "central board of direct taxes business itr filing, pan-aadhaar linking, refund tracking, and ais/tis inspection."
  },
  {
    "name": "CBIC",
    "url": "https://www.cbic.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "cbic legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "ICEGATE / Customs",
    "url": "https://www.icegate.gov.in/",
    "category": "business",
    "badge": "Tax & Business",
    "icon": "fa-solid fa-briefcase",
    "color": "violet",
    "desc": "Official enterprise portal for ICEGATE / Customs business compliance and services.",
    "keywords": "icegate / customs business official enterprise portal for icegate / customs business compliance and services."
  },
  {
    "name": "Reserve Bank of India",
    "url": "https://www.rbi.org.in/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for Reserve Bank of India.",
    "keywords": "reserve bank of india banking online net banking, account services, pension tracking, and financial schemes for reserve bank of india."
  },
  {
    "name": "SEBI",
    "url": "https://www.sebi.gov.in/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for SEBI.",
    "keywords": "sebi banking online net banking, account services, pension tracking, and financial schemes for sebi."
  },
  {
    "name": "IRDAI",
    "url": "https://irdai.gov.in/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for IRDAI.",
    "keywords": "irdai banking online net banking, account services, pension tracking, and financial schemes for irdai."
  },
  {
    "name": "PFRDA",
    "url": "https://www.pfrda.org.in/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for PFRDA.",
    "keywords": "pfrda banking online net banking, account services, pension tracking, and financial schemes for pfrda."
  },
  {
    "name": "Pensioners' Portal",
    "url": "https://pensionersportal.gov.in/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for Pensioners' Portal.",
    "keywords": "pensioners' portal banking online net banking, account services, pension tracking, and financial schemes for pensioners' portal."
  },
  {
    "name": "Controller General of Accounts",
    "url": "https://cga.nic.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Controller General of Accounts services and citizen applications.",
    "keywords": "controller general of accounts govt official digital portal for controller general of accounts services and citizen applications."
  },
  {
    "name": "Government e-Marketplace",
    "url": "https://gem.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Government e-Marketplace services and citizen applications.",
    "keywords": "government e-marketplace govt official digital portal for government e-marketplace services and citizen applications."
  },
  {
    "name": "Central Public Procurement Portal",
    "url": "https://eprocure.gov.in/",
    "category": "business",
    "badge": "Tax & Business",
    "icon": "fa-solid fa-briefcase",
    "color": "violet",
    "desc": "Official enterprise portal for Central Public Procurement Portal business compliance and services.",
    "keywords": "central public procurement portal business official enterprise portal for central public procurement portal business compliance and services."
  },
  {
    "name": "Ministry of Corporate Affairs",
    "url": "https://www.mca.gov.in/",
    "category": "business",
    "badge": "Tax & Business",
    "icon": "fa-solid fa-briefcase",
    "color": "violet",
    "desc": "Official enterprise portal for Ministry of Corporate Affairs business compliance and services.",
    "keywords": "ministry of corporate affairs business official enterprise portal for ministry of corporate affairs business compliance and services."
  },
  {
    "name": "Udyam Registration",
    "url": "https://udyamregistration.gov.in/",
    "category": "business",
    "badge": "Tax & Business",
    "icon": "fa-solid fa-industry",
    "color": "violet",
    "desc": "Zero-fee MSME / Udyam certificate registration, update details, and certificate print.",
    "keywords": "udyam registration business zero-fee msme / udyam certificate registration, update details, and certificate print."
  },
  {
    "name": "Startup India",
    "url": "https://www.startupindia.gov.in/",
    "category": "business",
    "badge": "Tax & Business",
    "icon": "fa-solid fa-briefcase",
    "color": "violet",
    "desc": "Official enterprise portal for Startup India business compliance and services.",
    "keywords": "startup india business official enterprise portal for startup india business compliance and services."
  },
  {
    "name": "Invest India",
    "url": "https://www.investindia.gov.in/",
    "category": "business",
    "badge": "Tax & Business",
    "icon": "fa-solid fa-briefcase",
    "color": "violet",
    "desc": "Official enterprise portal for Invest India business compliance and services.",
    "keywords": "invest india business official enterprise portal for invest india business compliance and services."
  },
  {
    "name": "DPIIT",
    "url": "https://dpiit.gov.in/",
    "category": "business",
    "badge": "Tax & Business",
    "icon": "fa-solid fa-briefcase",
    "color": "violet",
    "desc": "Official enterprise portal for DPIIT business compliance and services.",
    "keywords": "dpiit business official enterprise portal for dpiit business compliance and services."
  },
  {
    "name": "Ministry of MSME",
    "url": "https://msme.gov.in/",
    "category": "business",
    "badge": "Tax & Business",
    "icon": "fa-solid fa-industry",
    "color": "violet",
    "desc": "Zero-fee MSME / Udyam certificate registration, update details, and certificate print.",
    "keywords": "ministry of msme business zero-fee msme / udyam certificate registration, update details, and certificate print."
  },
  {
    "name": "NSIC",
    "url": "https://www.nsic.co.in/",
    "category": "business",
    "badge": "Tax & Business",
    "icon": "fa-solid fa-briefcase",
    "color": "violet",
    "desc": "Official enterprise portal for NSIC business compliance and services.",
    "keywords": "nsic business official enterprise portal for nsic business compliance and services."
  },
  {
    "name": "KVIC",
    "url": "https://www.kvic.gov.in/",
    "category": "business",
    "badge": "Tax & Business",
    "icon": "fa-solid fa-briefcase",
    "color": "violet",
    "desc": "Official enterprise portal for KVIC business compliance and services.",
    "keywords": "kvic business official enterprise portal for kvic business compliance and services."
  },
  {
    "name": "SIDBI",
    "url": "https://www.sidbi.in/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for SIDBI.",
    "keywords": "sidbi banking online net banking, account services, pension tracking, and financial schemes for sidbi."
  },
  {
    "name": "MUDRA",
    "url": "https://www.mudra.org.in/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for MUDRA.",
    "keywords": "mudra banking online net banking, account services, pension tracking, and financial schemes for mudra."
  },
  {
    "name": "National Single Window System",
    "url": "https://www.nsws.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for National Single Window System services and citizen applications.",
    "keywords": "national single window system govt official digital portal for national single window system services and citizen applications."
  },
  {
    "name": "National Industrial Corridor",
    "url": "https://www.nicdc.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for National Industrial Corridor services and citizen applications.",
    "keywords": "national industrial corridor govt official digital portal for national industrial corridor services and citizen applications."
  },
  {
    "name": "Make in India",
    "url": "https://www.makeinindia.com/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Make in India services and citizen applications.",
    "keywords": "make in india govt official digital portal for make in india services and citizen applications."
  },
  {
    "name": "Ministry of Education",
    "url": "https://www.education.gov.in/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-graduation-cap",
    "color": "sky",
    "desc": "Academic portal for students, learners, and educators under Ministry of Education.",
    "keywords": "ministry of education education academic portal for students, learners, and educators under ministry of education."
  },
  {
    "name": "Department of School Education",
    "url": "https://dsel.education.gov.in/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-graduation-cap",
    "color": "sky",
    "desc": "Academic portal for students, learners, and educators under Department of School Education.",
    "keywords": "department of school education education academic portal for students, learners, and educators under department of school education."
  },
  {
    "name": "NCERT",
    "url": "https://ncert.nic.in/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-graduation-cap",
    "color": "sky",
    "desc": "Academic portal for students, learners, and educators under NCERT.",
    "keywords": "ncert education academic portal for students, learners, and educators under ncert."
  },
  {
    "name": "UGC",
    "url": "https://www.ugc.gov.in/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-graduation-cap",
    "color": "sky",
    "desc": "Academic portal for students, learners, and educators under UGC.",
    "keywords": "ugc education academic portal for students, learners, and educators under ugc."
  },
  {
    "name": "AICTE",
    "url": "https://www.aicte-india.org/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-graduation-cap",
    "color": "sky",
    "desc": "Academic portal for students, learners, and educators under AICTE.",
    "keywords": "aicte education academic portal for students, learners, and educators under aicte."
  },
  {
    "name": "National Testing Agency",
    "url": "https://www.nta.ac.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for National Testing Agency services and citizen applications.",
    "keywords": "national testing agency govt official digital portal for national testing agency services and citizen applications."
  },
  {
    "name": "National Scholarship Portal",
    "url": "https://scholarships.gov.in/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-award",
    "color": "sky",
    "desc": "National & state scholarship schemes, online form fill-up, renewal, and DBT tracking.",
    "keywords": "national scholarship portal education national & state scholarship schemes, online form fill-up, renewal, and dbt tracking."
  },
  {
    "name": "SWAYAM",
    "url": "https://swayam.gov.in/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-graduation-cap",
    "color": "sky",
    "desc": "Academic portal for students, learners, and educators under SWAYAM.",
    "keywords": "swayam education academic portal for students, learners, and educators under swayam."
  },
  {
    "name": "DIKSHA",
    "url": "https://diksha.gov.in/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-graduation-cap",
    "color": "sky",
    "desc": "Academic portal for students, learners, and educators under DIKSHA.",
    "keywords": "diksha education academic portal for students, learners, and educators under diksha."
  },
  {
    "name": "National Digital Library",
    "url": "https://ndl.iitkgp.ac.in/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-graduation-cap",
    "color": "sky",
    "desc": "Academic portal for students, learners, and educators under National Digital Library.",
    "keywords": "national digital library education academic portal for students, learners, and educators under national digital library."
  },
  {
    "name": "CBSE",
    "url": "https://www.cbse.gov.in/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-book-open",
    "color": "sky",
    "desc": "Board exam registration, result verification, duplicate marksheet, and migration certificates.",
    "keywords": "cbse education board exam registration, result verification, duplicate marksheet, and migration certificates."
  },
  {
    "name": "CISCE",
    "url": "https://www.cisce.org/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-book-open",
    "color": "sky",
    "desc": "Board exam registration, result verification, duplicate marksheet, and migration certificates.",
    "keywords": "cisce education board exam registration, result verification, duplicate marksheet, and migration certificates."
  },
  {
    "name": "National Academic Depository",
    "url": "https://nad.gov.in/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-graduation-cap",
    "color": "sky",
    "desc": "Academic portal for students, learners, and educators under National Academic Depository.",
    "keywords": "national academic depository education academic portal for students, learners, and educators under national academic depository."
  },
  {
    "name": "Academic Bank of Credits",
    "url": "https://www.abc.gov.in/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for Academic Bank of Credits.",
    "keywords": "academic bank of credits banking online net banking, account services, pension tracking, and financial schemes for academic bank of credits."
  },
  {
    "name": "NTA Exams",
    "url": "https://exams.nta.ac.in/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-file-signature",
    "color": "sky",
    "desc": "National competitive entrance exams, admit card download, answer keys, and scorecards.",
    "keywords": "nta exams education national competitive entrance exams, admit card download, answer keys, and scorecards."
  },
  {
    "name": "National Board of Examinations",
    "url": "https://natboard.edu.in/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-file-signature",
    "color": "sky",
    "desc": "National competitive entrance exams, admit card download, answer keys, and scorecards.",
    "keywords": "national board of examinations education national competitive entrance exams, admit card download, answer keys, and scorecards."
  },
  {
    "name": "NCTE",
    "url": "https://ncte.gov.in/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-graduation-cap",
    "color": "sky",
    "desc": "Academic portal for students, learners, and educators under NCTE.",
    "keywords": "ncte education academic portal for students, learners, and educators under ncte."
  },
  {
    "name": "NIOS",
    "url": "https://nios.ac.in/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-book-open",
    "color": "sky",
    "desc": "Board exam registration, result verification, duplicate marksheet, and migration certificates.",
    "keywords": "nios education board exam registration, result verification, duplicate marksheet, and migration certificates."
  },
  {
    "name": "IGNOU",
    "url": "https://www.ignou.ac.in/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-graduation-cap",
    "color": "sky",
    "desc": "Academic portal for students, learners, and educators under IGNOU.",
    "keywords": "ignou education academic portal for students, learners, and educators under ignou."
  },
  {
    "name": "UPSC",
    "url": "https://upsc.gov.in/",
    "category": "jobs",
    "badge": "Jobs & Careers",
    "icon": "fa-solid fa-clipboard-check",
    "color": "amber",
    "desc": "Govt recruitment notices, online application forms, admit cards, and examination results.",
    "keywords": "upsc jobs govt recruitment notices, online application forms, admit cards, and examination results."
  },
  {
    "name": "SSC",
    "url": "https://ssc.gov.in/",
    "category": "jobs",
    "badge": "Jobs & Careers",
    "icon": "fa-solid fa-clipboard-check",
    "color": "amber",
    "desc": "Govt recruitment notices, online application forms, admit cards, and examination results.",
    "keywords": "ssc jobs govt recruitment notices, online application forms, admit cards, and examination results."
  },
  {
    "name": "Railway Recruitment Boards",
    "url": "https://www.rrbcdg.gov.in/",
    "category": "jobs",
    "badge": "Jobs & Careers",
    "icon": "fa-solid fa-user-tie",
    "color": "amber",
    "desc": "National recruitment and career facilitation portal for Railway Recruitment Boards.",
    "keywords": "railway recruitment boards jobs national recruitment and career facilitation portal for railway recruitment boards."
  },
  {
    "name": "Indian Railways",
    "url": "https://indianrailways.gov.in/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-train",
    "color": "cyan",
    "desc": "Indian Railways train ticket booking, Tatkal reservations, PNR status, and cancellation.",
    "keywords": "indian railways transport indian railways train ticket booking, tatkal reservations, pnr status, and cancellation."
  },
  {
    "name": "National Career Service",
    "url": "https://www.ncs.gov.in/",
    "category": "jobs",
    "badge": "Jobs & Careers",
    "icon": "fa-solid fa-user-tie",
    "color": "amber",
    "desc": "National recruitment and career facilitation portal for National Career Service.",
    "keywords": "national career service jobs national recruitment and career facilitation portal for national career service."
  },
  {
    "name": "Employment News",
    "url": "https://employmentnews.gov.in/",
    "category": "jobs",
    "badge": "Jobs & Careers",
    "icon": "fa-solid fa-user-tie",
    "color": "amber",
    "desc": "National recruitment and career facilitation portal for Employment News.",
    "keywords": "employment news jobs national recruitment and career facilitation portal for employment news."
  },
  {
    "name": "IBPS",
    "url": "https://www.ibps.in/",
    "category": "jobs",
    "badge": "Jobs & Careers",
    "icon": "fa-solid fa-clipboard-check",
    "color": "amber",
    "desc": "Govt recruitment notices, online application forms, admit cards, and examination results.",
    "keywords": "ibps jobs govt recruitment notices, online application forms, admit cards, and examination results."
  },
  {
    "name": "Public Enterprises Selection Board",
    "url": "https://pesb.gov.in/",
    "category": "identity",
    "badge": "Identity & Docs",
    "icon": "fa-solid fa-check-to-slot",
    "color": "blue",
    "desc": "Voter registration, EPIC card download, constituency search, and electoral verification.",
    "keywords": "public enterprises selection board identity voter registration, epic card download, constituency search, and electoral verification."
  },
  {
    "name": "Ministry of Skill Development",
    "url": "https://www.msde.gov.in/",
    "category": "jobs",
    "badge": "Jobs & Careers",
    "icon": "fa-solid fa-screwdriver-wrench",
    "color": "amber",
    "desc": "Govt apprentice contracts, certified skill training programs, and stipend portal.",
    "keywords": "ministry of skill development jobs govt apprentice contracts, certified skill training programs, and stipend portal."
  },
  {
    "name": "Skill India",
    "url": "https://www.skillindia.gov.in/",
    "category": "jobs",
    "badge": "Jobs & Careers",
    "icon": "fa-solid fa-screwdriver-wrench",
    "color": "amber",
    "desc": "Govt apprentice contracts, certified skill training programs, and stipend portal.",
    "keywords": "skill india jobs govt apprentice contracts, certified skill training programs, and stipend portal."
  },
  {
    "name": "NSDC",
    "url": "https://www.nsdcindia.org/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for NSDC services and citizen applications.",
    "keywords": "nsdc govt official digital portal for nsdc services and citizen applications."
  },
  {
    "name": "Apprenticeship India",
    "url": "https://www.apprenticeshipindia.gov.in/",
    "category": "jobs",
    "badge": "Jobs & Careers",
    "icon": "fa-solid fa-screwdriver-wrench",
    "color": "amber",
    "desc": "Govt apprentice contracts, certified skill training programs, and stipend portal.",
    "keywords": "apprenticeship india jobs govt apprentice contracts, certified skill training programs, and stipend portal."
  },
  {
    "name": "Directorate General of Training",
    "url": "https://dgt.gov.in/",
    "category": "jobs",
    "badge": "Jobs & Careers",
    "icon": "fa-solid fa-user-tie",
    "color": "amber",
    "desc": "National recruitment and career facilitation portal for Directorate General of Training.",
    "keywords": "directorate general of training jobs national recruitment and career facilitation portal for directorate general of training."
  },
  {
    "name": "National Skill Development Agency",
    "url": "https://nsda.gov.in/",
    "category": "jobs",
    "badge": "Jobs & Careers",
    "icon": "fa-solid fa-screwdriver-wrench",
    "color": "amber",
    "desc": "Govt apprentice contracts, certified skill training programs, and stipend portal.",
    "keywords": "national skill development agency jobs govt apprentice contracts, certified skill training programs, and stipend portal."
  },
  {
    "name": "Bharat Skills",
    "url": "https://bharatskills.gov.in/",
    "category": "jobs",
    "badge": "Jobs & Careers",
    "icon": "fa-solid fa-screwdriver-wrench",
    "color": "amber",
    "desc": "Govt apprentice contracts, certified skill training programs, and stipend portal.",
    "keywords": "bharat skills jobs govt apprentice contracts, certified skill training programs, and stipend portal."
  },
  {
    "name": "Skill India Digital",
    "url": "https://www.skillindiadigital.gov.in/",
    "category": "jobs",
    "badge": "Jobs & Careers",
    "icon": "fa-solid fa-screwdriver-wrench",
    "color": "amber",
    "desc": "Govt apprentice contracts, certified skill training programs, and stipend portal.",
    "keywords": "skill india digital jobs govt apprentice contracts, certified skill training programs, and stipend portal."
  },
  {
    "name": "Ministry of Health & Family Welfare",
    "url": "https://www.mohfw.gov.in/",
    "category": "health",
    "badge": "Health & Medical",
    "icon": "fa-solid fa-heart-pulse",
    "color": "rose",
    "desc": "Official public healthcare, clinical welfare, and health portal for Ministry of Health & Family Welfare.",
    "keywords": "ministry of health & family welfare health official public healthcare, clinical welfare, and health portal for ministry of health & family welfare."
  },
  {
    "name": "National Health Authority",
    "url": "https://www.nha.gov.in/",
    "category": "health",
    "badge": "Health & Medical",
    "icon": "fa-solid fa-heart-pulse",
    "color": "rose",
    "desc": "Official public healthcare, clinical welfare, and health portal for National Health Authority.",
    "keywords": "national health authority health official public healthcare, clinical welfare, and health portal for national health authority."
  },
  {
    "name": "Ayushman Bharat PM-JAY",
    "url": "https://pmjay.gov.in/",
    "category": "health",
    "badge": "Health & Medical",
    "icon": "fa-solid fa-hospital-user",
    "color": "rose",
    "desc": "Ayushman Bharat Golden Card eligibility, e-KYC, ₹5 Lakh medical cover, and card print.",
    "keywords": "ayushman bharat pm-jay health ayushman bharat golden card eligibility, e-kyc, ₹5 lakh medical cover, and card print."
  },
  {
    "name": "Ayushman Bharat Digital Mission",
    "url": "https://abdm.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Ayushman Bharat Digital Mission services and citizen applications.",
    "keywords": "ayushman bharat digital mission govt official digital portal for ayushman bharat digital mission services and citizen applications."
  },
  {
    "name": "CoWIN",
    "url": "https://www.cowin.gov.in/",
    "category": "health",
    "badge": "Health & Medical",
    "icon": "fa-solid fa-stethoscope",
    "color": "rose",
    "desc": "Digital ABHA ID creation, tele-consultation doctor appointments, and medical records.",
    "keywords": "cowin health digital abha id creation, tele-consultation doctor appointments, and medical records."
  },
  {
    "name": "eSanjeevani",
    "url": "https://esanjeevani.mohfw.gov.in/",
    "category": "health",
    "badge": "Health & Medical",
    "icon": "fa-solid fa-stethoscope",
    "color": "rose",
    "desc": "Digital ABHA ID creation, tele-consultation doctor appointments, and medical records.",
    "keywords": "esanjeevani health digital abha id creation, tele-consultation doctor appointments, and medical records."
  },
  {
    "name": "National Health Portal",
    "url": "https://www.nhp.gov.in/",
    "category": "health",
    "badge": "Health & Medical",
    "icon": "fa-solid fa-heart-pulse",
    "color": "rose",
    "desc": "Official public healthcare, clinical welfare, and health portal for National Health Portal.",
    "keywords": "national health portal health official public healthcare, clinical welfare, and health portal for national health portal."
  },
  {
    "name": "ICMR",
    "url": "https://www.icmr.gov.in/",
    "category": "health",
    "badge": "Health & Medical",
    "icon": "fa-solid fa-heart-pulse",
    "color": "rose",
    "desc": "Official public healthcare, clinical welfare, and health portal for ICMR.",
    "keywords": "icmr health official public healthcare, clinical welfare, and health portal for icmr."
  },
  {
    "name": "AIIMS",
    "url": "https://www.aiims.edu/",
    "category": "health",
    "badge": "Health & Medical",
    "icon": "fa-solid fa-heart-pulse",
    "color": "rose",
    "desc": "Official public healthcare, clinical welfare, and health portal for AIIMS.",
    "keywords": "aiims health official public healthcare, clinical welfare, and health portal for aiims."
  },
  {
    "name": "National Medical Commission",
    "url": "https://www.nmc.org.in/",
    "category": "health",
    "badge": "Health & Medical",
    "icon": "fa-solid fa-heart-pulse",
    "color": "rose",
    "desc": "Official public healthcare, clinical welfare, and health portal for National Medical Commission.",
    "keywords": "national medical commission health official public healthcare, clinical welfare, and health portal for national medical commission."
  },
  {
    "name": "National Health Mission",
    "url": "https://nhm.gov.in/",
    "category": "health",
    "badge": "Health & Medical",
    "icon": "fa-solid fa-heart-pulse",
    "color": "rose",
    "desc": "Official public healthcare, clinical welfare, and health portal for National Health Mission.",
    "keywords": "national health mission health official public healthcare, clinical welfare, and health portal for national health mission."
  },
  {
    "name": "FSSAI",
    "url": "https://www.fssai.gov.in/",
    "category": "health",
    "badge": "Health & Medical",
    "icon": "fa-solid fa-heart-pulse",
    "color": "rose",
    "desc": "Official public healthcare, clinical welfare, and health portal for FSSAI.",
    "keywords": "fssai health official public healthcare, clinical welfare, and health portal for fssai."
  },
  {
    "name": "Ministry of Agriculture & Farmers Welfare",
    "url": "https://agriwelfare.gov.in/",
    "category": "agriculture",
    "badge": "Agriculture",
    "icon": "fa-solid fa-seedling",
    "color": "emerald",
    "desc": "Farmers welfare schemes, seed/fertilizer subsidies, and market mandi services.",
    "keywords": "ministry of agriculture & farmers welfare agriculture farmers welfare schemes, seed/fertilizer subsidies, and market mandi services."
  },
  {
    "name": "PM Fasal Bima Yojana",
    "url": "https://pmfby.gov.in/",
    "category": "agriculture",
    "badge": "Agriculture",
    "icon": "fa-solid fa-seedling",
    "color": "emerald",
    "desc": "Pradhan Mantri Fasal Bima crop insurance application, claim status, and premium calculation.",
    "keywords": "pm fasal bima yojana agriculture pradhan mantri fasal bima crop insurance application, claim status, and premium calculation."
  },
  {
    "name": "e-NAM",
    "url": "https://www.enam.gov.in/",
    "category": "agriculture",
    "badge": "Agriculture",
    "icon": "fa-solid fa-seedling",
    "color": "emerald",
    "desc": "Farmers welfare schemes, seed/fertilizer subsidies, and market mandi services.",
    "keywords": "e-nam agriculture farmers welfare schemes, seed/fertilizer subsidies, and market mandi services."
  },
  {
    "name": "Agriculture Census",
    "url": "https://agcensus.gov.in/",
    "category": "identity",
    "badge": "Identity & Docs",
    "icon": "fa-solid fa-landmark",
    "color": "blue",
    "desc": "Official digital portal for Agriculture Census services and citizen applications.",
    "keywords": "agriculture census identity official digital portal for agriculture census services and citizen applications."
  },
  {
    "name": "National Horticulture Board",
    "url": "https://nhb.gov.in/",
    "category": "agriculture",
    "badge": "Agriculture",
    "icon": "fa-solid fa-seedling",
    "color": "emerald",
    "desc": "Farmers welfare schemes, seed/fertilizer subsidies, and market mandi services.",
    "keywords": "national horticulture board agriculture farmers welfare schemes, seed/fertilizer subsidies, and market mandi services."
  },
  {
    "name": "ICAR",
    "url": "https://icar.gov.in/",
    "category": "agriculture",
    "badge": "Agriculture",
    "icon": "fa-solid fa-seedling",
    "color": "emerald",
    "desc": "Farmers welfare schemes, seed/fertilizer subsidies, and market mandi services.",
    "keywords": "icar agriculture farmers welfare schemes, seed/fertilizer subsidies, and market mandi services."
  },
  {
    "name": "NABARD",
    "url": "https://www.nabard.org/",
    "category": "agriculture",
    "badge": "Agriculture",
    "icon": "fa-solid fa-seedling",
    "color": "emerald",
    "desc": "Farmers welfare schemes, seed/fertilizer subsidies, and market mandi services.",
    "keywords": "nabard agriculture farmers welfare schemes, seed/fertilizer subsidies, and market mandi services."
  },
  {
    "name": "Soil Health Card",
    "url": "https://soilhealth.dac.gov.in/",
    "category": "health",
    "badge": "Health & Medical",
    "icon": "fa-solid fa-heart-pulse",
    "color": "rose",
    "desc": "Official public healthcare, clinical welfare, and health portal for Soil Health Card.",
    "keywords": "soil health card health official public healthcare, clinical welfare, and health portal for soil health card."
  },
  {
    "name": "Kisan Call Centre / mKisan",
    "url": "https://mkisan.gov.in/",
    "category": "agriculture",
    "badge": "Agriculture",
    "icon": "fa-solid fa-seedling",
    "color": "emerald",
    "desc": "Farmers welfare schemes, seed/fertilizer subsidies, and market mandi services.",
    "keywords": "kisan call centre / mkisan agriculture farmers welfare schemes, seed/fertilizer subsidies, and market mandi services."
  },
  {
    "name": "Department of Animal Husbandry & Dairying",
    "url": "https://dahd.nic.in/",
    "category": "agriculture",
    "badge": "Agriculture",
    "icon": "fa-solid fa-seedling",
    "color": "emerald",
    "desc": "Farmers welfare schemes, seed/fertilizer subsidies, and market mandi services.",
    "keywords": "department of animal husbandry & dairying agriculture farmers welfare schemes, seed/fertilizer subsidies, and market mandi services."
  },
  {
    "name": "Department of Fisheries",
    "url": "https://dof.gov.in/",
    "category": "agriculture",
    "badge": "Agriculture",
    "icon": "fa-solid fa-seedling",
    "color": "emerald",
    "desc": "Farmers welfare schemes, seed/fertilizer subsidies, and market mandi services.",
    "keywords": "department of fisheries agriculture farmers welfare schemes, seed/fertilizer subsidies, and market mandi services."
  },
  {
    "name": "National Fisheries Development Board",
    "url": "https://nfdb.gov.in/",
    "category": "agriculture",
    "badge": "Agriculture",
    "icon": "fa-solid fa-seedling",
    "color": "emerald",
    "desc": "Farmers welfare schemes, seed/fertilizer subsidies, and market mandi services.",
    "keywords": "national fisheries development board agriculture farmers welfare schemes, seed/fertilizer subsidies, and market mandi services."
  },
  {
    "name": "National Dairy Development Board",
    "url": "https://www.nddb.coop/",
    "category": "agriculture",
    "badge": "Agriculture",
    "icon": "fa-solid fa-seedling",
    "color": "emerald",
    "desc": "Farmers welfare schemes, seed/fertilizer subsidies, and market mandi services.",
    "keywords": "national dairy development board agriculture farmers welfare schemes, seed/fertilizer subsidies, and market mandi services."
  },
  {
    "name": "Central Institute of Fisheries Education",
    "url": "https://www.cife.edu.in/",
    "category": "education",
    "badge": "Education & Exams",
    "icon": "fa-solid fa-graduation-cap",
    "color": "sky",
    "desc": "Academic portal for students, learners, and educators under Central Institute of Fisheries Education.",
    "keywords": "central institute of fisheries education education academic portal for students, learners, and educators under central institute of fisheries education."
  },
  {
    "name": "Ministry of Labour & Employment",
    "url": "https://labour.gov.in/",
    "category": "jobs",
    "badge": "Jobs & Careers",
    "icon": "fa-solid fa-user-tie",
    "color": "amber",
    "desc": "National recruitment and career facilitation portal for Ministry of Labour & Employment.",
    "keywords": "ministry of labour & employment jobs national recruitment and career facilitation portal for ministry of labour & employment."
  },
  {
    "name": "e-Shram",
    "url": "https://eshram.gov.in/",
    "category": "labour",
    "badge": "Labour & PF",
    "icon": "fa-solid fa-id-badge",
    "color": "indigo",
    "desc": "Unorganized worker e-Shram card registration, update profile, and accident cover download.",
    "keywords": "e-shram labour unorganized worker e-shram card registration, update profile, and accident cover download."
  },
  {
    "name": "EPFO",
    "url": "https://www.epfindia.gov.in/",
    "category": "labour",
    "badge": "Labour & PF",
    "icon": "fa-solid fa-wallet",
    "color": "indigo",
    "desc": "EPF passbook check, UAN activation, PF advance/claim withdrawal, and KYC submission.",
    "keywords": "epfo labour epf passbook check, uan activation, pf advance/claim withdrawal, and kyc submission."
  },
  {
    "name": "ESIC",
    "url": "https://www.esic.gov.in/",
    "category": "labour",
    "badge": "Labour & PF",
    "icon": "fa-solid fa-users-gear",
    "color": "indigo",
    "desc": "Social security, employment insurance, and employee provident fund services.",
    "keywords": "esic labour social security, employment insurance, and employee provident fund services."
  },
  {
    "name": "Labour Bureau",
    "url": "https://labourbureau.gov.in/",
    "category": "labour",
    "badge": "Labour & PF",
    "icon": "fa-solid fa-users-gear",
    "color": "indigo",
    "desc": "Social security, employment insurance, and employee provident fund services.",
    "keywords": "labour bureau labour social security, employment insurance, and employee provident fund services."
  },
  {
    "name": "Ministry of Road Transport & Highways",
    "url": "https://morth.nic.in/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-car",
    "color": "cyan",
    "desc": "Official transport, transit, and logistics services portal for Ministry of Road Transport & Highways.",
    "keywords": "ministry of road transport & highways transport official transport, transit, and logistics services portal for ministry of road transport & highways."
  },
  {
    "name": "Parivahan Sewa",
    "url": "https://parivahan.gov.in/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-id-card-clip",
    "color": "cyan",
    "desc": "Learner license, driving license renewal, slot booking, and DL printout online.",
    "keywords": "parivahan sewa transport learner license, driving license renewal, slot booking, and dl printout online."
  },
  {
    "name": "Sarathi",
    "url": "https://sarathi.parivahan.gov.in/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-id-card-clip",
    "color": "cyan",
    "desc": "Learner license, driving license renewal, slot booking, and DL printout online.",
    "keywords": "sarathi transport learner license, driving license renewal, slot booking, and dl printout online."
  },
  {
    "name": "Vahan",
    "url": "https://vahan.parivahan.gov.in/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-car-side",
    "color": "cyan",
    "desc": "Vehicle RC registration, transfer of ownership, NOC, road tax, and fitness certificate.",
    "keywords": "vahan transport vehicle rc registration, transfer of ownership, noc, road tax, and fitness certificate."
  },
  {
    "name": "NHAI",
    "url": "https://nhai.gov.in/",
    "category": "health",
    "badge": "Health & Medical",
    "icon": "fa-solid fa-heart-pulse",
    "color": "rose",
    "desc": "Official public healthcare, clinical welfare, and health portal for NHAI.",
    "keywords": "nhai health official public healthcare, clinical welfare, and health portal for nhai."
  },
  {
    "name": "FASTag / IHMCL",
    "url": "https://www.ihmcl.co.in/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-car",
    "color": "cyan",
    "desc": "Official transport, transit, and logistics services portal for FASTag / IHMCL.",
    "keywords": "fastag / ihmcl transport official transport, transit, and logistics services portal for fastag / ihmcl."
  },
  {
    "name": "Ministry of Railways",
    "url": "https://www.railway.gov.in/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-train",
    "color": "cyan",
    "desc": "Indian Railways train ticket booking, Tatkal reservations, PNR status, and cancellation.",
    "keywords": "ministry of railways transport indian railways train ticket booking, tatkal reservations, pnr status, and cancellation."
  },
  {
    "name": "IRCTC",
    "url": "https://www.irctc.co.in/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-car-side",
    "color": "cyan",
    "desc": "Vehicle RC registration, transfer of ownership, NOC, road tax, and fitness certificate.",
    "keywords": "irctc transport vehicle rc registration, transfer of ownership, noc, road tax, and fitness certificate."
  },
  {
    "name": "Railway Recruitment Cell",
    "url": "https://www.rrc-wr.com/",
    "category": "jobs",
    "badge": "Jobs & Careers",
    "icon": "fa-solid fa-user-tie",
    "color": "amber",
    "desc": "National recruitment and career facilitation portal for Railway Recruitment Cell.",
    "keywords": "railway recruitment cell jobs national recruitment and career facilitation portal for railway recruitment cell."
  },
  {
    "name": "National Train Enquiry System",
    "url": "https://enquiry.indianrail.gov.in/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-train",
    "color": "cyan",
    "desc": "Indian Railways train ticket booking, Tatkal reservations, PNR status, and cancellation.",
    "keywords": "national train enquiry system transport indian railways train ticket booking, tatkal reservations, pnr status, and cancellation."
  },
  {
    "name": "IRCTC Tourism",
    "url": "https://www.irctctourism.com/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-car-side",
    "color": "cyan",
    "desc": "Vehicle RC registration, transfer of ownership, NOC, road tax, and fitness certificate.",
    "keywords": "irctc tourism transport vehicle rc registration, transfer of ownership, noc, road tax, and fitness certificate."
  },
  {
    "name": "Ministry of Civil Aviation",
    "url": "https://www.civilaviation.gov.in/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-car",
    "color": "cyan",
    "desc": "Official transport, transit, and logistics services portal for Ministry of Civil Aviation.",
    "keywords": "ministry of civil aviation transport official transport, transit, and logistics services portal for ministry of civil aviation."
  },
  {
    "name": "DGCA",
    "url": "https://www.dgca.gov.in/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-car",
    "color": "cyan",
    "desc": "Official transport, transit, and logistics services portal for DGCA.",
    "keywords": "dgca transport official transport, transit, and logistics services portal for dgca."
  },
  {
    "name": "Airports Authority of India",
    "url": "https://www.aai.aero/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-car",
    "color": "cyan",
    "desc": "Official transport, transit, and logistics services portal for Airports Authority of India.",
    "keywords": "airports authority of india transport official transport, transit, and logistics services portal for airports authority of india."
  },
  {
    "name": "AirSewa",
    "url": "https://airsewa.gov.in/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-car",
    "color": "cyan",
    "desc": "Official transport, transit, and logistics services portal for AirSewa.",
    "keywords": "airsewa transport official transport, transit, and logistics services portal for airsewa."
  },
  {
    "name": "Bureau of Civil Aviation Security",
    "url": "https://www.bcasindia.gov.in/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-car",
    "color": "cyan",
    "desc": "Official transport, transit, and logistics services portal for Bureau of Civil Aviation Security.",
    "keywords": "bureau of civil aviation security transport official transport, transit, and logistics services portal for bureau of civil aviation security."
  },
  {
    "name": "India Post",
    "url": "https://www.indiapost.gov.in/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-envelope",
    "color": "cyan",
    "desc": "Speed Post tracking, postal savings bank, philately, and parcel delivery services.",
    "keywords": "india post transport speed post tracking, postal savings bank, philately, and parcel delivery services."
  },
  {
    "name": "Department of Telecommunications",
    "url": "https://dot.gov.in/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-car",
    "color": "cyan",
    "desc": "Official transport, transit, and logistics services portal for Department of Telecommunications.",
    "keywords": "department of telecommunications transport official transport, transit, and logistics services portal for department of telecommunications."
  },
  {
    "name": "TRAI",
    "url": "https://www.trai.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for TRAI services and citizen applications.",
    "keywords": "trai govt official digital portal for trai services and citizen applications."
  },
  {
    "name": "Sanchar Saathi",
    "url": "https://sancharsaathi.gov.in/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-car",
    "color": "cyan",
    "desc": "Official transport, transit, and logistics services portal for Sanchar Saathi.",
    "keywords": "sanchar saathi transport official transport, transit, and logistics services portal for sanchar saathi."
  },
  {
    "name": "BSNL",
    "url": "https://www.bsnl.co.in/",
    "category": "transport",
    "badge": "Travel & Transport",
    "icon": "fa-solid fa-car",
    "color": "cyan",
    "desc": "Official transport, transit, and logistics services portal for BSNL.",
    "keywords": "bsnl transport official transport, transit, and logistics services portal for bsnl."
  },
  {
    "name": "Ministry of Home Affairs",
    "url": "https://www.mha.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Ministry of Home Affairs services and citizen applications.",
    "keywords": "ministry of home affairs govt official digital portal for ministry of home affairs services and citizen applications."
  },
  {
    "name": "CBI",
    "url": "https://www.cbi.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "cbi legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "NIA",
    "url": "https://nia.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "nia legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "CRPF",
    "url": "https://crpf.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "crpf legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "BSF",
    "url": "https://bsf.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "bsf legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "CISF",
    "url": "https://www.cisf.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "cisf legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "SSB",
    "url": "https://ssb.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "ssb legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "ITBP",
    "url": "https://itbpolice.nic.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "itbp legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "Assam Rifles",
    "url": "https://www.assamrifles.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Assam Rifles services and citizen applications.",
    "keywords": "assam rifles govt official digital portal for assam rifles services and citizen applications."
  },
  {
    "name": "NDMA",
    "url": "https://ndma.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "ndma legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "NDRF",
    "url": "https://ndrf.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "ndrf legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "Narcotics Control Bureau",
    "url": "https://narcoticsindia.nic.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-scale-balanced",
    "color": "red",
    "desc": "Public grievance redressal, legal assistance, and law enforcement portal.",
    "keywords": "narcotics control bureau legal public grievance redressal, legal assistance, and law enforcement portal."
  },
  {
    "name": "Ministry of Defence",
    "url": "https://www.mod.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Ministry of Defence services and citizen applications.",
    "keywords": "ministry of defence govt official digital portal for ministry of defence services and citizen applications."
  },
  {
    "name": "Indian Army",
    "url": "https://indianarmy.nic.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Indian Army services and citizen applications.",
    "keywords": "indian army govt official digital portal for indian army services and citizen applications."
  },
  {
    "name": "Indian Navy",
    "url": "https://www.joinindiannavy.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Indian Navy services and citizen applications.",
    "keywords": "indian navy govt official digital portal for indian navy services and citizen applications."
  },
  {
    "name": "Indian Air Force",
    "url": "https://indianairforce.nic.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Indian Air Force services and citizen applications.",
    "keywords": "indian air force govt official digital portal for indian air force services and citizen applications."
  },
  {
    "name": "DRDO",
    "url": "https://www.drdo.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for DRDO services and citizen applications.",
    "keywords": "drdo govt official digital portal for drdo services and citizen applications."
  },
  {
    "name": "Border Roads Organisation",
    "url": "https://bro.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Border Roads Organisation services and citizen applications.",
    "keywords": "border roads organisation govt official digital portal for border roads organisation services and citizen applications."
  },
  {
    "name": "Indian Coast Guard",
    "url": "https://indiancoastguard.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Indian Coast Guard services and citizen applications.",
    "keywords": "indian coast guard govt official digital portal for indian coast guard services and citizen applications."
  },
  {
    "name": "Armed Forces Tribunal",
    "url": "https://aftdelhi.nic.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Armed Forces Tribunal services and citizen applications.",
    "keywords": "armed forces tribunal govt official digital portal for armed forces tribunal services and citizen applications."
  },
  {
    "name": "Ministry of Electronics & IT",
    "url": "https://www.meity.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Ministry of Electronics & IT services and citizen applications.",
    "keywords": "ministry of electronics & it govt official digital portal for ministry of electronics & it services and citizen applications."
  },
  {
    "name": "CERT-In",
    "url": "https://www.cert-in.org.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for CERT-In services and citizen applications.",
    "keywords": "cert-in govt official digital portal for cert-in services and citizen applications."
  },
  {
    "name": "National Cyber Crime Reporting Portal",
    "url": "https://cybercrime.gov.in/",
    "category": "legal",
    "badge": "Legal & Security",
    "icon": "fa-solid fa-file-lines",
    "color": "red",
    "desc": "File Right to Information (RTI) online applications, track reply status, and submit appeals.",
    "keywords": "national cyber crime reporting portal legal file right to information (rti) online applications, track reply status, and submit appeals."
  },
  {
    "name": "STQC",
    "url": "https://www.stqc.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for STQC services and citizen applications.",
    "keywords": "stqc govt official digital portal for stqc services and citizen applications."
  },
  {
    "name": "C-DAC",
    "url": "https://www.cdac.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for C-DAC services and citizen applications.",
    "keywords": "c-dac govt official digital portal for c-dac services and citizen applications."
  },
  {
    "name": "IndiaAI",
    "url": "https://indiaai.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for IndiaAI services and citizen applications.",
    "keywords": "indiaai govt official digital portal for indiaai services and citizen applications."
  },
  {
    "name": "Open Government Data Platform",
    "url": "https://www.data.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Open Government Data Platform services and citizen applications.",
    "keywords": "open government data platform govt official digital portal for open government data platform services and citizen applications."
  },
  {
    "name": "API Setu",
    "url": "https://www.apisetu.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for API Setu services and citizen applications.",
    "keywords": "api setu govt official digital portal for api setu services and citizen applications."
  },
  {
    "name": "Ministry of Environment, Forest & Climate Change",
    "url": "https://moef.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Ministry of Environment, Forest & Climate Change services and citizen applications.",
    "keywords": "ministry of environment, forest & climate change govt official digital portal for ministry of environment, forest & climate change services and citizen applications."
  },
  {
    "name": "Central Pollution Control Board",
    "url": "https://cpcb.nic.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Central Pollution Control Board services and citizen applications.",
    "keywords": "central pollution control board govt official digital portal for central pollution control board services and citizen applications."
  },
  {
    "name": "National Green Tribunal",
    "url": "https://greentribunal.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for National Green Tribunal services and citizen applications.",
    "keywords": "national green tribunal govt official digital portal for national green tribunal services and citizen applications."
  },
  {
    "name": "Forest Survey of India",
    "url": "https://fsi.nic.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Forest Survey of India services and citizen applications.",
    "keywords": "forest survey of india govt official digital portal for forest survey of india services and citizen applications."
  },
  {
    "name": "Wildlife Institute of India",
    "url": "https://wii.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Wildlife Institute of India services and citizen applications.",
    "keywords": "wildlife institute of india govt official digital portal for wildlife institute of india services and citizen applications."
  },
  {
    "name": "Central Zoo Authority",
    "url": "https://cza.nic.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Central Zoo Authority services and citizen applications.",
    "keywords": "central zoo authority govt official digital portal for central zoo authority services and citizen applications."
  },
  {
    "name": "National Biodiversity Authority",
    "url": "https://nbaindia.org/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for National Biodiversity Authority services and citizen applications.",
    "keywords": "national biodiversity authority govt official digital portal for national biodiversity authority services and citizen applications."
  },
  {
    "name": "Ministry of Power",
    "url": "https://powermin.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Ministry of Power services and citizen applications.",
    "keywords": "ministry of power govt official digital portal for ministry of power services and citizen applications."
  },
  {
    "name": "Ministry of New & Renewable Energy",
    "url": "https://mnre.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Ministry of New & Renewable Energy services and citizen applications.",
    "keywords": "ministry of new & renewable energy govt official digital portal for ministry of new & renewable energy services and citizen applications."
  },
  {
    "name": "Central Electricity Authority",
    "url": "https://cea.nic.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Central Electricity Authority services and citizen applications.",
    "keywords": "central electricity authority govt official digital portal for central electricity authority services and citizen applications."
  },
  {
    "name": "CERC",
    "url": "https://cercind.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for CERC services and citizen applications.",
    "keywords": "cerc govt official digital portal for cerc services and citizen applications."
  },
  {
    "name": "Solar Energy Corporation of India",
    "url": "https://www.seci.co.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Solar Energy Corporation of India services and citizen applications.",
    "keywords": "solar energy corporation of india govt official digital portal for solar energy corporation of india services and citizen applications."
  },
  {
    "name": "Ministry of Petroleum & Natural Gas",
    "url": "https://mopng.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Ministry of Petroleum & Natural Gas services and citizen applications.",
    "keywords": "ministry of petroleum & natural gas govt official digital portal for ministry of petroleum & natural gas services and citizen applications."
  },
  {
    "name": "PPAC",
    "url": "https://ppac.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for PPAC services and citizen applications.",
    "keywords": "ppac govt official digital portal for ppac services and citizen applications."
  },
  {
    "name": "Oil India Limited",
    "url": "https://www.oil-india.com/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Oil India Limited services and citizen applications.",
    "keywords": "oil india limited govt official digital portal for oil india limited services and citizen applications."
  },
  {
    "name": "Indian Oil Corporation",
    "url": "https://iocl.com/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Indian Oil Corporation services and citizen applications.",
    "keywords": "indian oil corporation govt official digital portal for indian oil corporation services and citizen applications."
  },
  {
    "name": "Ministry of Housing & Urban Affairs",
    "url": "https://mohua.gov.in/",
    "category": "welfare",
    "badge": "Social Welfare",
    "icon": "fa-solid fa-hand-holding-heart",
    "color": "purple",
    "desc": "Government welfare schemes, disability support, and social empowerment programs.",
    "keywords": "ministry of housing & urban affairs welfare government welfare schemes, disability support, and social empowerment programs."
  },
  {
    "name": "PMAY Urban",
    "url": "https://pmay-urban.gov.in/",
    "category": "welfare",
    "badge": "Social Welfare",
    "icon": "fa-solid fa-house-chimney",
    "color": "purple",
    "desc": "Pradhan Mantri Awas Yojana housing subsidy application, beneficiary list, and geo-tagging.",
    "keywords": "pmay urban welfare pradhan mantri awas yojana housing subsidy application, beneficiary list, and geo-tagging."
  },
  {
    "name": "Smart Cities Mission",
    "url": "https://smartcities.gov.in/",
    "category": "welfare",
    "badge": "Social Welfare",
    "icon": "fa-solid fa-hand-holding-heart",
    "color": "purple",
    "desc": "Government welfare schemes, disability support, and social empowerment programs.",
    "keywords": "smart cities mission welfare government welfare schemes, disability support, and social empowerment programs."
  },
  {
    "name": "Swachh Bharat Mission Urban",
    "url": "https://sbmurban.org/",
    "category": "welfare",
    "badge": "Social Welfare",
    "icon": "fa-solid fa-hand-holding-heart",
    "color": "purple",
    "desc": "Government welfare schemes, disability support, and social empowerment programs.",
    "keywords": "swachh bharat mission urban welfare government welfare schemes, disability support, and social empowerment programs."
  },
  {
    "name": "National Housing Bank",
    "url": "https://www.nhb.org.in/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for National Housing Bank.",
    "keywords": "national housing bank banking online net banking, account services, pension tracking, and financial schemes for national housing bank."
  },
  {
    "name": "Ministry of Rural Development",
    "url": "https://rural.gov.in/",
    "category": "welfare",
    "badge": "Social Welfare",
    "icon": "fa-solid fa-hand-holding-heart",
    "color": "purple",
    "desc": "Government welfare schemes, disability support, and social empowerment programs.",
    "keywords": "ministry of rural development welfare government welfare schemes, disability support, and social empowerment programs."
  },
  {
    "name": "MGNREGA",
    "url": "https://nrega.nic.in/",
    "category": "welfare",
    "badge": "Social Welfare",
    "icon": "fa-solid fa-person-digging",
    "color": "purple",
    "desc": "100 days work job card list, attendance muster roll, and wage payment status.",
    "keywords": "mgnrega welfare 100 days work job card list, attendance muster roll, and wage payment status."
  },
  {
    "name": "PMAY-Gramin",
    "url": "https://pmayg.nic.in/",
    "category": "welfare",
    "badge": "Social Welfare",
    "icon": "fa-solid fa-house-chimney",
    "color": "purple",
    "desc": "Pradhan Mantri Awas Yojana housing subsidy application, beneficiary list, and geo-tagging.",
    "keywords": "pmay-gramin welfare pradhan mantri awas yojana housing subsidy application, beneficiary list, and geo-tagging."
  },
  {
    "name": "National Rural Livelihood Mission",
    "url": "https://nrlm.gov.in/",
    "category": "welfare",
    "badge": "Social Welfare",
    "icon": "fa-solid fa-hand-holding-heart",
    "color": "purple",
    "desc": "Government welfare schemes, disability support, and social empowerment programs.",
    "keywords": "national rural livelihood mission welfare government welfare schemes, disability support, and social empowerment programs."
  },
  {
    "name": "Ministry of Panchayati Raj",
    "url": "https://panchayat.gov.in/",
    "category": "welfare",
    "badge": "Social Welfare",
    "icon": "fa-solid fa-users",
    "color": "purple",
    "desc": "Gram Panchayat development plans, local governance works, and public fund tracking.",
    "keywords": "ministry of panchayati raj welfare gram panchayat development plans, local governance works, and public fund tracking."
  },
  {
    "name": "eGramSwaraj",
    "url": "https://egramswaraj.gov.in/",
    "category": "welfare",
    "badge": "Social Welfare",
    "icon": "fa-solid fa-users",
    "color": "purple",
    "desc": "Gram Panchayat development plans, local governance works, and public fund tracking.",
    "keywords": "egramswaraj welfare gram panchayat development plans, local governance works, and public fund tracking."
  },
  {
    "name": "Meri Panchayat",
    "url": "https://meripanchayat.gov.in/",
    "category": "welfare",
    "badge": "Social Welfare",
    "icon": "fa-solid fa-users",
    "color": "purple",
    "desc": "Gram Panchayat development plans, local governance works, and public fund tracking.",
    "keywords": "meri panchayat welfare gram panchayat development plans, local governance works, and public fund tracking."
  },
  {
    "name": "Ministry of Women & Child Development",
    "url": "https://wcd.gov.in/",
    "category": "welfare",
    "badge": "Social Welfare",
    "icon": "fa-solid fa-hand-holding-heart",
    "color": "purple",
    "desc": "Government welfare schemes, disability support, and social empowerment programs.",
    "keywords": "ministry of women & child development welfare government welfare schemes, disability support, and social empowerment programs."
  },
  {
    "name": "National Commission for Women",
    "url": "https://ncw.nic.in/",
    "category": "welfare",
    "badge": "Social Welfare",
    "icon": "fa-solid fa-hand-holding-heart",
    "color": "purple",
    "desc": "Government welfare schemes, disability support, and social empowerment programs.",
    "keywords": "national commission for women welfare government welfare schemes, disability support, and social empowerment programs."
  },
  {
    "name": "NCPCR",
    "url": "https://ncpcr.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for NCPCR services and citizen applications.",
    "keywords": "ncpcr govt official digital portal for ncpcr services and citizen applications."
  },
  {
    "name": "Childline India",
    "url": "https://childlineindia.org.in/",
    "category": "welfare",
    "badge": "Social Welfare",
    "icon": "fa-solid fa-hand-holding-heart",
    "color": "purple",
    "desc": "Government welfare schemes, disability support, and social empowerment programs.",
    "keywords": "childline india welfare government welfare schemes, disability support, and social empowerment programs."
  },
  {
    "name": "Ministry of Social Justice & Empowerment",
    "url": "https://socialjustice.gov.in/",
    "category": "welfare",
    "badge": "Social Welfare",
    "icon": "fa-solid fa-hand-holding-heart",
    "color": "purple",
    "desc": "Government welfare schemes, disability support, and social empowerment programs.",
    "keywords": "ministry of social justice & empowerment welfare government welfare schemes, disability support, and social empowerment programs."
  },
  {
    "name": "Department of Empowerment of Persons with Disabilities",
    "url": "https://disabilityaffairs.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Department of Empowerment of Persons with Disabilities services and citizen applications.",
    "keywords": "department of empowerment of persons with disabilities govt official digital portal for department of empowerment of persons with disabilities services and citizen applications."
  },
  {
    "name": "National Commission for Scheduled Castes",
    "url": "https://ncsc.nic.in/",
    "category": "welfare",
    "badge": "Social Welfare",
    "icon": "fa-solid fa-hand-holding-heart",
    "color": "purple",
    "desc": "Government welfare schemes, disability support, and social empowerment programs.",
    "keywords": "national commission for scheduled castes welfare government welfare schemes, disability support, and social empowerment programs."
  },
  {
    "name": "National Commission for Scheduled Tribes",
    "url": "https://ncst.nic.in/",
    "category": "welfare",
    "badge": "Social Welfare",
    "icon": "fa-solid fa-hand-holding-heart",
    "color": "purple",
    "desc": "Government welfare schemes, disability support, and social empowerment programs.",
    "keywords": "national commission for scheduled tribes welfare government welfare schemes, disability support, and social empowerment programs."
  },
  {
    "name": "National Commission for Backward Classes",
    "url": "https://ncbc.nic.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for National Commission for Backward Classes services and citizen applications.",
    "keywords": "national commission for backward classes govt official digital portal for national commission for backward classes services and citizen applications."
  },
  {
    "name": "State Bank of India",
    "url": "https://sbi.co.in/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for State Bank of India.",
    "keywords": "state bank of india banking online net banking, account services, pension tracking, and financial schemes for state bank of india."
  },
  {
    "name": "Bank of Baroda",
    "url": "https://www.bankofbaroda.in/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for Bank of Baroda.",
    "keywords": "bank of baroda banking online net banking, account services, pension tracking, and financial schemes for bank of baroda."
  },
  {
    "name": "Punjab National Bank",
    "url": "https://www.pnbindia.in/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for Punjab National Bank.",
    "keywords": "punjab national bank banking online net banking, account services, pension tracking, and financial schemes for punjab national bank."
  },
  {
    "name": "Canara Bank",
    "url": "https://canarabank.com/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for Canara Bank.",
    "keywords": "canara bank banking online net banking, account services, pension tracking, and financial schemes for canara bank."
  },
  {
    "name": "Union Bank of India",
    "url": "https://www.unionbankofindia.co.in/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for Union Bank of India.",
    "keywords": "union bank of india banking online net banking, account services, pension tracking, and financial schemes for union bank of india."
  },
  {
    "name": "Indian Bank",
    "url": "https://www.indianbank.in/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for Indian Bank.",
    "keywords": "indian bank banking online net banking, account services, pension tracking, and financial schemes for indian bank."
  },
  {
    "name": "Bank of India",
    "url": "https://bankofindia.co.in/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for Bank of India.",
    "keywords": "bank of india banking online net banking, account services, pension tracking, and financial schemes for bank of india."
  },
  {
    "name": "Central Bank of India",
    "url": "https://centralbankofindia.co.in/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for Central Bank of India.",
    "keywords": "central bank of india banking online net banking, account services, pension tracking, and financial schemes for central bank of india."
  },
  {
    "name": "UCO Bank",
    "url": "https://www.ucobank.com/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for UCO Bank.",
    "keywords": "uco bank banking online net banking, account services, pension tracking, and financial schemes for uco bank."
  },
  {
    "name": "Bank of Maharashtra",
    "url": "https://bankofmaharashtra.in/",
    "category": "banking",
    "badge": "Banking & Finance",
    "icon": "fa-solid fa-building-columns",
    "color": "emerald",
    "desc": "Online net banking, account services, pension tracking, and financial schemes for Bank of Maharashtra.",
    "keywords": "bank of maharashtra banking online net banking, account services, pension tracking, and financial schemes for bank of maharashtra."
  },
  {
    "name": "Ministry of External Affairs",
    "url": "https://www.mea.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Ministry of External Affairs services and citizen applications.",
    "keywords": "ministry of external affairs govt official digital portal for ministry of external affairs services and citizen applications."
  },
  {
    "name": "Passport Seva",
    "url": "https://passportindia.gov.in/",
    "category": "identity",
    "badge": "Identity & Docs",
    "icon": "fa-solid fa-passport",
    "color": "blue",
    "desc": "New passport application, appointment booking, PCC, and police verification status.",
    "keywords": "passport seva identity new passport application, appointment booking, pcc, and police verification status."
  },
  {
    "name": "Indian Council for Cultural Relations",
    "url": "https://www.iccr.gov.in/",
    "category": "govt",
    "badge": "Government",
    "icon": "fa-solid fa-landmark",
    "color": "indigo",
    "desc": "Official digital portal for Indian Council for Cultural Relations services and citizen applications.",
    "keywords": "indian council for cultural relations govt official digital portal for indian council for cultural relations services and citizen applications."
  }
];

    function createServiceCard(item) {
        const card = document.createElement('div');
        card.className = 'service-card bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between';
        card.dataset.category = item.category + ' govt';
        card.dataset.name = (item.name + ' ' + item.category + ' ' + item.url + ' ' + (item.desc || '')).toLowerCase();

        const colorMap = {
            indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700', badgeBg: 'bg-indigo-50', badgeBorder: 'border-indigo-200', btn: 'bg-indigo-600 hover:bg-indigo-700' },
            blue: { bg: 'bg-blue-100', text: 'text-blue-700', badgeBg: 'bg-blue-50', badgeBorder: 'border-blue-200', btn: 'bg-blue-600 hover:bg-blue-700' },
            emerald: { bg: 'bg-emerald-100', text: 'text-emerald-700', badgeBg: 'bg-emerald-50', badgeBorder: 'border-emerald-200', btn: 'bg-emerald-600 hover:bg-emerald-700' },
            teal: { bg: 'bg-teal-100', text: 'text-teal-700', badgeBg: 'bg-teal-50', badgeBorder: 'border-teal-200', btn: 'bg-teal-600 hover:bg-teal-700' },
            violet: { bg: 'bg-violet-100', text: 'text-violet-700', badgeBg: 'bg-violet-50', badgeBorder: 'border-violet-200', btn: 'bg-violet-600 hover:bg-violet-700' },
            sky: { bg: 'bg-sky-100', text: 'text-sky-700', badgeBg: 'bg-sky-50', badgeBorder: 'border-sky-200', btn: 'bg-sky-600 hover:bg-sky-700' },
            amber: { bg: 'bg-amber-100', text: 'text-amber-700', badgeBg: 'bg-amber-50', badgeBorder: 'border-amber-200', btn: 'bg-amber-600 hover:bg-amber-700' },
            rose: { bg: 'bg-rose-100', text: 'text-rose-700', badgeBg: 'bg-rose-50', badgeBorder: 'border-rose-200', btn: 'bg-rose-600 hover:bg-rose-700' },
            cyan: { bg: 'bg-cyan-100', text: 'text-cyan-700', badgeBg: 'bg-cyan-50', badgeBorder: 'border-cyan-200', btn: 'bg-cyan-600 hover:bg-cyan-700' },
            red: { bg: 'bg-red-100', text: 'text-red-700', badgeBg: 'bg-red-50', badgeBorder: 'border-red-200', btn: 'bg-red-600 hover:bg-red-700' },
            purple: { bg: 'bg-purple-100', text: 'text-purple-700', badgeBg: 'bg-purple-50', badgeBorder: 'border-purple-200', btn: 'bg-purple-600 hover:bg-purple-700' }
        };

        const c = colorMap[item.color] || colorMap.indigo;
        const safeName = (item.name || '').replace(/'/g, "\\'");
        const safeUrl = (item.url || '').replace(/'/g, "\\'");
        const safeCategory = (item.category || '').replace(/'/g, "\\'");
        const safeIcon = (item.icon || '').replace(/'/g, "\\'");

        card.innerHTML = `
            <div>
                <div class="flex items-center justify-between mb-2">
                    <div class="w-10 h-10 rounded-lg ${c.bg} ${c.text} flex items-center justify-center text-lg">
                        <i class="${item.icon}"></i>
                    </div>
                    <span class="text-[10px] font-bold ${c.badgeBg} ${c.text} px-2 py-0.5 rounded border ${c.badgeBorder}">${item.badge}</span>
                </div>
                <h4 class="font-bold text-gray-900 text-sm mb-1 line-clamp-1" title="${item.name}">${item.name}</h4>
                <p class="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2">${item.desc}</p>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
                <span class="text-xs font-semibold text-gray-700">Govt Portal</span>
                <div class="flex items-center gap-1.5">
                    <button type="button" onclick="openServiceApplyModal({ name: '${safeName}', url: '${safeUrl}', category: '${safeCategory}', icon: '${safeIcon}' })" class="px-3 py-1 ${c.btn} text-white rounded-md text-xs font-semibold transition inline-flex items-center gap-1 shadow-sm active:scale-95" title="Apply for ${safeName}">
                        <i class="fa-solid fa-file-pen text-[10px]"></i> Apply
                    </button>
                    <button type="button" onclick="window.open('${safeUrl}', '_blank', 'noopener,noreferrer')" class="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-medium transition inline-flex items-center gap-1 active:scale-95" title="Visit official ${safeName} portal">
                        <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> Visit
                    </button>
                </div>
            </div>
        `;
        return card;
    }

    function initGovtServices() {
        const grid = document.getElementById('services-grid');
        if (!grid || grid.dataset.govtLoaded === 'true') return;

        const fragment = document.createDocumentFragment();
        GOVT_SERVICES_CATALOG.forEach(item => {
            fragment.appendChild(createServiceCard(item));
        });
        grid.appendChild(fragment);
        grid.dataset.govtLoaded = 'true';

        if (typeof updateServiceCounters === 'function') {
            updateServiceCounters();
        } else {
            const total = document.querySelectorAll ? document.querySelectorAll('.service-card').length : 0;
            const allTab = document.querySelector ? document.querySelector('#service-category-tabs button') : null;
            if (allTab) allTab.textContent = `All Services (${total})`;
            const badge = document.getElementById ? document.getElementById('services-count-badge') : null;
            if (badge) badge.textContent = `${total} Services Available`;
        }
    }

    window.initGovtCyberServices = initGovtServices;
    window.CYBER_GOVT_SERVICES = GOVT_SERVICES_CATALOG;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGovtServices);
    } else {
        initGovtServices();
    }
})();
