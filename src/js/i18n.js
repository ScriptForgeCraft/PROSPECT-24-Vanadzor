const STORAGE_KEY = "prospect24_language";
const DEFAULT_LANGUAGE = "hy";
const SUPPORTED_LANGUAGES = ["hy", "ru", "en"];

const languageLogos = {
  hy: "/images/logo.webp",
  ru: "/images/logo(ru).webp",
  en: "/images/logo(en).webp",
};

const valuationFiles = {
  hy: [
    { file: "./files/ք. Վանաձոր, Բանակի 8-4 հիմնական-signed.pdf", title: "Վանաձոր Բանակի փ. 8-4" },
    { file: "./files/Վանաձոր, Բանակի 8-11.pdf", title: "Վանաձոր Բանակի փ.8-11" },
  ],
  ru: [
    { file: "./files/ք. Վանաձոր, Բանակի 8-4 հիմնական-signed.pdf", title: "Ванадзор, ул. Банаки 8-4" },
    { file: "./files/Վանաձոր, Բանակի 8-11.pdf", title: "Ванадзор, ул. Банаки 8-11" },
  ],
  en: [
    { file: "./files/ք. Վանաձոր, Բանակի 8-4 հիմնական-signed.pdf", title: "Vanadzor, Banaki St. 8-4" },
    { file: "./files/Վանաձոր, Բանակի 8-11.pdf", title: "Vanadzor, Banaki St. 8-11" },
  ],
};

const imageLabels = {
  hy: "Պատկեր",
  ru: "Изображение",
  en: "Image",
};

const pdfLabels = {
  hy: "Ներբեռնել PDF փաստաթուղթ",
  ru: "Скачать PDF-документ",
  en: "Download PDF document",
};

function makeImageTranslations(lang) {
  return Object.fromEntries(
    Array.from({ length: 17 }, (_, index) => [
      `gallery.image${index + 1}`,
      `${imageLabels[lang]} ${index + 1}`,
    ]),
  );
}

function makePdfTranslations(lang) {
  return Object.fromEntries(
    [1, 2, 3, 5, 6, 7, 8, 9, 12, 13].map((index) => [
      `download.pdf${index}`,
      `${pdfLabels[lang]} ${index}`,
    ]),
  );
}

