import { v4 as uuid } from 'uuid';
import Album from '@/interfaces/album';

const songList = [
  {
    id: uuid(),
    audioUrl: require('./audio/Homebound.mp3'),
    name: 'Homebound',
    artist: 'Anno Domini Beats',
    duration: 0,
    coverUrl: require('./Anno_Domini_Beats.jpg'),
    like: false
  },
  {
    id: uuid(),
    audioUrl: require('./audio/LikeThat.mp3'),
    name: 'Like That',
    artist: 'Anno Domini Beats',
    duration: 0,
    coverUrl: require('./Anno_Domini_Beats.jpg'),
    like: true
  },
  {
    id: uuid(),
    audioUrl: require('./audio/Lottery.mp3'),
    name: 'Lottery',
    artist: 'Anno Domini Beats',
    duration: 0,
    coverUrl: require('./Anno_Domini_Beats.jpg'),
    like: false
  },
  {
    id: uuid(),
    audioUrl: require('./audio/Sailing.mp3'),
    name: 'Sailing',
    artist: 'Anno Domini Beats',
    duration: 0,
    coverUrl: require('./Anno_Domini_Beats.jpg'),
    like: false
  },
  {
    id: uuid(),
    audioUrl: require('./audio/Schizo.mp3'),
    name: 'Schizo',
    artist: 'Anno Domini Beats',
    duration: 0,
    coverUrl: require('./Anno_Domini_Beats.jpg'),
    like: false
  },
  {
    id: uuid(),
    audioUrl: require('./audio/Shadows.mp3'),
    name: 'Shadows',
    artist: 'Anno Domini Beats',
    duration: 0,
    coverUrl: require('./Anno_Domini_Beats.jpg'),
    like: false
  },
  {
    id: uuid(),
    audioUrl: require('./audio/Shake.mp3'),
    name: 'Shake',
    artist: 'Anno Domini Beats',
    duration: 0,
    coverUrl: require('./Anno_Domini_Beats.jpg'),
    like: false
  },
  {
    id: uuid(),
    audioUrl: require('./audio/SunnyDays.mp3'),
    name: 'Sunny Days',
    artist: 'Anno Domini Beats',
    duration: 0,
    coverUrl: require('./Anno_Domini_Beats.jpg'),
    like: false
  }
];

const album: Album = {
  name: 'Anno Domini Beats',
  artist: 'Anno Domini Beats',
  songList: songList,
  year: 2019,
  coverUrl: require('./Anno_Domini_Beats.jpg')
};

export default album;
