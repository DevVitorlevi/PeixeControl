type SoundKey = "lowStockAlert" | "saleCompleted";

const SOUND_PATHS: Record<SoundKey, string> = {
  lowStockAlert: "/sounds/low-stock-alert.mp3",
  saleCompleted: "/sounds/sale-success.mp3",
};

export function playSound(key: SoundKey) {
  if (typeof window === "undefined") return;

  try {
    const audio = new Audio(SOUND_PATHS[key]);
    audio.volume = 0.6;
    void audio.play().catch(() => {});
  } catch {}
}