const translations = {
  hy: {
    "meta.title": "Վանաձոր | Մարզ Լոռի, համայնք Վանաձոր Վանաձոր ք. Բանակի փողոց 8/11 շենք",
    "common.logo": "Լոգո",

    "language.switcherLabel": "Լեզվի ընտրություն",
    "language.hyLabel": "Հայերեն",
    "language.ruLabel": "Русский",
    "language.enLabel": "English",

    "nav.desktopLabel": "Հիմնական նավիգացիա",
    "nav.mobileLabel": "Բջջային նավիգացիա",
    "nav.menuOpen": "Բացել մենյուն",
    "nav.components": "Փաթեթի բաղադրիչներ",
    "nav.documents": "Փաստաթղթեր",
    "nav.valuation": "Գնահատում",

    "hero.title": "ՊԵՏԱԿԱՆ ԳՈՒՅՔԻ\nՕՏԱՐՄԱՆ ՆԵՐԴՐՈՒՄԱՅԻՆ\nՓԱԹԵԹ",
    "components.title": "ՆԵՐԴՐՈՒՄԱՅԻՆ ՓԱԹԵԹԻ ԲԱՂԱԴՐԻՉՆԵՐ",
    "components.location": "Մարզ Լոռի, համայնք Վանաձոր Վանաձոր ք. Բանակի փողոց 8/11 շենք",

    "gallery.mainImage": "Գլխավոր պատկեր",
    "gallery.previousImage": "Նախորդ պատկեր",
    "gallery.nextImage": "Հաջորդ պատկեր",
    "gallery.previous": "Նախորդ",
    "gallery.next": "Հաջորդ",
    "gallery.valuationLeft": "ձախ պատկեր",
    "gallery.valuationRight": "աջ պատկեր",
    "gallery.zoomView": "դիտում",

    "details.title": "ՄԱՐԶ ԼՈՌԻ, ՀԱՄԱՅՆՔ ՎԱՆԱՁՈՐ ՎԱՆԱՁՈՐ Ք. ԲԱՆԱԿԻ ՓՈՂՈՑ",
    "details.point1": "1․ Մարզ Լոռի, համայնք Վանաձոր Վանաձոր ք. Բանակի փողոց 8-4 հիվանդանոցային համալիրի մասնաշենքեր հասցեում գոյություն ունի ենթակայան 27 քմ մակերեսով, որը ենթակա է վերազինման և սպասարկելու է Բանակի փողոց 8/11 հասցեի գույքերին։",
    "details.point2": "2․ Մարզ Լոռի, համայնք Վանաձոր Վանաձոր ք. Բանակի փողոց 8/11 շենք հասցեում գտնվող շինությունները վերկառուցվելու են և օգտագործվելու են որպես հասարակական կառույցներ։ Գոյություն ունեցող շենք՝ 2200մ2։",
    "details.newConstructionIntro": "Իրականացվելու է նաև նոր կառուցապատում հետևյալ նկարագրությամբ։",
    "details.newConstructionBody": "ՀՀ Լոռու մարզ, համայնք Վանաձոր, ք. Վանաձոր, Բանակի փողոց 8/11 հասցեում առաջարկվում է կառուցվել է 7 նոր մասնաշենք՝ 4 տիպային հատակագծով։ Տարածքում առկա շինություններից երեքը կարող են վերակառուցվել և օգտագործվել որպես հասարակական կառույցներ։",
    "details.buildingSizesTitle": "Նախատեսվող հարկաչափերը և նախագծվող շենքերի չափերը՝",
    "details.buildingSize1": "1-ին տիպային մասնաշենքից 1 հատ՝ 23,5x17,0 մ, Կառուցապատման մակերես՝ 400 մ²",
    "details.buildingSize2": "2-րդ տիպային մասնաշենքից 3 հատ՝ (30*17 մ) X*3, Կառուցապատման մակերես՝ 1530 մ²",
    "details.buildingSize3": "3-րդ տիպային մասնաշենքից 2 հատ՝ (17x 36.5 մ) *2, Կառուցապատման մակերես՝ 1240 մ²",
    "details.buildingSize4": "4-րդ մասնաշենքից 1 հատ՝ 41,25x17.0 մ և 28,25x17.0 մ, Կառուցապատման մակերես՝ 1181 մ²",
    "details.buildingSize5": "Թենիսի կորտ 18.0x30.5մ, պարիսպի h=1.8մ, երկարությունը՝ 876մ",
    "details.buildingSize6": "Ստորգետնյա ավտոկայանատեղի 226 մեքենայի համար՝ 8540 մ²",

    "docs.sketchTask": "Էսքիզային առաջադրանք",
    "docs.certificate": "Վկայական",
    "docs.scheme": "Սխեմա",
    "docs.seismic": "Սեյսմիկ",
    "docs.veoliaWater": "Վեոլիա ջուր",
    "docs.ena": "ՀԷՑ",
    "docs.gazprom": "Գազպրոմ",
    "docs.designPermit": "Նախագծման Թույլտվություն",
    "docs.article60Restriction": "60-րդ հոդվածի սահմանափակում",
    "docs.businessCalculation": "Բիզնես հաշվարկ",
    "docs.investmentCalculationFile": "Ներդրումային Հաշվարկ.xlsx",
    "docs.valuationReport": "Գնահատում",
    "docs.valuationFiles": valuationFiles.hy,
    "docs.defaultDocument": "Փաստաթուղթ",

    "download.single": "Ներբեռնել",
    "download.all": "Ներբեռնել բոլորը",
    "download.infoPdf": "Ներբեռնել տեղեկատվությունը (.pdf)",
    "download.progress": "Ներբեռնում...",

    "valuation.title": "ՆԵՐԴՐՈՒՄԱՅԻՆ ՓԱԹԵԹԻ ԳՆԱՀԱՏՈՒՄ",
    "valuation.currency": "ՀՀ դրամ",

    "modal.fullscreen": "Ամբողջ էկրանով",
    "modal.close": "Փակել",
    "modal.loading": "Բեռնում...",
    "modal.error": "Փաստաթուղթը չհաջողվեց բեռնել։",
    "modal.retry": "Խնդրում ենք նորից փորձել։",

    "zoom.in": "Մեծացնել",
    "zoom.inTitle": "Մեծացնել (+ կամ մկնիկի անիվ)",
    "zoom.out": "Փոքրացնել",
    "zoom.outTitle": "Փոքրացնել (- կամ մկնիկի անիվ)",
    "zoom.reset": "Վերականգնել",

    "settings.open": "Կարգավորումներ",
    "settings.textSize": "ՏԵՔՍՏԻ ՉԱՓ",
    "settings.colorTheme": "ԳՈՒՆԱՅԻՆ ԹԵՄԱ",
    "settings.light": "Լուսավոր",
    "settings.dark": "Մութ",

    "footer.contact": "Կապ մեզ հետ",
    "footer.addressLabel": "Հասցե",
    "footer.addressValue": "Երևան, 0010, Տիգրան Մեծի պող. 4",
    "footer.copyAddress": "Պատճենել հասցեն",
    "footer.copyPhone": "Պատճենել հեռախոսահամարը",
    "footer.copyEmail": "Պատճենել էլ. փոստը",
    "footer.copyTitle": "Սեղմեք պատճենելու համար",
    "footer.phoneLabel": "Հեռախոս",
    "footer.emailLabel": "Էլ. փոստ",
    "footer.links": "Հղումներ",
    "footer.socialNetworks": "Սոցիալական Ցանցեր",
    "footer.copied": "Պատճենված",

    "labels.view": "👁 Դիտել",

    ...makeImageTranslations("hy"),
    ...makePdfTranslations("hy"),
  },

  ru: {
    "meta.title": "Ванадзор | Лорийская область, община Ванадзор, г. Ванадзор, ул. Банаки, здание 8/11",
    "common.logo": "Логотип",

    "language.switcherLabel": "Выбор языка",
    "language.hyLabel": "Армянский",
    "language.ruLabel": "Русский",
    "language.enLabel": "Английский",

    "nav.desktopLabel": "Основная навигация",
    "nav.mobileLabel": "Мобильная навигация",
    "nav.menuOpen": "Открыть меню",
    "nav.components": "Состав пакета",
    "nav.documents": "Документы",
    "nav.valuation": "Оценка",

    "hero.title": "ИНВЕСТИЦИОННЫЙ ПАКЕТ\nПО ОТЧУЖДЕНИЮ\nГОСУДАРСТВЕННОГО ИМУЩЕСТВА",
    "components.title": "СОСТАВ ИНВЕСТИЦИОННОГО ПАКЕТА",
    "components.location": "Лорийская область, община Ванадзор, г. Ванадзор, ул. Банаки, здание 8/11",

    "gallery.mainImage": "Главное изображение",
    "gallery.previousImage": "Предыдущее изображение",
    "gallery.nextImage": "Следующее изображение",
    "gallery.previous": "Предыдущее",
    "gallery.next": "Следующее",
    "gallery.valuationLeft": "левое изображение",
    "gallery.valuationRight": "правое изображение",
    "gallery.zoomView": "просмотр",

    "details.title": "ЛОРИЙСКАЯ ОБЛАСТЬ, ОБЩИНА ВАНАДЗОР, Г. ВАНАДЗОР, УЛИЦА БАНАКИ",
    "details.point1": "1. По адресу: Лорийская область, община Ванадзор, г. Ванадзор, ул. Банаки 8-4, корпуса больничного комплекса, имеется подстанция площадью 27 кв. м, которая подлежит модернизации и будет обслуживать объекты по адресу ул. Банаки 8/11.",
    "details.point2": "2. Строения, расположенные по адресу: Лорийская область, община Ванадзор, г. Ванадзор, ул. Банаки, здание 8/11, будут реконструированы и использоваться как общественные здания. Существующее здание: 2200 м².",
    "details.newConstructionIntro": "Также будет осуществлено новое строительство со следующим описанием.",
    "details.newConstructionBody": "По адресу: Республика Армения, Лорийская область, община Ванадзор, г. Ванадзор, ул. Банаки 8/11 предлагается построить 7 новых корпусов по 4 типовым планировкам. Три существующих на территории строения могут быть реконструированы и использованы как общественные здания.",
    "details.buildingSizesTitle": "Предусмотренные этажности и размеры проектируемых зданий:",
    "details.buildingSize1": "1 корпус 1-го типового вида: 23,5x17,0 м, площадь застройки: 400 м²",
    "details.buildingSize2": "3 корпуса 2-го типового вида: (30*17 м) X*3, площадь застройки: 1530 м²",
    "details.buildingSize3": "2 корпуса 3-го типового вида: (17x36.5 м) *2, площадь застройки: 1240 м²",
    "details.buildingSize4": "1 корпус 4-го вида: 41,25x17.0 м и 28,25x17.0 м, площадь застройки: 1181 м²",
    "details.buildingSize5": "Теннисный корт 18.0x30.5 м, забор h=1.8 м, длина: 876 м",
    "details.buildingSize6": "Подземная автостоянка на 226 автомобилей: 8540 м²",

    "docs.sketchTask": "Эскизное задание",
    "docs.certificate": "Свидетельство",
    "docs.scheme": "Схема",
    "docs.seismic": "Сейсмика",
    "docs.veoliaWater": "Веолия Вода",
    "docs.ena": "Электрические сети Армении",
    "docs.gazprom": "Газпром",
    "docs.designPermit": "Разрешение на проектирование",
    "docs.article60Restriction": "Ограничение по статье 60",
    "docs.businessCalculation": "Бизнес-расчет",
    "docs.investmentCalculationFile": "Инвестиционный расчет.xlsx",
    "docs.valuationReport": "Оценка",
    "docs.valuationFiles": valuationFiles.ru,
    "docs.defaultDocument": "Документ",

    "download.single": "Скачать",
    "download.all": "Скачать все",
    "download.infoPdf": "Скачать информацию (.pdf)",
    "download.progress": "Загрузка...",

    "valuation.title": "ОЦЕНКА ИНВЕСТИЦИОННОГО ПАКЕТА",
    "valuation.currency": "драм",

    "modal.fullscreen": "Во весь экран",
    "modal.close": "Закрыть",
    "modal.loading": "Загрузка...",
    "modal.error": "Не удалось загрузить документ.",
    "modal.retry": "Пожалуйста, попробуйте снова.",

    "zoom.in": "Увеличить",
    "zoom.inTitle": "Увеличить (+ или колесо мыши)",
    "zoom.out": "Уменьшить",
    "zoom.outTitle": "Уменьшить (- или колесо мыши)",
    "zoom.reset": "Сбросить",

    "settings.open": "Настройки",
    "settings.textSize": "РАЗМЕР ТЕКСТА",
    "settings.colorTheme": "ЦВЕТОВАЯ ТЕМА",
    "settings.light": "Светлая",
    "settings.dark": "Темная",

    "footer.contact": "Свяжитесь с нами",
    "footer.addressLabel": "Адрес",
    "footer.addressValue": "Ереван, 0010, пр. Тиграна Меца, 4",
    "footer.copyAddress": "Скопировать адрес",
    "footer.copyPhone": "Скопировать номер телефона",
    "footer.copyEmail": "Скопировать эл. почту",
    "footer.copyTitle": "Нажмите, чтобы скопировать",
    "footer.phoneLabel": "Телефон",
    "footer.emailLabel": "Эл. почта",
    "footer.links": "Ссылки",
    "footer.socialNetworks": "Социальные сети",
    "footer.copied": "Скопировано",

    "labels.view": "👁 Смотреть",

    ...makeImageTranslations("ru"),
    ...makePdfTranslations("ru"),
  },

  en: {
    "meta.title": "Vanadzor | Lori Province, Vanadzor community, Vanadzor, Banaki Street, building 8/11",
    "common.logo": "Logo",

    "language.switcherLabel": "Language selection",
    "language.hyLabel": "Armenian",
    "language.ruLabel": "Russian",
    "language.enLabel": "English",

    "nav.desktopLabel": "Main navigation",
    "nav.mobileLabel": "Mobile navigation",
    "nav.menuOpen": "Open menu",
    "nav.components": "Package components",
    "nav.documents": "Documents",
    "nav.valuation": "Valuation",

    "hero.title": "INVESTMENT PACKAGE\nFOR ALIENATION OF\nSTATE PROPERTY",
    "components.title": "INVESTMENT PACKAGE COMPONENTS",
    "components.location": "Lori Province, Vanadzor community, Vanadzor, Banaki Street, building 8/11",

    "gallery.mainImage": "Main image",
    "gallery.previousImage": "Previous image",
    "gallery.nextImage": "Next image",
    "gallery.previous": "Previous",
    "gallery.next": "Next",
    "gallery.valuationLeft": "left image",
    "gallery.valuationRight": "right image",
    "gallery.zoomView": "view",

    "details.title": "LORI PROVINCE, VANADZOR COMMUNITY, VANADZOR, BANAKI STREET",
    "details.point1": "1. At the address Lori Province, Vanadzor community, Vanadzor, Banaki Street 8-4, hospital complex buildings, there is a 27 sq. m substation that is subject to re-equipment and will serve the properties at Banaki Street 8/11.",
    "details.point2": "2. The structures located at Lori Province, Vanadzor community, Vanadzor, Banaki Street, building 8/11 will be reconstructed and used as public buildings. Existing building: 2200 m².",
    "details.newConstructionIntro": "New construction will also be carried out with the following description.",
    "details.newConstructionBody": "At the address Republic of Armenia, Lori Province, Vanadzor community, Vanadzor, Banaki Street 8/11, it is proposed to construct 7 new buildings with 4 typical layouts. Three existing structures on the site may be reconstructed and used as public buildings.",
    "details.buildingSizesTitle": "Planned floor counts and sizes of the designed buildings:",
    "details.buildingSize1": "1 building of type 1: 23.5x17.0 m, building footprint: 400 m²",
    "details.buildingSize2": "3 buildings of type 2: (30*17 m) X*3, building footprint: 1530 m²",
    "details.buildingSize3": "2 buildings of type 3: (17x36.5 m) *2, building footprint: 1240 m²",
    "details.buildingSize4": "1 building of type 4: 41.25x17.0 m and 28.25x17.0 m, building footprint: 1181 m²",
    "details.buildingSize5": "Tennis court 18.0x30.5 m, fence h=1.8 m, length: 876 m",
    "details.buildingSize6": "Underground parking for 226 cars: 8540 m²",

    "docs.sketchTask": "Sketch design assignment",
    "docs.certificate": "Certificate",
    "docs.scheme": "Scheme",
    "docs.seismic": "Seismic",
    "docs.veoliaWater": "Veolia Water",
    "docs.ena": "Electric Networks of Armenia",
    "docs.gazprom": "Gazprom",
    "docs.designPermit": "Design permit",
    "docs.article60Restriction": "Article 60 restriction",
    "docs.businessCalculation": "Business calculation",
    "docs.investmentCalculationFile": "Investment Calculation.xlsx",
    "docs.valuationReport": "Valuation",
    "docs.valuationFiles": valuationFiles.en,
    "docs.defaultDocument": "Document",

    "download.single": "Download",
    "download.all": "Download all",
    "download.infoPdf": "Download information (.pdf)",
    "download.progress": "Downloading...",

    "valuation.title": "INVESTMENT PACKAGE VALUATION",
    "valuation.currency": "AMD",

    "modal.fullscreen": "Fullscreen",
    "modal.close": "Close",
    "modal.loading": "Loading...",
    "modal.error": "The document could not be loaded.",
    "modal.retry": "Please try again.",

    "zoom.in": "Zoom in",
    "zoom.inTitle": "Zoom in (+ or mouse wheel)",
    "zoom.out": "Zoom out",
    "zoom.outTitle": "Zoom out (- or mouse wheel)",
    "zoom.reset": "Reset",

    "settings.open": "Settings",
    "settings.textSize": "TEXT SIZE",
    "settings.colorTheme": "COLOR THEME",
    "settings.light": "Light",
    "settings.dark": "Dark",

    "footer.contact": "Contact us",
    "footer.addressLabel": "Address",
    "footer.addressValue": "4 Tigran Mets Ave., Yerevan, 0010",
    "footer.copyAddress": "Copy address",
    "footer.copyPhone": "Copy phone number",
    "footer.copyEmail": "Copy email",
    "footer.copyTitle": "Click to copy",
    "footer.phoneLabel": "Phone",
    "footer.emailLabel": "Email",
    "footer.links": "Links",
    "footer.socialNetworks": "Social networks",
    "footer.copied": "Copied",

    "labels.view": "👁 View",

    ...makeImageTranslations("en"),
    ...makePdfTranslations("en"),
  },
};

