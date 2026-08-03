import { ref, onMounted } from 'vue';
import { getNav } from '@/plugins/mock';
import { convertNavStructure } from '@/Utils/convertNavStructure';

/**
 * Composable for fetching and managing navigation data
 * @param autoLoad - Whether to auto-load on mount (default: true)
 */
export interface NavItem {
  id: number;
  title: string;
  type: string;
  path: string;
  children: NavItem[];
  isOpen?: boolean;
}

export interface UseNavReturn {
  navItems: import('vue').Ref<NavItem[]>;
  loading: import('vue').Ref<boolean>;
  error: import('vue').Ref<Error | null>;
  loadNav: () => Promise<NavItem[]>;
}

export function useNav(autoLoad = true): UseNavReturn {
  const navItems = ref<NavItem[]>([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const loadNav = async (): Promise<NavItem[]> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await getNav();
      const data = response?.data || [];
      const treeData = convertNavStructure(data);
      navItems.value = treeData as NavItem[];
      return navItems.value;
    } catch (err) {
      error.value = err as Error;
      console.error('Failed to load navigation:', err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  if (autoLoad) {
    onMounted(() => {
      loadNav();
    });
  }

  return {
    navItems,
    loading,
    error,
    loadNav
  };
}
