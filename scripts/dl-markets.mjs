// One-off: localize the per-market industry floor photos (the same industry set
// Salyers' coatings markets are modeled on) into /public/images/markets as
// pc-<slug>.jpg, mapped 1:1 to the 12 coatings markets.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(ROOT, "public/images/markets");
const A = "https://cdn.prod.website-files.com/695ff43e827b5b99002fc076/";
const C = "https://cdn.prod.website-files.com/695ff43c827b5b99002fbf7f/";

const MAP = {
  "animal-care": A + "69cbf0c0424e7f7326312e52_Prime%20Coat%20Animal%20Care.jpg",
  automotive: A + "69c82e1f19193d2622b81405_Untitled%20design%20-%202026-03-28T153755.908.jpg",
  "commercial-industrial": A + "69c82f271a9c2b1586158bcf_Untitled%20design%20-%202026-03-28T154229.154.jpg",
  corrections: A + "69cbe8c0b696b4965c335474_Untitled%20design%20-%202026-03-31T113105.298.jpg",
  "food-beverage": A + "69c830a76b32294e1f7d1715_Untitled%20design%20-%202026-03-28T154853.030.jpg",
  "grocery-retail": A + "69c82c43d299c794eef6db59_Untitled%20design%20-%202026-03-28T152951.323.jpg",
  "healthcare-fitness": A + "69cbeb73c0cb7ccc8023bac1_Untitled%20design%20-%202026-03-31T114234.220.jpg",
  "hospitality-entertainment": A + "69c82e89e0be7fdcc2f5be9a_Untitled%20design%20-%202026-03-28T153948.854.jpg",
  manufacturing: A + "69c83335c88674b267b0b89f_Untitled%20design%20-%202026-03-28T155946.354.jpg",
  municipalities: A + "69dd4bf710e2c6e745f99599_shutterstock_1156402066-nostripe%20copy.pdf%20(4).jpg",
  "pharmaceutical-biotech": A + "69c82ef69585103b16a70870_Untitled%20design%20-%202026-03-28T154136.913.jpg",
  "aviation-transportation": C + "69c72e98e50a27d1df9af9d2_transport-1-800x533.jpg",
};

let ok = 0,
  fail = 0;
for (const [slug, url] of Object.entries(MAP)) {
  const dest = join(OUT, `pc-${slug}.jpg`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status}`);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    ok++;
    console.log(`ok  pc-${slug}.jpg`);
  } catch (e) {
    fail++;
    console.log(`ERR ${slug} :: ${e.message}`);
  }
}
console.log(`\nDONE — ${ok} ok, ${fail} failed.`);
