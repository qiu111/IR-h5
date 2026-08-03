import { ref, computed, onMounted } from 'vue';
import { getBanner } from '@/plugins/mock';
import { getMockBanner } from '@/mock/banner';

/**
 * Composable for fetching and managing banner data
 * @param selectedNav - Navigation number for the banner
 * @param autoLoad - Whether to auto-load on mount (default: true)
 */
export interface BannerData {
  status: number;
  bname: string;
}

export interface UseBannerReturn {
  bannerImg: import('vue').Ref<string>;
  loading: import('vue').Ref<boolean>;
  error: import('vue').Ref<Error | null>;
  bannerUrl: import('vue').ComputedRef<string>;
  fetchBanner: () => Promise<void>;
  isMockData: import('vue').ComputedRef<boolean>;
}

export function useBanner(selectedNav: string, autoLoad = true): UseBannerReturn {
  const bannerImg = ref('');
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  const isMockData = computed(() => {
    const mockBanner = getMockBanner(selectedNav);
    return mockBanner?.bname?.includes('mock') ?? false;
  });

  const bannerUrl = computed(() => {
    if (!bannerImg.value) return '';
    return bannerImg.value;
  });

  const fetchBanner = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await getBanner({ selectedNav });
      if (response?.data?.status === 200) {
        const mockBanner = getMockBanner(selectedNav);
        if (mockBanner?.bname?.includes('mock')) {
          bannerImg.value = '';
        } else {
          bannerImg.value = `${VITE_BASE_URL}${response.data.bname}`;
        }
      }
    } catch (err) {
      error.value = err as Error;
      bannerImg.value = '';
    } finally {
      loading.value = false;
    }
  };

  if (autoLoad) {
    onMounted(fetchBanner);
  }

  return {
    bannerImg,
    loading,
    error,
    bannerUrl,
    fetchBanner,
    isMockData
  };
}
