"use client";

import { useState } from "react";
import { products } from "./data/product";
import { categories } from "./data/category";
import {getSpecificationTemplate } from "./data/specifications";

const formatPrice = (price: number) =>
  price.toLocaleString("ru-RU") + " ₸";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все товары");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [orderProduct, setOrderProduct] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [activeCert, setActiveCert] = useState<{ title: string; img: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [orderItem, setOrderItem] = useState<string>(products[0]?.name || "");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientZipCity, setClientZipCity] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
const [cart, setCart] = useState<
  { id: string | number; name: string; price: number; image?: string; quantity: number }[]
>([]);

const addToCart = (product: { id: string | number; name: string; price: number; image?: string }) => {
  setCart((prev) => {
    const existing = prev.find((item) => item.id === product.id);
    if (existing) {
      return prev.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    return [...prev, { ...product, quantity: 1 }];
  });
  setIsCartOpen(true);
};

const updateCartQty = (id: string | number, delta: number) => {
  setCart((prev) =>
    prev
      .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
      .filter((item) => item.quantity > 0)
  );
};

const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "Все товары" || product.category.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const selected = products.find(
    (product) => product.id === selectedProduct
  );

  return (
    <main className="min-h-screen bg-[#080C14] text-white">

     {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B111C]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <a href="#home" className="text-2xl font-black tracking-tight sm:text-3xl">
                NEXORA<span className="text-cyan-400">.</span>
              </a>
              <span className="block text-[10px] font-semibold tracking-widest text-gray-400">
                TECHNOLOGY STORE
              </span>
            </div>

            {/* Быстрая кнопка заказа на телефоне */}
            <a
              href="#order"
              className="rounded-lg bg-cyan-400 px-3 py-1.5 text-xs font-bold text-black sm:hidden"
            >
              Заказать
            </a>
          </div>

          {/* Навигация с плавным скроллом на узких экранах */}
        <nav className="flex items-center gap-4 overflow-x-auto whitespace-nowrap pb-1 text-xs font-semibold sm:gap-6 sm:pb-0 sm:text-sm">
            <a href="#home" className="text-gray-300 transition hover:text-cyan-400">
              Главная
            </a>
            <a href="#catalog" className="text-gray-300 transition hover:text-cyan-400">
              Каталог
            </a>
            <a href="#about" className="text-gray-300 transition hover:text-cyan-400">
              О нас
            </a>
            <a href="#warranty" className="text-gray-300 transition hover:text-cyan-400">
              Гарантия
            </a>
            <a href="#hits" className="text-gray-300 transition hover:text-cyan-400">
              Хиты
            </a>
            <a href="#delivery" className="text-gray-300 transition hover:text-cyan-400">
              Доставка
            </a>
            <a href="#faq" className="text-gray-300 transition hover:text-cyan-400">
              Вопросы
            </a>
            <a href="#order" className="hidden text-cyan-400 transition hover:text-cyan-300 sm:inline">
              Заказать
            </a>
          </nav>
          <button
  type="button"
  onClick={() => setIsCartOpen(true)}
  className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-3.5 py-2 text-xs font-bold text-cyan-400 transition hover:bg-cyan-400 hover:text-black sm:text-sm"
>
  🛒 Корзина
  {totalCartCount > 0 && (
    <span className="rounded-full bg-cyan-400 px-2 py-0.5 text-xs font-black text-black">
      {totalCartCount}
    </span>
  )}
</button>
        </div>
      </header>

      {/* HERO / ГЛАВНАЯ */}
      <section
        id="home"
        className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0E1525] to-[#0B0C14]"
      >
        {/* Декоративное неоновое свечение на фоне */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/15 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
              ★ 100% ОРИГИНАЛ • ОФИЦИАЛЬНАЯ ЛИЦЕНЗИЯ
            </div>

            <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Техника, в которой ты уверен{" "}
              <span className="text-cyan-400">на все 100%</span>
            </h2>

            {/* Цепляющий подзаголовок другим шрифтом (font-mono) */}
            <p className="mt-6 max-w-2xl border-l-2 border-cyan-400 pl-4 font-mono text-sm leading-relaxed text-gray-300 sm:text-base">
              Забудь о серых поставках, вскрытых коробках и сомнительных
              копиях. Каждое из 60 устройств в NEXORA прошло официальную
              сертификацию, имеет заводскую пломбу и пробивается по базе
              производителя до оплаты.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#catalog"
                className="rounded-xl bg-cyan-400 px-7 py-4 text-sm font-bold text-black transition hover:bg-cyan-300"
              >
                Смотреть каталог
              </a>
              <a
                href="#order"
                className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:border-cyan-400/50 hover:text-cyan-400"
              >
                Оформить заказ
              </a>
            </div>
          </div>

          {/* Наши главные преимущества (лицензии, сертификаты, гарантия) */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-[#121829]/80 p-6 transition hover:border-cyan-400/40">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                01 / Сертификат
              </div>
              <div className="mt-2 text-lg font-bold text-white">
                Подтвержденный оригинал
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                Каждый товар сопровождается официальным сертификатом
                подлинности и проверяется по серийному номеру.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121829]/80 p-6 transition hover:border-cyan-400/40">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                02 / Лицензия
              </div>
              <div className="mt-2 text-lg font-bold text-white">
                Официальные поставки
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                Только лицензированная техника с заводскими пломбами — никаких
                восстановленных или «серых» устройств.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121829]/80 p-6 transition hover:border-cyan-400/40">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                03 / Гарантия
              </div>
              <div className="mt-2 text-lg font-bold text-white">
                Защита каждой покупки
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                Официальная гарантия от производителя и полная прозрачность
                всех технических характеристик.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121829]/80 p-6 transition hover:border-cyan-400/40">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                04 / Экспертиза
              </div>
              <div className="mt-2 text-lg font-bold text-white">
                60 лучших моделей
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                Отобрали только проверенные хиты в 6 категориях — с честным
                описанием и реальными фишками.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="mx-auto max-w-7xl px-6 py-16">

        <div className="mb-3 text-xs font-bold tracking-[0.3em] text-cyan-400">
          NEXORA COLLECTION
        </div>

        <h2 className="text-4xl font-black md:text-5xl">
          Каталог товаров
        </h2>

        <p className="mt-4 max-w-xl text-gray-400">
          Современная техника для работы, общения и жизни.
          Выбирай устройства в каталоге NEXORA.
        </p>

        {/* SEARCH */}
        <div className="mt-10">
          <input
            type="search"
            placeholder="Поиск товаров..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#121B29] px-5 py-4 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-400 md:max-w-md"
          />
        </div>

        {/* CATEGORIES */}
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                category === item
                  ? "bg-cyan-400 text-black"
                  : "border border-white/10 bg-[#121B29] text-gray-300 hover:border-cyan-400 hover:text-cyan-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111925] transition hover:border-cyan-400/50"
            >

              {/* PRODUCT IMAGE */}
              <div className="relative flex h-64 w-full items-center justify-center overflow-hidden bg-[#111925]">

                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <div className="text-5xl">📦</div>
                    <div className="mt-2 text-sm">Фото товара</div>
                  </div>
                )}

              </div>

              {/* PRODUCT INFORMATION */}
              <div className="flex flex-1 flex-col p-4">

             <div className="text-xs font-semibold text-cyan-400">
                  {product.category}
                </div>

                <h3 className="mt-2 text-lg font-bold text-white">
                  {product.name}
                </h3>

            

                {/* PRICE */}
                <div className="mt-auto pt-5 text-2xl font-bold text-white">
                  {formatPrice(product.price)}
                </div>

                {/* DETAILS BUTTON */}
                <button
                  onClick={() => setSelectedProduct(product.id)}
                  className="mt-3 w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-900 transition hover:bg-cyan-300"
                >
                  Подробнее о товаре
                </button>

            {/* ORDER BUTTON */}
