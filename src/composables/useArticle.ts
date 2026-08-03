import { ref, onMounted } from 'vue';
import { getArticle } from '@/plugins/mock';
import { decodeHtmlEntities } from '@/Utils/htmlUtils';

/**
 * Composable for fetching and managing article data
 * @param navNo - Navigation number for the article
 * @param autoLoad - Whether to auto-load on mount (default: true)
 */
export interface ArticleItem {
  id: string;
  title: string;
  c_time: string;
  content: string;
  floor: string;
  sub_title: string;
  names: string[];
}

export interface UseArticleReturn {
  articles: import('vue').Ref<ArticleItem[]>;
  loading: import('vue').Ref<boolean>;
  error: import('vue').Ref<Error | null>;
  fetchArticles: () => Promise<void>;
  getByFloor: (floor: string) => ArticleItem[];
}

export function useArticle(navNo: string, autoLoad = true): UseArticleReturn {
  const articles = ref<ArticleItem[]>([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const fetchArticles = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await getArticle({ nav_no: navNo });
      const data = response?.data || [];
      articles.value = data.map((item: ArticleItem) => ({
        ...item,
        content: decodeHtmlEntities(item.content)
      }));
    } catch (err) {
      error.value = err as Error;
      console.error(`Failed to load articles for nav ${navNo}:`, err);
    } finally {
      loading.value = false;
    }
  };

  const getByFloor = (floor: string): ArticleItem[] => {
    return articles.value.filter(item => item.floor === floor);
  };

  if (autoLoad) {
    onMounted(fetchArticles);
  }

  return {
    articles,
    loading,
    error,
    fetchArticles,
    getByFloor
  };
}
