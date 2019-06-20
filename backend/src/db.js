const users = [
  {
    id: '01',
    account: 'qqq',
    password: 'aaa'
  },
  {
    id: '02',
    account: 'abcabc',
    password: 'qwertyuiop'
  },{
    id: '03',
    account: 'abcffabc',
    password: 'qwdswertyuiop'
  },
  {
    id: 'su',
    account: 'yoshonabee',
    password: 'bysuck'
  }
]

const projects = [
  {
    id: '1',
    author: 'su',
    title: 'one',
    description: 'testing',
    image_id: 'https://i.imgur.com/VF4ZK6x.jpg',
    blur: 0,
    brightness: 1,
    contrast: 1,
    grayscale: 0,
    hue_rotate: 0,
    invert: 0,
    opacity: 1,
    saturate: 1,
    sepia: 0,
    public: false
  },
  {
    id: '2',
    author: '02',
    title: 'two',
    description: 'testing',
    image_id: 'https://i.imgur.com/rIgU6df.jpg',
    blur: 0,
    brightness: 1,
    contrast: 1,
    grayscale: 0,
    hue_rotate: 0,
    invert: 0,
    opacity: 1,
    saturate: 1,
    sepia: 0,
    public: false
  },
  {
    id: '3',
    author: 'su',
    title: 'three',
    description: 'testing',
    image_id: 'https://i.imgur.com/tDwPQWl.jpg',
    blur: 3,
    brightness: 1.5,
    contrast: 1,
    grayscale: 0,
    hue_rotate: 0,
    invert: 0,
    opacity: 1,
    saturate: 1,
    sepia: 0,
    public: false
  },
  {
    id: '4',
    author: '02',
    title: 'four',
    description: 'testing',
    image_id: 'https://i.imgur.com/nVbLKWL.jpg',
    blur: 0,
    brightness: 1,
    contrast: 1,
    grayscale: 0,
    hue_rotate: 0,
    invert: 0,
    opacity: 1,
    saturate: 1,
    sepia: 0,
    public: false
  },{
    id: '5',
    author: '02',
    title: 'five',
    description: 'testing',
    image_id: 'https://i.imgur.com/VF4ZK6x.jpg',
    blur: 0,
    brightness: 1,
    contrast: 1,
    grayscale: 0,
    hue_rotate: 0,
    invert: 0,
    opacity: 1,
    saturate: 1,
    sepia: 0,
    public: false
  },{
    id: '6',
    author: '01',
    title: 'five',
    description: 'testing',
    image_id: 'https://i.imgur.com/LZUEDmb.jpg',
    blur: 0,
    brightness: 1.5,
    contrast: 1,
    grayscale: 0,
    hue_rotate: 0,
    invert: 0,
    opacity: 1,
    saturate: 1,
    sepia: 0,
    public: false
  },{
    id: '7',
    author: '01',
    title: 'five',
    description: 'testing',
    image_id: 'https://i.imgur.com/Epv1eim.jpg',
    blur: 0,
    brightness: 1,
    contrast: 1,
    grayscale: 0,
    hue_rotate: 0,
    invert: 0,
    opacity: 1,
    saturate: 1,
    sepia: 0,
    public: false
  },{
    id: '8',
    author: '01',
    title: 'five',
    description: 'testing',
    image_id: 'https://i.imgur.com/TyjD0Wql.jpg',
    blur: 0,
    brightness: 1,
    contrast: 1,
    grayscale: 0,
    hue_rotate: 0,
    invert: 0,
    opacity: 1,
    saturate: 1,
    sepia: 0,
    public: false
  }
]

const db = {
  users,
  projects
}

export { db as default }
