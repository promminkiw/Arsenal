import { Trophy, Home as HomeIcon, Star, Medal, Sparkles, Crown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const ERAS = [
  { label: 'ทั้งหมด', key: 'All', years: 'ทุกยุคสมัย' },
  { label: 'ยุคก่อตั้ง', key: 'Founding', years: '1886–1919' },
  { label: 'ยุคแชปแมน', key: 'Chapman Era', years: '1925–1947' },
  { label: 'หลังสงคราม', key: 'Post-War', years: '1947–1966' },
  { label: 'ยุครุ่งเรือง', key: 'Glory Days', years: '1966–1996' },
  { label: 'ยุคสมัยใหม่', key: 'Modern Era', years: '1996–วันนี้' },
] as const;

export type EraKey = (typeof ERAS)[number]['key'];

export type TimelineStat = {
  num: number;
  label: string;
};

export type TimelineItem = {
  year: string;
  era: Exclude<EraKey, 'All'>;
  side: 'left' | 'right';
  tag: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  img: string;
  link: string;
  stats: TimelineStat[];
};

export const TIMELINE_DATA: TimelineItem[] = [
  {
    year: '1886',
    era: 'Founding',
    side: 'left',
    tag: '',
    icon: Sparkles,
    title: 'กำเนิดที่ Dial Square',
    desc: 'David Danskin และเพื่อนคนงานโรงงานอาวุธอีก 15 คนที่ Royal Arsenal เมืองวูลวิช ร่วมกันลงขันคนละหกเพนนีเพื่อก่อตั้ง Dial Square FC นัดแรกของพวกเขาเมื่อวันที่ 11 ธันวาคม 1886 จบด้วยชัยชนะ 6–0 เหนือ Eastern Wanderers และตำนานก็เริ่มต้นขึ้น',
    img: '/history/dial-square-1886.jpg',
    link: 'อ่านต่อได้ใน Hall of Fame',
    stats: [
      { num: 13, label: 'แชมป์ลีก' },
      { num: 14, label: 'แชมป์เอฟเอคัพ' },
      { num: 2, label: 'แชมป์ลีกคัพ' },
      { num: 48, label: 'ถ้วยรางวัลหลักทั้งหมด' },
    ],
  },
  {
    year: '1913',
    era: 'Founding',
    side: 'right',
    tag: 'สนามเหย้าใหม่',
    icon: HomeIcon,
    title: 'ย้ายสู่ Highbury',
    desc: 'Sir Henry Norris ย้ายสโมสรจากวูลวิชข้ามลอนดอนมายัง Arsenal Stadium ที่ Highbury ทางตอนเหนือของลอนดอน การย้ายครั้งนี้เป็นวิสัยทัศน์ที่ทำให้สโมสรเข้าถึงฐานแฟนบอลที่กว้างขึ้นมาก และปูทางสู่ทุกอย่างที่ตามมา รวมถึงจุดเริ่มต้นของศึก North London Derby',
    img: '/history/highbury-1913.png',
    link: '',
    stats: [],
  },
  {
    year: '1930',
    era: 'Chapman Era',
    side: 'left',
    tag: 'ถ้วยใหญ่ครั้งแรก',
    icon: Trophy,
    title: 'การปฏิวัติของ Chapman',
    desc: 'Herbert Chapman ยกระดับอาร์เซนอลจากทีมกลางตารางให้กลายเป็นพลังหลักของอังกฤษ ภายใต้ความอัจฉริยะของเขา สโมสรคว้าแชมป์ FA Cup ปี 1930 ถ้วยใหญ่รายการแรกในประวัติศาสตร์สโมสร จากนั้นกวาดแชมป์ลีก 5 สมัยและ FA Cup อีก 1 ครั้งในทศวรรษ 1930 พร้อมสร้างอิทธิพลทั้งด้านแท็กติกและนวัตกรรม',
    img: '/history/chapman-1930s.png',
    link: '',
    stats: [],
  },
  {
    year: '1948',
    era: 'Post-War',
    side: 'right',
    tag: 'แชมป์ลีก',
    icon: Medal,
    title: 'ยุคทองของ Whittaker',
    desc: 'Tom Whittaker สานต่อมรดกของ Chapman หลังสงคราม พาอาร์เซนอลได้แชมป์ลีกสูงสุด 2 สมัย (1947–48 และ 1952–53) และแชมป์ FA Cup ปี 1950 ถ้วยเหล่านี้ช่วยตอกย้ำภาพลักษณ์ทีมผู้ชนะของสโมสร และเป็นช่วงท้ายของความสำเร็จระดับลีกและเอฟเอคัพก่อนจะกลับมายิ่งใหญ่อีกครั้ง',
    img: '/history/whittaker-1948.png',
    link: '',
    stats: [],
  },
  {
    year: '1971',
    era: 'Glory Days',
    side: 'left',
    tag: 'ดับเบิลแชมป์ครั้งแรก',
    icon: Crown,
    title: 'ดับเบิลแชมป์แห่งเกียรติยศ',
    desc: 'ภายใต้การคุมทีมของ Bertie Mee อาร์เซนอลคว้าดับเบิลแชมป์ลีกและเอฟเอคัพเป็นครั้งแรก โดยช่วงท้ายฤดูกาลพวกเขาชนะสเปอร์ส 1–0 เพื่อการันตีแชมป์ลีก ก่อนจะชนะลิเวอร์พูล 2–1 ในนัดชิงเอฟเอคัพ มันคือการปิดฉากช่วงไร้ถ้วยยาวนาน และประกาศการกลับสู่ความเป็นทีมระดับแถวหน้าอีกครั้ง',
    img: '/history/double-1971.png',
    link: '',
    stats: [],
  },
  {
    year: '1989',
    era: 'Glory Days',
    side: 'right',
    tag: 'แชมป์ลีก',
    icon: Trophy,
    title: 'แนวรับในตำนาน',
    desc: 'George Graham สร้างเกมรับระดับตำนานที่มี Tony Adams, Lee Dixon, Nigel Winterburn และ Steve Bould เป็นแกนหลัก และในคืนที่ดราม่าที่สุดคืนหนึ่งของฟุตบอลอังกฤษ Michael Thomas ยิงประตูท้ายเกมที่แอนฟิลด์ พาอาร์เซนอลชนะลิเวอร์พูล 2–0 ในนัดสุดท้ายของฤดูกาล 1988–89 และคว้าแชมป์ลีกอย่างสุดระทึก',
    img: '/history/backfour-1989.png',
    link: '',
    stats: [],
  },
  {
    year: '2004',
    era: 'Modern Era',
    side: 'left',
    tag: 'THE INVINCIBLES',
    icon: Star,
    title: 'ฤดูกาลไร้พ่าย',
    desc: 'ผลงานชิ้นเอกของ Arsène Wenger อาร์เซนอลจบฤดูกาลพรีเมียร์ลีก 2003–04 แบบไม่แพ้ใคร ชนะ 26 เสมอ 12 แพ้ 0 จาก 38 นัด สถิติไร้พ่ายต่อเนื่องยืดไปถึง 49 นัดในลีกสูงสุด และมีการจัดทำถ้วยพรีเมียร์ลีกสีทองเพื่อเป็นเกียรติแก่ความสำเร็จนี้ ซึ่งยังไม่มีทีมใดทำซ้ำได้',
    img: '/history/invincibles-2004.png',
    link: '',
    stats: [],
  },
  {
    year: '2006',
    era: 'Modern Era',
    side: 'right',
    tag: 'ยุคใหม่',
    icon: HomeIcon,
    title: 'ยินดีต้อนรับสู่ Emirates',
    desc: 'หลังอยู่ Highbury มายาวนาน 93 ปี อาร์เซนอลย้ายเข้าสู่ Emirates Stadium สนามทันสมัยที่รองรับผู้ชมราว 60,000 ที่นั่ง และในปีเดียวกันนั้น อาร์เซนอลกลายเป็นสโมสรจากลอนดอนทีมแรกที่เข้าชิงยูฟ่าแชมเปียนส์ลีก ก่อนจะแพ้บาร์เซโลนา 2–1 ที่กรุงปารีส บทใหม่ของสโมสรจึงเริ่มต้นขึ้น',
    img: '/history/emirates-2006.png',
    link: '',
    stats: [],
  },
];
