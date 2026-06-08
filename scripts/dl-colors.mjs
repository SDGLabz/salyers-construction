// One-off: localize the Polymer Nation resinous-floor color line (the same chart
// Salyers installs) into /public/images/colors and emit data/coating-colors.json.
// Metallic + redundant flake-size variants and wall/stain specialty products are
// intentionally excluded (residential + commercial floor focus, easy navigation).
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT_IMG = join(ROOT, "public/images/colors");
const B = "https://cdn.prod.website-files.com/695ff43e827b5b99002fc076/";
const B2 = "https://cdn.prod.website-files.com/695ff43c827b5b99002fbf7f/";

const CATS = [
  {
    tab: "Solid Colors",
    slug: "solid",
    note: "100% solids epoxy and topcoat colors — single, uniform color.",
    colors: [
      ["Light Gray", "C-03", B + "69605c1716501c18ee6b98cb_PC%20c-03.png"],
      ["Medium Gray", "C-02", B + "6960642f031659bd4b1bdb54_c-02.png"],
      ["Dark Gray", "C-01", B + "69605f7db19d102728811d7f_c-01.png"],
      ["White", "C-18", B + "696064f72140301a7076d1dc_c-18.png"],
      ["Beige", "C-13", B + "696064a59b0f53076152216c_c-13.png"],
      ["Tan", "C-14", B + "69605fab765ec92139e50716_c-14.png"],
      ["Warm Sun", "C-16", B + "69605aa3d8fa46919d4c76c4_PC%20c-16.png"],
      ["Safety Yellow", "C-17", B + "6960640dbfff9bf0602c83c3_c-17.png"],
      ["Tile Red", "C-12", B + "6960646bf4881e9f9348bd66_c-12.png"],
      ["Blue", "C-05", B + "696064e7ba3b5c5efecc83d4_c-05.png"],
      ["Twilight Blue", "C-06", B + "69606450b19d10272881959b_c-06.png"],
      ["Black", "C-08", B + "696064d1259a56f9f922c7c3_c-08.png"],
    ],
  },
  {
    tab: "Flake Blends",
    slug: "flake",
    note: "Decorative vinyl-flake broadcast blends — the most popular garage and showroom finish.",
    colors: [
      ["Ocean", "327-13", B + "69e291f91032df1dca1a39d1_L_Ocean_327-13L-jh.jpg"],
      ["Camouflage", "327-14", B + "69e2931cc7e92fedc53e09c5_C_Camouflage_327-14L-jh.jpg"],
      ["Argyle", "327-15", B + "69e294d6dd1c576c3a821853_H_Argyle_327-15H-jh.jpg"],
      ["Plantain", "327-16", B + "69e2932827ce441610e9cf7f_D_Plantain_327-16L-jh.jpg"],
      ["Mocha", "327-17", B + "69e293322124b6c8d3b0f853_E_Mocha_327-17L-jh.jpg"],
      ["Terra", "327-18", B + "69e29338d0a83f31611ea851_G_Terra_327-18L-jh.jpg"],
      ["Stratus", "327-19", B + "69e2933e36ef1579cf3a4650_K_Stratus_327-19L-jh.jpg"],
      ["Sandstone", "327-20", B + "69e293451e94ea9607d5f37d_J_Sandstone_327-20L-jh.jpg"],
      ["Paprika", "327-21", B + "69e2934cc1fbfa357134876e_A_Paprika_327-21L-jh.jpg"],
      ["Moss", "327-22", B + "69e29355c07577d46110faa7_I_Moss_327-22L-jh.jpg"],
      ["Tempest", "327-23", B + "69e2935b71a2b40bf8d79a89_B_Tempest_327-23L-jh.jpg"],
      ["Stonehenge", "327-24", B + "69e293644df241189f938782_F_Stonehange_327-24L-jh.jpg"],
    ],
  },
  {
    tab: "Specialty Flake",
    slug: "specialty-flake",
    note: "Bold, high-contrast random-flake blends for a statement floor.",
    colors: [
      ["Seashore", "327-15", B + "69607400254b105bce925e4c_A_Seashore_327-15H-jh_.png"],
      ["Curacao", "327-13", B + "696074e857ce41ef1a5d3eb4_B_Curacao_327-13H-jh.png"],
      ["Sahara", "327-18", B + "696074757909f10bc0c8c330_C_Sahara_327-18H-jh.png"],
      ["Gladiator", "327-24", B + "696074c1c8231b6a09823390_D_Gladiator_327-24H-jh.png"],
      ["Cranberry", "327-15", B + "696073c2680e77a3de36d7f6_F_Cranverry_327-15H-jh.png"],
      ["Confetti", "327-22", B + "69e289b24d0468787f72c22e_G_Confetti_327-22H-jh.jpg"],
      ["Moon Dust", "327-23", B + "6960749bd14187bf5dc0d757_H_MoonDust_327-23H-jh.png"],
      ["Odyssey", "327-19", B + "69e285538b6bc77f3d161eac_327-19_Odyssey.jpg"],
    ],
  },
  {
    tab: "Quartz",
    slug: "quartz",
    note: "Colored-quartz broadcast systems — slip-resistant, extremely durable, ideal for wet and food-service areas.",
    colors: [
      ["Safari", "321-19", B + "69606aa3bd28d032d29e04c1_safari%20321-20.jpeg"],
      ["Auburn Sand", "321-20", B + "69e29ae32c5d89cbece733d1_auburn%20sand%20321-20.jpeg"],
      ["Autumn", "321-21", B + "69606ab5326827d7091f881f_autumn%20321-21.jpeg"],
      ["Purple Haze", "321-22", B + "69606af88a8a1fcde5655b77_purple%20haze%20321-22.jpeg"],
      ["Granite", "321-23", B + "69606bde0f26c45807029cc2_granite%20321-23.jpeg"],
      ["Pumpkin Spice", "321-24", B + "69606b649b0f530761531ce7_pumpkin%20spice%20321-24.jpeg"],
      ["Sapphire", "321-25", B + "69606acb8eea6ea8a1cfb875_Sapphire%20321-25.jpeg"],
      ["Sage Green", "321-26", B + "69606a92d36edc547b526e0e_sage%20green%20321-26.jpeg"],
      ["Arctic Storm", "321-27", B + "69606b19c38a4472a0d2e7cf_arctic%20storm%20321-27.jpeg"],
      ["Azul", "321-28", B + "69606ae281e2e7fffd6c2281_azul%20321-28.jpeg"],
      ["Evergreen", "321-29", B + "69606b2a90b51a444ace4018_evergreen%20321-29.jpeg"],
      ["Crimson Stone", "321-30", B + "69606b452e2e24b441628fcc_crimpson%20stone%20321-30.jpeg"],
    ],
  },
  {
    tab: "Terrazzo",
    slug: "terrazzo",
    note: "Polished terrazzo-look flake and aggregate blends for premium architectural floors.",
    colors: [
      ["Cafe", "1375-02", B + "69e28f7add07c78229bbec59_1375-02_Cafe.jpg"],
      ["Brown Stone", "1375-03", B + "69e28f741b891f22e8dd71c4_1375-03_Brown_Stone.jpg"],
      ["Moonscape", "1375-04", B + "69e28f6c42c5abbf1b62aef2_1375-04_Moonscape.jpg"],
      ["Glacier", "1375-05", B + "69e28f640e5b1f0811093f7b_1375-05_Glacier.jpg"],
      ["Black Ice", "1375-06", B + "69e28f5c238d5bd014f4c121_1375-06_Black_Ice.jpg"],
      ["Tundra", "1375-07", B + "69e28f554170827674a3d6a8_1375-07_Tundra.jpg"],
      ["Canary", "1375-08", B + "69e28f4fa42168bedf69ae99_1375-08_Canary.jpg"],
      ["Rose Stone", "1375-09", B + "69e28f49999c26236e4df286_1375-09_Rose_Stone.jpg"],
      ["Sage", "1375-10", B + "69e28f4215d6360c4c6b8831_1375-10_Sage.jpg"],
      ["Blue Isle", "1375-11", B + "69e28f28f02352af3329e040_1375-11_Blue_Isle.jpg"],
      ["Ocean", "1375-12", B + "69e28f1e153c004f4cd5fd81_1375-12_Ocean.jpg"],
      ["Oatmeal", "326-13", B + "69e270fd939f2d8380f09aab_1776447398946_326-13_oatmeal.jpg"],
      ["Blue Agave", "326-14", B + "69e27106d1bdb24c2647da49_1776447398946_326-14_blue_agave.jpg"],
      ["Grapevine", "326-15", B + "69e271125d57177267864d5b_1776447398947_326-15_grapevine.jpg"],
      ["Quarry", "326-16", B + "69e2711a445d8252ce6d4c19_1776447398947_326-16_quarry.jpg"],
      ["Amber", "326-17", B + "69e2712590f43a15b04cec4a_1776447398946_326-17_amber.jpg"],
      ["Emerald", "326-19", B + "69e27132aae9d59a0ec15948_1776447398946_326-19_emerald.jpg"],
    ],
  },
];

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function dl(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return buf.length;
}

const manifest = [];
let ok = 0,
  fail = 0;
for (const cat of CATS) {
  const out = { tab: cat.tab, slug: cat.slug, note: cat.note, colors: [] };
  for (const [name, code, url] of cat.colors) {
    const ext = (url.split("?")[0].match(/\.(png|jpe?g|webp)$/i)?.[1] || "jpg").toLowerCase();
    const file = `${cat.slug}/${slugify(name)}-${slugify(code)}.${ext === "jpeg" ? "jpg" : ext}`;
    try {
      const bytes = await dl(url, join(OUT_IMG, file));
      out.colors.push({ name, code, file: `/images/colors/${file}` });
      ok++;
      console.log(`ok  ${file} (${bytes}b)`);
    } catch (e) {
      fail++;
      console.log(`ERR ${name} ${code} :: ${e.message}`);
    }
  }
  manifest.push(out);
}
await writeFile(join(ROOT, "data/coating-colors.json"), JSON.stringify(manifest, null, 2));
console.log(`\nDONE — ${ok} ok, ${fail} failed. manifest: data/coating-colors.json`);
