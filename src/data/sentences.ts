export interface Sentence {
  id: number
  ug: string
  zh: string
  en: string
  text: string // alias for ug, used in typing practice
  difficulty: 'easy' | 'medium' | 'hard'
  category: 'greeting' | 'proverb' | 'daily' | 'literature'
}

function s(
  id: number,
  ug: string,
  zh: string,
  en: string,
  difficulty: Sentence['difficulty'],
  category: Sentence['category'],
): Sentence {
  return { id, ug, zh, en, text: ug, difficulty, category }
}

export const sentences: Sentence[] = [
  // ===== easy — greeting =====
  s(1, 'ياخشىمۇسىز', '你好', 'Hello', 'easy', 'greeting'),
  s(2, 'خوش كەلدىڭىز', '欢迎', 'Welcome', 'easy', 'greeting'),
  s(3, 'رەھمەت سىزگە', '谢谢你', 'Thank you', 'easy', 'greeting'),
  s(4, 'خەيرلىك تىلەيمەن', '祝你好运', 'Good luck', 'easy', 'greeting'),
  s(5, 'ياخشى كۈن', '美好的一天', 'Good day', 'easy', 'greeting'),
  s(6, 'كەچۈرۈڭ', '对不起', 'Excuse me', 'easy', 'greeting'),
  s(7, 'خوش', '再见', 'Goodbye', 'easy', 'greeting'),
  s(8, 'ھەئە، ياخشى', '是的，好的', 'Yes, okay', 'easy', 'greeting'),

  // ===== easy — daily =====
  s(9, 'بۈگۈن ھاۋا ناھايىتى ياخشى', '今天天气非常好', 'The weather is very nice today', 'easy', 'daily'),
  s(10, 'مەن ئۇيغۇرچە سۆزلىيەلەيمەن', '我会说维吾尔语', 'I can speak Uyghur', 'easy', 'daily'),
  s(11, 'سىز قايەردىن كەلدىڭىز', '你从哪里来', 'Where are you from', 'easy', 'daily'),
  s(12, 'بۇ كىتاب ناھايىتى پايدىلىق', '这本书非常有用', 'This book is very useful', 'easy', 'daily'),

  // ===== medium — proverb =====
  s(13, 'ئانا تىلى — ئالتۇن تىل', '母语是金子般的语言', 'The mother tongue is a golden language', 'medium', 'proverb'),
  s(14, 'بىلىم — بايلىق', '知识就是财富', 'Knowledge is wealth', 'medium', 'proverb'),
  s(15, 'تىل بىلگەن ئەل بىلەر', '懂语言者懂世界', 'One who knows languages knows the world', 'medium', 'proverb'),
  s(16, 'تىرىشچانلىق مۇۋەپپەقىيەتنىڭ ئانىسى', '勤奋是成功之母', 'Diligence is the mother of success', 'medium', 'proverb'),
  s(17, 'ياخشى دوست ئالتۇندىن قىممەت', '好朋友比金子珍贵', 'A good friend is more precious than gold', 'medium', 'proverb'),
  s(18, 'ئاز سۆزلە، كۆپ ئاڭلا', '少说多听', 'Speak less, listen more', 'medium', 'proverb'),
  s(19, 'ئىش بىلەن ئاش كېلەر', '有劳动才有食物', 'Food comes with work', 'medium', 'proverb'),
  s(20, 'ئۆگەنمەك ئۈچۈن ھېچقاچان كېچ ئەمەس', '学习永远不晚', 'It is never too late to learn', 'medium', 'proverb'),
  s(21, 'سۇ ھايات مەنبەسى', '水是生命之源', 'Water is the source of life', 'medium', 'proverb'),
  s(22, 'بىرلىك بولسا ئىش بىتەر', '团结就能成事', 'Unity gets things done', 'medium', 'proverb'),

  // ===== medium — daily =====
  s(23, 'ئۇيغۇر تىلىنى ئۆگىنىش ناھايىتى قىزىقارلىق', '学习维吾尔语非常有趣', 'Learning Uyghur is very interesting', 'medium', 'daily'),
  s(24, 'ھەر كۈنى بىر ئاز مەشىق قىلىڭ', '每天练习一点', 'Practice a little every day', 'medium', 'daily'),
  s(25, 'كىتاب ئوقۇش بىلىمنىڭ ئاچقۇچى', '读书是知识的钥匙', 'Reading is the key to knowledge', 'medium', 'daily'),
  s(26, 'ئانا تىلىنى ئۆگىنىش ھەر بىر ئىنساننىڭ بۇرچى', '学习母语是每个人的义务', 'Learning the mother tongue is everyone\'s duty', 'medium', 'daily'),
  s(27, 'ساۋاقداشلار بىلەن بىللە ئۆگىنىش ياخشى', '和同学一起学习很好', 'It is good to study with classmates', 'medium', 'daily'),
  s(28, 'مەشىق قىلسىڭىز ماھىر بولىسىز', '多练习就会熟练', 'If you practice you will become skilled', 'medium', 'daily'),

  // ===== hard — literature =====
  s(29, 'ئۇيغۇر مەدەنىيىتى مىڭ يىللىق تارىخقا ئىگە بولغان بايلىقتۇر', '维吾尔文化是拥有千年历史的财富', 'Uyghur culture is a treasure with a thousand years of history', 'hard', 'literature'),
  s(30, 'ئاز ئاز ئۆگەنسەڭ كۆپ بىلىسەن، كۆپ بىلسەڭ يىراق بارىسەن', '积少成多，知识越多走得越远', 'Learn little by little and you will know a lot; know a lot and you will go far', 'hard', 'literature'),
  s(31, 'ھەر بىر كۈن يېڭى باشلىنىش، ھەر بىر ئادىم يېڭى ئۈمىد', '每一天都是新的开始，每一步都是新的希望', 'Every day is a new beginning, every step is a new hope', 'hard', 'literature'),
  s(32, 'بىلىم بايلىقتىن قىممەتلىك، چۈنكى بىلىمنى ھېچكىم تارتىۋالالمايدۇ', '知识比财富珍贵，因为知识无人能夺走', 'Knowledge is more precious than wealth, for no one can take knowledge away', 'hard', 'literature'),
  s(33, 'ئىشلەپچىقىرىش كۈچلۈك بولسا يۇرت گۈللىنىدۇ، ئىلىم ئۆسسە خەلق راۋاجلىنىدۇ', '生产强大则国家繁荣，科学发展则人民进步', 'When production is strong the country prospers; when science grows the people advance', 'hard', 'literature'),
  s(34, 'تىلنى ساقلاش مىللەتنى ساقلاشتۇر، مەدەنىيەتنى ساقلاش كەلگۈسىنى ساقلاشتۇر', '保护语言就是保护民族，保护文化就是保护未来', 'Preserving language is preserving the nation; preserving culture is preserving the future', 'hard', 'literature'),
  s(35, 'ئائىلە ئەڭ مۇھىم نەرسە، ئائىلىدىكى مۇھەببەت ئەڭ چوڭ بايلىق', '家庭是最重要的，家庭中的爱是最大的财富', 'Family is the most important thing; love in the family is the greatest wealth', 'hard', 'literature'),

  // ===== hard — proverb (complex) =====
  s(36, 'ئالتۇن قاچان بولسىمۇ ئالتۇن، تۆمۈر قاچان بولسىمۇ تۆمۈر', '金子永远是金子，铁永远是铁', 'Gold is always gold, iron is always iron', 'hard', 'proverb'),
  s(37, 'ئاقىلنىڭ ئازابى بار، نادانلىقنىڭ ئازابى كۆپ', '智者有少许苦恼，愚者有无尽苦恼', 'The wise have little suffering, the ignorant have much', 'hard', 'proverb'),
  s(38, 'يىراقتىكى سۇدىن يېقىندىكى ئوت ياخشى', '远水不如近火', 'Nearby fire is better than distant water', 'hard', 'proverb'),
]

export const words: string[] = [
  'كىتاب', 'مەكتەپ', 'ئوقۇغۇچى', 'مۇئەللىم', 'دوست',
  'ئائىلە', 'بالا', 'ئانا', 'ئاتا', 'ئاكا',
  'سىنگىل', 'ئۇكا', 'يۇرت', 'شەھەر', 'يېزا',
  'تاغ', 'دەريا', 'ئاسمان', 'يەر', 'گۈل',
  'دەرەخ', 'قۇش', 'ئات', 'قوي', 'ئىت',
  'پىشىق', 'نان', 'سۇ', 'چاي', 'تاماق',
  'ئۆي', 'ئىشىك', 'كۆزنەك', 'ئورۇنتۇق', 'ئۈستەل',
  'قەلەم', 'دەپتەر', 'سائەت', 'تېلېفون', 'كومپيۇتېر',
]
