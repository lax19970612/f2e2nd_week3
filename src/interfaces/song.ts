export default interface Song {
  id: string;
  name: string;
  artist: string;
  duration: number;
  audioUrl: string;
  coverUrl: string;
  like: boolean;
}
