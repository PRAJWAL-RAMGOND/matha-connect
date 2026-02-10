export interface Guru {
  id: string;
  name: string;
  kannadaName?: string;
  title?: string;
  period: string;
  ashramaGuru?: string;
  shishya?: string;
  aaradhaneDate?: string;
  biography: string;
  keyWorks: string[];
  vrindavanaLocation?: {
    name: string;
    lat: number;
    lng: number;
  };
  isBhootaraja?: boolean;
}

export const gurus: Guru[] = [
  {
    id: "sri-vadiraja-theertha",
    name: "Sri Vadiraja Theertha",
    kannadaName: "ಶ್ರೀ ವಾದಿರಾಜ ತೀರ್ಥರು",
    title: "Founder",
    period: "1480–1600 CE",
    ashramaGuru: "Sri Vageesha Theertha",
    shishya: "Sri Vedavyasa Theertha",
    aaradhaneDate: "Phalguna Shukla Tritiya",
    biography:
      "Sri Vadiraja Theertha, one of the greatest saints of the Dvaita tradition, was a renowned scholar, poet, and social reformer. Born as Bhūvarahāchārya, he was initiated into sanyasa by Sri Vageesha Theertha. He served as the pontiff of the Sode Matha for over 80 years, composing numerous literary and philosophical works. He is celebrated for his devotion to Lord Hayagriva and Trivikrama.",
    keyWorks: [
      "Yukti Mallika",
      "Tirtha Prabandha",
      "Lakshmi Shobhane",
      "Dashavathara Stuti",
      "Svapna Vrindavana Akhyana",
    ],
    vrindavanaLocation: {
      name: "Sode, Sirsi, Karnataka",
      lat: 14.6167,
      lng: 74.8333,
    },
  },
  {
    id: "sri-vedavyasa-theertha",
    name: "Sri Vedavyasa Theertha",
    kannadaName: "ಶ್ರೀ ವೇದವ್ಯಾಸ ತೀರ್ಥರು",
    period: "1600–1640 CE",
    ashramaGuru: "Sri Vadiraja Theertha",
    shishya: "Sri Vidyadhiraja Theertha",
    aaradhaneDate: "Margashirsha Krishna Pratipada",
    biography:
      "Sri Vedavyasa Theertha was a devoted disciple of Sri Vadiraja Theertha and continued the rich spiritual lineage of the Sode Matha. He was known for his deep scholarship and devotion.",
    keyWorks: ["Continuation of Matha traditions"],
    vrindavanaLocation: {
      name: "Sode, Karnataka",
      lat: 14.6167,
      lng: 74.8333,
    },
  },
  {
    id: "sri-vidyadhiraja-theertha",
    name: "Sri Vidyadhiraja Theertha",
    kannadaName: "ಶ್ರೀ ವಿದ್ಯಾಧಿರಾಜ ತೀರ್ಥರು",
    period: "1640–1680 CE",
    ashramaGuru: "Sri Vedavyasa Theertha",
    shishya: "Sri Vishwapathi Theertha",
    aaradhaneDate: "Vaishakha Shukla Navami",
    biography:
      "Sri Vidyadhiraja Theertha upheld the Dvaita tradition with dedication, preserving the teachings and legacy of the Sode Matha during his pontificate.",
    keyWorks: ["Preservation of Matha heritage"],
    vrindavanaLocation: {
      name: "Sode, Karnataka",
      lat: 14.6167,
      lng: 74.8333,
    },
  },
  {
    id: "sri-vishwapathi-theertha",
    name: "Sri Vishwapathi Theertha",
    kannadaName: "ಶ್ರೀ ವಿಶ್ವಪತಿ ತೀರ್ಥರು",
    period: "1680–1720 CE",
    ashramaGuru: "Sri Vidyadhiraja Theertha",
    shishya: "Sri Vishwanidhi Theertha",
    aaradhaneDate: "Aashada Shukla Chaturthi",
    biography:
      "Sri Vishwapathi Theertha served the Sode Matha with great devotion, nurturing the spiritual traditions passed down through the lineage.",
    keyWorks: ["Spiritual discourses and traditions"],
    vrindavanaLocation: {
      name: "Sode, Karnataka",
      lat: 14.6167,
      lng: 74.8333,
    },
  },
  {
    id: "sri-vishwothama-theertha",
    name: "Sri Sri Vishwothama Theertha Swamiji",
    kannadaName: "ಶ್ರೀ ಶ್ರೀ ವಿಶ್ವೋತ್ತಮ ತೀರ್ಥ ಶ್ರೀಪಾದಂಗಳವರು",
    title: "Current Peetadhipathi",
    period: "1980–Present",
    ashramaGuru: "Sri Vishwapriya Theertha",
    shishya: "Sri Vishwavallabha Theertha",
    biography:
      "Sri Sri Vishwothama Theertha Swamiji is the current Peetadhipathi of Sode Sri Vadiraja Matha. Under his leadership, the Matha has expanded its spiritual, educational, and social service activities significantly across India.",
    keyWorks: [
      "Expansion of Matha activities",
      "Social service initiatives",
      "Annadaana programs",
      "Educational institutions",
    ],
  },
  {
    id: "sri-vishwavallabha-theertha",
    name: "Sri Sri Vishwavallabha Theertha Swamiji",
    kannadaName: "ಶ್ರೀ ಶ್ರೀ ವಿಶ್ವವಲ್ಲಭ ತೀರ್ಥ ಶ್ರೀಪಾದಂಗಳವರು",
    title: "Peetadhipathi",
    period: "2015–Present",
    ashramaGuru: "Sri Vishwothama Theertha",
    biography:
      "Sri Sri Vishwavallabha Theertha Swamiji is carrying forward the legacy of the Sode Matha with youthful energy, engaging with devotees across the world and promoting Dvaita philosophy among the younger generation.",
    keyWorks: [
      "Youth engagement programs",
      "Digital outreach",
      "Promotion of Dvaita philosophy",
    ],
  },
];

export const bhootaraja: Guru = {
  id: "sri-bhootarajaru",
  name: "Sri Bhootarajaru",
  kannadaName: "ಶ್ರೀ ಭೂತರಾಜರು",
  period: "Eternal Divine Attendant",
  biography:
    "Sri Bhootarajaru is revered as the divine attendant and guardian spirit of the Sode Sri Vadiraja Matha. Devotees believe that Sri Bhootarajaru, blessed by Sri Vadiraja Theertha himself, continues to protect the Matha and its devotees. The sacred shrine of Sri Bhootarajaru at Sode is a place of immense devotion where devotees seek blessings for protection and well-being.",
  keyWorks: [
    "Guardian of Sode Matha",
    "Divine protector of devotees",
    "Blessed by Sri Vadiraja Theertha",
  ],
  vrindavanaLocation: {
    name: "Sode, Sirsi, Karnataka",
    lat: 14.6167,
    lng: 74.8333,
  },
  isBhootaraja: true,
};