let currentLanguage = getSavedLanguage();

function isSupportedLanguage(lang) {
  return SUPPORTED_LANGUAGES.includes(lang);
}

function getSavedLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isSupportedLanguage(saved) ? saved : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

function saveLanguage(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // localStorage can be unavailable in restricted browser modes.
  }
}

function getTranslation(key, lang = currentLanguage) {
  const safeLang = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const value = translations[safeLang]?.[key];

  if (value !== undefined) return value;
  return translations[DEFAULT_LANGUAGE]?.[key] ?? "";
}

function getLanguageLogo(lang = currentLanguage) {
  const safeLang = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  return languageLogos[safeLang] ?? languageLogos[DEFAULT_LANGUAGE];
}

function toAttributeValue(value) {
  if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
    return JSON.stringify(value);
  }

  return String(value);
}

function parseAttributeMap(value) {
  return value
    .split(";")
    .map((pair) => pair.trim())
    .filter(Boolean)
    .map((pair) => {
      const separatorIndex = pair.indexOf(":");
      if (separatorIndex === -1) return null;

      return {
        attr: pair.slice(0, separatorIndex).trim(),
        key: pair.slice(separatorIndex + 1).trim(),
      };
    })
    .filter(Boolean);
}

function cssString(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getDownloadProgressPercent(text) {
  const cleanText = text.trim();

  for (const lang of SUPPORTED_LANGUAGES) {
    const label = getTranslation("download.progress", lang);
    const match = cleanText.match(new RegExp(`^${escapeRegExp(label)}\\s*(\\d+)%$`));
    if (match) return match[1];
  }

  return null;
}

function applyCssText(lang) {
  document.documentElement.style.setProperty(
    "--i18n-view-label",
    cssString(getTranslation("labels.view", lang)),
  );
  document.documentElement.style.setProperty(
    "--i18n-loading-label",
    cssString(getTranslation("modal.loading", lang)),
  );
}

function applyLanguageLogos(lang) {
  document.querySelectorAll("[data-i18n-logo]").forEach((image) => {
    image.src = getLanguageLogo(lang);
  });
}

function translateDynamicText(lang = currentLanguage) {
  document.querySelectorAll(".smart-download").forEach((element) => {
    const progress = getDownloadProgressPercent(element.textContent);

    if (progress !== null) {
      const nextText = `${getTranslation("download.progress", lang)} ${progress}%`;
      if (element.textContent !== nextText) {
        element.textContent = nextText;
      }
    }
  });

  const toast = typeof document.getElementById === "function"
    ? document.getElementById("toast")
    : null;

  if (toast?.textContent.trim() === "✓ Պատճենված") {
    const nextText = `✓ ${getTranslation("footer.copied", lang)}`;
    if (toast.textContent !== nextText) {
      toast.textContent = nextText;
    }
  }
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

function showCopyToast() {
  const toast = typeof document.getElementById === "function"
    ? document.getElementById("toast")
    : null;

  if (!toast) return;

  toast.textContent = `✓ ${getTranslation("footer.copied")}`;
  if (toast.classList.contains("show")) return;

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 800);
}

function copyContactValue(element) {
  const number = element.dataset.number;
  const text = element.dataset.text || number;

  if (number && isMobileDevice()) {
    window.location.href = `tel:${number}`;
    return;
  }

  if (!text || !navigator.clipboard) return;

  navigator.clipboard.writeText(text).then(showCopyToast);
}

function initContactCopyHandlers() {
  document.querySelectorAll(".contact-value").forEach((element) => {
    if (element.dataset.i18nCopyReady === "true") return;
    element.dataset.i18nCopyReady = "true";

    element.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        copyContactValue(element);
      },
      true,
    );

    element.addEventListener(
      "keypress",
      (event) => {
        if (event.key !== "Enter") return;

        event.preventDefault();
        event.stopImmediatePropagation();
        copyContactValue(element);
      },
      true,
    );
  });
}

