import 'server-only';

const dictionaries = {
  'en-US': () =>
    import('@app/_dictionaries/en.json').then((module) => module.default),
  'ar-SA': () =>
    import('@app/_dictionaries/ar.json').then((module) => module.default),
  'es-ES': () =>
    import('@app/_dictionaries/es.json').then((module) => module.default),
  'fr-FR': () =>
    import('@app/_dictionaries/fr.json').then((module) => module.default),
  'it-IT': () =>
    import('@app/_dictionaries/it.json').then((module) => module.default),
  'zh-CN': () =>
    import('@app/_dictionaries/zh.json').then((module) => module.default),
};

export const getDictionary = async (locale) => {
  return dictionaries[locale]();
};
