import { galleryItems } from "../src/data/gallery.js";

console.log("Total items:", galleryItems.length);
const photos = galleryItems.filter(i => i.kind === "image");
console.log("Total photos:", photos.length);
console.log("Photos with span tall:", photos.filter(i => i.span === "tall").length);
console.log("Photos with span hero:", photos.filter(i => i.span === "hero").length);
console.log("Photos with span wide:", photos.filter(i => i.span === "wide").length);
console.log("Photos with span square:", photos.filter(i => i.span === "square").length);
