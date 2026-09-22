/**
 * Default school uniform, shown on the admissions page.
 *
 * This is the seed and the fallback only — the live section reads the `uniform`
 * part of the site document, which an administrator maintains under
 * Admin → School uniform. The garments below describe a conventional CBSE
 * uniform and are meant to be corrected to what the school actually prescribes.
 */

import type { UniformContent } from "@/types/site";

export const INITIAL_UNIFORM: UniformContent = {
  intro:
    "Every student wears the prescribed uniform on all working days. It is part of the discipline of the school and puts every child, whatever their background, on the same footing.",

  sets: [
    {
      id: "uniform-summer",
      title: "Summer Uniform",
      days: "April to October",
      imageUrl: "",
      items: [
        { id: "summer-shirt", label: "Shirt", detail: "White half-sleeve shirt with the school monogram on the pocket." },
        { id: "summer-lower", label: "Trousers / Pinafore", detail: "Grey trousers for boys; grey pinafore with white shirt for girls up to Class V." },
        { id: "summer-tie", label: "Tie & belt", detail: "School tie and belt in house colours, worn on every working day." },
        { id: "summer-socks", label: "Socks & shoes", detail: "White socks with black leather shoes, polished." },
        { id: "summer-id", label: "Identity card", detail: "Worn on the school lanyard at all times on campus." },
      ],
    },
    {
      id: "uniform-winter",
      title: "Winter Uniform",
      days: "November to March",
      imageUrl: "",
      items: [
        { id: "winter-shirt", label: "Shirt", detail: "White full-sleeve shirt with the school monogram." },
        { id: "winter-sweater", label: "Sweater / Blazer", detail: "School sweater; blazer in house colours on assembly days and for outings." },
        { id: "winter-lower", label: "Trousers / Skirt", detail: "Grey trousers for boys; grey skirt with woollen tights for girls." },
        { id: "winter-socks", label: "Socks & shoes", detail: "Grey socks with black leather shoes." },
      ],
    },
    {
      id: "uniform-sports",
      title: "Sports & House Uniform",
      days: "Games periods and house days",
      imageUrl: "",
      items: [
        { id: "sports-tshirt", label: "House T-shirt", detail: "Round-neck T-shirt in the colour of the student's house." },
        { id: "sports-track", label: "Track pants", detail: "White track pants; school track suit in winter." },
        { id: "sports-shoes", label: "Shoes", detail: "White canvas or sports shoes with white socks." },
      ],
    },
  ],

  notes: [
    { id: "note-availability", text: "The complete uniform is available from the school store; the office will confirm sizes and timings at the time of admission." },
    { id: "note-name", text: "Every item, including sweaters and blazers, must carry the student's name and class." },
    { id: "note-grooming", text: "Hair is to be kept neat and tied back; jewellery, nail polish and cosmetics are not permitted." },
    { id: "note-condition", text: "Uniforms are to be clean, pressed and in good repair. Students out of uniform may be sent home." },
  ],
};