<button
  type="button"
  onClick={() => addToCart(product)}
  className="mt-2 w-full rounded-xl border border-cyan-400/50 bg-transparent px-4 py-2.5 font-semibold text-cyan-400 transition hover:bg-cyan-400/10"
>
  В корзину
</button>

              </div>
            </article>
          ))}

        </div>

        {filteredProducts.length === 0 && (
          <p className="mt-12 text-center text-gray-400">
            Товары не найдены.
          </p>
        )}

      </section>
    
    {/* ABOUT / О НАС (Раздел 3) */}
      <section
        id="about"
        className="border-t border-white/10 bg-[#0E1320] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Левая колонка: история и подход */}
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
                03 / О МАГАЗИНЕ NEXORA
              </div>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
                Мы не просто продаем гаджеты —{" "}
                <span className="text-cyan-400">мы отбираем лучшие</span>
              </h2>

              <p className="mt-5 font-mono text-sm leading-relaxed text-gray-300 sm:text-base">
                NEXORA создан для тех, кто устал от бесконечного выбора среди
                сотен одинаковых моделей и риска нарваться на подделку. Мы
                вручную протестировали рынок и оставили в каталоге только 60
                устройств, за качество которых отвечаем репутацией.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base">
                Каждый смартфон, планшет, принтер или аксессуар поступает к нам
                по официальным каналам, имеет действующую лицензию и
                проверяется по серийному номеру еще до попадания на витрину.
              </p>

              {/* Мини-статистика */}
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 sm:gap-6">
                <div>
                  <div className="text-2xl font-black text-cyan-400 sm:text-3xl">
                    60
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    отобранных моделей
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-cyan-400 sm:text-3xl">
                    100%
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    лицензий и пломб
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-cyan-400 sm:text-3xl">
                    24/7
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    помощь с выбором
                  </div>
                </div>
              </div>
            </div>

            {/* Правая колонка: карточки принципов */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#121829] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 font-mono text-sm font-bold text-cyan-400">
                  01
                </div>
                <h3 className="mt-4 text-base font-bold text-white">
                  Честные характеристики
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">
                  Никаких скрытых нюансов: указываем реальную емкость батареи,
                  память, комплектацию и уникальные фишки каждой модели.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#121829] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 font-mono text-sm font-bold text-cyan-400">
                  02
                </div>
                <h3 className="mt-4 text-base font-bold text-white">
                  Проверка до оплаты
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">
                  Вы можете сверить IMEI и серийный номер на официальном сайте
                  бренда перед тем, как оплатить покупку.
                </p>
              </div>
    <div className="rounded-2xl border border-white/10 bg-[#121829] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 font-mono text-sm font-bold text-cyan-400">
                  03
                </div>
                <h3 className="mt-4 text-base font-bold text-white">
                  Только новые устройства
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">
                  Мы принципиально не работаем с витринными образцами и
                  восстановленными гаджетами — только запечатанные коробки.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#121829] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 font-mono text-sm font-bold text-cyan-400">
                  04
                </div>
                <h3 className="mt-4 text-base font-bold text-white">
                  Поддержка после покупки
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">
                  Поможем настроить устройство, перенести данные со старого
                  телефона и подскажем по официальному сервису.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    
  {/* WARRANTY & CERTIFICATES / СЕРТИФИКАТЫ И ГАРАНТИЯ (Раздел 4) */}
      <section
        id="warranty"
        className="border-t border-white/10 bg-[#0B0C14] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
              04 / СЕРТИФИКАТЫ И ГАРАНТИЯ
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Документы и защита{" "}
              <span className="text-cyan-400">на каждое устройство</span>
            </h2>
            <p className="mt-4 font-mono text-sm leading-relaxed text-gray-400 sm:text-base">
              Мы работаем прозрачно: на каждую модель в каталоге NEXORA
              предоставляется полный пакет документов, подтверждающий легальный
              ввоз и оригинальность.
            </p>
          </div>

          {/* 3 карточки документов и гарантий */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Карточка 1 */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121829] p-6 transition hover:border-cyan-400/40">
              <div>
                <div className="inline-block rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-xs font-bold text-cyan-400">
                  ЛИЦЕНЗИЯ № NX-2026
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">
                  Сертификат соответствия
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  Подтверждает, что техника прошла обязательную сертификацию,
                  безопасна и полностью соответствует стандартам качества.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setActiveCert({
                      title: "Сертификат соответствия NEXORA",
                      img: "/certificates/cert-1.png",
                    })
                  }
                  className="mt-4 inline-flex items-center gap-1.5 text-left font-mono text-xs font-semibold text-cyan-400 transition hover:text-cyan-300 hover:underline"
                >
                  Нажмите, чтобы открыть документ →
                </button>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4 font-mono text-xs text-gray-500">
                Статус: Действующий • Оригинал
              </div>
            </div>

            {/* Карточка 2 */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121829] p-6 transition hover:border-cyan-400/40">
              <div>
                <div className="inline-block rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-xs font-bold text-cyan-400">
                  ГАРАНТИЯ 12 МЕСЯЦЕВ
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">
                  Официальный сервис
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  Бесплатное гарантийное обслуживание в авторизованных
                  сервисных центрах производителя при наличии гарантийного
                  талона.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setActiveCert({
                      title: "Гарантийный талон 12 месяцев",
                      img: "/certificates/cert-2.png",
                    })
                  }
                  className="mt-4 inline-flex items-center gap-1.5 text-left font-mono text-xs font-semibold text-cyan-400 transition hover:text-cyan-300 hover:underline"
                  >
                  Нажмите, чтобы открыть документ →
                </button>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4 font-mono text-xs text-gray-500">
                Покрытие: Заводской брак 100%
              </div>
            </div>

            {/* Карточка 3 */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121829] p-6 transition hover:border-cyan-400/40">
              <div>
                <div className="inline-block rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-xs font-bold text-cyan-400">
                  ОБМЕН И ВОЗВРАТ
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">
                  14 дней на проверку
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  Если устройство не подошло или вы передумали — обменяем или
                  вернем средства при сохранении товарного вида и пломб.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setActiveCert({
                      title: "Сертификат обмена и возврата 14 дней",
                      img: "/certificates/cert-3.png",
                    })
                  }
                  className="mt-4 inline-flex items-center gap-1.5 text-left font-mono text-xs font-semibold text-cyan-400 transition hover:text-cyan-300 hover:underline"
                >
                  Нажмите, чтобы открыть документ →
                </button>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4 font-mono text-xs text-gray-500">
                Условие: Целостность упаковки
              </div>
            </div>
          </div>

          {/* Плашка проверки по серийному номеру */}
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 to-transparent p-6 sm:flex-row sm:items-center">
            <div>
              <div className="font-mono text-xs font-bold uppercase text-cyan-400">
                Проверка подлинности
              </div>
              <p className="mt-1 text-sm text-gray-300">
                Серийный номер (IMEI / S/N) на коробке совпадает с номером в
                настройках устройства и в базе производителя.
              </p>
            </div>
            <a
              href="#catalog"
              className="shrink-0 rounded-xl border border-cyan-400/40 bg-[#0B0C14] px-5 py-3 text-xs font-bold text-cyan-400 transition hover:bg-cyan-400 hover:text-black"
            >
              Выбрать устройство
            </a>
          </div>
        </div>
      </section>

      {/* EXPERT PICKS / ПОДБОРКА ЭКСПЕРТОВ (Раздел 5) */}
      <section
        id="hits"
        className="border-t border-white/10 bg-[#0E1320] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
                05 / ВЫБОР РЕДАКЦИИ NEXORA
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
                Хиты недели, которые{" "}
                <span className="text-cyan-400">берут чаще всего</span>
              </h2>
              <p className="mt-4 font-mono text-sm leading-relaxed text-gray-400 sm:text-base">
                Мы отобрали 3 бестселлера из разных категорий с лучшим
                соотношением цены, мощности и автономности.
              </p>
            </div>

            <a
              href="#catalog"
              className="self-start font-mono text-xs font-bold text-cyan-400 transition hover:text-cyan-300 sm:self-end"
            >
              Смотреть все 60 моделей →
            </a>
          </div>

          {/* 3 карточки бестселлеров напрямую из твоего каталога */}
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              products.find((p) => p.name.includes("Xiaomi 15")),
              products.find((p) => p.name.includes("Apple AirPods Max USB-C")),
              products.find((p) => p.name.includes("Huawei MatePad 11.5 S")),
            ]
              .filter(Boolean)
              .map((item, idx) => {
                if (!item) return null;
                const badges = ["Хит продаж", "Лучший звук", "Выбор для работы"];
                return (
                  <div
                    key={item.id}
                    className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121829] p-6 transition hover:border-cyan-400/50"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-cyan-400/15 px-3 py-1 font-mono text-xs font-bold text-cyan-400">
                          ★ {badges[idx] || "Выбор NEXORA"}
                        </span>
                        <span className="font-mono text-xs text-gray-500">
                          {item.category}
                        </span>
                      </div>

                      <div className="mt-5 flex h-44 items-center justify-center overflow-hidden rounded-xl bg-white/5 p-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                        />
                      </div>

                      <h3 className="mt-5 text-xl font-bold text-white">
                        {item.name}
                      </h3>

                      {item.features && (
                        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray-400">
                          {item.features}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-black text-white">
                          {item.price.toLocaleString("ru-RU")} ₸
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedProduct(item.id)}
                          className="rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-bold text-black transition hover:bg-cyan-300"
                        >
                          Подробнее
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* DELIVERY & PAYMENT / ДОСТАВКА И ОПЛАТА (Раздел 6) */}
      <section
        id="delivery"
        className="border-t border-white/10 bg-[#0B0C14] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
              06 / КАК МЫ РАБОТАЕМ
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Простой путь от выбора{" "}
              <span className="text-cyan-400">до распаковки</span>
            </h2>
            <p className="mt-4 font-mono text-sm leading-relaxed text-gray-400 sm:text-base">
              Никаких сложных форм и предоплат вслепую — вы проверяете
              оригинальность устройства при получении и только потом оплачиваете.
            </p>
          </div>

          {/* 4 шага оформления */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative rounded-2xl border border-white/10 bg-[#121829] p-6">
              <div className="font-mono text-3xl font-black text-cyan-400/30">
                01
              </div>
              <h3 className="mt-3 text-lg font-bold text-white">
                Выбор в каталоге
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Сравните характеристики, почитайте фишки моделей и оставьте
                заявку на понравившееся устройство.
              </p>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-[#121829] p-6">
              <div className="font-mono text-3xl font-black text-cyan-400/30">
                02
              </div>
              <h3 className="mt-3 text-lg font-bold text-white">
                Бронь и проверка
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Менеджер подтверждает наличие за 10 минут, присылает фото
                заводской пломбы и серийный номер.
              </p>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-[#121829] p-6">
              <div className="font-mono text-3xl font-black text-cyan-400/30">
                03
              </div>
              <h3 className="mt-3 text-lg font-bold text-white">
                Быстрая доставка
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Курьером по Астане в день заказа или экспресс-доставкой по
                всему Казахстану за 1–3 дня.
              </p>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-[#121829] p-6">
              <div className="font-mono text-3xl font-black text-cyan-400/30">
                04
              </div>
              <h3 className="mt-3 text-lg font-bold text-white">
                Оплата при получении
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Осматриваете коробку, сверяете IMEI и оплачиваете картой,
                переводом, наличными или в рассрочку.
              </p>
            </div>
          </div>

          {/* Условия доставки и оплаты */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#121829]/60 p-6">
              <div className="font-mono text-xs font-bold uppercase text-cyan-400">
                Варианты доставки
              </div>
              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                <li>• Экспресс-курьер по Астане — бесплатно при заказе от 50 000 ₸</li>
                <li>• Доставка до двери по Казахстану (СДЭК / Казпочта) — 1–3 дня</li>
                <li>• Самовывоз из шоурума NEXORA с проверкой на месте</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#121829]/60 p-6">
              <div className="font-mono text-xs font-bold uppercase text-cyan-400">
                Способы оплаты
              </div>
              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                <li>• Kaspi QR / Kaspi Red и рассрочка 0-0-12</li>
                <li>• Банковской картой Visa / Mastercard при получении</li>
                <li>• Безналичный расчет с закрывающими документами для юрлиц</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / ЧАСТЫЕ ВОПРОСЫ (Раздел 7) */}
      <section
        id="faq"
        className="border-t border-white/10 bg-[#0E1320] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
              07 / ОТВЕТЫ НА ВОПРОСЫ
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Часто задаваемые{" "}
              <span className="text-cyan-400">вопросы</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-mono text-sm leading-relaxed text-gray-400 sm:text-base">
              Собрали ответы на то, что чаще всего спрашивают перед покупкой
              техники в NEXORA.
            </p>
          </div>

          <div className="mt-12 space-y-3">
            {[
              {
                q: "Как убедиться, что техника 100% оригинальная, а не копия?",
                a: "Все устройства поставляются в запечатанных заводских коробках с оригинальными пломбами. До оплаты вы можете сверить серийный номер (IMEI / S/N) на официальном сайте Apple, Samsung, Huawei или другого бренда.",
              },
              {
                q: "Есть ли официальная гарантия и что делать при поломке?",
                a: "Да, на всю технику действует официальная гарантия 12 месяцев. К каждому заказу прилагается гарантийный талон NEXORA и сертификат соответствия — обслуживание проходит в авторизованных сервисных центрах.",
              },
              {
                q: "Сколько времени занимает доставка по Астане и Казахстану?",
                a: "По Астане курьер доставляет заказ в день оформления (обычно в течение 2–3 часов). По другим городам Казахстана отправка занимает от 1 до 3 рабочих дней до двери.",
              },
              {
                q: "Можно ли оформить покупку в рассрочку?",
                a: "Да, доступна оплата через Kaspi QR, Kaspi Red, а также беспроцентная рассрочка 0-0-12. Оплата производится только после осмотра и проверки устройства.",
              },
              {
                q: "Что делать, если товар не подойдет?",
                a: "В течение 14 календарных дней с момента покупки вы можете обменять устройство или оформить полный возврат средств, если сохранены заводская упаковка, пломбы и товарный вид.",
              },
            ].map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#121829] transition hover:border-cyan-400/40"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-sm font-bold text-white sm:text-base">
                      {item.q}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 font-mono text-lg font-bold text-cyan-400">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/5 px-6 pb-5 pt-3 text-sm leading-relaxed text-gray-400">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* ORDER / ЗАКАЗАТЬ (Раздел 8) */}
      <section
        id="order"
        className="border-t border-white/10 bg-gradient-to-b from-[#0B0C14] to-[#0E1525] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-3xl border border-cyan-400/25 bg-[#121829]/90 p-6 shadow-2xl sm:p-10 md:p-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
              {/* Левая часть: описание процесса */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1 font-mono text-xs font-bold uppercase text-cyan-400">
                  08 / ОФОРМЛЕНИЕ ЗАКАЗА
                </div>

                <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                  Заполните данные и отправьте{" "}
                  <span className="text-cyan-400">в WhatsApp</span>
                </h2>

                <p className="mt-4 font-mono text-sm leading-relaxed text-gray-300">
                  Укажите ваше имя, телефон, город с индексом и нужный товар.
                  После нажатия кнопки телефон автоматически откроет чат с
                  менеджером NEXORA с уже заполненной заявкой.
                </p>

                <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm text-gray-300">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-bold text-cyan-400">
                      1
                    </span>
                    <span>Заполняете форму справа за 20 секунд</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-bold text-cyan-400">
                      2
                    </span>
                    <span>Нажимаете «Отправить» и подтверждаете сообщение в WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-bold text-cyan-400">
                      3
                    </span>
                    <span>Оплачиваете заказ только при получении после проверки</span>
                  </div>
                </div>
              </div>

              {/* Правая часть: обязательная форма заказа */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const managerPhone = "77020748711"; // Замени на номер менеджера без плюса
                  const message =
                    `Здравствуйте! Хочу оформить заказ в NEXORA.\n\n `+
                    `• Товар: ${orderItem}\n` +
                    `• ФИО: ${clientName}\n` +
                    `• Телефон: ${clientPhone}\n` +
                    `• Город и индекс: ${clientZipCity}\n\n` +
                    `Оплата при получении после проверки.`;

                 const whatsappUrl = `https://wa.me/${managerPhone}?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                }}
                className="space-y-4 rounded-2xl border border-white/10 bg-[#0B0C14]/80 p-6"
              >
                <div>
                  <label className="block font-mono text-xs font-semibold uppercase text-gray-400">
                    1. Ваше полное имя (ФИО) *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
      onChange={(e) => setClientName(e.target.value)}
                    placeholder="Например: Ахметова Алия Сериковна"
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#121829] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase text-gray-400">
                    2. Ваш номер телефона *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+7 (777) 123-45-67"
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#121829] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase text-gray-400">
                    3. Город и почтовый индекс *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientZipCity}
                    onChange={(e) => setClientZipCity(e.target.value)}
                    placeholder="Например: Астана, 010000"
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#121829] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase text-gray-400">
                    4. Товар для заказа *
                  </label>
                  <select
                    required
                    value={orderItem}
                    onChange={(e) => setOrderItem(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#121829] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                  >
                    {products.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name} — {item.price.toLocaleString("ru-RU")} ₸
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-sm font-black text-black transition hover:bg-[#20bd5a]"
                >
                  Отправить заказ в WhatsApp →
                </button>

                <p className="text-center font-mono text-[11px] text-gray-500">
                  Откроется WhatsApp с готовым текстом — останется нажать «Отправить»
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT DETAILS MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="my-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#111925] p-6 sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >

            

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between">
              <p className="font-bold tracking-wide text-cyan-400">
                NEXORA / ТОВАР
              </p>

              <button
                onClick={() => setSelectedProduct(null)}
                className="rounded-full px-3 py-2 text-xl transition hover:bg-white/10"
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>

            {/* PRODUCT NAME */}
            <h2 className="mt-6 text-3xl font-black">
              {selected.name}
            </h2>

            {/* PRODUCT PRICE */}
            <p className="mt-3 text-3xl font-black text-cyan-400">
              {formatPrice(selected.price)}
            </p>

         {/* SPECIFICATIONS */}
<div className="mt-8">
  <h3 className="mb-4 text-lg font-bold">
    Характеристики
  </h3>
{(() => {
  const template = getSpecificationTemplate(selected.category);

  const categoryValues: Record<string, Record<string, string | number | undefined>> = {
  "Смартфоны": {
    "Год выпуска": selected.year,
    "Встроенная память": selected.memory,
    "Оперативная память": selected.ram,
    "Экран": selected.screen,
    "Процессор": selected.processor,
    "Основная камера": selected.camera,
    "Фронтальная камера": selected.frontCamera,
    "Батарея": selected.battery,
    "Операционная система": selected.os ?? selected.system,
    "Подключение": selected.connectivity,
    "Разъем зарядки": selected.charging,
    "Особенности": selected.features,
  },

  "iPhone": {
    "Год выпуска": selected.year,
    "Встроенная память": selected.memory,
    "Оперативная память": selected.ram,
    "Экран": selected.screen,
    "Процессор": selected.processor,
    "Основная камера": selected.camera,
    "Фронтальная камера": selected.frontCamera,
    "Батарея": selected.battery,
    "Операционная система": selected.os ?? selected.system ?? "iOS",
    "Подключение": selected.connectivity,
    "Разъем зарядки": selected.charging,
    "Особенности": selected.features,
  },

  "Планшеты": {
    "Год выпуска": selected.year,
    "Встроенная память": selected.memory,
    "Оперативная память": selected.ram,
    "Экран": selected.screen,
    "Процессор": selected.processor,
    "Камера": selected.camera,
    "Батарея": selected.battery,
    "Операционная система": selected.os ?? selected.system,
    "Подключение": selected.connectivity,
    "Особенности": selected.features,
  },

  "Принтеры": {
    "Тип печати": selected.printType ?? selected.description,
    "Цветность": selected.colorMode ?? "Цветная / Черно-белая",
    "Скорость печати": selected.printSpeed ?? "Стандартная",
    "Разрешение печати": selected.resolution ?? "Высокое (до 4800×1200 dpi)",
    "Подключение": selected.connectivity,
    "Формат бумаги": selected.paperFormat ?? "A4, A5, B5, конверты",
    "Особенности": selected.features,
  },

  "Зарядные устройства": {
    "Мощность": selected.charging,
    "Количество портов": selected.ports ?? (selected.name.toLowerCase().includes("cable") ? "Кабель (2 коннектора)" : "1–2 порта"),
    "Тип разъема": selected.connectorType ?? "USB-C",
    "Быстрая зарядка": selected.fastCharge ?? (selected.features?.includes("Power Delivery") ? "Power Delivery (PD)" : "Поддерживается"),
    "Совместимость": selected.os ?? selected.system,
    "Длина кабеля": selected.cableLength ?? (selected.name.toLowerCase().includes("cable") ? "1.8 м" : "Без кабеля в комплекте"),
    "Особенности": selected.features,
  },

  "Наушники": {
    "Тип наушников": selected.type ?? selected.description,
    "Тип подключения": selected.connectivity,
    "Тип конструкции": selected.design ?? (selected.description?.toLowerCase().includes("полноразмер") ? "Полноразмерные, закрытые" : "Внутриканальные / Накладные"),
    "Шумоподавление": selected.noiseCancellation ?? (selected.features?.includes("ANC") ? "Активное (ANC)" : "Пассивное"),
    "Время работы": selected.battery,
    "Разъем зарядки": selected.charging ?? "USB-C",
    "Микрофон": selected.microphone ?? "Встроенный",
    "Совместимость": selected.os ?? selected.system,
    "Особенности": selected.features,
    "Комплектация": selected.комплектация,
  },
};

  const currentMap = categoryValues[selected.category] || {};

  // Оставляем только те строки, которые есть в шаблоне и заполнены у товара
  const specifications = template
    .map((label) => [label, currentMap[label]] as [string, string | number | undefined])
    .filter(
      ([, value]) => value !== null && value !== undefined && value !== ""
    );
      

    return specifications.length > 0 ? (
      <div className="divide-y divide-white/10">
        {specifications.map(([label, value]) => (
          <div
            key={String(label)}
            className={
              label === "Особенности"
                ? "flex flex-col gap-3 py-5"
                : "flex flex-col gap-1 py-3 sm:flex-row sm:justify-between"
            }
          >
            <span className="text-sm text-gray-400">
              {label}
            </span>

            <span
              className={
                label === "Особенности"
                  ? "text-base font-semibold italic leading-8 tracking-wide text-cyan-100"
                  : "text-sm font-semibold sm:max-w-[60%] sm:text-right"
              }
            >
              {String(value)}
            </span>
          </div>
        ))}
      </div>
    ) : (
      <p className="py-5 text-sm text-gray-400">
        Характеристики пока не добавлены.
      </p>
    );
  })()}
</div>

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-8 w-full rounded-xl bg-cyan-400 py-4 font-bold text-black transition hover:bg-cyan-300"
            >
              Закрыть
            </button>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-gray-500">
        © 2026 NEXORA
      </footer>
    {/* ORDER MODAL */}
{orderProduct && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#12161f] p-6 text-white shadow-2xl">
      {!orderSuccess ? (
        <>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Оформление заказа
            </span>
            <button
              onClick={() => setOrderProduct(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <h3 className="mt-2 text-xl font-bold">{orderProduct}</h3>
          <p className="mt-1 text-sm text-gray-400">
            Оставьте контакты, и менеджер свяжется с вами для подтверждения.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setOrderSuccess(true);
            }}
            className="mt-4 space-y-3"
          >
            <input
              type="text"
              required
              placeholder="Ваше имя"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
            />
            <input
              type="tel"
              required
              placeholder="+7 (_) _--"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-cyan-400 py-3 font-semibold text-black transition hover:bg-cyan-300"
            >
              Подтвердить заказ
            </button>
          </form>
        </>
      ) : (
        <div className="py-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/20 text-2xl text-cyan-400">
            ✓
          </div>
          <h3 className="mt-3 text-xl font-bold">Заказ принят!</h3>
          <p className="mt-1 text-sm text-gray-400">
            Мы получили заявку на <span className="text-white">{orderProduct}</span> и скоро свяжемся с вами.
          </p>
          <button
            onClick={() => setOrderProduct(null)}
            className="mt-5 w-full rounded-xl bg-cyan-400 py-3 font-semibold text-black transition hover:bg-cyan-300"
          >
            Отлично
          </button>
        </div>
      )}
    </div>
  </div>
)}

{/* CERTIFICATE LIGHTBOX MODAL */}
{activeCert && (
  <div
    onClick={() => setActiveCert(null)}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-2xl rounded-2xl border border-white/15 bg-[#121829] p-4 sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-bold text-white sm:text-lg">
          {activeCert.title}
        </h3>
        <button
          onClick={() => setActiveCert(null)}
          className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-gray-300 hover:bg-white/20 hover:text-white"
        >
          ✕ Закрыть
        </button>
      </div>
      <img
        src={activeCert.img}
        alt={activeCert.title}
        className="max-h-[75vh] w-full rounded-xl object-contain"
      />
    </div>
  </div>
)}

{/* CART DRAWER / КОРЗИНА */}
{isCartOpen && (
  <div
    onClick={() => setIsCartOpen(false)}
    className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex h-full w-full max-w-md flex-col justify-between border-l border-white/10 bg-[#0E1320] p-6 text-white shadow-2xl"
    >
      {/* Верх корзины */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl font-black">Корзина NEXORA</h3>
          <p className="font-mono text-xs text-gray-400">
            Товаров: {totalCartCount} шт.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsCartOpen(false)}
          className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-gray-300 hover:bg-white/20 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* Список товаров */}
      <div className="my-4 flex-1 space-y-3 overflow-y-auto pr-1">
        {cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="font-mono text-sm text-gray-400">
              В корзине пока пусто
            </p>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="mt-4 rounded-xl bg-cyan-400 px-5 py-2.5 text-xs font-bold text-black"
            >
              Перейти в каталог
            </button>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#121829] p-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-xl bg-white/5 object-contain p-1.5"
              />
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-bold text-white">
                  {item.name}
                </h4>
                <div className="mt-1 font-mono text-xs text-cyan-400">
                  {(item.price * item.quantity).toLocaleString("ru-RU")} ₸
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateCartQty(item.id, -1)}
                    className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-xs font-bold hover:bg-white/20"
                  >
                    −
                  </button>
                  <span className="font-mono text-xs font-bold">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateCartQty(item.id, 1)}
                    className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-xs font-bold hover:bg-white/20"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Низ корзины: итого и отправка в WhatsApp */}
      {cart.length > 0 && (
        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center justify-between text-base font-bold">
            <span className="text-gray-400">Итого к оплате:</span>
            <span className="text-xl font-black text-cyan-400">
              {totalCartPrice.toLocaleString("ru-RU")} ₸
            </span>
          </div>
          <p className="mt-1 font-mono text-[11px] text-gray-500">
            Оплата при получении после проверки пломбы
          </p>
<button
            type="button"
            onClick={() => {
              const managerPhone = "77020748711"; // Твой номер менеджера без плюса
              const itemsList = cart
                .map(
                  (item, i) =>
                    `${i + 1}. ${item.name} (${item.quantity} шт.) — ${(
                      item.price * item.quantity
                    ).toLocaleString("ru-RU")} ₸`
                )
                .join("\n");

              const message =
                `Здравствуйте! Хочу оформить заказ в NEXORA:\n\n `+
                `${itemsList}\n\n`+
                `Итого: ${totalCartPrice.toLocaleString("ru-RU")} ₸\n` +
                `Оплата при получении после проверки.`;

              window.open(
                `https://wa.me/${managerPhone}?text=${encodeURIComponent(message)}`,
                "_blank",
                "noopener,noreferrer"
              );
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-black text-black transition hover:bg-[#20bd5a]"
          >
            Оформить заказ в WhatsApp →
          </button>
        </div>
      )}
    </div>
  </div>
)}

    </main>
  );
}
    