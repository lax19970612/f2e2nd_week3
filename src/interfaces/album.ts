import Song from './song';

export default interface Album {
  name: string;
  artist: string;
  songList: Song[];
  coverUrl: string;
  year: number;
}
