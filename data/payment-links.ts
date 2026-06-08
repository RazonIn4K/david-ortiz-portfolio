export type PaymentLink = {
  name: string;
  shortName: string;
  amount: string;
  cadence: "one-time" | "monthly";
  description: string;
  stripeProductId: string;
  stripePriceId: string;
  stripePaymentLinkId: string;
  url: string;
  recommendedUse: string;
};

export const paymentLinks: PaymentLink[] = [
  {
    name: "Flyer / Publicacion",
    shortName: "Volante / publicación",
    amount: "$15",
    cadence: "one-time",
    description: "Diseño sencillo para un volante, historia o publicación de Facebook/Instagram.",
    stripeProductId: "prod_UeAIX2IVlkukbD",
    stripePriceId: "price_1TeryMP5UmVB5UbV8s6qiqub",
    stripePaymentLinkId: "plink_1TeryXP5UmVB5UbVMgvYmQe8",
    url: "https://buy.stripe.com/fZudRb7IK7FgaGOcnI4ZG18",
    recommendedUse: "Para negocios que solo necesitan una imagen clara para anunciar algo rápido.",
  },
  {
    name: "WhatsApp Business Setup",
    shortName: "Configuración de WhatsApp",
    amount: "$40",
    cadence: "one-time",
    description: "Perfil, mensajes automáticos, respuestas rápidas, catálogo básico y enlace directo para clientes.",
    stripeProductId: "prod_UeAJLJKzvZK7XR",
    stripePriceId: "price_1Terz3P5UmVB5UbVNN9vHPBP",
    stripePaymentLinkId: "plink_1TerzDP5UmVB5UbVdGCnDQMa",
    url: "https://buy.stripe.com/9B600ld34cZA6qydrM4ZG19",
    recommendedUse: "Para vendedores que ya usan WhatsApp y quieren verse más organizados.",
  },
  {
    name: "Order Page Starter",
    shortName: "Página de pedidos",
    amount: "$60",
    cadence: "one-time",
    description: "Página sencilla para menú, productos o pedidos, con botón directo a WhatsApp.",
    stripeProductId: "prod_UeAKG7cFYmTql7",
    stripePriceId: "price_1TerzcP5UmVB5UbVvkH00j20",
    stripePaymentLinkId: "plink_1TerzqP5UmVB5UbVPQML6aFC",
    url: "https://buy.stripe.com/5kQ4gBe783p05muafA4ZG1a",
    recommendedUse: "La opción inicial para comida, postres, ventas por encargo o servicios simples.",
  },
  {
    name: "Combo Negocio Listo",
    shortName: "Combo negocio listo",
    amount: "$150",
    cadence: "one-time",
    description: "Página sencilla, conexión a WhatsApp y apoyo básico para lanzar o anunciar el negocio.",
    stripeProductId: "prod_UeAKqAe3375I8I",
    stripePriceId: "price_1Tes0GP5UmVB5UbVG3fLeNpE",
    stripePaymentLinkId: "plink_1Tes0RP5UmVB5UbV6NubpvDK",
    url: "https://buy.stripe.com/00w4gBd345x87uC87s4ZG1b",
    recommendedUse: "Para quien quiere algo más completo que solo una página.",
  },
  {
    name: "Website + Google Business Starter",
    shortName: "Sitio web + Google",
    amount: "$300",
    cadence: "one-time",
    description: "Sitio web de una página con contacto, botón de WhatsApp y apoyo con Google Business.",
    stripeProductId: "prod_UeALytiG64m6N9",
    stripePriceId: "price_1Tes0mP5UmVB5UbVmNvGMYYG",
    stripePaymentLinkId: "plink_1Tes0xP5UmVB5UbVyiNJa3cm",
    url: "https://buy.stripe.com/8x200l3sucZA4iq3Rc4ZG1c",
    recommendedUse: "Para negocios establecidos que quieren verse mejor en Google y recibir contactos.",
  },
  {
    name: "Monthly Maintenance",
    shortName: "Mantenimiento mensual",
    amount: "$50",
    cadence: "monthly",
    description: "Cambios pequeños, soporte y mantenimiento digital mensual.",
    stripeProductId: "prod_UeALObxOSFiC4v",
    stripePriceId: "price_1Tes1LP5UmVB5UbVvG6kVa5p",
    stripePaymentLinkId: "plink_1Tes1WP5UmVB5UbV62mQmczp",
    url: "https://buy.stripe.com/9B63cx0gi8Jk4iqdrM4ZG1d",
    recommendedUse: "Para después de entregar el trabajo, si quieren ayuda continua.",
  },
  {
    name: "Project Deposit",
    shortName: "Depósito de proyecto",
    amount: "$100",
    cadence: "one-time",
    description: "Depósito para apartar trabajo personalizado de sitio web, página de pedidos, automatización o configuración.",
    stripeProductId: "prod_UeAMlw09BCNXgr",
    stripePriceId: "price_1Tes1yP5UmVB5UbVSVFAYMNW",
    stripePaymentLinkId: "plink_1Tes29P5UmVB5UbVuTnlRhGW",
    url: "https://buy.stripe.com/9B600laUW6BcbKScnI4ZG1e",
    recommendedUse: "Usar solo después de acordar qué se va a hacer y cuándo se empieza.",
  },
];
