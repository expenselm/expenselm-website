# ExpenseLM

ExpenseLM is a smart, simple, powerful expense management tool. It integrates with various AI technologies to help you capture and analyze your expenses.

---

## Features

- **Next.js** app router with **TypeScript**
- **Tailwind CSS** v3 for flexible styling customization
- Smooth transitions powered by **Framer Motion**
- Built-in **font optimization** with [next/font](https://nextjs.org/docs/app/api-reference/components/font)
- Automatic **image optimization** via [next/image](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- Access to **31+ icon packs** via [React Icons](https://react-icons.github.io/react-icons/)
- Near-perfect **Lighthouse score**
- Modular, responsive, and **scalable components**
- **Free lifetime updates**

---

## Sections

- Hero
- Partners or Clients Logos
- Features
- Pricing
- Testimonials
- FAQ
- Statistics
- CTA
- Footer

---

## Getting Started

### Prerequisites

Before starting, make sure you have the following installed:

- **Node.js**: Version 18 or later
- **npm**: Version 8 or later (bundled with Node.js)
- **Code editor**: [VS Code](https://code.visualstudio.com/) is recommended.

### Steps

1. **Install dependencies**: Run `npm install`
2. **Run the development server**: `npm run dev`
3. **View your project**: Open [localhost:3000](http://localhost:3000)

---

## Customization

1. **Edit colors**: Update `globals.css` for primary, secondary, background, and accent colors.
2. **Update site details**: Customize `siteDetails.ts` in `/src/data` to reflect your brand and site info.
3. **Modify content**: Files in `/src/data` handle data for navigation, features, pricing, testimonials, and more.
4. **Replace favicon**: Add your icon to `/src/app/favicon.ico`.
5. **Add images**: Update `public/images` for Open Graph metadata (e.g., `og-image.jpg`, `twitter-image.jpg`).

---

## Deploying on Firebase App Hosting

The site is hosted on Firebase App Hosting (project `underdoc-prd-649d`, backend `expenselm-website`). Pushes to `main` build and roll out automatically.

- Runtime and env config: `apphosting.yaml`
- Secrets: `firebase apphosting:secrets:set CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`
- Manual rollout: `firebase deploy --only apphosting`
- Create the backend (one-time): `firebase apphosting:backends:create --project underdoc-prd-649d`

---

## Contributing

Finwise is an open-source project, and we welcome contributions from the community! If you have ideas for new components, designs, layouts, or optimizations, please join us in making Finwise even better.

### How to Contribute

1. **Fork the Repository**: Clone it locally.
2. **Create a New Branch**: For example, `feature/new-section` or `fix/style-issue`.
3. **Develop and Test**: Make sure your changes work and don't break existing functionality.
4. **Submit a Pull Request**: Open a pull request with a clear description of your changes, and we'll review it.

### Ideas for Contributions

- New component sections (team introductions, comparison table, case studies, etc.)
- Additional page variants (e.g., agency, eCommerce, portfolio layouts)
- Additional themes
- Documentation updates, tutorials, or guides

---

## Community and Support

Join our community discussions on GitHub to share ideas, ask questions, or suggest improvements. Let’s build something amazing together!


--- 

## License

This project is open-source and available under the MIT License. Feel free to use, modify, and distribute it for personal or commercial projects.
