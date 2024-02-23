import { reactive } from "vue";
import type { GlobalTheme } from "naive-ui";

export const global = reactive<{ theme: GlobalTheme | null }>({
  theme: null,
});
