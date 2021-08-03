export default interface Song {
  id: string;
  data: HTMLAudioElement;
  name: string;
  artist: string;
  duration: number;
  coverUrl: string;
  like: boolean;
}
