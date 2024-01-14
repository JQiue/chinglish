import { reactive } from "vue";

interface State {
  showEditor: boolean;
  editorMode: "add" | "edit";
  article: Article;
  articles: Article[];
}

export const state = reactive<State>({
  showEditor: false,
  editorMode: "add",
  article: {
    id: 0,
    title: "",
    author: "",
    content: "",
    source: "",
    collection: "",
    read_count: 0,
    created_at: "",
  },
  articles: [],
});
