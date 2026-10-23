import fs from "node:fs";
import path from "node:path";

const [,, src, dest] = process.argv;
const j = JSON.parse(fs.readFileSync(src, "utf8"));
let b64 = j.data;
if (!b64 && j.result?.value) {
  const v = j.result.value;
  b64 = String(v).includes("base64,") ? String(v).split("base64,").pop() : v;
}
if (!b64) throw new Error("No image data in " + src);
const buf = Buffer.from(b64, "base64");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, buf);
console.log(dest, {
  w: buf.readUInt32BE(16),
  h: buf.readUInt32BE(20),
  bytes: buf.length,
});
