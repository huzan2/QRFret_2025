import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserLikeState {
  likedItems: string[];
  toggleLike: (itemId: string) => void;
}

interface LikePendingState {
  pendingItemId: string | null;
  setPending: (itemId: string | null) => void;
}

export const useLikePendingStore = create<LikePendingState>((set) => ({
  pendingItemId: null,
  setPending: (itemId) => set({ pendingItemId: itemId }),
}));

export const useLikeStore = create<UserLikeState>()(
  persist(
    (set) => ({
      likedItems: [],
      toggleLike: (itemId: string) =>
        set((state) => ({
          likedItems: state.likedItems.includes(itemId)
            ? state.likedItems.filter((id) => id !== itemId)
            : [...state.likedItems, itemId],
        })),
    }),
    {
      name: 'user-likes-cache',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface LikeCountState {
  counts: Record<string, number>;
  setCounts: (newCounts: Record<string, number>) => void;
  updateCount: (itemId: string, newCount: number) => void;
}

export const useLikeCountStore = create<LikeCountState>((set) => ({
  counts: {},
  setCounts: (newCounts: Record<string, number>) => set({ counts: newCounts }),
  updateCount: (itemId: string, newCount: number) =>
    set((state) => ({
      counts: {
        ...state.counts,
        [itemId]: newCount,
      },
    })),
}));
