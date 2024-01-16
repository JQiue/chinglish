import dayjs from "dayjs";
import "dayjs/locale/zh-cn.js";

dayjs.locale("zh-cn");

/**
 * @description: 返回格式化后的当前日期时间
 * @return {string}
 */
export const nowDatetime = (
  format: "YYYY-MM-DD H:mm:ss" | "YYMMDD" | "H:mm:ss" = "YYYY-MM-DD H:mm:ss"
): string => {
  return dayjs().format(format);
};

/**
 * @description: 返回 number
 * @return {string}
 */
export const toNumber = (value: number, accuracy = 2) => {
  return Number(value.toFixed(accuracy));
};
