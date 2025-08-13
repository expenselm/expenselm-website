export interface IMenuItem {
    text: string;
    url: string;
    dropdown?: IDropdownItem[];
}

export interface IDropdownItem {
    text: string;
    url: string;
    description?: string;
}

export interface IBenefit {
    title: string;
    description: string;
    bullets: IBenefitBullet[]
}

export interface IBenefitBullet {
    title: string;
    description: string;
    icon: JSX.Element;
}

export interface IPricing {
    name: string;
    price: number | string;
    features: string[];
}

export interface IFAQ {
    question: string;
    answer: string;
}

export interface ITestimonial {
    name: string;
    role: string;
    message: string;
    avatar: string;
}

export interface IStats {
    title: string;
    icon: JSX.Element;
    description: string;
}

export interface ISocials {
    facebook?: string;
    github?: string;
    instagram?: string;
    linkedin?: string;
    threads?: string;
    twitter?: string;
    youtube?: string;
    x?: string;
    [key: string]: string | undefined;
}

export interface IDocumentationPage {
    title: string;
    slug: string;
    content: string;
    metaDescription?: string;
    lastUpdated?: string;
}

export interface IContentfulDocumentationPage {
    sys: {
        id: string;
        createdAt: string;
        updatedAt: string;
    };
    fields: {
        title: string;
        slug: string;
        content: string;
        metaDescription?: string;
    };
    contentTypeId: 'documentationPage';
}
