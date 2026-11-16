export interface StoryScene {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  startSec: number;
  endSec: number;
  timeRangeLabel: string;
  onScreenLines: string[];
  visualSummary: string;
  cameraDirection: string;
  paletteLabel: string;
  atmosphereColors: {
    bgFrom: string;
    bgTo: string;
    accent: string;
  };
  scrapbookMoments?: {
    id: string;
    label: string;
    caption: string;
  }[];
}

export const TOTAL_DURATION_SEC = 90;

export const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    slug: 'the-beginning',
    title: 'Awal Kisah',
    subtitle: 'Babak 01',
    startSec: 0,
    endSec: 10,
    timeRangeLabel: '0:00 – 0:10',
    onScreenLines: ['Pada Suatu Hari...', 'Dua Hati, Satu Kisah yang Indah.'],
    visualSummary:
      'Langit biru pastel dengan awan yang bergerak perlahan dan bintang-bintang kecil berkilau. Buku cerita terbuka di tengah layar saat Cora dan Ijal muncul lalu melambaikan tangan dengan malu-malu.',
    cameraDirection: 'Gerakan kamera mendekat perlahan ke tengah buku cerita',
    paletteLabel: 'Biru Pastel · Krem · Emas Berkilau',
    atmosphereColors: {
      bgFrom: '#DDF0FC',
      bgTo: '#FFF8EE',
      accent: '#5B9BD5',
    },
  },
  {
    id: 2,
    slug: 'our-first-chapter',
    title: 'Babak Pertama Kita',
    subtitle: 'Babak 02',
    startSec: 10,
    endSec: 20,
    timeRangeLabel: '0:10 – 0:20',
    onScreenLines: ['17 Mei 2026', 'Hari ketika kisah kita dimulai.'],
    visualSummary:
      'Cora dan Ijal bertemu untuk pertama kalinya di bawah kelopak bunga lembut. Keduanya saling menatap, tersenyum malu dengan pipi merona, dan hati-hati kecil melayang di antara mereka.',
    cameraDirection: 'Geseran kamera lembut menyatukan kedua karakter dalam fokus hangat',
    paletteLabel: 'Merah Muda Sakura · Krem Hangat · Langit Lembut',
    atmosphereColors: {
      bgFrom: '#FCE8EF',
      bgTo: '#FFF9F0',
      accent: '#D95D78',
    },
  },
  {
    id: 3,
    slug: 'little-moments',
    title: 'Momen Kecil, Bahagia Besar',
    subtitle: 'Babak 03',
    startSec: 20,
    endSec: 35,
    timeRangeLabel: '0:20 – 0:35',
    onScreenLines: ['Setiap momen kecil menjadi kenangan yang indah.'],
    visualSummary:
      'Montase scrapbook animasi yang hidup berisi lima kenangan manis: nonton bioskop, ngopi bareng, makan bersama dengan bahagia, pose kocak di photobooth, dan saling menggoda lalu tertawa.',
    cameraDirection: 'Sorotan scrapbook bergantian di atas potongan foto berbingkai',
    paletteLabel: 'Kertas Lavender · Selotip Mawar · Krem',
    atmosphereColors: {
      bgFrom: '#F4ECFA',
      bgTo: '#FFF8F2',
      accent: '#9B72CF',
    },
    scrapbookMoments: [
      {
        id: 'cinema',
        label: 'Nonton Bioskop',
        caption: 'Berbagi popcorn dan tawa pelan di ruang bioskop yang hangat',
      },
      {
        id: 'coffee',
        label: 'Ngopi Bareng',
        caption: 'Secangkir kopi hangat dan obrolan yang tak pernah habis',
      },
      {
        id: 'dinner',
        label: 'Makan Bersama',
        caption: 'Makanan favorit terasa jauh lebih nikmat saat dinikmati berdua',
      },
      {
        id: 'photobooth',
        label: 'Keseruan Photobooth',
        caption: 'Pose kocak, kilatan lampu kamera, dan empat bingkai kenangan',
      },
      {
        id: 'teasing',
        label: 'Saling Menggoda',
        caption: 'Cora merajuk lucu sementara Ijal tertawa berusaha menghiburnya',
      },
    ],
  },
  {
    id: 4,
    slug: 'distance-cant-separate-us',
    title: 'Jarak Tak Bisa Memisahkan Kita',
    subtitle: 'Babak 04',
    startSec: 35,
    endSec: 45,
    timeRangeLabel: '0:35 – 0:45',
    onScreenLines: ['Meski terpisah jarak, kamu selalu dekat di hatiku.'],
    visualSummary:
      'Layar terpisah menampilkan dua suasana ruang yang berbeda. Cora melambaikan tangan ceria di panggilan video ponselnya, sementara Ijal tersenyum hangat sambil memperbaiki kacamatanya. Hati terbang menghubungkan keduanya.',
    cameraDirection: 'Bingkai terbelah seimbang dengan lintasan hati yang menyatukan layar',
    paletteLabel: 'Lavender Senja · Biru Muda · Kilau Mawar',
    atmosphereColors: {
      bgFrom: '#EAE4FA',
      bgTo: '#DFEEFA',
      accent: '#D95D78',
    },
  },
  {
    id: 5,
    slug: 'six-months-together',
    title: 'Enam Bulan Bersama',
    subtitle: 'Babak 05',
    startSec: 45,
    endSec: 60,
    timeRangeLabel: '0:45 – 1:00',
    onScreenLines: [
      'HAPPY 6TH MENSIVERSARY!',
      '6 Bulan Penuh Cinta, Tawa & Kenangan.',
    ],
    visualSummary:
      'Cora dan Ijal berjalan berdampingan di bawah langit senja pastel. Enam buah hati melayang naik dan berubah menjadi angka besar "6" di tengah taburan konfeti, kelopak bunga, dan bintang.',
    cameraDirection: 'Gerakan kamera melebar menampilkan langit perayaan senja',
    paletteLabel: 'Persik Senja · Lavender · Konfeti Pastel',
    atmosphereColors: {
      bgFrom: '#FCE1E8',
      bgTo: '#E8DFF9',
      accent: '#D95D78',
    },
  },
  {
    id: 6,
    slug: 'a-little-promise',
    title: 'Sebuah Janji Kecil',
    subtitle: 'Babak 06',
    startSec: 60,
    endSec: 75,
    timeRangeLabel: '1:00 – 1:15',
    onScreenLines: [
      'Sebuket bunga kecil, dan sebuah janji yang hangat...',
      'Melangkah menuju setiap hari esok, bersama-sama.',
    ],
    visualSummary:
      'Ijal memberikan buket bunga kecil kepada Cora. Cora tersenyum malu-malu dan menerima bunga tersebut, lalu mereka berjalan bersama menuju cahaya matahari terbenam.',
    cameraDirection: 'Kamera menjauh lembut saat keduanya berjalan ke arah cakrawala',
    paletteLabel: 'Emas Senja · Merah Muda Lembut · Krem Hangat',
    atmosphereColors: {
      bgFrom: '#FFE5D4',
      bgTo: '#FADADD',
      accent: '#D95D78',
    },
  },
  {
    id: 7,
    slug: 'our-little-home',
    title: 'Rumah Kecil Kita Bersama',
    subtitle: 'Babak 07',
    startSec: 75,
    endSec: 90,
    timeRangeLabel: '1:15 – 1:30',
    onScreenLines: [
      'Kita usahakan rumah itu, bersama-sama.',
      'Happy 6th Mensiversary, Cora & Ijal.',
    ],
    visualSummary:
      'Di bawah langit senja bertabur bintang, tampak sebuah rumah pastel sederhana dengan taman bunga yang luas dan jendela bercahaya hangat. Cora dan Ijal berdiri berdampingan menatap masa depan mereka dengan senyum penuh syukur.',
    cameraDirection: 'Tarik-mundur sinematik menutup buku cerita dengan cahaya hangat rumah',
    paletteLabel: 'Lavender Malam · Emas Hangat · Taman Pastel',
    atmosphereColors: {
      bgFrom: '#E6DDF7',
      bgTo: '#FFF3E4',
      accent: '#D95D78',
    },
  },
];

export function getSceneAtTime(timeSec: number): StoryScene {
  const clamped = Math.max(0, Math.min(TOTAL_DURATION_SEC - 0.01, timeSec));
  return (
    STORY_SCENES.find(
      (scene) => clamped >= scene.startSec && clamped < scene.endSec,
    ) || STORY_SCENES[STORY_SCENES.length - 1]
  );
}
