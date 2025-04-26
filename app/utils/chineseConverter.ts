// This is a simplified version of a Chinese converter
// For a production app, consider using a comprehensive conversion library
// like OpenCC or a third-party API

// Common character mappings (simplified to traditional)
const simplifiedToTraditional: Record<string, string> = {
  书: '書',
  说: '說',
  语: '語',
  词: '詞',
  东: '東',
  西: '西',
  北: '北',
  南: '南',
  云: '雲',
  车: '車',
  马: '馬',
  风: '風',
  龙: '龍',
  门: '門',
  长: '長',
  国: '國',
  中: '中',
  华: '華',
  人: '人',
  民: '民',
  共: '共',
  时: '時',
  间: '間',
  电: '電',
  话: '話',
  学: '學',
  习: '習',
  为: '為',
  这: '這',
  个: '個',
  们: '們',
  来: '來',
  去: '去',
  做: '做',
  事: '事',
  情: '情',
  爱: '愛',
  动: '動',
  物: '物',
  种: '種',
  类: '類',
  对: '對',
  错: '錯',
  无: '無',
  有: '有',
  会: '會',
  见: '見',
  不: '不',
  是: '是',
  的: '的',
  了: '了',
  在: '在',
  就: '就',
  都: '都',
  与: '與',
  以: '以',
  把: '把',
  从: '從',
};

// Traditional to simplified mapping (reverse of the above)
const traditionalToSimplified: Record<string, string> = {};
for (const [s, t] of Object.entries(simplifiedToTraditional)) {
  traditionalToSimplified[t] = s;
}

export function convertToTraditional(text: string): string {
  return text
    .split('')
    .map((char) => simplifiedToTraditional[char] || char)
    .join('');
}

export function convertToSimplified(text: string): string {
  return text
    .split('')
    .map((char) => traditionalToSimplified[char] || char)
    .join('');
}
