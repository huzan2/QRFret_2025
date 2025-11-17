export interface SessionConfig {
  part: string;
  name: string;
}

export interface Song {
  idx: number;
  title: string;
  artist: string;
  sessions: SessionConfig[];
}

export const setlist: Song[] = [
  {
    idx: 1,
    title: 'DETOX',
    artist: 'SURL',
    sessions: [
      {
        part: 'V.',
        name: '이예영',
      },
      {
        part: 'G.',
        name: '김상경, 한재민',
      },
      {
        part: 'B.',
        name: '김윤하',
      },
      {
        part: 'D.',
        name: '엄지훈',
      },
      {
        part: 'K.',
        name: '이서은',
      },
    ],
  },
  {
    idx: 2,
    title: 'annie.',
    artist: 'Wave to earth',
    sessions: [
      {
        part: 'V.',
        name: '이동현',
      },
      {
        part: 'G.',
        name: '우희태, 허채은',
      },
      {
        part: 'B.',
        name: '채윤',
      },
      {
        part: 'D.',
        name: '장서윤',
      },
      {
        part: 'K.',
        name: '김민정',
      },
    ],
  },
  {
    idx: 3,
    title: 'ㅈㅣㅂ',
    artist: '한로로',
    sessions: [
      {
        part: 'V.',
        name: '이예영',
      },
      {
        part: 'G.',
        name: '우희태, 한재민',
      },
      {
        part: 'B.',
        name: '채윤',
      },
      {
        part: 'D.',
        name: '정재화',
      },
      {
        part: 'K.',
        name: '김현준',
      },
    ],
  },
  {
    idx: 4,
    title: 'Summer for you',
    artist: '잭킹콩',
    sessions: [
      {
        part: 'V.',
        name: '최현석',
      },
      {
        part: 'G.',
        name: '우희태',
      },
      {
        part: 'B.',
        name: '김윤하',
      },
      {
        part: 'D.',
        name: '엄지훈',
      },
      {
        part: 'K.',
        name: '박이랑',
      },
    ],
  },
  {
    idx: 5,
    title: '아지랑이',
    artist: '쏜애플',
    sessions: [
      {
        part: 'V.',
        name: '김선우',
      },
      {
        part: 'G.',
        name: '허정빈, 조현준',
      },
      {
        part: 'B.',
        name: '이소현',
      },
      {
        part: 'D.',
        name: '정재화',
      },
      {
        part: 'K.',
        name: '김현준',
      },
    ],
  },
  {
    idx: 6,
    title: 'Ling Ling',
    artist: '검정치마',
    sessions: [
      {
        part: 'V.',
        name: '이동현',
      },
      {
        part: 'G.',
        name: '허정빈, 허채은',
      },
      {
        part: 'B.',
        name: '이소현',
      },
      {
        part: 'D.',
        name: '인예관',
      },
      {
        part: 'K.',
        name: '김현수',
      },
    ],
  },
  {
    idx: 7,
    title: '세상:소음',
    artist: '리도어',
    sessions: [
      {
        part: 'V.',
        name: '하윤수',
      },
      {
        part: 'G.',
        name: '허정빈, 허채은',
      },
      {
        part: 'B.',
        name: '정서현',
      },
      {
        part: 'D.',
        name: '이용민',
      },
    ],
  },
  {
    idx: 8,
    title: '넌 내게 반했어',
    artist: '노브레인',
    sessions: [
      {
        part: 'V.',
        name: '김선우',
      },
      {
        part: 'G.',
        name: '우희태, 인예관',
      },
      {
        part: 'B.',
        name: '이소현',
      },
      {
        part: 'D.',
        name: '김영균',
      },
      {
        part: 'K.',
        name: '김현수',
      },
    ],
  },
  {
    idx: 9,
    title: '아직도 사랑하면 안 되는 건가요',
    artist: '리도어',
    sessions: [
      {
        part: 'V.',
        name: '김민정',
      },
      {
        part: 'G.',
        name: '조현준, 장지웅',
      },
      {
        part: 'B.',
        name: '채윤',
      },
      {
        part: 'D.',
        name: '한지우',
      },
      {
        part: 'K.',
        name: '박이랑',
      },
    ],
  },
  {
    idx: 10,
    title: '어떡하라고',
    artist: '나상현씨밴드',
    sessions: [
      {
        part: 'V.',
        name: '김건우',
      },
      {
        part: 'G.',
        name: '쟝지웅',
      },
      {
        part: 'B.',
        name: '임은수',
      },
      {
        part: 'D.',
        name: '김영균',
      },
    ],
  },
  {
    idx: 11,
    title: '침묵',
    artist: 'SURL',
    sessions: [
      {
        part: 'V.',
        name: '김준서',
      },
      {
        part: 'G.',
        name: '허정빈, 조현준',
      },
      {
        part: 'B.',
        name: '임은수',
      },
      {
        part: 'D.',
        name: '정재화',
      },
    ],
  },
  {
    idx: 12,
    title: '범람&맨드라미',
    artist: '라쿠나',
    sessions: [
      {
        part: 'V.',
        name: '강윤호',
      },
      {
        part: 'G.',
        name: '김상경, 허정빈',
      },
      {
        part: 'B.',
        name: '김윤하',
      },
      {
        part: 'D.',
        name: '엄지훈',
      },
    ],
  },
  {
    idx: 13,
    title: '반딧불이',
    artist: '터치드',
    sessions: [
      {
        part: 'V.',
        name: '박가영',
      },
      {
        part: 'G.',
        name: '장지웅, 김상경',
      },
      {
        part: 'B.',
        name: '임은수',
      },
      {
        part: 'D.',
        name: '김영균',
      },
      {
        part: 'K.',
        name: '이서은',
      },
    ],
  },
  {
    idx: 14,
    title: 'Stronger than me',
    artist: 'Amy Winehouse',
    sessions: [
      {
        part: 'V.',
        name: '김준서',
      },
      {
        part: 'G.',
        name: '조현준',
      },
      {
        part: 'B.',
        name: '김윤하',
      },
      {
        part: 'D.',
        name: '임아연',
      },
      {
        part: 'K.',
        name: '이서은',
      },
    ],
  },
  {
    idx: 15,
    title: '내가 세상을 떠난다면',
    artist: '웨스트오브',
    sessions: [
      {
        part: 'V.',
        name: '김선우',
      },
      {
        part: 'G.',
        name: '김상경, 장지웅',
      },
      {
        part: 'B.',
        name: '정서현',
      },
      {
        part: 'D.',
        name: '임아연',
      },
      {
        part: 'K.',
        name: '김민정',
      },
    ],
  },
  {
    idx: 16,
    title: 'Antifreeze',
    artist: '검정치마',
    sessions: [
      {
        part: 'V.',
        name: '김건우',
      },
      {
        part: 'G.',
        name: '조현준, 허채은',
      },
      {
        part: 'B.',
        name: '채윤',
      },
      {
        part: 'D.',
        name: '장서윤',
      },
      {
        part: 'K.',
        name: '김현준',
      },
    ],
  },
  {
    idx: 17,
    title: 'River',
    artist: 'The poles',
    sessions: [
      {
        part: 'V.',
        name: '최현석',
      },
      {
        part: 'G.',
        name: '김상경, 최현석',
      },
      {
        part: 'B.',
        name: '김윤하',
      },
      {
        part: 'D.',
        name: '이용민',
      },
      {
        part: 'K.',
        name: '이예영',
      },
    ],
  },
  {
    idx: 18,
    title: '사랑이라 했던 말 속에서',
    artist: '캔트비블루',
    sessions: [
      {
        part: 'V.',
        name: '최현석',
      },
      {
        part: 'G.',
        name: '한재민, 김윤하',
      },
      {
        part: 'B.',
        name: '정서현',
      },
      {
        part: 'D.',
        name: '엄지훈',
      },
      {
        part: 'K.',
        name: '김민정',
      },
    ],
  },
  {
    idx: 19,
    title: 'Viva la vida',
    artist: 'Coldplay',
    sessions: [
      {
        part: 'V.',
        name: '강윤호',
      },
      {
        part: 'G.',
        name: '조현준',
      },
      {
        part: 'B.',
        name: '정서현',
      },
      {
        part: 'D.',
        name: '장서윤',
      },
      {
        part: 'K.',
        name: '김현준',
      },
    ],
  },
  {
    idx: 20,
    title: 'Space Kids',
    artist: 'The poles',
    sessions: [
      {
        part: 'V.',
        name: '김건우',
      },
      {
        part: 'G.',
        name: '장지웅, 한지우',
      },
      {
        part: 'B.',
        name: '이소현',
      },
      {
        part: 'D.',
        name: '인예관',
      },
    ],
  },
  {
    idx: 21,
    title: 'Good morning sunshine',
    artist: 'The poles',
    sessions: [
      {
        part: 'V.',
        name: '하윤수',
      },
      {
        part: 'G.',
        name: '허채은, 허정빈',
      },
      {
        part: 'B.',
        name: '임은수',
      },
      {
        part: 'D.',
        name: '이용민',
      },
    ],
  },
  {
    idx: 22,
    title: '자작곡',
    artist: '14fret 자작곡',
    sessions: [
      {
        part: 'V.',
        name: '김건우',
      },
      {
        part: 'G.',
        name: '김상경, 장지웅',
      },
      {
        part: 'B.',
        name: '임은수',
      },
      {
        part: 'D.',
        name: '한지우',
      },
    ],
  },
  {
    idx: 23,
    title: 'Last Day',
    artist: '터치드',
    sessions: [
      {
        part: 'V.',
        name: '박가영',
      },
      {
        part: 'G.',
        name: '장지웅, 허채은',
      },
      {
        part: 'B.',
        name: '한지우',
      },
      {
        part: 'D.',
        name: '김영균',
      },
      {
        part: 'K.',
        name: '김현수',
      },
    ],
  },
  {
    idx: 24,
    title: '노래는 불빛처럼 달린다',
    artist: '유다빈밴드',
    sessions: [
      {
        part: 'V.',
        name: '김준서',
      },
      {
        part: 'G.',
        name: '허정빈, 장지웅',
      },
      {
        part: 'B.',
        name: '한지우',
      },
      {
        part: 'D.',
        name: '엄지훈',
      },
      {
        part: 'K.',
        name: '이서은, 박이랑',
      },
    ],
  },
];
