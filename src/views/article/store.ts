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
  articles: [],
  article: {
    id: 0,
    title: "",
    author: "",
    content: "",
    source: "",
    collection: "",
    volume: "",
    read_count: 0,
    created_at: "",
    translate: "",
  },
});
