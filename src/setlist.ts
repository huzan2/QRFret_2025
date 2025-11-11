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
        part: 'voc',
        name: '이예영',
      },
      {
        part: 'eg',
        name: '김상경, 한재민',
      },
      {
        part: 'bass',
        name: '김윤하',
      },
      {
        part: 'drum',
        name: '엄지훈',
      },
      {
        part: 'key',
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
        part: 'voc',
        name: '이동현',
      },
      {
        part: 'eg',
        name: '우희태, 허채은',
      },
      {
        part: 'bass',
        name: '채윤',
      },
      {
        part: 'drum',
        name: '장서윤',
      },
      {
        part: 'key',
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
        part: 'voc',
        name: '이예영',
      },
      {
        part: 'eg',
        name: '우희태, 한재민',
      },
      {
        part: 'bass',
        name: '채윤',
      },
      {
        part: 'drum',
        name: '정재화',
      },
      {
        part: 'key',
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
        part: 'voc',
        name: '최현석',
      },
      {
        part: 'eg',
        name: '우희태',
      },
      {
        part: 'bass',
        name: '김윤하',
      },
      {
        part: 'drum',
        name: '엄지훈',
      },
      {
        part: 'key',
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
        part: 'voc',
        name: '김선우',
      },
      {
        part: 'eg',
        name: '허정빈, 조현준',
      },
      {
        part: 'bass',
        name: '이소현',
      },
      {
        part: 'drum',
        name: '정재화',
      },
      {
        part: 'key',
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
        part: 'voc',
        name: '이동현',
      },
      {
        part: 'eg',
        name: '허정빈, 허채은',
      },
      {
        part: 'bass',
        name: '이소현',
      },
      {
        part: 'drum',
        name: '인예관',
      },
      {
        part: 'key',
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
        part: 'voc',
        name: '하윤수',
      },
      {
        part: 'eg',
        name: '허정빈, 허채은',
      },
      {
        part: 'bass',
        name: '정서현',
      },
      {
        part: 'drum',
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
        part: 'voc',
        name: '김선우',
      },
      {
        part: 'eg',
        name: '우희태, 인예관',
      },
      {
        part: 'bass',
        name: '이소현',
      },
      {
        part: 'drum',
        name: '김영균',
      },
      {
        part: 'key',
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
        part: 'voc',
        name: '김민정',
      },
      {
        part: 'eg',
        name: '조현준, 장지웅',
      },
      {
        part: 'bass',
        name: '채윤',
      },
      {
        part: 'drum',
        name: '한지우',
      },
      {
        part: 'key',
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
        part: 'voc',
        name: '김건우',
      },
      {
        part: 'eg',
        name: '쟝지웅',
      },
      {
        part: 'bass',
        name: '임은수',
      },
      {
        part: 'drum',
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
        part: 'voc',
        name: '김준서',
      },
      {
        part: 'eg',
        name: '허정빈, 조현준',
      },
      {
        part: 'bass',
        name: '임은수',
      },
      {
        part: 'drum',
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
        part: 'voc',
        name: '강윤호',
      },
      {
        part: 'eg',
        name: '김상경, 허정빈',
      },
      {
        part: 'bass',
        name: '김윤하',
      },
      {
        part: 'drum',
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
        part: 'voc',
        name: '박가영',
      },
      {
        part: 'eg',
        name: '장지웅, 김상경',
      },
      {
        part: 'bass',
        name: '임읕수',
      },
      {
        part: 'drum',
        name: '김영균',
      },
      {
        part: 'key',
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
        part: 'voc',
        name: '김준서',
      },
      {
        part: 'eg',
        name: '조현준',
      },
      {
        part: 'bass',
        name: '김윤하',
      },
      {
        part: 'drum',
        name: '임아연',
      },
      {
        part: 'key',
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
        part: 'voc',
        name: '김선우',
      },
      {
        part: 'eg',
        name: '김상경, 장지웅',
      },
      {
        part: 'bass',
        name: '정서현',
      },
      {
        part: 'drum',
        name: '임아연',
      },
      {
        part: 'key',
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
        part: 'voc',
        name: '김건우',
      },
      {
        part: 'eg',
        name: '조현준, 허채은',
      },
      {
        part: 'bass',
        name: '채윤',
      },
      {
        part: 'drum',
        name: '장서윤',
      },
      {
        part: 'key',
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
        part: 'voc',
        name: '최현석',
      },
      {
        part: 'eg',
        name: '김상경, 최현석',
      },
      {
        part: 'bass',
        name: '김윤하',
      },
      {
        part: 'drum',
        name: '이용민',
      },
      {
        part: 'key',
        name: '이에영',
      },
    ],
  },
  {
    idx: 18,
    title: '사랑이라 했던 말 속에서',
    artist: '캔트비블루',
    sessions: [
      {
        part: 'voc',
        name: '최현석',
      },
      {
        part: 'eg',
        name: '한재민, 김윤하',
      },
      {
        part: 'bass',
        name: '정서현',
      },
      {
        part: 'drum',
        name: '엄지훈',
      },
      {
        part: 'key',
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
        part: 'voc',
        name: '강윤호',
      },
      {
        part: 'eg',
        name: '조현준',
      },
      {
        part: 'bass',
        name: '정서현',
      },
      {
        part: 'drum',
        name: '장서윤',
      },
      {
        part: 'key',
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
        part: 'voc',
        name: '김건우',
      },
      {
        part: 'eg',
        name: '장지웅, 한지우',
      },
      {
        part: 'bass',
        name: '이소현',
      },
      {
        part: 'drum',
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
        part: 'voc',
        name: '하윤수',
      },
      {
        part: 'eg',
        name: '허채은, 허정빈',
      },
      {
        part: 'bass',
        name: '임은수',
      },
      {
        part: 'drum',
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
        part: 'voc',
        name: '김건우',
      },
      {
        part: 'eg',
        name: '김상경, 장지웅',
      },
      {
        part: 'bass',
        name: '임은수',
      },
      {
        part: 'drum',
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
        part: 'voc',
        name: '박가영',
      },
      {
        part: 'eg',
        name: '장지웅, 허채은',
      },
      {
        part: 'bass',
        name: '한지우',
      },
      {
        part: 'drum',
        name: '김영균',
      },
      {
        part: 'key',
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
        part: 'voc',
        name: '김준서',
      },
      {
        part: 'eg',
        name: '허정빈, 장지웅',
      },
      {
        part: 'bass',
        name: '한지우',
      },
      {
        part: 'drum',
        name: '엄지훈',
      },
      {
        part: 'key',
        name: '이서은, 박이랑',
      },
    ],
  },
];
