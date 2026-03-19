export interface UgLetter {
  id: number
  name: { ug: string; zh: string; en: string }
  unicode: string
  forms: { isolated: string; initial: string; medial: string; final: string }
  romanized: string
  type: 'vowel' | 'consonant'
  connects: boolean
  keyboardKey: string
}

export const letters: UgLetter[] = [
  {
    id: 1, name: { ug: 'ھەمزە', zh: '罕则', en: 'Hemze' },
    unicode: '\u0626', forms: { isolated: 'ئ', initial: 'ئ', medial: 'ئ', final: 'ئ' },
    romanized: '\'', type: 'vowel', connects: true, keyboardKey: ']',
  },
  {
    id: 2, name: { ug: 'ئا', zh: '阿', en: 'A' },
    unicode: '\u0627', forms: { isolated: 'ا', initial: 'ا', medial: 'ـا', final: 'ـا' },
    romanized: 'a', type: 'vowel', connects: false, keyboardKey: 'h',
  },
  {
    id: 3, name: { ug: 'ئە', zh: '额', en: 'E' },
    unicode: '\u06D5', forms: { isolated: 'ە', initial: 'ئە', medial: 'ـە', final: 'ـە' },
    romanized: 'e', type: 'vowel', connects: false, keyboardKey: 'g',
  },
  {
    id: 4, name: { ug: 'بە', zh: '拜', en: 'Be' },
    unicode: '\u0628', forms: { isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب' },
    romanized: 'b', type: 'consonant', connects: true, keyboardKey: 'i',
  },
  {
    id: 5, name: { ug: 'پە', zh: '派', en: 'Pe' },
    unicode: '\u067E', forms: { isolated: 'پ', initial: 'پـ', medial: 'ـپـ', final: 'ـپ' },
    romanized: 'p', type: 'consonant', connects: true, keyboardKey: 'u',
  },
  {
    id: 6, name: { ug: 'تە', zh: '特', en: 'Te' },
    unicode: '\u062A', forms: { isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت' },
    romanized: 't', type: 'consonant', connects: true, keyboardKey: 'o',
  },
  {
    id: 7, name: { ug: 'جىم', zh: '吉木', en: 'Jim' },
    unicode: '\u062C', forms: { isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج' },
    romanized: 'j', type: 'consonant', connects: true, keyboardKey: '[',
  },
  {
    id: 8, name: { ug: 'چە', zh: '切', en: 'Che' },
    unicode: '\u0686', forms: { isolated: 'چ', initial: 'چـ', medial: 'ـچـ', final: 'ـچ' },
    romanized: 'ch', type: 'consonant', connects: true, keyboardKey: 'p',
  },
  {
    id: 9, name: { ug: 'خە', zh: '赫', en: 'Khe' },
    unicode: '\u062E', forms: { isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ' },
    romanized: 'kh', type: 'consonant', connects: true, keyboardKey: 'l',
  },
  {
    id: 10, name: { ug: 'دال', zh: '达勒', en: 'Dal' },
    unicode: '\u062F', forms: { isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد' },
    romanized: 'd', type: 'consonant', connects: false, keyboardKey: ';',
  },
  {
    id: 11, name: { ug: 'رە', zh: '热', en: 'Re' },
    unicode: '\u0631', forms: { isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر' },
    romanized: 'r', type: 'consonant', connects: false, keyboardKey: 'j',
  },
  {
    id: 12, name: { ug: 'زە', zh: '泽', en: 'Ze' },
    unicode: '\u0632', forms: { isolated: 'ز', initial: 'ز', medial: 'ـز', final: 'ـز' },
    romanized: 'z', type: 'consonant', connects: false, keyboardKey: '.',
  },
  {
    id: 13, name: { ug: 'ژە', zh: '热（浊）', en: 'Zhe' },
    unicode: '\u0698', forms: { isolated: 'ژ', initial: 'ژ', medial: 'ـژ', final: 'ـژ' },
    romanized: 'zh', type: 'consonant', connects: false, keyboardKey: '/',
  },
  {
    id: 14, name: { ug: 'سىن', zh: '斯', en: 'Sin' },
    unicode: '\u0633', forms: { isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس' },
    romanized: 's', type: 'consonant', connects: true, keyboardKey: 'm',
  },
  {
    id: 15, name: { ug: 'شىن', zh: '什', en: 'Shin' },
    unicode: '\u0634', forms: { isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش' },
    romanized: 'sh', type: 'consonant', connects: true, keyboardKey: 'n',
  },
  {
    id: 16, name: { ug: 'غەين', zh: '额因', en: 'Ghein' },
    unicode: '\u063A', forms: { isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ' },
    romanized: 'gh', type: 'consonant', connects: true, keyboardKey: 'x',
  },
  {
    id: 17, name: { ug: 'فە', zh: '发', en: 'Fe' },
    unicode: '\u0641', forms: { isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف' },
    romanized: 'f', type: 'consonant', connects: true, keyboardKey: 'b',
  },
  {
    id: 18, name: { ug: 'قاف', zh: '喀夫', en: 'Qaf' },
    unicode: '\u0642', forms: { isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق' },
    romanized: 'q', type: 'consonant', connects: true, keyboardKey: 'v',
  },
  {
    id: 19, name: { ug: 'كاف', zh: '卡夫', en: 'Kaf' },
    unicode: '\u0643', forms: { isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك' },
    romanized: 'k', type: 'consonant', connects: true, keyboardKey: 'c',
  },
  {
    id: 20, name: { ug: 'گاف', zh: '嘎夫', en: 'Gaf' },
    unicode: '\u06AF', forms: { isolated: 'گ', initial: 'گـ', medial: 'ـگـ', final: 'ـگ' },
    romanized: 'g', type: 'consonant', connects: true, keyboardKey: 'z',
  },
  {
    id: 21, name: { ug: 'ڭە', zh: '额（鼻音）', en: 'Ng' },
    unicode: '\u06AD', forms: { isolated: 'ڭ', initial: 'ڭـ', medial: 'ـڭـ', final: 'ـڭ' },
    romanized: 'ng', type: 'consonant', connects: true, keyboardKey: 'a',
  },
  {
    id: 22, name: { ug: 'لام', zh: '拉木', en: 'Lam' },
    unicode: '\u0644', forms: { isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل' },
    romanized: 'l', type: 'consonant', connects: true, keyboardKey: 'k',
  },
  {
    id: 23, name: { ug: 'مىم', zh: '米木', en: 'Mim' },
    unicode: '\u0645', forms: { isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم' },
    romanized: 'm', type: 'consonant', connects: true, keyboardKey: ',',
  },
  {
    id: 24, name: { ug: 'نۇن', zh: '努恩', en: 'Nun' },
    unicode: '\u0646', forms: { isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن' },
    romanized: 'n', type: 'consonant', connects: true, keyboardKey: 'y',
  },
  {
    id: 25, name: { ug: 'ھە', zh: '赫', en: 'He' },
    unicode: '\u06BE', forms: { isolated: 'ھ', initial: 'ھـ', medial: 'ـھـ', final: 'ـھ' },
    romanized: 'h', type: 'consonant', connects: true, keyboardKey: 'e',
  },
  {
    id: 26, name: { ug: 'ئو', zh: '奥', en: 'O' },
    unicode: '\u0648', forms: { isolated: 'و', initial: 'و', medial: 'ـو', final: 'ـو' },
    romanized: 'o', type: 'vowel', connects: false, keyboardKey: 'd',
  },
  {
    id: 27, name: { ug: 'ئۇ', zh: '乌', en: 'U' },
    unicode: '\u06C7', forms: { isolated: 'ۇ', initial: 'ۇ', medial: 'ـۇ', final: 'ـۇ' },
    romanized: 'u', type: 'vowel', connects: false, keyboardKey: 's',
  },
  {
    id: 28, name: { ug: 'ئۆ', zh: '欧', en: 'Ö' },
    unicode: '\u06C6', forms: { isolated: 'ۆ', initial: 'ۆ', medial: 'ـۆ', final: 'ـۆ' },
    romanized: 'ö', type: 'vowel', connects: false, keyboardKey: 'f',
  },
  {
    id: 29, name: { ug: 'ئۈ', zh: '于', en: 'Ü' },
    unicode: '\u06C8', forms: { isolated: 'ۈ', initial: 'ۈ', medial: 'ـۈ', final: 'ـۈ' },
    romanized: 'ü', type: 'vowel', connects: false, keyboardKey: 'r',
  },
  {
    id: 30, name: { ug: 'ۋە', zh: '维', en: 'We' },
    unicode: '\u06CB', forms: { isolated: 'ۋ', initial: 'ۋ', medial: 'ـۋ', final: 'ـۋ' },
    romanized: 'w', type: 'consonant', connects: false, keyboardKey: 'w',
  },
  {
    id: 31, name: { ug: 'ئې', zh: '诶', en: 'É' },
    unicode: '\u06D0', forms: { isolated: 'ې', initial: 'ئې', medial: 'ـې', final: 'ـې' },
    romanized: 'é', type: 'vowel', connects: false, keyboardKey: 't',
  },
  {
    id: 32, name: { ug: 'ئى', zh: '衣', en: 'I' },
    unicode: '\u0649', forms: { isolated: 'ى', initial: 'ئى', medial: 'ـى', final: 'ـى' },
    romanized: 'i', type: 'vowel', connects: false, keyboardKey: 'q',
  },
]
