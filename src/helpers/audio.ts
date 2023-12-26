const player = new Audio();
// const audioCache: Record<string, any> = {};

export const audio = async (audio: string, type: 1 | 2 = 1) => {
  // const cacheKey = `${audio}-${type}`;
  // if (audioCache[cacheKey]) {
  //   return audioCache[cacheKey];
  // }
  const url = `https://dict.youdao.com/dictvoice?audio=${audio}&type=${type}`;
  player.src = url;
  player.play();
  // const response = await fetch(url);
  // console.log(response);
  // audioCache[cacheKey] = await response.arrayBuffer();
  // return audioCache[cacheKey];
};