function initDynamicTextObservers() {
  if (typeof MutationObserver === "undefined") return;

  const observer = new MutationObserver(() => {
    translateDynamicText();
  });

  document.querySelectorAll(".smart-download, #toast").forEach((element) => {
    observer.observe(element, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  });
}

function applyLanguage(lang, options = {}) {
  const safeLang = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  currentLanguage = safeLang;

  if (options.persist !== false) {
    saveLanguage(safeLang);
  }

  document.documentElement.lang = safeLang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = getTranslation(element.dataset.i18n, safeLang);
    element.textContent = toAttributeValue(value);
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    parseAttributeMap(element.dataset.i18nAttr).forEach(({ attr, key }) => {
      const value = getTranslation(key, safeLang);
      element.setAttribute(attr, toAttributeValue(value));
    });
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    const isActive = button.dataset.lang === safeLang;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  applyLanguageLogos(safeLang);
  applyCssText(safeLang);
  translateDynamicText(safeLang);

  window.dispatchEvent(
    new CustomEvent("prospect24:languagechange", {
      detail: { lang: safeLang },
    }),
  );
}

function initLanguageSwitcher() {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.lang);
    });
  });

  applyLanguage(currentLanguage, { persist: false });
  initContactCopyHandlers();
  initDynamicTextObservers();
}

window.prospectI18n = {
  applyLanguage,
  getLanguage: () => currentLanguage,
  getLogoSrc: getLanguageLogo,
  t: getTranslation,
  translations,
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLanguageSwitcher);
} else {
  initLanguageSwitcher();
}
