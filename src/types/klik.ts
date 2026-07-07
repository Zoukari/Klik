export type Language = 'fr' | 'en' | 'ar';
export type Theme = 'dark' | 'light';

export type ClientTranslation = {
  name: string;
  description: string;
  website: string | null;
  visitSite: string | null;
};

export type HomeTranslations = {
  valueInnovation: string;
  valuePrecision: string;
  valuePerformance: string;
  valueSpeed: string;
  valueImpact: string;
  btnAbout: string;
  btnOurServices: string;
  mapTitle: string;
  mapTitleHighlight: string;
  mapDesc: string;
  clientsHeader: string;
  clientsHighlight: string;
  servicesBadge: string;
  servicesTitle1: string;
  servicesTitle2: string;
  servicesAll: string;
  webApps: string;
  webAppsDesc: string;
  marketing: string;
  marketingDesc: string;
  automation: string;
  automationDesc: string;
  aboutBadge: string;
  aboutTitle: string;
  aboutTitle2?: string;
  aboutDesc: string;
  aboutCta: string;
  learnBadge: string;
  learnTitle: string;
  learnSubtitle: string;
  learnDesc: string;
  marketStudies: string;
  videoTraining: string;
  resources: string;
  explore: string;
  exploreResources: string;
  entertainmentBadge: string;
  entertainmentTitle: string;
  entertainmentTitle2?: string;
  entertainmentDesc: string;
  entertainmentCta: string;
  blogBadge: string;
  blogTitle1: string;
  blogTitle2: string;
  blogDesc: string;
  blogCta: string;
  careersBadge: string;
  careersTitle: string;
  careersTitle2?: string;
  careersDesc: string;
  careersCta: string;
};

export type KlikTranslations = {
  nav: {
    home: string;
    services: string;
    about: string;
    learn: string;
    entertainment: string;
    blog: string;
    careers: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
  };
  contact: {
    specialOffer: {
      title: string;
      description: string;
      button: string;
    };
  };
  clients: {
    title: string;
    shakpot: ClientTranslation;
    vagabox: ClientTranslation;
    deeqsan: ClientTranslation;
    voyageVoyage: ClientTranslation;
    byLouli: ClientTranslation;
    marketStudyCena: ClientTranslation;
    continentalTransit?: ClientTranslation;
    confidential?: ClientTranslation;
    maisonMokary?: ClientTranslation;
    dMoney?: ClientTranslation;
  };
  footer: {
    madeBy: string;
    rights: string;
  };
  home: HomeTranslations;
};

