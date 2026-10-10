import { Home, Mountain, Layers, Hammer, Shovel, Truck } from "lucide-react";

export const services = [
  {
    id: "roofing",
    icon: Home,
    title: "Roofing Supply & Installation",
    description: "Roofing materials supplied and installed.",
    longDescription:
      "We supply and install roofing systems for residential, commercial, and industrial projects. From material sourcing to on-site installation, our team handles the complete process so you deal with one provider instead of coordinating multiple contractors.",
    tag: "Supply & installation",
    image: "/images/service-roofing.webp",
    alt: "Roofing Supply & Installation",
    features: [
      "Material sourcing and delivery",
      "Professional installation crew",
      "Residential and commercial projects",
      "Single-provider convenience",
    ],
  },
  {
    id: "gravel-sand",
    icon: Mountain,
    title: "Gravel & Sand Supply",
    description: "Gravel and sand for construction and development work.",
    longDescription:
      "We supply gravel and sand in bulk for construction, road work, and land development projects. Materials are sourced, loaded, and delivered directly to your project site using our own fleet of dump trucks, ensuring a reliable and consistent supply chain.",
    tag: "Materials",
    image: "/images/service-gravel.webp",
    alt: "Gravel & Sand Supply",
    features: [
      "Bulk volume supply",
      "Direct site delivery",
      "Construction and road work grade",
      "Fleet-backed logistics",
    ],
  },
  {
    id: "embankment",
    icon: Layers,
    title: "Embankment Materials",
    description: "Lastillas, adobe, broken kalsada and broken debris.",
    longDescription:
      "We provide embankment and filling materials including lastillas, adobe, broken kalsada (road debris), and broken concrete debris. These materials are commonly used for land filling, site elevation, road base preparation, and embankment stabilization in development projects.",
    tag: "Materials",
    image: "/images/service-embankment.webp",
    alt: "Embankment Materials",
    features: [
      "Lastillas and adobe supply",
      "Broken kalsada and debris",
      "Land filling and elevation",
      "Road base preparation",
    ],
  },
  {
    id: "demolition",
    icon: Hammer,
    title: "Demolition",
    description: "Demolition work for sites that need clearing.",
    longDescription:
      "We handle demolition projects for structures that need to be cleared before new construction or development can begin. Our team manages the controlled teardown process, debris removal, and site cleanup, working in coordination with hauling services to ensure efficient disposal.",
    tag: "Site works",
    image: "/images/service-demolition.webp",
    alt: "Demolition Site Operations",
    features: [
      "Structural demolition",
      "Controlled teardown",
      "Debris removal and cleanup",
      "Coordinated hauling disposal",
    ],
  },
  {
    id: "excavation",
    icon: Shovel,
    title: "Excavation",
    description: "Excavation work to prepare your site.",
    longDescription:
      "We provide excavation services for site preparation, foundation work, trenching, and land clearing. Whether your project requires grading, digging, or earth-moving, our heavy equipment and operators handle the groundwork needed before construction can proceed.",
    tag: "Site works",
    image: "/images/gallery/trench-excavation.jpg",
    alt: "Excavation and Site Preparation",
    features: [
      "Site preparation and grading",
      "Foundation excavation",
      "Trenching and earth-moving",
      "Heavy equipment operators",
    ],
  },
  {
    id: "hauling-trucking",
    icon: Truck,
    title: "Hauling & Trucking",
    description: "Hauling and trucking for materials and project needs.",
    longDescription:
      "Our fleet of dump trucks handles the transportation of construction materials, excavated soil, debris, and other project cargo. We provide hauling services that integrate directly with our supply and site work operations, streamlining logistics for your project timeline.",
    tag: "Logistics",
    image: "/images/service-trucking.webp",
    alt: "Hauling & Trucking Operations",
    features: [
      "Dump truck fleet",
      "Material transportation",
      "Debris and soil hauling",
      "Integrated project logistics",
    ],
  },
];