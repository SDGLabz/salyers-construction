// Salyers Construction contact facts — CONFIRMED from the live site
// (sdg-salyers.webflow.io). Never fabricate: no published fax, hours, or socials.
export const CONTACT = {
  confirmed: true,
  legalName: "Salyers Construction",
  license: "CA B1 #960653",
  phone: "(530) 557-7770",
  phoneHref: "tel:+15305577770",
  // No dedicated after-hours line is published; support routes to the main number.
  phone247: "(530) 557-7770",
  phone247Href: "tel:+15305577770",
  fax: "",
  email: "nickrsalyers@gmail.com",
  emailHref: "mailto:nickrsalyers@gmail.com",
  street: "1420 E Roseville Pkwy, Suite 140-228",
  city: "Roseville",
  region: "CA",
  regionLong: "California",
  postalCode: "95661",
  serviceAreaShort: "California",
  metros: ["Sacramento", "Bay Area", "Los Angeles", "San Diego"],
  since: 2011,
} as const;

// No social profiles are published on the source site — leave null (don't fabricate).
export const SOCIAL = {
  facebook: null as string | null,
  linkedin: null as string | null,
};
