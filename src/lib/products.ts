import k1 from "@/assets/products/k1-oddiy-kokteyl.jpg";
import k2 from "@/assets/products/k2-kuyov-kokteyl.jpg";
import k3 from "@/assets/products/k3-banan-kokteyl.jpg";
import k4 from "@/assets/products/k4-qulupnay-kokteyl.jpg";
import s1 from "@/assets/products/s1-apelsin-olma.jpg";
import s2 from "@/assets/products/s2-qulupnay-apelsin.jpg";
import s3 from "@/assets/products/s3-mix-smuzi.jpg";
import s4 from "@/assets/products/s4-detox.jpg";
import m1 from "@/assets/products/m1-laym-moxito.jpg";
import m2 from "@/assets/products/m2-qulupnay-moxito.jpg";
import m3 from "@/assets/products/m3-okean-moxito.jpg";
import m4 from "@/assets/products/m4-ananas-moxito.jpg";
import m5 from "@/assets/products/m5-apelsin-moxito.jpg";
import m6 from "@/assets/products/m6-malina-moxito.jpg";
import v1 from "@/assets/products/v1-raspberry-chill.jpg";
import v2 from "@/assets/products/v2-choco-boom.jpg";
import v3 from "@/assets/products/v3-berry-delight.jpg";

export type Category = {
  id: string;
  name: string;
  emoji: string;
};

export type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: string;
  image: string;
  ingredients: string[];
};

export const categories: Category[] = [
  { id: "kokteyl", name: "Kokteyllar", emoji: "🍹" },
  { id: "smuzi", name: "Smuzilar", emoji: "🥤" },
  { id: "moxito", name: "Moxitolar", emoji: "❄️" },
  { id: "vafli", name: "Vaflilar", emoji: "🧇" },
];

export const formatSum = (n: number) => `${n.toLocaleString("ru-RU")} so'm`;

export const products: Product[] = [
  // Kokteyllar
  { id: "k1", name: "Oddiy Kokteyl", desc: "Klassik sut kokteyli", price: 22000, category: "kokteyl", image: k1, ingredients: ["Sut", "Muz", "Vanil", "Shakar"] },
  { id: "k2", name: "Kuyov Kokteyl", desc: "Maxsus retsept", price: 32000, category: "kokteyl", image: k2, ingredients: ["Sut", "Banan", "Asal", "Yong'oq"] },
  { id: "k3", name: "Banan Kokteyl", desc: "Kremsimon banan zavqi", price: 28000, category: "kokteyl", image: k3, ingredients: ["Banan", "Sut", "Muz", "Asal"] },
  { id: "k4", name: "Qulupnay Kokteyl", desc: "Yangi qulupnay ta'mi", price: 30000, category: "kokteyl", image: k4, ingredients: ["Qulupnay", "Sut", "Shakar", "Muz"] },

  // Smuzilar
  { id: "s1", name: "Apelsin + Olma", desc: "Vitaminga to'la mix", price: 26000, category: "smuzi", image: s1, ingredients: ["Apelsin", "Olma", "Muz"] },
  { id: "s2", name: "Qulupnay + Apelsin", desc: "Yorqin yozgi ta'm", price: 28000, category: "smuzi", image: s2, ingredients: ["Qulupnay", "Apelsin", "Muz"] },
  { id: "s3", name: "Mix Smuzi", desc: "Premium meva mixi", price: 32000, category: "smuzi", image: s3, ingredients: ["Banan", "Qulupnay", "Olma", "Asal"] },
  { id: "s4", name: "Detox", desc: "Yashil detoks ichimligi", price: 30000, category: "smuzi", image: s4, ingredients: ["Ismaloq", "Olma", "Limon", "Yalpiz"] },

  // Moxitolar
  { id: "m1", name: "Laym Moxito", desc: "Klassik salqin laym", price: 24000, category: "moxito", image: m1, ingredients: ["Laym", "Yalpiz", "Soda", "Muz"] },
  { id: "m2", name: "Qulupnay Moxito", desc: "Shirin va salqin", price: 26000, category: "moxito", image: m2, ingredients: ["Qulupnay", "Yalpiz", "Soda", "Muz"] },
  { id: "m3", name: "Okean Moxito", desc: "Ko'k tropik mojito", price: 28000, category: "moxito", image: m3, ingredients: ["Blue curacao", "Laym", "Soda", "Muz"] },
  { id: "m4", name: "Ananas Moxito", desc: "Tropik ananas zavqi", price: 28000, category: "moxito", image: m4, ingredients: ["Ananas", "Yalpiz", "Soda", "Muz"] },
  { id: "m5", name: "Apelsin Moxito", desc: "Sitrus svejest", price: 26000, category: "moxito", image: m5, ingredients: ["Apelsin", "Yalpiz", "Soda", "Muz"] },
  { id: "m6", name: "Malina Moxito", desc: "Berry premium", price: 28000, category: "moxito", image: m6, ingredients: ["Malina", "Yalpiz", "Soda", "Muz"] },

  // Vaflilar
  { id: "v1", name: "Raspberry Chill", desc: "Malinali premium vafli", price: 38000, category: "vafli", image: v1, ingredients: ["Vafli", "Malina", "Krem", "Shakar pudrasi"] },
  { id: "v2", name: "Choco Boom", desc: "Shokoladli portlash", price: 42000, category: "vafli", image: v2, ingredients: ["Vafli", "Shokolad", "Yong'oq", "Krem"] },
  { id: "v3", name: "Berry Delight", desc: "Aralash rezavor zavqi", price: 40000, category: "vafli", image: v3, ingredients: ["Vafli", "Qulupnay", "Malina", "Ko'kqovun"] },
];
