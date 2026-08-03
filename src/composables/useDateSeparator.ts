import { ref, computed, watch } from 'vue';

/**
 * Composable for separating date-based items into upcoming and past events
 * @param items - Array of items with c_time property
 * @param timeField - The property name for the date field (default: 'c_time')
 */
export interface DateItem {
  [key: string]: any;
}

export interface UseDateSeparatorReturn {
  upcoming: import('vue').Ref<DateItem[]>;
  past: import('vue').Ref<DateItem[]>;
  allItems: import('vue').Ref<DateItem[]>;
  totalCount: import('vue').ComputedRef<number>;
  upcomingCount: import('vue').ComputedRef<number>;
  pastCount: import('vue').ComputedRef<number>;
  reload: () => void;
}

export function useDateSeparator(
  items: import('vue').Ref<DateItem[]>,
  timeField: string = 'c_time'
): UseDateSeparatorReturn {
  const upcoming = ref<DateItem[]>([]);
  const past = ref<DateItem[]>([]);

  const totalCount = computed(() => items.value.length);
  const upcomingCount = computed(() => upcoming.value.length);
  const pastCount = computed(() => past.value.length);

  const separate = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    upcoming.value = [];
    past.value = [];

    items.value.forEach(item => {
      const itemDate = new Date(item[timeField]);
      itemDate.setHours(0, 0, 0, 0);
      
      if (itemDate.getTime() > now.getTime()) {
        upcoming.value.push(item);
      } else {
        past.value.push(item);
      }
    });

    // Sort by date descending
    upcoming.value.sort((a, b) => 
      new Date(b[timeField]).getTime() - new Date(a[timeField]).getTime()
    );
    past.value.sort((a, b) => 
      new Date(b[timeField]).getTime() - new Date(a[timeField]).getTime()
    );
  };

  const reload = () => {
    separate();
  };

  // Watch for changes in items
  watch(items, () => {
    separate();
  }, { deep: true, immediate: true });

  return {
    upcoming,
    past,
    allItems: items,
    totalCount,
    upcomingCount,
    pastCount,
    reload
  };
}
